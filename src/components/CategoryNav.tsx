import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  PRODUCT_CATEGORIES,
  categoryMeta,
  categoryToSlug,
} from '../data/categories';
import { mockProducts } from '../data/mockData';
import { Cpu, Plug, Lamp, LayoutGrid, ChevronRight } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  Electronics: <Cpu className="w-5 h-5" />,
  Accessories: <Plug className="w-5 h-5" />,
  Home: <Lamp className="w-5 h-5" />,
};

interface CategoryNavProps {
  variant?: 'cards' | 'pills';
  currentCategory?: string;
}

const CategoryNav: React.FC<CategoryNavProps> = ({
  variant = 'cards',
  currentCategory,
}) => {
  const location = useLocation();
  const isAllActive = location.pathname === '/products';

  if (variant === 'pills') {
    return (
      <div className="flex flex-wrap gap-2">
        <Link
          to="/products"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            isAllActive
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          All
        </Link>
        {PRODUCT_CATEGORIES.map((category) => {
          const slug = categoryToSlug(category);
          const active = currentCategory === category;
          return (
            <Link
              key={category}
              to={`/products/category/${slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                active
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {category}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Link
        to="/products"
        className={`group p-5 rounded-xl border transition-all ${
          isAllActive
            ? 'border-cyan-500 bg-cyan-500/10'
            : 'border-slate-800 bg-slate-900 hover:border-slate-600'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
        </div>
        <h3 className="font-semibold text-white">All Products</h3>
        <p className="text-sm text-slate-400 mt-1">
          {mockProducts.length} items across all categories
        </p>
      </Link>

      {PRODUCT_CATEGORIES.map((category) => {
        const meta = categoryMeta[category];
        const count = mockProducts.filter((p) => p.category === category).length;
        const slug = categoryToSlug(category);
        const active = currentCategory === category;

        return (
          <Link
            key={category}
            to={`/products/category/${slug}`}
            className={`group p-5 rounded-xl border transition-all ${
              active
                ? 'border-cyan-500 bg-cyan-500/10'
                : 'border-slate-800 bg-slate-900 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${meta.gradient} flex items-center justify-center text-white`}
              >
                {categoryIcons[category]}
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </div>
            <h3 className="font-semibold text-white">{category}</h3>
            <p className="text-sm text-slate-400 mt-1 line-clamp-2">{meta.tagline}</p>
            <p className="text-xs text-cyan-400/80 mt-2">{count} products</p>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryNav;
