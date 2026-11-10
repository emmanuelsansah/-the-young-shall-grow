import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, MessageCircle, X, Check, Heart, MapPin, Truck } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const { addToCart, toggleWishlist, isWishlisted, navigateTo } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || 'Default');

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
  };

  const handleWhatsAppOrder = () => {
    const msg = encodeURIComponent(
      `Hello THE YOUNG SHALL GROW,\nI would like to order:\n\n*Product:* ${product.name}\n*Quantity:* ${quantity} ${product.unit || 'piece'}\n*Color/Variant:* ${selectedColor}\n*Price:* GH₵ ${(product.price * quantity).toLocaleString()}\n\nPlease confirm availability and delivery details to my town in Ghana.`
    );
    window.open(`https://wa.me/233241890996?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left: Image */}
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 relative">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${
                wishlisted
                  ? 'bg-rose-600 text-white'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-200 hover:text-rose-600'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Right: Details & Purchase */}
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                {product.category}
              </span>
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white leading-tight">
                {product.name}
              </h2>
            </div>

            <div className="flex items-baseline justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">Unit Price:</span>
              <span className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                GH₵ {product.price.toLocaleString()}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Color / Variant:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all ${
                        selectedColor === c
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 font-bold'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Quantity:</label>
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 text-xs"
                >
                  -
                </button>
                <span className="px-3 text-xs font-mono font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 text-xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart (GH₵ {(product.price * quantity).toLocaleString()})
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Order Now via WhatsApp
              </button>
            </div>

            <div className="text-center pt-1">
              <button
                onClick={() => {
                  onClose();
                  navigateTo('product-detail', product);
                }}
                className="text-[11px] font-bold text-red-600 hover:underline"
              >
                View Full Product Specs Page →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
