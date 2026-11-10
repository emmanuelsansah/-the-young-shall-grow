import React from 'react';
import { useShop } from '../context/ShopContext';
import { BreadcrumbNav } from '../components/BreadcrumbNav';
import { Award, ShieldCheck, HeartHandshake, Truck, MessageCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div>
      <BreadcrumbNav currentPageTitle="About Us" />

      <div className="space-y-16 pb-16">
        {/* Hero Banner */}
        <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400">
              About Our Business
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl">
              THE YOUNG SHALL GROW
            </h1>
            <p className="text-lg text-slate-300 italic max-w-2xl font-light">
              "Where Quality Meets Affordability. Your Comfort, Our Promise."
            </p>
          </div>
        </section>

        {/* Main Story & Values */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Rooted in Tarkwa (Pepesa), Serving All of Ghana
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Founded with a passion for high-grade African textiles and everyday household quality, <strong>THE YOUNG SHALL GROW</strong> has grown into Tarkwa Pepesa’s premier retail store for authentic GTP Ankara wax prints, handwoven Bonwire Kente cloth, master tailoring accessories, Ecolac travel luggage, and household gas cylinders.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              We believe that premium quality fabric should never be a luxury reserved only for a few. Whether you are a master tailor sewing bespoke suits for a traditional Ghanaian ceremony, a fashion designer crafting modern collections, or a family purchasing reliable household equipment, we promise uncompromising standards at prices that fit your budget.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('shop')}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                Explore Shop Products
              </button>
              <button
                onClick={() => navigateTo('home')}
                className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                Return to Home Page
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800">
              <img
                src="/src/assets/images/hero_african_fabrics_1794342370468.jpg"
                alt="THE YOUNG SHALL GROW Store Showcase"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-slate-100 dark:bg-slate-900/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                Our Core Promises
              </h2>
              <p className="text-sm text-slate-500">
                The foundation of customer trust across the Western Region and Ghana.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
                <Award className="w-8 h-8 text-red-600" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Unmatched Authenticity</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We only stock genuine GTP wax prints, authentic Bonwire Kente, certified original Ecolac luggage, and safety-tested LPG gas cylinders.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
                <ShieldCheck className="w-8 h-8 text-amber-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Fair & Honest Pricing</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Direct relationships with manufacturers allow us to offer competitive wholesale and retail prices in GH₵ without hidden markups.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
                <Truck className="w-8 h-8 text-emerald-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Prompt Delivery Nationwide</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We ensure your fabrics, sewing supplies, or luggage are packaged securely and dispatched quickly to any city or town in Ghana.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
