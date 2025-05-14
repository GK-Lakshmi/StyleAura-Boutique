
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for subscribing!",
        description: "You'll receive our latest updates and offers."
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-aura-soft-gray">
      <div className="aura-container max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-8">
          Sign up to receive updates on new arrivals, special offers, and exclusive events.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-aura-purple focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-aura-purple hover:bg-aura-dark-purple transition-colors" 
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
        
        <p className="mt-4 text-sm text-gray-500">
          By signing up, you agree to our Privacy Policy and Terms of Service.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
