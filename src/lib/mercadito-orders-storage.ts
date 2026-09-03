import fs from "fs";
import path from "path";
import { MercaditoOrder } from "@/types/mercadito";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jrxklahobxpxmtnncvst.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_8vdBzcFdNVhjtjK9a4ZE9A_FPmxsHhd";
const supabase = createClient(supabaseUrl, supabaseKey);

const ORDERS_FILE = path.join(process.cwd(), "data", "mercadito-orders.json");

function ensureDataDir() {
  const dir = path.dirname(ORDERS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getLocalStoredOrders(): MercaditoOrder[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const raw = fs.readFileSync(ORDERS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Error leyendo mercadito-orders.json:", e);
    return [];
  }
}

export function saveLocalStoredOrder(order: MercaditoOrder): void {
  try {
    ensureDataDir();
    const existing = getLocalStoredOrders();
    const filtered = existing.filter((o) => o.id !== order.id);
    const updated = [order, ...filtered];
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(updated, null, 2));
  } catch (e) {
    console.error("Error guardando mercadito-orders.json:", e);
  }
}

export async function getAllOrders(): Promise<MercaditoOrder[]> {
  const localOrders = getLocalStoredOrders();

  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      const supaMapped: MercaditoOrder[] = data.map((item: any) => ({
        id: item.order_code || item.id,
        orderCode: item.order_code || item.id,
        productId: item.product_id || "",
        productName: item.product_name || "Pieza Curada",
        productDesigner: item.product_designer || "Curaduría Ash",
        productPrice: Number(item.amount || 0),
        productCurrency: (item.currency as any) || "USD",
        depositAmount: item.deposit_amount ? Number(item.deposit_amount) : undefined,
        balanceAmount: item.balance_amount ? Number(item.balance_amount) : undefined,
        buyerName: item.buyer_name || "Cliente",
        buyerEmail: item.buyer_email || "",
        buyerPhone: item.buyer_phone || "",
        shippingAddress: item.shipping_address || "",
        shippingCity: item.shipping_city || "",
        shippingCountry: item.shipping_country || "Argentina",
        paymentMethod: item.payment_method || "transferencia",
        status: (item.status as any) || "pending_payment",
        notes: item.notes || "",
        createdAt: item.created_at || new Date().toISOString(),
      }));

      // Fusionar evitando duplicados por código de orden
      const ids = new Set(supaMapped.map((o) => o.id));
      const extraLocal = localOrders.filter((o) => !ids.has(o.id));
      return [...supaMapped, ...extraLocal];
    }
  } catch (err) {
    console.warn("Supabase orders query error, returning local:", err);
  }

  return localOrders;
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: MercaditoOrder["status"],
  notes?: string
): Promise<boolean> {
  // 1. Actualizar local
  const local = getLocalStoredOrders();
  const target = local.find((o) => o.id === orderId || o.orderCode === orderId);
  if (target) {
    target.status = newStatus;
    if (notes !== undefined) target.notes = notes;
    saveLocalStoredOrder(target);
  }

  // 2. Actualizar en Supabase
  try {
    await supabase
      .from("orders")
      .update({ status: newStatus, ...(notes !== undefined ? { notes } : {}) })
      .or(`order_code.eq.${orderId},id.eq.${orderId}`);
  } catch (supaErr) {
    console.warn("Supabase status update error:", supaErr);
  }

  return true;
}
