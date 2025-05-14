
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import QRCode from './QRCode';

interface PaymentMethodsProps {
  amount: number;
  onSuccess: () => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ amount, onSuccess }) => {
  const [method, setMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (method === 'upi') {
      if (!upiId || !upiId.includes('@')) {
        toast({
          title: 'Invalid UPI ID',
          description: 'Please enter a valid UPI ID (e.g., username@upi)',
          variant: 'destructive'
        });
        return;
      }
    } else if (method === 'card') {
      if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
        toast({
          title: 'Invalid Card Number',
          description: 'Please enter a valid 16-digit card number',
          variant: 'destructive'
        });
        return;
      }
      
      if (!cardName) {
        toast({
          title: 'Invalid Name',
          description: 'Please enter the name on your card',
          variant: 'destructive'
        });
        return;
      }
      
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        toast({
          title: 'Invalid Expiry Date',
          description: 'Please enter a valid expiry date in MM/YY format',
          variant: 'destructive'
        });
        return;
      }
      
      if (cardCvv.length < 3 || !/^\d+$/.test(cardCvv)) {
        toast({
          title: 'Invalid CVV',
          description: 'Please enter a valid CVV code',
          variant: 'destructive'
        });
        return;
      }
    } else if (method === 'cod') {
      // No validation needed for Cash on Delivery
    }
    
    // Process payment
    setIsProcessing(true);
    
    // Simulating payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: 'Payment Successful!',
        description: `Your payment of ₹${amount} has been processed successfully`,
      });
      
      onSuccess();
    }, 2000);
  };
  
  return (
    <div>
      <RadioGroup defaultValue={method} onValueChange={setMethod} className="space-y-4 mb-6">
        <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="upi" id="upi" />
          <Label htmlFor="upi" className="flex-1 cursor-pointer">
            <div className="flex justify-between">
              <span>UPI Payment</span>
              <div className="flex space-x-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png" alt="Paytm" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-6" />
              </div>
            </div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex-1 cursor-pointer">
            <div className="flex justify-between">
              <span>Credit/Debit Card</span>
              <div className="flex space-x-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1920px-Mastercard_2019_logo.svg.png" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="Amex" className="h-6" />
              </div>
            </div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="cod" id="cod" />
          <Label htmlFor="cod" className="flex-1 cursor-pointer">
            <div className="flex justify-between">
              <span>Cash on Delivery</span>
              <div>
                <img src="https://cdn-icons-png.flaticon.com/512/3297/3297987.png" alt="COD" className="h-6" />
              </div>
            </div>
          </Label>
        </div>
      </RadioGroup>
      
      {method === 'upi' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Enter your UPI ID</h3>
              <div className="space-y-2">
                <Label htmlFor="upi-id">UPI ID</Label>
                <Input 
                  id="upi-id" 
                  placeholder="yourname@upi" 
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                />
              </div>
              <Button 
                className="w-full bg-aura-purple hover:bg-aura-dark-purple"
                onClick={handlePaymentSubmit}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
              </Button>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <h3 className="font-medium mb-4">OR Scan QR Code</h3>
              <QRCode value={`upi://pay?pa=merchant@upi&pn=StyleAura&am=${amount}&cu=INR`} />
              <p className="text-sm text-gray-500 mt-2">Scan with any UPI app</p>
            </div>
          </div>
        </div>
      )}
      
      {method === 'card' && (
        <form onSubmit={handlePaymentSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input 
              id="card-number" 
              placeholder="1234 5678 9012 3456" 
              maxLength={16}
              value={cardNumber}
              onChange={e => setCardNumber(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="card-name">Name on Card</Label>
            <Input 
              id="card-name" 
              placeholder="John Doe" 
              value={cardName}
              onChange={e => setCardName(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input 
                id="expiry" 
                placeholder="MM/YY" 
                maxLength={5}
                value={cardExpiry}
                onChange={e => setCardExpiry(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input 
                id="cvv" 
                placeholder="123" 
                maxLength={4}
                type="password"
                value={cardCvv}
                onChange={e => setCardCvv(e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-aura-purple hover:bg-aura-dark-purple mt-4"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
          </Button>
        </form>
      )}
      
      {method === 'cod' && (
        <div className="mt-6">
          <p className="mb-4">Pay with cash upon delivery. Our delivery partner will collect the payment.</p>
          <Button 
            className="w-full bg-aura-purple hover:bg-aura-dark-purple"
            onClick={handlePaymentSubmit}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Place Order with Cash on Delivery'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
