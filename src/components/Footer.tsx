import React from 'react';
import { useShop } from '../context/ShopContext';
import { Category } from '../types';
import { MapPin, Phone, MessageCircle, Truck, ShieldCheck, Award, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedCategory, isAdminLoggedIn, openAdminLoginModal } = useShop();

  const handleCatClick = (cat: Category) => {
    setSelectedCategory(cat);
    navigateTo('shop');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Value Proposition Highlights Bar */}
      <div className="border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Quality Guarantee</h4>
              <p className="text-xs text-slate-400">Authentic Ghanaian & imported materials</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Affordable Pricing</h4>
              <p className="text-xs text-slate-400">Where Quality Meets Affordability</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Nationwide Delivery</h4>
              <p className="text-xs text-slate-400">Fast shipping across all Ghana regions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-500 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">WhatsApp Ordering</h4>
              <p className="text-xs text-slate-400">Direct order confirmation & support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-extrabold flex items-center justify-center text-sm">
              YSG
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              THE YOUNG SHALL GROW
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            "Where Quality Meets Affordability. Your Comfort, Our Promise."
            <br />
            Your trusted destination for Ankara fabrics, handwoven Kente, tailor sewing materials, Ecolac travel bags, gas cylinders, and household essentials in Tarkwa (Pepesa), Ghana.
          </p>

          <div className="space-y-2 pt-2 text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>Location: Tarkwa (Pepesa), Western Region, Ghana</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Contacts: 0241890996 / 0243276094</span>
            </div>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                Home Page
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                Shop Product Catalog
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                About Our Store
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                Contact & Location
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('cart')} className="hover:text-white transition-colors">
                Shopping Cart
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Categories */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">Top Categories</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => handleCatClick('Ankara Fabrics')} className="hover:text-white transition-colors">
                Ankara Fabrics
              </button>
            </li>
            <li>
              <button onClick={() => handleCatClick('Kente Fabrics')} className="hover:text-white transition-colors">
                Kente Fabrics
              </button>
            </li>
            <li>
              <button onClick={() => handleCatClick("Men's Fabrics")} className="hover:text-white transition-colors">
                Men's Suit Fabrics
              </button>
            </li>
            <li>
              <button onClick={() => handleCatClick('Sewing Materials')} className="hover:text-white transition-colors">
                Tailor Sewing Supplies
              </button>
            </li>
            <li>
              <button onClick={() => handleCatClick('Ecolac Bags')} className="hover:text-white transition-colors">
                Ecolac Luggage & Bags
              </button>
            </li>
            <li>
              <button onClick={() => handleCatClick('Gas Cylinders')} className="hover:text-white transition-colors">
                LPG Gas Cylinders
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Direct Order Buttons */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider">Quick Order</h4>
          <p className="text-slate-400 text-xs">
            Connect directly with our sales team via WhatsApp for custom fabric bulk orders or local delivery inquiries:
          </p>
          <div className="space-y-2">
            <a
              href="https://wa.me/233241890996?text=Hi%20THE%20YOUNG%20SHALL%20GROW,%20I%20want%20to%20order"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp 0241890996
            </a>
            <a
              href="https://wa.me/233243276094?text=Hi%20THE%20YOUNG%20SHALL%20GROW,%20I%20want%20to%20order"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-3 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp 0243276094
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright with discreet Admin login trigger */}
      <div className="border-t border-slate-800 py-6 px-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
        <span>© {new Date().getFullYear()} THE YOUNG SHALL GROW — Tarkwa (Pepesa), Ghana. All Rights Reserved.</span>
        
        {/* Discreet Manager Portal Trigger */}
        <button
          onClick={() => {
            if (isAdminLoggedIn) {
              navigateTo('admin');
            } else {
              openAdminLoginModal();
            }
          }}
          className="text-[11px] text-slate-600 hover:text-slate-400 flex items-center gap-1 transition-colors"
          title="Manager Access"
        >
          <Lock className="w-3 h-3 text-slate-600 hover:text-slate-400" />
          <span>{isAdminLoggedIn ? 'Admin Dashboard (Active)' : 'Store Portal'}</span>
        </button>
      </div>
    </footer>
  );
};
