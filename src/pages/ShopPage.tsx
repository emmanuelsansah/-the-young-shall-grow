import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { BreadcrumbNav } from '../components/BreadcrumbNav';
import { Category } from '../types';
import { Search, SlidersHorizontal, ArrowUpDown, X, LayoutGrid, Grid3x3 } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    priceSort,
    setPriceSort,
  } = useShop();

  const [inStockOnly, setInStockOnly] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(4);

  const categories: (Category | 'All')[] = [
    'All',
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

  // Filtering Logic
  let filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = inStockOnly ? p.inStock : true;

    return matchesCategory && matchesSearch && matchesStock;
  });

  // Sorting Logic
  if (priceSort === 'low-to-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (priceSort === 'high-to-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <BreadcrumbNav currentPageTitle="Shop Product Catalog" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-8">
        {/* Title & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Online Product Store
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Browse genuine Ghanaian fabrics, sewing supplies, Ecolac bags, and LPG gas cylinders in GH₵.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fabrics, thread, Ecolac, gas..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-red-600 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Filter Tabs Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Categories & Filtering
            </span>

            {/* Controls: In-Stock Toggle, Sort, Grid View Switch */}
            <div className="flex items-center gap-3">
              {/* In Stock Only Checkbox */}
              <label className="hidden sm:flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                />
                In Stock Only
              </label>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value as any)}
                  className="px-2.5 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 font-medium"
                >
                  <option value="none">Sort: Default</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                </select>
              </div>

              {/* Grid Layout Switcher */}
              <div className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button
                  onClick={() => setGridCols(2)}
                  className={`p-1 rounded ${gridCols === 2 ? 'bg-white dark:bg-slate-900 shadow-xs' : 'text-slate-400'}`}
                  title="2 Columns"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1 rounded ${gridCols === 3 ? 'bg-white dark:bg-slate-900 shadow-xs' : 'text-slate-400'}`}
                  title="3 Columns"
                >
                  <Grid3x3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1 rounded ${gridCols === 4 ? 'bg-white dark:bg-slate-900 shadow-xs' : 'text-slate-400'}`}
                  title="4 Columns"
                >
                  <Grid3x3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Category Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm font-bold'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filter Indicators */}
        {(selectedCategory !== 'All' || searchQuery || inStockOnly) && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>Active Filters:</span>
            {selectedCategory !== 'All' && (
              <span className="bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-bold border border-red-200 dark:border-red-900 flex items-center gap-1">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('All')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded font-bold border border-amber-200 dark:border-amber-900 flex items-center gap-1">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {inStockOnly && (
              <span className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-200 dark:border-emerald-900 flex items-center gap-1">
                In Stock Only
                <button onClick={() => setInStockOnly(false)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-16 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
            <SlidersHorizontal className="w-10 h-10 stroke-1 mx-auto text-slate-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">No products found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or category selection to view our full Tarkwa inventory.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setInStockOnly(false);
              }}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              gridCols === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : gridCols === 3
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
