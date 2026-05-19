import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => (
  <article className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5 transition-all">
    <div className="relative h-48 bg-slate-800 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <span className="absolute top-3 left-3 px-2 py-0.5 text-xs font-medium bg-slate-950/80 text-cyan-400 rounded border border-slate-700">
        {product.category}
      </span>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
      <p className="text-sm text-slate-400 mb-3 line-clamp-2">{product.description}</p>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-bold text-cyan-400">${product.price.toFixed(2)}</span>
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${
            product.stock > 0
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-red-500/10 text-red-400'
          }`}
        >
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onAddToCart(product)}
        disabled={product.stock === 0}
        className="w-full flex items-center justify-center gap-2 bg-cyan-600 text-white py-2.5 px-4 rounded-lg hover:bg-cyan-500 transition-colors disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed font-medium text-sm"
      >
        <ShoppingCart className="w-4 h-4" />
        Add to Cart
      </button>
    </div>
  </article>
);

export default ProductCard;
