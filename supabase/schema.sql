-- =========================================
-- El Mercadito de Ash — Supabase Schema
-- Ejecutar en: Supabase → SQL Editor → New query
-- =========================================

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,
  description TEXT,
  price       DECIMAL(10,2) NOT NULL,
  currency    TEXT        NOT NULL DEFAULT 'ARS' CHECK (currency IN ('ARS','USD')),
  category    TEXT        NOT NULL CHECK (category IN ('pieza','digital')),
  stock       INTEGER     DEFAULT -1,  -- -1 = ilimitado (digitales)
  image_url   TEXT,
  mp_link     TEXT,                    -- https://mpago.la/xxxxxxx
  active      BOOLEAN     DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de órdenes
CREATE TABLE IF NOT EXISTS orders (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  mp_payment_id   TEXT        UNIQUE,
  product_id      UUID        REFERENCES products(id),
  buyer_email     TEXT,
  buyer_name      TEXT,
  amount          DECIMAL(10,2),
  currency        TEXT,
  status          TEXT        DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','cancelled','in_process')),
  external_ref    TEXT,
  mp_raw          JSONB,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Función para descontar stock
CREATE OR REPLACE FUNCTION decrement_stock(p_id UUID)
RETURNS VOID AS $$
  UPDATE products SET stock = stock - 1
  WHERE id = p_id AND stock > 0;
$$ LANGUAGE sql;

-- ── Row Level Security ──
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders   ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede leer productos activos
CREATE POLICY "anon_read_active_products" ON products
  FOR SELECT TO anon, authenticated
  USING (active = true);

-- Solo usuarios autenticados (admin) pueden escribir productos
CREATE POLICY "auth_manage_products" ON products
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- Solo usuarios autenticados pueden ver órdenes
CREATE POLICY "auth_read_orders" ON orders
  FOR SELECT TO authenticated
  USING (true);

-- Solo service_role puede insertar órdenes (webhook)
CREATE POLICY "service_insert_orders" ON orders
  FOR INSERT TO service_role
  WITH CHECK (true);

CREATE POLICY "service_update_orders" ON orders
  FOR UPDATE TO service_role
  USING (true);

-- ── Storage bucket para imágenes de productos ──
-- Ejecutar en: Supabase → Storage → Create bucket → "products" (público)
-- O ejecutar esto:
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public_read_products_images" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'products');

CREATE POLICY "auth_upload_products_images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'products');

CREATE POLICY "auth_update_products_images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'products');

CREATE POLICY "auth_delete_products_images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'products');
