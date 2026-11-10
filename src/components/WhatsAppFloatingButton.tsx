import React, { useState } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-3 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 space-y-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                YSG
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">WhatsApp Ordering</h4>
                <p className="text-[10px] text-emerald-600 font-semibold">Tarkwa (Pepesa), Ghana</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Need quick order assistance, fabric recommendations, or delivery details? Chat directly with us:
          </p>

          <div className="space-y-2">
            <a
              href="https://wa.me/233241890996?text=Hi%20THE%20YOUNG%20SHALL%20GROW,%20I%20would%20like%20to%20order"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-between transition-colors shadow-sm"
            >
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" /> Order Line 1
              </span>
              <span className="font-mono text-[11px]">0241890996</span>
            </a>
            <a
              href="https://wa.me/233243276094?text=Hi%20THE%20YOUNG%20SHALL%20GROW,%20I%20would%20like%20to%20order"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 px-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center justify-between transition-colors shadow-sm"
            >
              <span className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" /> Order Line 2
              </span>
              <span className="font-mono text-[11px]">0243276094</span>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-ping" />
      </button>
    </div>
  );
};
