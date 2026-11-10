import React, { useState } from 'react';
import { BreadcrumbNav } from '../components/BreadcrumbNav';
import { MapPin, Phone, MessageCircle, Send, CheckCircle2, Clock, Truck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div>
      <BreadcrumbNav currentPageTitle="Contact & Location" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-12">
        <div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
            Contact & Location Details
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            We would love to hear from you. Visit our store in Tarkwa (Pepesa) or reach out directly on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Business Information
              </h3>

              <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white text-sm">Store Address:</strong>
                    Tarkwa (Pepesa), Western Region, Ghana
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white text-sm">Customer Phone Numbers:</strong>
                    <div className="font-mono text-sm mt-0.5">0241890996 / 0243276094</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white text-sm">Operating Hours:</strong>
                    Monday – Saturday: 7:30 AM – 6:30 PM
                    <br />
                    Sunday: Closed (WhatsApp orders processed next day)
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white text-sm">Delivery Scope:</strong>
                    Nationwide shipping across all 16 regions of Ghana.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white">Direct WhatsApp Channels:</div>
                <a
                  href="https://wa.me/233241890996?text=Hi%20THE%20YOUNG%20SHALL%20GROW,%20I%20have%20an%20inquiry"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-between transition-colors shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Message Line 1
                  </span>
                  <span className="font-mono">0241890996</span>
                </a>
                <a
                  href="https://wa.me/233243276094?text=Hi%20THE%20YOUNG%20SHALL%20GROW,%20I%20have%20an%20inquiry"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center justify-between transition-colors shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Message Line 2
                  </span>
                  <span className="font-mono">0243276094</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Contact Form Column */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 lg:p-8 space-y-4 shadow-sm"
            >
              <h3 className="font-bold text-base text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                Send Us a Message
              </h3>

              {submitted && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Thank you! Your message has been sent to THE YOUNG SHALL GROW team. We will respond shortly via phone or WhatsApp.
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Master Tailor Kojo"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone / WhatsApp Number *
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
                  Your Inquiry or Order Request *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Specify the fabrics, tailoring materials, Ecolac bags, or gas cylinders you wish to inquire about..."
                  className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
