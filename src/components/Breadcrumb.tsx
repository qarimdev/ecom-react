import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <nav className="flex items-center flex-wrap gap-1 text-sm text-slate-400 mb-6">
    <Link to="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
      <Home className="w-3.5 h-3.5" />
      <span>Home</span>
    </Link>
    {items.map((item, i) => (
      <React.Fragment key={i}>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        {item.to ? (
          <Link to={item.to} className="hover:text-cyan-400 transition-colors">
            {item.label}
          </Link>
        ) : (
          <span className="text-cyan-400 font-medium">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </nav>
);

export default Breadcrumb;
