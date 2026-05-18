import React from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

// Mock order data - in a real app this would come from an API
const mockOrders = [
  {
    id: 'ORD-1640995200000',
    items: [
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
      }
    ],
    total: 329.99,
    status: 'delivered' as const,
    createdAt: new Date('2023-12-31'),
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      zipCode: '10001',
      country: 'United States'
    }
  },
  {
    id: 'ORD-1640908800000',
    items: [
      {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop'
      },
      {
        id: 3,
        name: 'Laptop Stand',
        price: 49.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop'
      }
    ],
    total: 319.97,
    status: 'shipped' as const,
    createdAt: new Date('2023-12-30'),
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      zipCode: '90001',
      country: 'United States'
    }
  },
  {
    id: 'ORD-1640822400000',
    items: [
      {
        id: 4,
        name: 'Mechanical Keyboard',
        price: 129.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1598928424272-9e66b69ce1b0?w=100&h=100&fit=crop'
      }
    ],
    total: 142.99,
    status: 'processing' as const,
    createdAt: new Date('2023-12-29'),
    shippingAddress: {
      street: '789 Pine Rd',
      city: 'Chicago',
      zipCode: '60007',
      country: 'United States'
    }
  }
];

const OrderHistory: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (mockOrders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">Once you place orders, they will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>
      
      <div className="space-y-6">
        {mockOrders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Shipping Address:</span> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.zipCode}, {order.shippingAddress.country}
                </p>
              </div>
            </div>
            
            <div className="p-6">
              <h4 className="font-medium text-gray-900 mb-4">Items</h4>
              <div className="space-y-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{item.name}</h5>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${item.price}</p>
                      <p className="text-sm text-gray-600">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-indigo-600">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
