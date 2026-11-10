export type Category =
  | 'Ankara Fabrics'
  | 'Kente Fabrics'
  | 'Lining Materials'
  | 'Sewing Materials'
  | "Men's Fabrics"
  | "Women's Fabrics"
  | 'Corporate and Occasional Outfit Materials'
  | 'Ecolac Bags'
  | 'Gas Cylinders'
  | 'Other Available Products';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number; // in GH₵ (Ghana Cedis)
  description: string;
  image: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  colors?: string[];
  unit?: string; // e.g. "per yard", "per 6 yards", "per piece", "per set"
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  whatsappPhone: string;
  deliveryTown: string;
  region: string;
  streetAddress: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: 'WhatsApp Order' | 'MTN Mobile Money' | 'Telecel Cash' | 'Pay on Delivery';
  status: 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered';
  createdAt: string;
  notes?: string;
}

export type PageView = 'home' | 'shop' | 'product-detail' | 'cart' | 'about' | 'contact' | 'admin';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}
