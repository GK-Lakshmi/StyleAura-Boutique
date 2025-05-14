
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-aura-soft-gray">
      <div className="aura-container py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-aura-dark-charcoal mb-4">
              Elegance for Every Occasion
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover our handcrafted collection of luxury ethnic wear. Timeless designs that celebrate tradition with a modern twist.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-aura-purple hover:bg-aura-dark-purple text-white px-8"
              >
                <Link to="/products/category/new-arrivals">Shop New Arrivals</Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="border-aura-purple text-aura-purple hover:bg-aura-soft-gray"
              >
                <Link to="/products/category/special-collection">View Collections</Link>
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="order-1 md:order-2 animate-fade-in">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="StyleAura Collection" 
                className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <p className="text-aura-purple font-bold">Summer Collection</p>
                <p className="text-sm text-gray-600">Use code SUMMER20 for 20% off</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Design Element */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}></div>
    </div>
  );
};

export default Hero;
