
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ShoppingBag } from 'lucide-react';

// Mock order data - in a real app this would come from an API
interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  paymentMethod: string;
  trackingId?: string;
  products: OrderProduct[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
}

const mockOrders: Order[] = [
  {
    id: 'ORD123456',
    date: '2025-04-28',
    status: 'delivered',
    total: 7998,
    paymentMethod: 'Credit Card',
    trackingId: 'TRK789012',
    products: [
      {
        id: '1',
        name: 'Classic Chanderi Silk Saree',
        price: 3999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610030469668-493be856f5a4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3'
      },
      {
        id: '2',
        name: 'Embroidered Anarkali Suit',
        price: 3999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610030469668-493be856f5a4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3',
        size: 'M'
      }
    ],
    shippingAddress: {
      name: 'Meena',
      address: '123 Main Street',
      city: 'Chennai',
      state: 'Tamilnadu',
      pincode: '275321',
      phone: '9876543210'
    }
  },
  {
    id: 'ORD789012',
    date: '2025-04-20',
    status: 'shipped',
    total: 4999,
    paymentMethod: 'UPI',
    trackingId: 'TRK345678',
    products: [
      {
        id: '3',
        name: 'Designer Wedding Lehenga',
        price: 4999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610030469668-493be856f5a4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3'
      }
    ],
    shippingAddress: {
      name: 'Jamuna',
      address: '182E Gandhi Street',
      city: 'Tirunelveli',
      state: 'Tamilnadu',
      pincode: '402201',
      phone: '9876543210'
    }
  },
  {
    id: 'ORD345678',
    date: '2025-04-15',
    status: 'processing',
    total: 2499,
    paymentMethod: 'Net Banking',
    products: [
      {
        id: '4',
        name: 'Cotton Printed Kurti',
        price: 2499,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610030469668-493be856f5a4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3',
        size: 'L'
      }
    ],
    shippingAddress: {
      name: 'Delsin',
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '640001',
      phone: '9876543210'
    }
  },
  {
    id: 'ORD901234',
    date: '2025-03-30',
    status: 'cancelled',
    total: 5998,
    paymentMethod: 'Credit Card',
    products: [
      {
        id: '5',
        name: 'Banarasi Silk Saree',
        price: 5998,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610030469668-493be856f5a4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3'
      }
    ],
    shippingAddress: {
      name: 'Siva',
      address: '427 Nehru Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '9876543210'
    }
  }
];

function getStatusColor(status: Order['status']): string {
  switch (status) {
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-amber-100 text-amber-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold mb-8">My Orders</h1>
      
      {mockOrders.length > 0 ? (
        <>
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <Table>
              <TableCaption>Your order history</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">₹{order.total.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        className="text-aura-purple hover:text-aura-dark-purple hover:bg-aura-purple/10"
                        onClick={() => handleViewDetails(order)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Order Details Dialog */}
          <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              {selectedOrder && (
                <>
                  <DialogHeader>
                    <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
                    <DialogDescription>
                      Placed on {formatDate(selectedOrder.date)}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Order Status */}
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Order Status</h3>
                        <span className={`inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-right">
                        <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                        <p>{selectedOrder.paymentMethod}</p>
                      </div>
                    </div>
                    
                    {/* Tracking Information */}
                    {selectedOrder.trackingId && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Tracking Information</h3>
                        <p className="mt-1">
                          Tracking ID: {selectedOrder.trackingId}
                        </p>
                      </div>
                    )}
                    
                    {/* Products */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Ordered Items</h3>
                      <div className="space-y-4">
                        {selectedOrder.products.map((product) => (
                          <div key={product.id} className="flex items-center space-x-4 py-4 border-b last:border-b-0">
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="h-full w-full object-cover object-center" 
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900">{product.name}</p>
                              {product.size && <p className="text-sm text-gray-500">Size: {product.size}</p>}
                              <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                            </div>
                            <div className="flex-shrink-0 text-right">
                              <p className="font-medium text-gray-900">₹{product.price.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Order Summary */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Order Summary</h3>
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between py-2">
                          <p className="text-sm text-gray-500">Subtotal</p>
                          <p className="text-sm font-medium text-gray-900">₹{selectedOrder.total.toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between py-2">
                          <p className="text-sm text-gray-500">Shipping</p>
                          <p className="text-sm font-medium text-gray-900">Free</p>
                        </div>
                        <div className="flex justify-between py-2">
                          <p className="text-sm text-gray-500">Tax</p>
                          <p className="text-sm font-medium text-gray-900">Included</p>
                        </div>
                        <div className="flex justify-between py-2 border-t border-gray-200">
                          <p className="text-base font-medium text-gray-900">Total</p>
                          <p className="text-base font-medium text-gray-900">₹{selectedOrder.total.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Shipping Address */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Shipping Address</h3>
                      <address className="not-italic text-sm text-gray-500">
                        {selectedOrder.shippingAddress.name}<br />
                        {selectedOrder.shippingAddress.address}<br />
                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.pincode}<br />
                        Phone: {selectedOrder.shippingAddress.phone}
                      </address>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button>
                    {selectedOrder.status === 'delivered' && (
                      <Button variant="outline">Return or Exchange</Button>
                    )}
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <ShoppingBag className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
          <p className="mt-1 text-gray-500">
            When you place orders, they will appear here.
          </p>
          <div className="mt-6">
            <Button 
              onClick={() => window.location.href = '/products/category/all'}
              className="bg-aura-purple hover:bg-aura-dark-purple"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
