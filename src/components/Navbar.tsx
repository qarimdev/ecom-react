import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Package, Settings, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              MiniShop
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/products"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/products') 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products</span>
            </Link>
            
            <Link
              to="/cart"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/cart') 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
            </Link>
            
            <Link
              to="/orders"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/orders') 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Orders</span>
            </Link>
            
            <Link
              to="/admin"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/admin') 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
