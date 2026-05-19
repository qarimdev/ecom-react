import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/mockData';
import {
  PRODUCT_CATEGORIES,
  categoryMeta,
  categoryToSlug,
} from '../data/categories';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import {
  ArrowRight,
  Server,
  Headphones,
  Zap,
  Users,
  Clock,
  ChevronRight,
  Cpu,
  Plug,
  Lamp,
} from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  Electronics: <Cpu className="w-6 h-6" />,
  Accessories: <Plug className="w-6 h-6" />,
  Home: <Lamp className="w-6 h-6" />,
};

const stats = [
  { label: 'Products', value: `${mockProducts.length}+`, icon: Server },
  { label: 'Categories', value: String(PRODUCT_CATEGORIES.length), icon: Headphones },
  { label: 'Happy clients', value: '2.4k+', icon: Users },
  { label: 'Support', value: '24/7', icon: Clock },
];

const services = [
  {
    title: 'Enterprise Hardware',
    desc: 'Curated workstations, peripherals, and devices for teams of any size.',
    icon: Server,
  },
  {
    title: 'Fast Deployment',
    desc: 'Same-week shipping on in-stock items with tracked delivery.',
    icon: Zap,
  },
  {
    title: 'Expert Support',
    desc: 'Technical guidance before and after your purchase.',
    icon: Headphones,
  },
];

const Home: React.FC = () => {
  const { addToCart } = useCart();
  const featuredProducts = mockProducts.slice(0, 4);

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(rgba(251,191,36,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6">
                <Zap className="w-3.5 h-3.5" />
                IT Solutions Provider
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Power your workspace with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                  modern tech
                </span>
              </h1>
              <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
                TechCore delivers enterprise-grade hardwares, accessories, and office gear —
                built for developers, startups and growing IT teams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 px-7 py-3.5 rounded-lg font-semibold hover:from-amber-400 hover:to-orange-500 transition-all shadow-lg shadow-amber-500/20"
                >
                  Browse catalog
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/products/category/electronics"
                  className="inline-flex items-center justify-center gap-2 border border-slate-600 text-slate-200 px-7 py-3.5 rounded-lg font-semibold hover:border-amber-500/50 hover:text-amber-400 transition-colors"
                >
                  Shop electronics
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur hover:border-amber-500/30 transition-colors"
                  >
                    <Icon className="w-8 h-8 text-amber-400 mb-3" />
                    <p className="text-2xl font-bold text-white">{value}</p>
                    <p className="text-sm text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
              <div className="absolute -z-10 -top-8 -right-8 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl" />
              <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-teal-500/15 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Shop by category</h2>
              <p className="text-slate-400 mt-2">Find the right gear for your setup</p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium text-sm"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRODUCT_CATEGORIES.map((category) => {
              const meta = categoryMeta[category];
              const count = mockProducts.filter((p) => p.category === category).length;
              return (
                <Link
                  key={category}
                  to={`/products/category/${categoryToSlug(category)}`}
                  className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-amber-500/40 transition-all"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                  />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                      {categoryIcons[category]}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">{category}</h3>
                    <p className="text-sm text-slate-400 mb-4">{meta.tagline}</p>
                    <p className="text-xs text-amber-400/90 font-medium">
                      {count} products →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
            Why TechCore
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
            More than a store — we help teams equip faster with reliable IT products.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map(({ title, desc, icon: Icon }) => (
              <div
                key={title}
                className="text-center p-8 rounded-2xl border border-slate-800 bg-slate-950 hover:border-teal-500/30 transition-colors"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-teal-500/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="text-teal-400 text-sm font-semibold uppercase tracking-wider">
                Top picks
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">
                Featured hardware
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium"
            >
              Full catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700" />
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(0,0,0,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.2)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="relative px-8 py-12 sm:py-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to upgrade your stack?
            </h2>
            <p className="text-amber-100/90 mb-8 max-w-md mx-auto">
              Explore our full catalog or jump straight into your category of choice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-white text-orange-700 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/cart"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                View cart
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
