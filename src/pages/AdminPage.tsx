import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BreadcrumbNav } from '../components/BreadcrumbNav';
import { Product, Category } from '../types';
import { Plus, Edit2, Trash2, Package, ShoppingCart, Search, X, Database, KeyRound, Lock } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export const AdminPage: React.FC = () => {
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    navigateTo,
  } = useShop();

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Category>('Ankara Fabrics');
  const [formPrice, setFormPrice] = useState('');
  const [formUnit, setFormUnit] = useState('6 yards');
  const [formStock, setFormStock] = useState('30');
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('/src/assets/images/product_ankara_wax_1794342370831.jpg');

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

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('Ankara Fabrics');
    setFormPrice('200');
    setFormUnit('6 yards');
    setFormStock('30');
    setFormDesc('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormPrice(p.price.toString());
    setFormUnit(p.unit || 'piece');
    setFormStock(p.stockCount.toString());
    setFormDesc(p.description);
    setFormImage(p.image);
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPrice) return;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: formName,
        category: formCategory,
        price: parseFloat(formPrice) || 0,
        unit: formUnit,
        stockCount: parseInt(formStock) || 10,
        inStock: parseInt(formStock) > 0,
        description: formDesc,
        image: formImage,
      });
    } else {
      addProduct({
        name: formName,
        category: formCategory,
        price: parseFloat(formPrice) || 0,
        unit: formUnit,
        stockCount: parseInt(formStock) || 10,
        inStock: parseInt(formStock) > 0,
        description: formDesc,
        image: formImage,
        rating: 5.0,
      });
    }

    setIsAddModalOpen(false);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  // If not authenticated, require password younggrow
  if (!isAdminLoggedIn) {
    return (
      <div>
        <BreadcrumbNav currentPageTitle="Store Manager Login" />
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl text-center">
            <div className="w-14 h-14 bg-red-50 dark:bg-red-950/40 text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <KeyRound className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                Admin Authentication
              </h2>
              <p className="text-xs text-slate-500">
                Please enter the store authorization password to access inventory and orders.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAuthError(false);
                const ok = loginAdmin(passwordInput);
                if (!ok) setAuthError(true);
              }}
              className="space-y-4 text-left"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Manager Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    autoFocus
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setAuthError(false);
                    }}
                    placeholder="Enter password..."
                    className={`w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none transition-colors ${
                      authError
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500 text-red-600'
                        : 'border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-300'
                    }`}
                  />
                </div>
                {authError && (
                  <p className="text-[11px] text-red-600 font-semibold pt-1">
                    Incorrect password. Please verify and try again.
                  </p>
                )}
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Verify & Open Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl transition-colors"
                >
                  Return to Home Page
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BreadcrumbNav currentPageTitle="Store Admin Panel" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-8">
        {/* Admin Title & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white flex items-center gap-2">
              THE YOUNG SHALL GROW — Store Admin Panel
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage your product inventory, set prices in GH₵, and process incoming customer orders.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'products'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Package className="w-4 h-4" /> Inventory Catalog ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'orders'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <ShoppingCart className="w-4 h-4" /> Customer Orders ({orders.length})
            </button>
            <button
              onClick={logoutAdmin}
              className="px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors flex items-center gap-1"
              title="Lock Admin Dashboard"
            >
              <Lock className="w-3.5 h-3.5" /> Log Out
            </button>
          </div>
        </div>

        {/* Supabase Status Banner */}
        <div className="p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-3.5 h-3.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50 animate-pulse' : 'bg-amber-500'}`} />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Supabase Database Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  Connected to Project (vctjxlncglyisbqlidon)
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Target URL: <code className="font-mono text-slate-800 dark:text-slate-200">https://vctjxlncglyisbqlidon.supabase.co</code> · Realtime synchronization ready for Products and Orders.
              </p>
            </div>
          </div>
          <a
            href="https://supabase.com/dashboard/project/vctjxlncglyisbqlidon/editor"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" /> Open Supabase Tables
          </a>
        </div>

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search catalog products..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none"
                />
              </div>

              <button
                onClick={handleOpenAdd}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" /> Add New Product
              </button>
            </div>

            {/* Product Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Product</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Price (GH₵)</th>
                      <th className="p-3.5">Stock</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="p-3.5 flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-cover rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{p.name}</div>
                            <div className="text-[10px] text-slate-400">{p.unit || 'unit'}</div>
                          </div>
                        </td>
                        <td className="p-3.5 font-medium">{p.category}</td>
                        <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                          GH₵ {p.price.toLocaleString()}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              p.inStock
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                            }`}
                          >
                            {p.inStock ? `${p.stockCount} in stock` : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors"
                            title="Edit product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/40 rounded-lg transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Incoming Orders History ({orders.length})
            </h3>

            {orders.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-400">
                No customer orders received yet. Orders placed on the checkout page will appear here.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                          Order #{order.id}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {new Date(order.createdAt).toLocaleString()}
                        </div>
                      </div>

                      {/* Status dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className="px-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
                      <div>
                        <strong>Customer:</strong> {order.customerName}
                        <br />
                        <strong>Phone:</strong> {order.phone}
                      </div>
                      <div>
                        <strong>Delivery Town:</strong> {order.deliveryTown}
                        <br />
                        <strong>Region:</strong> {order.region}
                      </div>
                      <div>
                        <strong>Payment Method:</strong> {order.paymentMethod}
                        <br />
                        <strong>Total Amount:</strong> <span className="font-mono font-bold text-slate-900 dark:text-white">GH₵ {order.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Order items preview */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1 text-xs">
                      <div className="font-bold text-slate-700 dark:text-slate-300 mb-1">Items Ordered:</div>
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-slate-600 dark:text-slate-400">
                          <span>• {item.product.name} (Qty: {item.quantity})</span>
                          <span className="font-mono">GH₵ {(item.product.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add / Edit Product Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <form
              onSubmit={handleSaveProduct}
              className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl animate-in fade-in"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {editingProduct ? 'Edit Catalog Product' : 'Add New Catalog Product'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Royal Kente Fabric 6 Yards"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Price in GH₵ *
                  </label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="250"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Unit Measurement
                  </label>
                  <input
                    type="text"
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    placeholder="6 yards / per kit"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Stock Count
                  </label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Product specifications, fabric weight, origin..."
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
