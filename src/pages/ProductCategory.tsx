import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/data/mockData';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { newArrivalsProducts } from '@/data/newArrivals';
import { bestSellersProducts } from '@/data/bestSellers';
import { specialCollectionProducts } from '@/data/collections';
import { useAuth } from '@/contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@/types';

const categoryNames: Record<string, string> = {
  'sarees': 'Sarees',
  'kurtis': 'Kurtis',
  'gowns': 'Gowns',
  'indo-western': 'Indo-Western',
  'lehengas': 'Lehengas',
  'sale': 'Sale Items',
  'new-arrivals': 'New Arrivals',
  'best-sellers': 'Best Sellers',
  'special-collection': 'Special Collection',
  'wishlist': 'My Wishlist',
  'all': 'All Products'
};

const ProductCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const location = useLocation();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);  // Increased max price range
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  // Extract search query from URL
  const searchQuery = new URLSearchParams(location.search).get('search') || '';
  
  // Collect all unique sizes (excluding sarees)
  const allSizes = Array.from(new Set(mockProducts
    .filter(p => p.category !== 'sarees')
    .flatMap(p => p.size || [])
  ));
  
  useEffect(() => {
    console.log("CategoryId:", categoryId);
    // For debugging - log available products in special collection
    console.log("Special collection products:", specialCollectionProducts.length);
    
    // Filter products based on category
    let filteredProducts: Product[] = [];
    
    if (categoryId === 'wishlist') {
      // For the wishlist, we'd normally filter based on a real wishlist
      // For this demo, just show some products as if they were in the wishlist
      filteredProducts = [
        ...specialCollectionProducts.slice(0, 2),
        ...bestSellersProducts.slice(0, 2)
      ];
    } else if (categoryId === 'new-arrivals') {
      filteredProducts = newArrivalsProducts;
    } else if (categoryId === 'best-sellers') {
      filteredProducts = bestSellersProducts;
    } else if (categoryId === 'special-collection') {
      filteredProducts = [...specialCollectionProducts]; // Use spread to create a new array copy
      console.log("Set special collection products:", filteredProducts.length);
    } else if (categoryId === 'sale') {
      filteredProducts = mockProducts.filter(p => p.discount && p.discount > 0);
    } else if (categoryId === 'all') {
      filteredProducts = mockProducts;
    } else {
      filteredProducts = mockProducts.filter(p => p.category === categoryId);
    }

    // Only apply additional filters if we have a non-empty initial set
    if (filteredProducts.length > 0) {
      // Apply search filter if present
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query)))
        );
      }
      
      // Apply size filter if any sizes are selected (except for sarees)
      if (selectedSizes.length > 0) {
        filteredProducts = filteredProducts.filter(p => 
          p.category === 'sarees' || 
          (p.size && p.size.some(size => selectedSizes.includes(size)))
        );
      }
      
      // Apply price range filter
      filteredProducts = filteredProducts.filter(p => {
        const price = p.salePrice || p.price;
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }
    
    // Apply sorting
    const sortedProducts = [...filteredProducts];
    switch(sortBy) {
      case 'price-low-high':
        sortedProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-high-low':
        sortedProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'newest':
        // In a real app, we'd sort by date added
        break;
      default:
        // featured - keep default order
        break;
    }
    
    console.log("Final filtered products length:", sortedProducts.length);
    setProducts(sortedProducts);
  }, [categoryId, sortBy, priceRange, selectedSizes, searchQuery, user]);
  
  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };
  
  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  // Check if current category is sarees
  const isSareeCategory = categoryId === 'sarees';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-playfair font-bold text-gray-900">
          {categoryNames[categoryId || ''] || 'Products'}
          {searchQuery && <span className="text-lg font-normal ml-2">- Search: "{searchQuery}"</span>}
        </h1>
        <p className="mt-2 text-gray-600">
          {products.length} {products.length === 1 ? 'product' : 'products'} found
        </p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter sidebar - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg border border-gray-200 sticky top-24">
            <h2 className="font-medium text-lg mb-4">Filters</h2>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-2">
                <button 
                  className={`block w-full text-left px-3 py-2 rounded ${
                    priceRange[0] === 0 && priceRange[1] === 2000 
                      ? 'bg-aura-purple text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handlePriceChange(0, 2000)}
                >
                  Under ₹2,000
                </button>
                <button 
                  className={`block w-full text-left px-3 py-2 rounded ${
                    priceRange[0] === 2000 && priceRange[1] === 5000 
                      ? 'bg-aura-purple text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handlePriceChange(2000, 5000)}
                >
                  ₹2,000 - ₹5,000
                </button>
                <button 
                  className={`block w-full text-left px-3 py-2 rounded ${
                    priceRange[0] === 5000 && priceRange[1] === 10000 
                      ? 'bg-aura-purple text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handlePriceChange(5000, 10000)}
                >
                  ₹5,000 - ₹10,000
                </button>
                <button 
                  className={`block w-full text-left px-3 py-2 rounded ${
                    priceRange[0] === 10000 && priceRange[1] === 1000000 
                      ? 'bg-aura-purple text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handlePriceChange(10000, 1000000)}
                >
                  Above ₹10,000
                </button>
              </div>
            </div>
            
            {/* Sizes - Only show for non-saree categories */}
            {!isSareeCategory && allSizes.length > 0 && categoryId !== 'wishlist' && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Size</h3>
                <div className="space-y-2">
                  {allSizes.map(size => (
                    <div key={size} className="flex items-center">
                      <Checkbox 
                        id={`size-${size}`} 
                        checked={selectedSizes.includes(size)}
                        onCheckedChange={() => handleSizeToggle(size)}
                      />
                      <label htmlFor={`size-${size}`} className="ml-2 text-sm font-medium">
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <Button 
              className="w-full"
              variant="outline"
              onClick={() => {
                setSelectedSizes([]);
                setPriceRange([0, 10000]);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        </div>
        
        {/* Mobile Filter Button */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <button 
                      className={`block w-full text-left px-3 py-2 rounded ${
                        priceRange[0] === 0 && priceRange[1] === 2000 
                          ? 'bg-aura-purple text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handlePriceChange(0, 2000)}
                    >
                      Under ₹2,000
                    </button>
                    <button 
                      className={`block w-full text-left px-3 py-2 rounded ${
                        priceRange[0] === 2000 && priceRange[1] === 5000 
                          ? 'bg-aura-purple text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handlePriceChange(2000, 5000)}
                    >
                      ₹2,000 - ₹5,000
                    </button>
                    <button 
                      className={`block w-full text-left px-3 py-2 rounded ${
                        priceRange[0] === 5000 && priceRange[1] === 10000 
                          ? 'bg-aura-purple text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handlePriceChange(5000, 10000)}
                    >
                      ₹5,000 - ₹10,000
                    </button>
                    <button 
                      className={`block w-full text-left px-3 py-2 rounded ${
                        priceRange[0] === 10000 && priceRange[1] === 1000000 
                          ? 'bg-aura-purple text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handlePriceChange(10000, 1000000)}
                    >
                      Above ₹10,000
                    </button>
                  </div>
                </div>
                
                {/* Sizes - Only show for non-saree categories */}
                {!isSareeCategory && allSizes.length > 0 && categoryId !== 'wishlist' && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Size</h3>
                    <div className="space-y-2">
                      {allSizes.map(size => (
                        <div key={size} className="flex items-center">
                          <Checkbox 
                            id={`mobile-size-${size}`} 
                            checked={selectedSizes.includes(size)}
                            onCheckedChange={() => handleSizeToggle(size)}
                          />
                          <label htmlFor={`mobile-size-${size}`} className="ml-2 text-sm font-medium">
                            {size}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    setSelectedSizes([]);
                    setPriceRange([0, 10000]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          <div className="hidden md:flex justify-end mb-6">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <SlidersHorizontal className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">Try changing your filters or browse another category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
