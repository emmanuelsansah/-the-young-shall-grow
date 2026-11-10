import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Lock, KeyRound, X, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { loginAdmin } = useShop();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    const success = loginAdmin(password);
    if (!success) {
      setError(true);
    } else {
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-sm w-full p-6 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            Store Manager Access
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter store authorization password to access THE YOUNG SHALL GROW dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Admin Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password..."
                className={`w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none transition-colors ${
                  error
                    ? 'border-red-500 focus:ring-2 focus:ring-red-500 text-red-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-300'
                }`}
              />
            </div>
            {error && (
              <p className="text-[11px] text-red-600 font-semibold flex items-center gap-1 pt-1">
                <AlertCircle className="w-3.5 h-3.5" /> Incorrect password. Please try again.
              </p>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-bold rounded-xl transition-all shadow-md"
            >
              Authorize & Enter
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
