import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, MessageCircle, Eye, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, navigateTo, setQuickViewProduct, toggleWishlist, isWishlisted } = useShop();

  const wishlisted = isWishlisted(product.id);

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = encodeURIComponent(
      `Hello THE YOUNG SHALL GROW,\nI would like to order:\n\n*Product:* ${product.name}\n*Price:* GH₵ ${product.price.toLocaleString()} (${product.unit || 'piece'})\n\nPlease confirm availability and delivery details to my address in Ghana.`
    );
    window.open(`https://wa.me/233241890996?text=${message}`, '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={() => navigateTo('product-detail', product)}
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Status badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-2 right-2 z-10 p-2 rounded-full shadow-md transition-all ${
            wishlisted
              ? 'bg-rose-600 text-white'
              : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-200 hover:text-rose-600 hover:bg-white'
          }`}
          title={wishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View overlay hover action */}
        <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={handleQuickView}
            className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md hover:bg-slate-100 transition-all transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata zero-pill clean text */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.unit || 'in stock'}</span>
          </div>

          <h3 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2 group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Price & Actions */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/60">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-400">Price:</span>
            <span className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
              GH₵ {product.price.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-2 px-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Add Cart
            </button>
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-2 px-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
