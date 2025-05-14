
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  RadioGroup, 
  RadioGroupItem 
} from '@/components/ui/radio-group';
import { 
  CreditCard, 
  CircleDollarSign, 
  Building, 
  ShieldCheck,
  Lock
} from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters' }),
  state: z.string().min(2, { message: 'Please select a state' }),
  pincode: z.string().min(6, { message: 'Please enter a valid pincode' }),
  paymentMethod: z.enum(['card', 'upi', 'cod']),
  notes: z.string().optional(),
});

const paymentFormSchema = z.object({
  cardNumber: z.string().min(16, { message: 'Please enter a valid card number' }),
  cardHolder: z.string().min(2, { message: 'Please enter the card holder name' }),
  expiryDate: z.string().min(5, { message: 'Please enter expiry date (MM/YY)' }),
  cvv: z.string().min(3, { message: 'Please enter a valid CVV' }),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const Checkout: React.FC = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      paymentMethod: 'card',
      notes: '',
    },
  });

  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
    },
  });
  
  if (!user) {
    navigate('/login?redirect=/checkout');
    return null;
  }
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const shippingCost = totalPrice >= 999 ? 0 : 99;
  const finalTotal = totalPrice + shippingCost;
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (data.paymentMethod === 'card') {
      setShowPaymentForm(true);
      setCurrentStep(2);
    } else {
      processPayment();
    }
  };

  const onPaymentSubmit = (data: PaymentFormValues) => {
    processPayment();
  };

  const processPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: "Thank you for shopping with StyleAura",
      });
      navigate('/');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          {currentStep === 1 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} disabled={isProcessing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} disabled={isProcessing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="9876543210" {...field} disabled={isProcessing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your full address" {...field} disabled={isProcessing} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Mumbai" {...field} disabled={isProcessing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isProcessing}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="AP">Andhra Pradesh</SelectItem>
                              <SelectItem value="AR">Arunachal Pradesh</SelectItem>
                              <SelectItem value="AS">Assam</SelectItem>
                              <SelectItem value="BR">Bihar</SelectItem>
                              <SelectItem value="CG">Chhattisgarh</SelectItem>
                              <SelectItem value="GA">Goa</SelectItem>
                              <SelectItem value="GJ">Gujarat</SelectItem>
                              <SelectItem value="HR">Haryana</SelectItem>
                              <SelectItem value="HP">Himachal Pradesh</SelectItem>
                              <SelectItem value="JH">Jharkhand</SelectItem>
                              <SelectItem value="KA">Karnataka</SelectItem>
                              <SelectItem value="KL">Kerala</SelectItem>
                              <SelectItem value="MP">Madhya Pradesh</SelectItem>
                              <SelectItem value="MH">Maharashtra</SelectItem>
                              <SelectItem value="MN">Manipur</SelectItem>
                              <SelectItem value="ML">Meghalaya</SelectItem>
                              <SelectItem value="MZ">Mizoram</SelectItem>
                              <SelectItem value="NL">Nagaland</SelectItem>
                              <SelectItem value="OR">Odisha</SelectItem>
                              <SelectItem value="PB">Punjab</SelectItem>
                              <SelectItem value="RJ">Rajasthan</SelectItem>
                              <SelectItem value="SK">Sikkim</SelectItem>
                              <SelectItem value="TN">Tamil Nadu</SelectItem>
                              <SelectItem value="TG">Telangana</SelectItem>
                              <SelectItem value="TR">Tripura</SelectItem>
                              <SelectItem value="UK">Uttarakhand</SelectItem>
                              <SelectItem value="UP">Uttar Pradesh</SelectItem>
                              <SelectItem value="WB">West Bengal</SelectItem>
                              <SelectItem value="DL">Delhi</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pincode</FormLabel>
                          <FormControl>
                            <Input placeholder="400001" {...field} disabled={isProcessing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            disabled={isProcessing}
                          >
                            <div className={`border rounded-lg p-4 cursor-pointer ${field.value === 'card' ? 'border-aura-purple bg-aura-purple/5' : 'border-gray-200'}`}>
                              <FormItem className="flex items-start space-x-3">
                                <FormControl>
                                  <RadioGroupItem value="card" />
                                </FormControl>
                                <div className="flex items-center space-x-2">
                                  <CreditCard className="h-5 w-5 text-aura-purple" />
                                  <div>
                                    <FormLabel className="font-medium">Credit / Debit Card</FormLabel>
                                  </div>
                                </div>
                              </FormItem>
                            </div>
                            
                            <div className={`border rounded-lg p-4 cursor-pointer ${field.value === 'upi' ? 'border-aura-purple bg-aura-purple/5' : 'border-gray-200'}`}>
                              <FormItem className="flex items-start space-x-3">
                                <FormControl>
                                  <RadioGroupItem value="upi" />
                                </FormControl>
                                <div className="flex items-center space-x-2">
                                  <CircleDollarSign className="h-5 w-5 text-aura-purple" />
                                  <div>
                                    <FormLabel className="font-medium">UPI / Wallet</FormLabel>
                                  </div>
                                </div>
                              </FormItem>
                            </div>
                            
                            <div className={`border rounded-lg p-4 cursor-pointer ${field.value === 'cod' ? 'border-aura-purple bg-aura-purple/5' : 'border-gray-200'}`}>
                              <FormItem className="flex items-start space-x-3">
                                <FormControl>
                                  <RadioGroupItem value="cod" />
                                </FormControl>
                                <div className="flex items-center space-x-2">
                                  <Building className="h-5 w-5 text-aura-purple" />
                                  <div>
                                    <FormLabel className="font-medium">Cash on Delivery</FormLabel>
                                  </div>
                                </div>
                              </FormItem>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any special instructions for delivery" 
                            {...field} 
                            disabled={isProcessing}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-aura-purple hover:bg-aura-dark-purple"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Continue to Payment'}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Card Payment</CardTitle>
                <CardDescription>Enter your card details securely</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...paymentForm}>
                  <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-6">
                    <FormField
                      control={paymentForm.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="1234 5678 9012 3456" 
                                {...field} 
                                disabled={isProcessing} 
                              />
                              <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={paymentForm.control}
                      name="cardHolder"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Holder Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                              disabled={isProcessing} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={paymentForm.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="MM/YY" 
                                {...field} 
                                disabled={isProcessing} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={paymentForm.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input 
                                  placeholder="123" 
                                  type="password" 
                                  maxLength={3} 
                                  {...field} 
                                  disabled={isProcessing} 
                                />
                                <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Lock className="h-4 w-4 text-green-600" />
                      <p>Your payment information is encrypted and secure</p>
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setCurrentStep(1);
                          setShowPaymentForm(false);
                        }}
                        disabled={isProcessing}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1 bg-aura-purple hover:bg-aura-dark-purple"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing Payment...' : `Pay ₹${finalTotal.toFixed(2)}`}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="mt-8 lg:mt-0 lg:col-span-5">
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 sticky top-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.product.id} className="flex space-x-4">
                  <div className="flex-shrink-0 w-16 h-16">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ₹{((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <p className="text-gray-600">Subtotal ({totalItems} items)</p>
                <p className="font-medium">₹{totalPrice.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between text-sm">
                <p className="text-gray-600">Shipping</p>
                <p className="font-medium">
                  {shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}
                </p>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between text-lg font-medium">
                <p>Total</p>
                <p>₹{finalTotal.toFixed(2)}</p>
              </div>
              
              <div className="pt-4 flex items-center space-x-2 text-sm text-gray-600">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <p>Your personal data will be used to process your order, support your experience, and for other purposes described in our privacy policy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
