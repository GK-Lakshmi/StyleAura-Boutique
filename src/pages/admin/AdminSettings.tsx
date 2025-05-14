import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import QRCode from '@/components/QRCode';

const AdminSettings: React.FC = () => {
  const { toast } = useToast();
  
  // General Settings
  const [storeName, setStoreName] = useState('StyleAura');
  const [storeEmail, setStoreEmail] = useState('contact@styleaura.com');
  const [storePhone, setStorePhone] = useState('+91 98765 43210');
  const [currency, setCurrency] = useState('INR');
  
  // Payment Settings
  const [acceptCod, setAcceptCod] = useState(true);
  const [acceptUpi, setAcceptUpi] = useState(true);
  const [acceptCards, setAcceptCards] = useState(true);
  const [upiId, setUpiId] = useState('styleaura@upi');
  const [codMinimumAmount, setCodMinimumAmount] = useState('500');
  const [codMaximumAmount, setCodMaximumAmount] = useState('50000');
  
  // Shipping Settings
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('999');
  const [shippingFee, setShippingFee] = useState('99');
  const [processingTime, setProcessingTime] = useState('2');
  const [deliveryEstimate, setDeliveryEstimate] = useState('5-7');
  
  // Security Settings
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSaveGeneral = () => {
    // In a real app, this would call an API to update settings
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully."
    });
  };
  
  const handleSavePayment = () => {
    // In a real app, this would call an API to update settings
    toast({
      title: "Settings Saved",
      description: "Payment settings have been updated successfully."
    });
  };
  
  const handleSaveShipping = () => {
    // In a real app, this would call an API to update settings
    toast({
      title: "Settings Saved",
      description: "Shipping settings have been updated successfully."
    });
  };
  
  const handlePasswordChange = () => {
    // Validate passwords
    if (!currentPassword) {
      toast({
        title: "Error",
        description: "Please enter your current password",
        variant: "destructive"
      });
      return;
    }
    
    if (!newPassword) {
      toast({
        title: "Error",
        description: "Please enter a new password",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would call an API to verify the current password and update it
    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully. Please remember to use your new password the next time you log in."
    });
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure your store's general information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input 
                  id="store-name" 
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-email">Contact Email</Label>
                <Input 
                  id="store-email" 
                  type="email"
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-phone">Contact Phone</Label>
                <Input 
                  id="store-phone" 
                  value={storePhone}
                  onChange={(e) => setStorePhone(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="button"
                className="bg-aura-purple hover:bg-aura-dark-purple"
                onClick={handleSaveGeneral}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Payment Settings */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure payment methods and options for your store.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Cash on Delivery</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow customers to pay with cash at the time of delivery
                      </p>
                    </div>
                    <Switch 
                      checked={acceptCod} 
                      onCheckedChange={setAcceptCod} 
                    />
                  </div>
                  
                  {acceptCod && (
                    <div className="ml-6 pt-2 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cod-min">Minimum Order Amount</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                            <Input 
                              id="cod-min"
                              className="pl-8"
                              value={codMinimumAmount}
                              onChange={(e) => setCodMinimumAmount(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cod-max">Maximum Order Amount</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                            <Input 
                              id="cod-max"
                              className="pl-8"
                              value={codMaximumAmount}
                              onChange={(e) => setCodMaximumAmount(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">UPI Payment</Label>
                      <p className="text-sm text-muted-foreground">
                        Accept payments via UPI (Google Pay, PhonePe, Paytm, etc.)
                      </p>
                    </div>
                    <Switch 
                      checked={acceptUpi} 
                      onCheckedChange={setAcceptUpi} 
                    />
                  </div>
                  
                  {acceptUpi && (
                    <div className="ml-6 pt-2 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="upi-id">UPI ID</Label>
                        <Input 
                          id="upi-id"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@upi"
                        />
                      </div>
                      <div className="mt-4">
                        <Label className="mb-2 block">UPI QR Code</Label>
                        <div className="flex justify-center">
                          <QRCode value={upiId} size={180} />
                        </div>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                          Scan with any UPI app to make a payment
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Credit/Debit Cards</Label>
                      <p className="text-sm text-muted-foreground">
                        Accept payments via credit and debit cards
                      </p>
                    </div>
                    <Switch 
                      checked={acceptCards} 
                      onCheckedChange={setAcceptCards} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="button"
                className="bg-aura-purple hover:bg-aura-dark-purple"
                onClick={handleSavePayment}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Shipping Settings */}
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
              <CardDescription>Configure shipping options and delivery settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Shipping Fees</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="free-shipping">Free Shipping Threshold</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                    <Input 
                      id="free-shipping"
                      className="pl-8"
                      value={freeShippingThreshold}
                      onChange={(e) => setFreeShippingThreshold(e.target.value)}
                      placeholder="1000"
                    />
                  </div>
                  <p className="text-sm text-gray-500">Orders above this amount qualify for free shipping</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shipping-fee">Standard Shipping Fee</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                    <Input 
                      id="shipping-fee"
                      className="pl-8"
                      value={shippingFee}
                      onChange={(e) => setShippingFee(e.target.value)}
                      placeholder="99"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Delivery Timeframes</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="processing">Processing Time (Days)</Label>
                  <Input 
                    id="processing"
                    value={processingTime}
                    onChange={(e) => setProcessingTime(e.target.value)}
                    placeholder="1-3"
                  />
                  <p className="text-sm text-gray-500">Number of days needed to process an order before shipping</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="delivery">Delivery Estimate (Days)</Label>
                  <Input 
                    id="delivery"
                    value={deliveryEstimate}
                    onChange={(e) => setDeliveryEstimate(e.target.value)}
                    placeholder="3-7"
                  />
                  <p className="text-sm text-gray-500">Estimated number of days for delivery after shipping</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="button"
                className="bg-aura-purple hover:bg-aura-dark-purple"
                onClick={handleSaveShipping}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Update your password and security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input 
                  id="current-password" 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">
                Password must be at least 8 characters long.
              </p>
              <Button 
                type="button"
                className="bg-aura-purple hover:bg-aura-dark-purple"
                onClick={handlePasswordChange}
              >
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
