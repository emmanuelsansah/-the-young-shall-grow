import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';
import { ShoppingBag, Trash2, ArrowRight, MessageCircle, CheckCircle2, Tag, Printer, Download, Phone } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
    placeOrder,
    navigateTo,
    applyPromoCode,
    discountPercentage,
  } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [region, setRegion] = useState('Western Region (Tarkwa / Takoradi)');
  const [deliveryTown, setDeliveryTown] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('WhatsApp Order');
  const [inputCoupon, setInputCoupon] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState<Order | null>(null);

  // Ghanaian Regions Delivery Fee Schedule
  const getDeliveryFee = (selectedRegion: string) => {
    if (selectedRegion.includes('Tarkwa')) return 15; // Local Tarkwa Pepesa delivery
    if (selectedRegion.includes('Western')) return 25;
    if (selectedRegion.includes('Greater Accra')) return 35;
    if (selectedRegion.includes('Ashanti')) return 30;
    return 40; // Other regions across Ghana
  };

  const deliveryFee = cart.length > 0 ? getDeliveryFee(region) : 0;
  const grandTotal = cartTotal + deliveryFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon) return;
    applyPromoCode(inputCoupon);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !deliveryTown) {
      alert('Please fill in your Name, Contact Phone, and Delivery Town.');
      return;
    }

    const createdOrder = await placeOrder({
      customerName,
      phone,
      whatsappPhone: whatsappPhone || phone,
      deliveryTown,
      region,
      streetAddress,
      items: cart,
      subtotal: cartTotal,
      discount: discountPercentage,
      deliveryFee,
      totalAmount: grandTotal,
      paymentMethod,
    });

    setOrderConfirmed(createdOrder);
  };

  const handleWhatsAppSendOrder = (order: Order) => {
    const itemsList = order.items
      .map((i) => `• ${i.product.name} (Qty: ${i.quantity}) - GH₵ ${(i.product.price * i.quantity).toLocaleString()}`)
      .join('\n');

    const message = encodeURIComponent(
      `*NEW ORDER RECEIVED - THE YOUNG SHALL GROW*\n\n` +
        `*Order ID:* ${order.id}\n` +
        `*Customer Name:* ${order.customerName}\n` +
        `*Phone:* ${order.phone}\n` +
        `*Delivery Location:* ${order.deliveryTown}, ${order.region}\n` +
        `*Street Address:* ${order.streetAddress || 'N/A'}\n` +
        `*Payment Method:* ${order.paymentMethod}\n\n` +
        `*ORDER ITEMS:*\n${itemsList}\n\n` +
        `*Subtotal:* GH₵ ${order.subtotal.toLocaleString()}\n` +
        `*Delivery Fee:* GH₵ ${order.deliveryFee.toLocaleString()}\n` +
        `*GRAND TOTAL:* GH₵ ${order.totalAmount.toLocaleString()}\n\n` +
        `Please confirm my order and send payment details for dispatch!`
    );

    window.open(`https://wa.me/233241890996?text=${message}`, '_blank');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 print:py-0 print:px-0">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-sm print:hidden">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="font-display font-bold text-3xl text-slate-900 dark:text-white">
            Order Submitted Successfully!
          </h1>
          <p className="text-xs text-slate-500">
            Order ID: <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{orderConfirmed.id}</span>
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-left space-y-4 shadow-sm">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="font-display font-bold text-lg text-red-600">THE YOUNG SHALL GROW</div>
              <div className="text-[10px] text-slate-400">Tarkwa (Pepesa), Ghana · 0241890996 / 0243276094</div>
            </div>
            <button
              onClick={handlePrintReceipt}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-bold rounded-lg flex items-center gap-1 print:hidden"
            >
              <Printer className="w-3.5 h-3.5" /> Print Receipt
            </button>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <div><strong>Customer Name:</strong> {orderConfirmed.customerName}</div>
            <div><strong>Contact Phone:</strong> {orderConfirmed.phone}</div>
            <div><strong>Delivery Address:</strong> {orderConfirmed.deliveryTown}, {orderConfirmed.region}</div>
            <div><strong>Payment Choice:</strong> {orderConfirmed.paymentMethod}</div>
          </div>

          <div className="space-y-1 pt-2">
            {orderConfirmed.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs py-1 border-b border-slate-50 dark:border-slate-800/40">
                <span>{item.product.name} (x{item.quantity})</span>
                <span className="font-mono font-bold">GH₵ {(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Items Subtotal:</span>
              <span className="font-mono">GH₵ {orderConfirmed.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className="font-mono">GH₵ {orderConfirmed.deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
              <span>Total Amount:</span>
              <span className="font-mono text-red-600">GH₵ {orderConfirmed.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 print:hidden">
          <button
            onClick={() => handleWhatsAppSendOrder(orderConfirmed)}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors text-xs"
          >
            <MessageCircle className="w-4 h-4" /> Send Order via WhatsApp (0241890996)
          </button>
          <button
            onClick={() => {
              setOrderConfirmed(null);
              navigateTo('shop');
            }}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Explore our collection of Ankara fabrics, handwoven Kente, tailor accessories, Ecolac bags, and LPG gas cylinders.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
        >
          Explore Product Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
          Shopping Cart & Checkout
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review your items, apply promotional discount codes, and complete your order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Cart Items ({cart.length})
            </span>
            <button
              onClick={clearCart}
              className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Cart
            </button>
          </div>

          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-xl bg-slate-100 dark:bg-slate-800"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                      {item.product.name}
                    </h4>
                    <div className="text-xs text-slate-500 mt-0.5">
                      GH₵ {item.product.price.toLocaleString()} per {item.product.unit || 'unit'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-2 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-mono font-bold tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-2 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-xs"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-20">
                    <div className="text-sm font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                      GH₵ {(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Promo Code Coupon Box */}
          <form onSubmit={handleApplyCoupon} className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl flex items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={inputCoupon}
              onChange={(e) => setInputCoupon(e.target.value)}
              placeholder="Have a coupon code? (Try TYSG10)"
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs rounded-xl outline-none uppercase font-mono"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs rounded-xl"
            >
              Apply
            </button>
          </form>
        </div>

        {/* Right Column: Checkout Form & Total Calculation */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleCheckoutSubmit}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm"
          >
            <h3 className="font-bold text-base text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Customer Details & Ghana Delivery
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Customer Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Ama Serwaa"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 0241890996"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  placeholder="e.g. 0243276094"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Select Region in Ghana *
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 outline-none"
              >
                <option value="Western Region (Tarkwa / Takoradi)">Western Region (Tarkwa Pepesa / Takoradi)</option>
                <option value="Greater Accra Region (Accra / Tema)">Greater Accra Region (Accra / Tema)</option>
                <option value="Ashanti Region (Kumasi)">Ashanti Region (Kumasi)</option>
                <option value="Central Region (Cape Coast)">Central Region (Cape Coast)</option>
                <option value="Eastern Region (Koforidua)">Eastern Region (Koforidua)</option>
                <option value="Northern Region (Tamale)">Northern Region (Tamale)</option>
                <option value="Bono / Ahafo Region (Sunyani)">Bono / Ahafo Region (Sunyani)</option>
                <option value="Volta Region (Ho)">Volta Region (Ho)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Town / City *
              </label>
              <input
                type="text"
                required
                value={deliveryTown}
                onChange={(e) => setDeliveryTown(e.target.value)}
                placeholder="e.g. Tarkwa Pepesa, Accra Central, Kumasi Adum..."
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Preferred Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 outline-none"
              >
                <option value="WhatsApp Order">WhatsApp Order Confirmation</option>
                <option value="MTN Mobile Money">MTN Mobile Money (MoMo - 0241890996)</option>
                <option value="Telecel Cash">Telecel Cash / AT Money (0243276094)</option>
                <option value="Pay on Delivery">Pay on Delivery (Tarkwa Pepesa)</option>
              </select>
            </div>

            {/* Price Calculations */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Items Subtotal:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">GH₵ {cartTotal.toLocaleString()}</span>
              </div>
              {discountPercentage > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount ({discountPercentage}%):</span>
                  <span className="font-mono">- {discountPercentage}%</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Est. Shipping / Delivery:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">GH₵ {deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Total Amount:</span>
                <span className="font-mono text-red-600 dark:text-red-400">GH₵ {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              Confirm Order & Submit <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
