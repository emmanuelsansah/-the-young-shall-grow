import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Category } from '../types';
import {
  Home,
  ShoppingBag,
  UserCheck,
  Phone,
  MessageCircle,
  Menu,
  X,
  MapPin,
  ChevronDown,
  Search,
  Heart,
  Info,
  Tag,
  Lock
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    cartCount,
    wishlistCount,
    openCartDrawer,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    isAdminLoggedIn,
    openAdminLoginModal,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const categories: Category[] = [
    'Ankara Fabrics',
    'Kente Fabrics',
    'Lining Materials',
    'Sewing Materials',
    "Men's Fabrics",
    "Women's Fabrics",
    'Corporate and Occasional Outfit Materials',
    'Ecolac Bags',
    'Gas Cylinders',
    'Other Available Products',
  ];

  const handleCategoryClick = (cat: Category) => {
    setSelectedCategory(cat);
    setCategoriesDropdownOpen(false);
    setMobileMenuOpen(false);
    navigateTo('shop');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('shop');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-md transition-colors">
      {/* Top Contact & Location Strip */}
      <div className="bg-red-700 text-white text-xs py-1.5 px-4 font-medium flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-300" /> Tarkwa (Pepesa), Ghana
          </span>
          <a
            href="tel:0241890996"
            className="hidden sm:flex items-center gap-1 hover:underline font-mono"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-300" /> Call: 0241890996 / 0243276094
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline font-mono font-bold text-amber-200">GH₵ (Ghana Cedis)</span>
          <a
            href="https://wa.me/233241890996?text=Hi%20THE%20YOUNG%20SHALL%20GROW,%20I%20want%20to%20order"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-colors shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Order
          </a>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo Button */}
        <button
          onClick={() => navigateTo('home')}
          className="text-left flex items-center gap-2.5 shrink-0 group"
          title="Return to Home Page"
        >
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white font-extrabold flex items-center justify-center text-base shadow-sm group-hover:scale-105 transition-transform">
            YSG
          </div>
          <div>
            <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white block leading-none">
              THE YOUNG SHALL GROW
            </span>
            <span className="text-[10px] font-bold text-red-600 dark:text-red-400 block tracking-wide mt-0.5">
              Where Quality Meets Affordability
            </span>
          </div>
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fabrics, Ecolac, gas..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-red-600 outline-none"
          />
        </form>

        {/* Primary Page Buttons */}
        <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold">
          {/* HOME BUTTON */}
          <button
            onClick={() => navigateTo('home')}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              currentPage === 'home'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Home className="w-4 h-4" /> Home
          </button>

          {/* SHOP BUTTON */}
          <button
            onClick={() => navigateTo('shop')}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              currentPage === 'shop'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Shop Catalog
          </button>

          {/* CATEGORIES BUTTON DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              className="px-3 py-2 rounded-xl flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <Tag className="w-4 h-4" /> Categories <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {categoriesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-red-600 transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ABOUT US BUTTON */}
          <button
            onClick={() => navigateTo('about')}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              currentPage === 'about'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Info className="w-4 h-4" /> About Us
          </button>

          {/* CONTACT BUTTON */}
          <button
            onClick={() => navigateTo('contact')}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
              currentPage === 'contact'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Phone className="w-4 h-4" /> Contact Us
          </button>
        </nav>

        {/* Action Buttons: Cart, Wishlist, Admin */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Wishlist Button */}
          <button
            onClick={() => navigateTo('shop')}
            className="relative p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:flex items-center gap-1"
            title="Saved Wishlist Items"
          >
            <Heart className="w-5 h-5 text-slate-800 dark:text-slate-200" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={openCartDrawer}
            className="relative px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 transition-colors flex items-center gap-1.5 shadow-xs"
            title="View Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-red-600" />
            <span className="text-xs font-bold">Cart</span>
            {cartCount > 0 && (
              <span className="bg-red-600 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full animate-pulse ml-0.5">
                {cartCount}
              </span>
            )}
          </button>

          {/* Discreet Admin Portal Button in Top Bar */}
          <button
            onClick={() => {
              if (isAdminLoggedIn) {
                navigateTo('admin');
              } else {
                openAdminLoginModal();
              }
            }}
            className={`px-2.5 py-2 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors border ${
              isAdminLoggedIn
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:text-slate-900'
            }`}
            title={isAdminLoggedIn ? 'Open Admin Dashboard' : 'Store Manager Login'}
          >
            {isAdminLoggedIn ? (
              <>
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Admin</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-slate-500 hover:text-slate-900" />
                <span className="hidden sm:inline text-[11px]">Admin</span>
              </>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer with Explicit Navigation Buttons */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 rounded-xl outline-none"
            />
          </form>

          {/* HOME PAGE BUTTON */}
          <button
            onClick={() => {
              navigateTo('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              currentPage === 'home' ? 'bg-red-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
            }`}
          >
            <Home className="w-4 h-4" /> Home Page
          </button>

          {/* SHOP CATALOG BUTTON */}
          <button
            onClick={() => {
              navigateTo('shop');
              setMobileMenuOpen(false);
            }}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              currentPage === 'shop' ? 'bg-red-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Shop Product Catalog
          </button>

          {/* ABOUT US BUTTON */}
          <button
            onClick={() => {
              navigateTo('about');
              setMobileMenuOpen(false);
            }}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              currentPage === 'about' ? 'bg-red-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
            }`}
          >
            <Info className="w-4 h-4" /> About Us Page
          </button>

          {/* CONTACT BUTTON */}
          <button
            onClick={() => {
              navigateTo('contact');
              setMobileMenuOpen(false);
            }}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
              currentPage === 'contact' ? 'bg-red-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
            }`}
          >
            <Phone className="w-4 h-4" /> Contact Us Page
          </button>

          {/* CATEGORIES BUTTONS LIST */}
          <div className="pl-3 py-2 space-y-1.5 border-l-2 border-red-500">
            <span className="text-xs font-extrabold uppercase text-slate-400 block mb-1">Product Categories</span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => handleCategoryClick(c)}
                className="block w-full text-left text-xs text-slate-600 dark:text-slate-400 py-1 hover:text-red-600"
              >
                • {c}
              </button>
            ))}
          </div>

          {/* ADMIN DASHBOARD BUTTON - Hidden unless logged in */}
          {isAdminLoggedIn && (
            <button
              onClick={() => {
                navigateTo('admin');
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-between border transition-all ${
                currentPage === 'admin' ? 'bg-slate-900 text-white' : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border-emerald-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" /> Admin Dashboard (Authorized)
              </span>
              <span className="text-[10px] text-emerald-600 uppercase font-mono">Store Manager</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
