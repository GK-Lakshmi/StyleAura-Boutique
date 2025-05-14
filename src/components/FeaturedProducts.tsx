
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { mockProducts } from '@/data/mockData';
import { bestSellersProducts } from '@/data/bestSellers';
import { newArrivalsProducts } from '@/data/newArrivals';
import { specialCollectionProducts } from '@/data/collections';

const FeaturedProducts: React.FC = () => {
  // Get 4 featured products
  const featuredProducts = mockProducts.slice(0, 4);
  
  return (
    <section className="py-16 bg-white">
      <div className="aura-container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-aura-dark-charcoal">Featured Products</h2>
          <Link 
            to="/products/category/all" 
            className="text-aura-purple hover:text-aura-dark-purple transition-colors flex items-center gap-1"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* New Arrivals Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-aura-dark-charcoal">New Arrivals</h2>
            <Link 
              to="/products/category/new-arrivals" 
              className="text-aura-purple hover:text-aura-dark-purple transition-colors flex items-center gap-1"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivalsProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        

        {/* Best Sellers Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-aura-dark-charcoal">Best Sellers</h2>
            <Link 
              to="/products/category/best-sellers" 
              className="text-aura-purple hover:text-aura-dark-purple transition-colors flex items-center gap-1"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellersProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        
        <div className="mt-16">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <CardContent className="p-8 flex flex-col justify-center">
                <p className="text-sm font-medium text-aura-purple uppercase tracking-wider mb-2">Limited Offer</p>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Special Collection</h3>
                <p className="text-gray-600 mb-6">Discover our exclusive designer pieces, handcrafted for the modern woman.</p>
                <Button 
                  asChild
                  className="w-full md:w-auto bg-aura-purple hover:bg-aura-dark-purple"
                >
                  <Link to="/products/category/special-collection">Explore Collection</Link>
                </Button>
              </CardContent>
              <div className="relative h-64 md:h-auto">
                <img 
                  src="https://www.rozinaa.com/cdn/shop/files/Banner_1_338f8ef1-d000-422e-9414-e18ba695fe9b.jpg?v=1725430450&width=3840" 
                  alt="Special Collection" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
