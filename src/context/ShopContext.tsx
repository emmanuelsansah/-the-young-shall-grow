import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order, Category, PageView, ToastMessage } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  currentPage: PageView;
  selectedProduct: Product | null;
  quickViewProduct: Product | null;
  cartDrawerOpen: boolean;
  toasts: ToastMessage[];
  searchQuery: string;
  selectedCategory: Category | 'All';
  priceSort: 'none' | 'low-to-high' | 'high-to-low';
  promoCode: string;
  discountPercentage: number;
  isSupabaseConnected: boolean;
  
  // Navigation
  navigateTo: (page: PageView, product?: Product) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: Category | 'All') => void;
  setPriceSort: (sort: 'none' | 'low-to-high' | 'high-to-low') => void;
  setQuickViewProduct: (product: Product | null) => void;
  toggleCartDrawer: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  addToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;

  // Cart actions
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  cartTotal: number;
  cartCount: number;

  // Wishlist actions
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistCount: number;

  // Order actions
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;

  // Admin Authentication
  isAdminLoggedIn: boolean;
  adminLoginModalOpen: boolean;
  openAdminLoginModal: () => void;
  closeAdminLoginModal: () => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  // Admin Product CRUD
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Products State
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tysg_products');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error parsing stored products', e);
        }
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tysg_cart');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error parsing stored cart', e);
        }
      }
    }
    return [];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tysg_wishlist');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error parsing stored wishlist', e);
        }
      }
    }
    return [];
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tysg_orders');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error parsing stored orders', e);
        }
      }
    }
    return [];
  });

  // UI States
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Filters & Promo State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [priceSort, setPriceSort] = useState<'none' | 'low-to-high' | 'high-to-low'>('none');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);

  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('tysg_admin_auth') === 'true';
    }
    return false;
  });
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);

  const loginAdmin = (password: string): boolean => {
    if (password.trim() === 'younggrow') {
      setIsAdminLoggedIn(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('tysg_admin_auth', 'true');
      }
      setAdminLoginModalOpen(false);
      addToast('Admin Access Granted. Welcome!', 'success');
      navigateTo('admin');
      return true;
    }
    addToast('Incorrect password. Access denied.', 'warning');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('tysg_admin_auth');
    }
    addToast('Admin logged out successfully', 'info');
    navigateTo('home');
  };

  // Sync with Supabase on mount if configured
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // 1. Fetch live products from Supabase
      supabase
        .from('products')
        .select('*')
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            const mapped: Product[] = data.map((row: any) => ({
              id: row.id,
              name: row.name,
              category: row.category,
              price: Number(row.price),
              unit: row.unit,
              description: row.description,
              image: row.image,
              inStock: Boolean(row.in_stock),
              stockCount: Number(row.stock_count),
              rating: Number(row.rating),
              colors: row.colors || [],
              isFeatured: Boolean(row.is_featured),
              isBestSeller: Boolean(row.is_best_seller),
              isNewArrival: Boolean(row.is_new_arrival),
            }));
            setProducts(mapped);
          }
        });

      // 2. Fetch live orders from Supabase
      supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) {
            const mappedOrders: Order[] = data.map((row: any) => ({
              id: row.id,
              customerName: row.customer_name,
              phone: row.phone,
              whatsappPhone: row.whatsapp_phone,
              deliveryTown: row.delivery_town,
              region: row.region,
              streetAddress: row.street_address,
              items: row.items,
              subtotal: Number(row.subtotal),
              discount: Number(row.discount || 0),
              deliveryFee: Number(row.delivery_fee),
              totalAmount: Number(row.total_amount),
              paymentMethod: row.payment_method,
              status: row.status,
              createdAt: row.created_at,
              notes: row.notes,
            }));
            setOrders(mappedOrders);
          }
        });
    }
  }, []);

  // Local persistence backups
  useEffect(() => {
    localStorage.setItem('tysg_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('tysg_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tysg_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('tysg_orders', JSON.stringify(orders));
  }, [orders]);

  // Toast Helpers
  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const newToast: ToastMessage = {
      id: Date.now().toString(),
      message,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      dismissToast(newToast.id);
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigateTo = (page: PageView, product?: Product) => {
    setCurrentPage(page);
    if (product) {
      setSelectedProduct(product);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        if (selectedColor) updated[existingIndex].selectedColor = selectedColor;
        return updated;
      }
      return [...prevCart, { product, quantity, selectedColor: selectedColor || product.colors?.[0] }];
    });

    addToast(`Added "${product.name}" to cart!`);
    setCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    addToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'TYSG10' || clean === 'GHANA10') {
      setPromoCode(clean);
      setDiscountPercentage(10);
      addToast('Promo Code Applied! 10% Discount Granted.', 'success');
      return true;
    }
    addToast('Invalid Promo Code. Try TYSG10', 'warning');
    return false;
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        addToast(`Removed "${product.name}" from Wishlist`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        addToast(`Saved "${product.name}" to Wishlist!`, 'success');
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const rawCartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartTotal = discountPercentage > 0 ? rawCartTotal * (1 - discountPercentage / 100) : rawCartTotal;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const placeOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => {
    const newOrder: Order = {
      ...orderData,
      id: `TYSG-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      status: 'Pending',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    addToast('Order Placed Successfully!', 'success');

    // Sync order to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('orders').insert([
          {
            id: newOrder.id,
            customer_name: newOrder.customerName,
            phone: newOrder.phone,
            whatsapp_phone: newOrder.whatsappPhone,
            delivery_town: newOrder.deliveryTown,
            region: newOrder.region,
            street_address: newOrder.streetAddress,
            items: newOrder.items,
            subtotal: newOrder.subtotal,
            discount: newOrder.discount,
            delivery_fee: newOrder.deliveryFee,
            total_amount: newOrder.totalAmount,
            payment_method: newOrder.paymentMethod,
            status: newOrder.status,
            notes: newOrder.notes,
            created_at: newOrder.createdAt,
          },
        ]);
      } catch (err) {
        console.warn('Could not sync order to Supabase:', err);
      }
    }

    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    addToast(`Order #${orderId} status updated to ${status}`);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('orders').update({ status }).eq('id', orderId);
      } catch (err) {
        console.warn('Failed to update order status in Supabase:', err);
      }
    }
  };

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    addToast(`Product "${newProduct.name}" added to catalog!`);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('products').insert([
          {
            id: newProduct.id,
            name: newProduct.name,
            category: newProduct.category,
            price: newProduct.price,
            unit: newProduct.unit,
            description: newProduct.description,
            image: newProduct.image,
            in_stock: newProduct.inStock,
            stock_count: newProduct.stockCount,
            rating: newProduct.rating,
            colors: newProduct.colors || [],
            is_featured: newProduct.isFeatured || false,
            is_best_seller: newProduct.isBestSeller || false,
            is_new_arrival: newProduct.isNewArrival || false,
          },
        ]);
      } catch (err) {
        console.warn('Failed to insert product in Supabase:', err);
      }
    }
  };

  const updateProduct = async (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    addToast(`Product "${updated.name}" updated!`);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('products')
          .update({
            name: updated.name,
            category: updated.category,
            price: updated.price,
            unit: updated.unit,
            description: updated.description,
            image: updated.image,
            in_stock: updated.inStock,
            stock_count: updated.stockCount,
            colors: updated.colors,
            is_featured: updated.isFeatured,
            is_best_seller: updated.isBestSeller,
            is_new_arrival: updated.isNewArrival,
          })
          .eq('id', updated.id);
      } catch (err) {
        console.warn('Failed to update product in Supabase:', err);
      }
    }
  };

  const deleteProduct = async (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    addToast('Product removed from catalog', 'warning');

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('products').delete().eq('id', productId);
      } catch (err) {
        console.warn('Failed to delete product in Supabase:', err);
      }
    }
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        currentPage,
        selectedProduct,
        quickViewProduct,
        cartDrawerOpen,
        toasts,
        searchQuery,
        selectedCategory,
        priceSort,
        promoCode,
        discountPercentage,
        isSupabaseConnected: isSupabaseConfigured,
        isAdminLoggedIn,
        adminLoginModalOpen,
        openAdminLoginModal: () => setAdminLoginModalOpen(true),
        closeAdminLoginModal: () => setAdminLoginModalOpen(false),
        loginAdmin,
        logoutAdmin,
        navigateTo,
        setSearchQuery,
        setSelectedCategory,
        setPriceSort,
        setQuickViewProduct,
        toggleCartDrawer: () => setCartDrawerOpen(!cartDrawerOpen),
        openCartDrawer: () => setCartDrawerOpen(true),
        closeCartDrawer: () => setCartDrawerOpen(false),
        addToast,
        dismissToast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromoCode,
        cartTotal,
        cartCount,
        toggleWishlist,
        isWishlisted,
        wishlistCount,
        placeOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
