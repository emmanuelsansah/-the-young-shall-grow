import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, X, Trash2, ArrowRight, MessageCircle } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const {
    cart,
    cartTotal,
    removeFromCart,
    updateQuantity,
    navigateTo,
  } = useShop();

  const handleProceedCheckout = () => {
    onClose();
    navigateTo('cart');
  };

  const handleWhatsAppQuickOrder = () => {
    const itemsList = cart
      .map((i) => `• ${i.product.name} (Qty: ${i.quantity}) - GH₵ ${(i.product.price * i.quantity).toLocaleString()}`)
      .join('\n');

    const message = encodeURIComponent(
      `Hello THE YOUNG SHALL GROW,\nI would like to order my cart items:\n\n${itemsList}\n\n*Cart Total:* GH₵ ${cartTotal.toLocaleString()}\n\nPlease confirm availability and delivery details to my address in Ghana.`
    );

    window.open(`https://wa.me/233241890996?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-600" />
              <h2 className="font-bold text-base text-slate-900 dark:text-white">
                Your Shopping Cart ({cart.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3 text-slate-400">
                <ShoppingBag className="w-12 h-12 stroke-1 mx-auto text-slate-300 dark:text-slate-700" />
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Your cart is empty</p>
                <p className="text-xs text-slate-400">Add African fabrics, sewing supplies, or Ecolac bags to get started.</p>
                <button
                  onClick={() => {
                    onClose();
                    navigateTo('shop');
                  }}
                  className="mt-2 px-4 py-2 bg-red-600 text-white font-bold rounded-xl text-xs"
                >
                  Browse Store Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between gap-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-cover rounded-lg bg-slate-200 dark:bg-slate-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-[11px] text-slate-500 font-mono">
                      GH₵ {item.product.price.toLocaleString()} x {item.quantity}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden bg-white dark:bg-slate-900">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-1.5 py-0.5 text-xs font-bold hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="px-2 text-[11px] font-bold font-mono">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-1.5 py-0.5 text-xs font-bold hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-500">Cart Subtotal:</span>
                <span className="text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                  GH₵ {cartTotal.toLocaleString()}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleWhatsAppQuickOrder}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Quick Order via WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
