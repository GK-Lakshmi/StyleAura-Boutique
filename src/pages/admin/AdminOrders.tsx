
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockOrders, mockProducts } from '@/data/mockData';
import { Order } from '@/types';

const AdminOrders: React.FC = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  
  // Filtered orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = 
      statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
      
    return matchesSearch && matchesStatus;
  });
  
  // Sort orders by date (newest first)
  const sortedOrders = [...filteredOrders].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Handle view order details
  const handleViewOrder = (order: Order) => {
    setCurrentOrder(order);
    setIsOrderDetailOpen(true);
  };

  // Handle update order status
  const handleStatusChange = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus } 
        : order
    );
    
    setOrders(updatedOrders);
    
    toast({
      title: 'Order status updated',
      description: `Order #${orderId} status changed to ${newStatus}`,
    });
  };

  // Helper function to get product details
  const getProductById = (productId: string) => {
    return mockProducts.find(product => product.id === productId);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders Management</h1>
      
      {/* Search and Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Search Orders</CardTitle>
          <CardDescription>
            Find orders by ID or customer name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Orders Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Orders ({sortedOrders.length})</CardTitle>
          <CardDescription>
            Manage customer orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.shippingAddress?.name}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Select
                        defaultValue={order.status.toLowerCase()}
                        onValueChange={(value) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <span className={`
                            inline-block w-2 h-2 rounded-full mr-2
                            ${order.status === 'Delivered' ? 'bg-green-500' : 
                              order.status === 'Shipped' ? 'bg-blue-500' : 'bg-yellow-500'}
                          `}></span>
                          <SelectValue>{order.status}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="confirmed">
                            <div className="flex items-center gap-2">
                              <span className="inline-block w-2 h-2 rounded-full bg-yellow-500"></span>
                              Confirmed
                            </div>
                          </SelectItem>
                          <SelectItem value="shipped">
                            <div className="flex items-center gap-2">
                              <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                              Shipped
                            </div>
                          </SelectItem>
                          <SelectItem value="delivered">
                            <div className="flex items-center gap-2">
                              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                              Delivered
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>₹{order.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye size={16} className="mr-1" /> Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {sortedOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Order Detail Dialog */}
      <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {currentOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Order #{currentOrder.id}</DialogTitle>
                <DialogDescription>
                  Placed on {new Date(currentOrder.date).toLocaleDateString()} at {new Date(currentOrder.date).toLocaleTimeString()}
                </DialogDescription>
              </DialogHeader>
              
              {/* Order Status */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">Status:</span>
                <span className={`
                  text-sm px-2 py-1 rounded-full
                  ${currentOrder.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                    currentOrder.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'}
                `}>
                  {currentOrder.status}
                </span>
              </div>
              
              {/* Customer Info */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Customer Information</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Name</p>
                    <p>{currentOrder.shippingAddress?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p>{currentOrder.shippingAddress?.phone}</p>
                  </div>
                </div>
              </div>
              
              {/* Shipping Address */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Shipping Address</h4>
                <p className="text-sm">
                  {currentOrder.shippingAddress?.address}, {currentOrder.shippingAddress?.city}, {currentOrder.shippingAddress?.state} - {currentOrder.shippingAddress?.pincode}
                </p>
              </div>
              
              {/* Order Items */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Order Items</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentOrder.items.map((item) => {
                      const product = getProductById(item.productId);
                      return (
                        <TableRow key={item.productId}>
                          <TableCell className="flex items-center gap-2">
                            {product && (
                              <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-10 h-10 object-cover rounded"
                              />
                            )}
                            <span>{product?.name || 'Product'}</span>
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>₹{item.price}</TableCell>
                          <TableCell>₹{item.price * item.quantity}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{currentOrder.total}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{currentOrder.total}</span>
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={() => setIsOrderDetailOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
