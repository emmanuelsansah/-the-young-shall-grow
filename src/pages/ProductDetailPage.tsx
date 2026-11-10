import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BreadcrumbNav } from '../components/BreadcrumbNav';
import { ShoppingBag, MessageCircle, ArrowLeft, Check, MapPin, Truck, Home } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { selectedProduct, navigateTo, addToCart } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>(
    selectedProduct?.colors?.[0] || 'Default'
  );

  if (!selectedProduct) {
    return (
      <div>
        <BreadcrumbNav currentPageTitle="Product Details" />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
          <h2 className="text-xl font-bold">No product selected</h2>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Home className="w-4 h-4" /> Return to Home Page
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" /> Browse Shop Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedColor);
  };

  const handleWhatsAppOrder = () => {
    const msg = encodeURIComponent(
      `Hello THE YOUNG SHALL GROW,\nI would like to order:\n\n*Product:* ${selectedProduct.name}\n*Quantity:* ${quantity} ${selectedProduct.unit || 'piece'}\n*Color/Variant:* ${selectedColor}\n*Price:* GH₵ ${(selectedProduct.price * quantity).toLocaleString()}\n\nPlease confirm availability and delivery to my address in Ghana.`
    );
    window.open(`https://wa.me/233241890996?text=${msg}`, '_blank');
  };

  return (
    <div>
      <BreadcrumbNav currentPageTitle={selectedProduct.name} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-8">
        {/* Navigation Action Strip */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Product Catalog
          </button>
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-red-600 transition-colors"
          >
            <Home className="w-4 h-4" /> Go to Home Page
          </button>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-10 shadow-sm">
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedProduct.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedProduct.unit || 'Standard Unit'}</span>
              </div>

              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-tight">
                {selectedProduct.name}
              </h1>
            </div>

            {/* Pricing & Stock */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Price in Ghana Cedis</div>
                <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                  GH₵ {selectedProduct.price.toLocaleString()}
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <Check className="w-3.5 h-3.5" /> In Stock ({selectedProduct.stockCount} available)
                </span>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Product Specifications & Details
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Color Selector */}
            {selectedProduct.colors && selectedProduct.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Select Color / Pattern Variant:
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                        selectedColor === color
                          ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900 font-bold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Order Quantity ({selectedProduct.unit || 'units'}):
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  Total: <span className="font-bold text-slate-900 dark:text-white tabular-nums">GH₵ {(selectedProduct.price * quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" /> Order Now via WhatsApp
              </button>
            </div>

            {/* Location & Trust Notice */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                <MapPin className="w-4 h-4 text-red-500" /> Dispatch Location: Tarkwa (Pepesa), Ghana
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-sky-500" /> Delivery via VIP, STC, or Parcel delivery across all regions of Ghana.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
