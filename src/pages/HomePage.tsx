import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Category } from '../types';
import {
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Star
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, navigateTo, setSelectedCategory } = useShop();
  const [activeTab, setActiveTab] = useState<'bestseller' | 'new'>('bestseller');

  const featuredCategories: { name: Category; desc: string; image: string }[] = [
    {
      name: 'Ankara Fabrics',
      desc: 'Authentic 100% cotton GTP & Hitarget Dutch Wax prints',
      image: '/src/assets/images/product_ankara_wax_1794342370831.jpg',
    },
    {
      name: 'Kente Fabrics',
      desc: 'Handwoven royal Bonwire Kente cloth & heritage prints',
      image: '/src/assets/images/product_kente_woven_1794342371018.jpg',
    },
    {
      name: "Men's Fabrics",
      desc: 'Polished cashmerette, wool & senator suit materials',
      image: '/src/assets/images/hero_african_fabrics_1794342370468.jpg',
    },
    {
      name: 'Sewing Materials',
      desc: 'Tailor shears, thread spools, pattern tape & linings',
      image: '/src/assets/images/product_sewing_materials_1794342383514.jpg',
    },
    {
      name: 'Ecolac Bags',
      desc: 'Durable hard-shell luggage sets & executive backpacks',
      image: '/src/assets/images/product_ecolac_bag_1794342383072.jpg',
    },
    {
      name: 'Gas Cylinders',
      desc: '14.5kg & 6kg LPG household gas cylinders with safety valves',
      image: '/src/assets/images/product_gas_cylinder_1794342382917.jpg',
    },
  ];

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 8);

  const displayedProducts = activeTab === 'bestseller' ? bestSellers : newArrivals;

  const handleCategoryClick = (cat: Category) => {
    setSelectedCategory(cat);
    navigateTo('shop');
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_african_fabrics_1794342370468.jpg"
            alt="African Fabrics Showcase"
            className="w-full h-full object-cover opacity-35 filter brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-red-400" /> Premium Ghanaian Retail Store · Tarkwa (Pepesa)
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
              THE YOUNG SHALL GROW
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 font-light leading-relaxed italic">
              "Where Quality Meets Affordability. Your Comfort, Our Promise."
            </p>

            <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
              Explore authentic Ghanaian Ankara & Kente fabrics, master tailor sewing materials, Ecolac travel luggage, LPG gas cylinders, and daily essentials with nationwide delivery across Ghana.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Shop Catalog Now
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  navigateTo('shop');
                }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur border border-white/20 transition-all flex items-center gap-2"
              >
                Explore All Products <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/233241890996?text=Hi%20THE%20YOUNG%20SHALL%20GROW,%20I%20want%20to%20order"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Featured Product Categories
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Curated materials and household goods for tailors, fashion designers, and families.
            </p>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 shrink-0"
          >
            View All Categories <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCategories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1">
                <h3 className="font-display font-bold text-xl text-white group-hover:text-red-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">{cat.desc}</p>
                <div className="pt-2 flex items-center gap-1 text-xs font-bold text-amber-400">
                  Shop Category <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS & NEW ARRIVALS TABBED CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Trending Products & Collections
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Top rated Ghanaian fabrics, sewing kits, travel bags, and gas cylinders.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('bestseller')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'bestseller'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'new'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="bg-slate-100 dark:bg-slate-900/60 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Why Choose THE YOUNG SHALL GROW?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We take pride in providing quality products at prices every Ghanaian family and business can afford.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 mx-auto flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Affordable Prices</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Direct sourcing ensures you get genuine quality without inflated prices.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Quality Products</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Guaranteed authentic GTP, Kente, Ecolac, and safety-certified gas cylinders.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Reliable Service</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Dedicated customer care via phone (0241890996 / 0243276094) and instant WhatsApp.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 mx-auto flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Nationwide Delivery</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Prompt dispatch across Tarkwa, Accra, Kumasi, Takoradi, and all 16 regions.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Trusted Local Business</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Proudly rooted in Tarkwa (Pepesa), serving thousands of satisfied customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            What Our Customers Say
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real feedback from tailors, fashion designers, and households across Ghana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "As a fashion designer in Tarkwa, I get all my GTP wax prints and lining materials from THE YOUNG SHALL GROW. Their fabric quality is always genuine and prices are unmatched."
            </p>
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">Kwame Mensah</div>
              <div className="text-xs text-slate-400">Master Tailor · Tarkwa Pepesa</div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "Ordered handwoven Bonwire Kente for my traditional marriage. Delivered right to Kumasi via parcel service on time. Excellent customer support over WhatsApp!"
            </p>
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">Abena Osei</div>
              <div className="text-xs text-slate-400">Bride & Customer · Kumasi</div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
              "Bought a set of original Ecolac travel suitcases and a household 14.5kg LPG gas cylinder. Durable quality and very friendly service from Mr. Pepesa."
            </p>
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">Kofi Appiah</div>
              <div className="text-xs text-slate-400">Household Client · Accra</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHATSAPP CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl">
              Ready to Order Fabrics & Household Items?
            </h2>
            <p className="text-sm text-emerald-100 leading-relaxed">
              Call or message us directly on WhatsApp for custom orders, bulk tailoring quotes, or immediate delivery dispatch across Ghana.
            </p>
            <div className="text-xs font-mono font-bold text-amber-300 pt-1">
              Contacts: 0241890996 / 0243276094
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://wa.me/233241890996?text=Hi%20THE%20YOUNG%20SHALL%20GROW,%20I%20want%20to%20order"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white text-emerald-900 font-bold rounded-xl shadow-md hover:bg-emerald-50 transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600" /> WhatsApp 0241890996
            </a>
            <a
              href="https://wa.me/233243276094?text=Hi%20THE%20YOUNG%20SHALL%20GROW,%20I%20want%20to%20order"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-emerald-950 text-white font-bold rounded-xl hover:bg-emerald-900 transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" /> WhatsApp 0243276094
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
