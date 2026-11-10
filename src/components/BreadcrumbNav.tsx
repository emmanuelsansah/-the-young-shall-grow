import React from 'react';
import { useShop } from '../context/ShopContext';
import { Home, ShoppingBag, Info, Phone, ChevronRight, UserCheck } from 'lucide-react';

interface BreadcrumbNavProps {
  currentPageTitle: string;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ currentPageTitle }) => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6 lg:px-8 mb-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        {/* Breadcrumb Path */}
        <div className="flex items-center gap-2 font-medium text-slate-500 dark:text-slate-400">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-red-600 transition-colors flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200"
          >
            <Home className="w-3.5 h-3.5" /> Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-white">{currentPageTitle}</span>
        </div>

        {/* Quick Jump Action Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => navigateTo('home')}
            className="px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-red-600 hover:text-white text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 transition-all shrink-0 flex items-center gap-1"
          >
            <Home className="w-3 h-3" /> Home Page
          </button>
          <button
            onClick={() => navigateTo('shop')}
            className="px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-red-600 hover:text-white text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 transition-all shrink-0 flex items-center gap-1"
          >
            <ShoppingBag className="w-3 h-3" /> Shop Catalog
          </button>
          <button
            onClick={() => navigateTo('about')}
            className="px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-red-600 hover:text-white text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 transition-all shrink-0 flex items-center gap-1"
          >
            <Info className="w-3 h-3" /> About Us
          </button>
          <button
            onClick={() => navigateTo('contact')}
            className="px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-red-600 hover:text-white text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 transition-all shrink-0 flex items-center gap-1"
          >
            <Phone className="w-3 h-3" /> Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};
