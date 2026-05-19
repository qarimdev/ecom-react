import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  User,
  Package,
  Settings,
  Home,
  ChevronDown,
  Cpu,
} from 'lucide-react';
import { PRODUCT_CATEGORIES, categoryToSlug } from '../data/categories';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [productsOpen, setProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;
  const isProductsActive = location.pathname.startsWith('/products');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkClass = (active: boolean) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      active
        ? 'text-cyan-400 bg-slate-800'
        : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60'
    }`;

  return (
    <nav className="bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">
                TechCore
              </span>
              <span className="hidden sm:block text-[10px] text-cyan-400/80 uppercase tracking-widest -mt-0.5">
                IT Solutions
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/" className={navLinkClass(isActive('/'))}>
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProductsOpen(!productsOpen)}
                className={`${navLinkClass(isProductsActive)} w-full`}
                aria-expanded={productsOpen}
                aria-haspopup="true"
              >
                <Package className="w-4 h-4" />
                <span>Products</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {productsOpen && (
                <div className="absolute left-0 mt-1 w-64 rounded-lg border border-slate-700 bg-slate-900 shadow-xl shadow-black/40 py-2 z-50">
                  <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Browse by category
                  </p>
                  {PRODUCT_CATEGORIES.map((category) => (
                    <Link
                      key={category}
                      to={`/products/category/${categoryToSlug(category)}`}
                      onClick={() => setProductsOpen(false)}
                      className="block px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
                    >
                      <span className="font-medium">{category}</span>
                    </Link>
                  ))}
                  <div className="border-t border-slate-700 my-1" />
                  <Link
                    to="/products"
                    onClick={() => setProductsOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-cyan-400 hover:bg-slate-800 transition-colors"
                  >
                    View all products →
                  </Link>
                </div>
              )}
            </div>

            <Link to="/cart" className={navLinkClass(isActive('/cart'))}>
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
            </Link>

            <Link to="/orders" className={navLinkClass(isActive('/orders'))}>
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
            </Link>

            <Link to="/admin" className={navLinkClass(isActive('/admin'))}>
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
