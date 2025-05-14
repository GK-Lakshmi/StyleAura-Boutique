import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';

const Cart: React.FC = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-1 text-gray-500">Please log in to view your cart</p>
          <div className="mt-6">
            <Button 
              onClick={() => navigate('/login?redirect=/cart')}
              className="bg-aura-purple hover:bg-aura-dark-purple"
            >
              Log in to Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-1 text-gray-500">Browse our products and discover amazing deals!</p>
          <div className="mt-6">
            <Button 
              onClick={() => navigate('/products/category/sarees')}
              className="bg-aura-purple hover:bg-aura-dark-purple"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast({
      title: "Item Removed",
      description: "Product has been removed from your cart"
    });
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="border rounded-lg overflow-hidden overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subtotal
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map(item => (
                  <tr key={`${item.product.id}-${item.selectedSize || 'default'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16">
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name} 
                            className="h-16 w-16 object-cover rounded"
                          />
                        </div>
                        <div className="ml-4">
                          <Link 
                            to={`/products/${item.product.id}`}
                            className="font-medium text-gray-900 hover:text-aura-purple"
                          >
                            {item.product.name}
                          </Link>
                          {item.selectedSize && (
                            <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          ₹{item.product.salePrice || item.product.price}
                        </span>
                        {item.product.salePrice && (
                          <span className="line-through text-gray-400 text-xs">
                            ₹{item.product.price}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 border border-gray-300 rounded-l"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          className="w-12 text-center border-t border-b border-gray-300 p-1"
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (val > 0) {
                              updateQuantity(item.product.id, val);
                            }
                          }}
                        />
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 border border-gray-300 rounded-r"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-between">
            <Link to="/">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-8 lg:mt-0 lg:col-span-5">
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal ({totalItems} items)</p>
                <p className="font-medium">₹{totalPrice.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-gray-600">Shipping</p>
                <p className="font-medium">
                  {totalPrice >= 999 ? "Free" : "₹99.00"}
                </p>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-medium">
                <p>Total</p>
                <p>₹{(totalPrice + (totalPrice >= 999 ? 0 : 99)).toFixed(2)}</p>
              </div>
              
              <Button 
                onClick={() => {
                  if (user) {
                    navigate('/checkout');
                  } else {
                    toast({
                      title: "Please log in",
                      description: "You need to be logged in to proceed to checkout",
                      variant: "destructive"
                    });
                    navigate('/login?redirect=/checkout');
                  }
                }}
                className="w-full bg-aura-purple hover:bg-aura-dark-purple flex items-center justify-center mt-4"
              >
                Proceed to Checkout <ArrowRight size={16} className="ml-2" />
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-2">
                Free shipping on orders above ₹999
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
