import React, { useState, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import {
  slugToCategory,
  categoryMeta,
  getProductsByCategory,
  categoryToSlug,
  PRODUCT_CATEGORIES,
} from '../data/categories';
import { Search, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryNav from '../components/CategoryNav';
import Breadcrumb from '../components/Breadcrumb';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  const category = slug ? slugToCategory(slug) : undefined;

  const categoryProducts = useMemo(
    () => (category ? getProductsByCategory(category) : []),
    [category]
  );

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) return categoryProducts;
    return categoryProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }, [categoryProducts, searchTerm]);

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
  };

  if (!category) {
    return <Navigate to="/products" replace />;
  }

  const meta = categoryMeta[category];
  const otherCategories = PRODUCT_CATEGORIES.filter((c) => c !== category);

  return (
    <div className="min-h-screen bg-slate-950">
      <section
        className={`border-b border-slate-800 bg-gradient-to-br ${meta.gradient} relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-slate-950/40" />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb
            items={[
              { label: 'Products', to: '/products' },
              { label: category },
            ]}
          />
          <p className="text-cyan-200/90 text-sm font-medium uppercase tracking-wider mb-2">
            {meta.tagline}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{category}</h1>
          <p className="text-slate-200 max-w-2xl mb-6">{meta.description}</p>
          <p className="text-sm text-white/80">
            {categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <CategoryNav variant="pills" currentCategory={category} />
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search in ${category}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-xl border border-slate-800 bg-slate-900/50">
            <p className="text-slate-400 text-lg mb-4">No products found in this category.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all products
            </Link>
          </div>
        )}

        {otherCategories.length > 0 && (
          <section className="mt-16 pt-10 border-t border-slate-800">
            <h2 className="text-lg font-semibold text-white mb-4">Other categories</h2>
            <div className="flex flex-wrap gap-3">
              {otherCategories.map((cat) => (
                <Link
                  key={cat}
                  to={`/products/category/${categoryToSlug(cat)}`}
                  className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors text-sm font-medium"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
