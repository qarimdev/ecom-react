import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryNav from '../components/CategoryNav';
import Breadcrumb from '../components/Breadcrumb';

const ProductList: React.FC = () => {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) return mockProducts;
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <section className="border-b border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumb items={[{ label: 'Products' }]} />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            IT Product Catalog
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Browse our full range of hardware and accessories. Select a category below or search across all products.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-lg font-semibold text-white mb-4">Shop by category</h2>
        <CategoryNav variant="cards" />

        <div className="mt-12 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-white">
            All products
            <span className="ml-2 text-sm font-normal text-slate-500">
              ({filteredProducts.length})
            </span>
          </h2>
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
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
            <p className="text-slate-400 text-lg">No products match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
