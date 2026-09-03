export type ProductCondition = 
  | 'Pristine (Sin uso previo)' 
  | 'Excellent (Excelente estado)' 
  | 'Very Good (Muy buen estado)' 
  | 'Good (Buen estado con pátina)';

export type ProductCategory = 
  | 'bolsos' 
  | 'indumentaria' 
  | 'joyeria' 
  | 'calzado' 
  | 'accesorios';

export type ProductStatus = 'available' | 'reserved' | 'sold';

export interface LuxuryProduct {
  id: string;
  slug: string;
  name: string;
  designer: string; // e.g., 'Chanel', 'Hermès', 'Prada', 'Saint Laurent', 'Gucci'
  description: string;
  price: number; // Precio en USD o ARS
  currency: 'USD' | 'ARS';
  category: ProductCategory;
  condition_state: ProductCondition;
  dimensions?: string; // e.g. "Ancho: 25cm | Alto: 16cm | Profundidad: 7cm"
  materials?: string; // e.g. "Cuero de cordero acolchado, herrajes baño oro 24k"
  image_url: string; // Imagen principal
  gallery_images: string[]; // Array de fotos HD adicionales
  source_url?: string; // URL en The RealReal
  is_unique_piece: boolean; // Siempre true para drops de TRR (1 de 1)
  status: ProductStatus;
  ash_styling_tip?: string; // Consejo editorial de estilismo exclusivo de Ash
  stock: number; // 1 para pieza única, 0 cuando se vende
  created_at?: string;
  updated_at?: string;
}

export interface MercaditoOrder {
  id: string;
  orderCode?: string;
  productId: string;
  productName: string;
  productDesigner: string;
  productPrice: number;
  productCurrency: 'USD' | 'ARS';
  depositAmount?: number;
  balanceAmount?: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingCountry: string;
  paymentMethod: string;
  status: 'pending_payment' | 'deposit_paid' | 'confirmed' | 'delivered' | 'cancelled';
  notes?: string;
  createdAt: string;
  whatsappMessageUrl?: string;
}
