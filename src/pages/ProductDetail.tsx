
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { mockProducts } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [isWishlist, setIsWishlist] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  // Find the product from mock data (in real app, this would be an API call)
  const foundProduct = mockProducts.find(p => p.id === productId);
  
  // Create a default product with the correct type structure if not found
  const product: Product = foundProduct || {
    id: "1",
    name: "Classic Chanderi Silk Saree",
    price: 4999,
    salePrice: 3999,
    discount: 20,
    description: "Elegant Chanderi silk saree with golden zari work border and handcrafted designs.",
    imageUrl: "https://images.unsplash.com/photo-1610030469668-493be856f5a4?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "sarees",
    size: ["Free Size"],
    available: true,
    inStock: 10,
    colors: ["Pink", "Blue", "Green"],
    tags: ["festive", "wedding", "silk"]
  };
  
  const toggleWishlist = () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to wishlist",
        variant: "destructive"
      });
      return;
    }
    
    setIsWishlist(!isWishlist);
    toast({
      title: isWishlist ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlist 
        ? `${product.name} removed from your wishlist` 
        : `${product.name} added to your wishlist`
    });
  };
  
  const handleShare = () => {
    setShowShareOptions(true);
  };
  
  const shareProduct = (platform: string) => {
    const productUrl = `${window.location.origin}/products/${product.id}`;
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(productUrl).then(() => {
        toast({
          title: "Link Copied",
          description: "Product link copied to clipboard"
        });
      });
    } else if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=Check out this product: ${product.name} - ${productUrl}`);
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`);
    }
    
    setShowShareOptions(false);
  };
  
  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to cart",
        variant: "destructive"
      });
      return;
    }
    
    if (product.size && product.size.length > 0 && product.category !== 'sarees' && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to cart",
        variant: "destructive"
      });
      return;
    }
    
    addToCart(product, quantity, selectedSize);
    
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <div className="mb-4">
        <Link to={`/products/category/${product.category}`} className="flex items-center text-aura-purple">
          <ArrowLeft size={16} className="mr-2" />
          Back to {product.category}
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="overflow-hidden rounded-lg">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400" fill="#fbbf24" />
                ))}
              </div>
              <span className="ml-2 text-gray-600 text-sm">(54 reviews)</span>
            </div>
          </div>
          
          <div className="flex items-end">
            {product.discount > 0 ? (
              <>
                <span className="text-2xl font-semibold text-gray-900">₹{product.salePrice}</span>
                <span className="ml-2 text-lg text-gray-500 line-through">₹{product.price}</span>
                <span className="ml-2 text-sm font-medium text-aura-purple bg-aura-purple/10 px-2 py-0.5 rounded">
                  {product.discount}% OFF
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold text-gray-900">₹{product.price}</span>
            )}
          </div>
          
          <div>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          {/* Size Selection - Only show for non-saree items */}
          {product.size && product.size.length > 0 && product.category !== 'sarees' && (
            <div>
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="flex items-center space-x-3 mt-2">
                {product.size.map(size => (
                  <button
                    key={size}
                    className={`px-3 py-1.5 rounded-md text-sm ${
                      selectedSize === size 
                        ? 'bg-aura-purple text-white' 
                        : 'border border-gray-300 text-gray-700 hover:border-aura-purple'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity Selector */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
            <div className="flex items-center mt-2">
              <button 
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="p-2 border border-gray-300 rounded-l"
              >
                -
              </button>
              <input
                className="w-16 text-center border-t border-b border-gray-300 p-2"
                type="number"
                min="1"
                max={product.inStock || 10}
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val > 0 && (!product.inStock || val <= product.inStock)) {
                    setQuantity(val);
                  }
                }}
              />
              <button 
                onClick={() => (!product.inStock || quantity < product.inStock) && setQuantity(quantity + 1)}
                className="p-2 border border-gray-300 rounded-r"
              >
                +
              </button>
              <span className="ml-3 text-gray-500">
                {product.inStock ? `${product.inStock} available` : 'Out of stock'}
              </span>
            </div>
          </div>
          
          {/* Add to cart & Buy now buttons */}
          <div className="flex space-x-4">
            <Button 
              onClick={handleAddToCart} 
              className="flex-1 bg-aura-purple hover:bg-aura-dark-purple"
              disabled={!product.available}
            >
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              className={`p-3 border border-aura-purple ${isWishlist ? 'bg-aura-purple/10' : ''} text-aura-purple hover:bg-aura-purple hover:text-white`}
              onClick={toggleWishlist}
            >
              <Heart size={20} className={isWishlist ? 'fill-aura-purple' : ''} />
            </Button>
            <Button 
              variant="outline" 
              className="p-3 border border-aura-purple text-aura-purple hover:bg-aura-purple hover:text-white"
              onClick={handleShare}
            >
              <Share2 size={20} />
            </Button>
          </div>
          
          {/* Shipping & Returns */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Truck className="h-6 w-6 text-gray-500" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Free Shipping</h3>
                  <p className="text-xs text-gray-500">On orders above ₹999</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ShieldCheck className="h-6 w-6 text-gray-500" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Secure Payment</h3>
                  <p className="text-xs text-gray-500">UPI and other payment options available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Share Dialog */}
      <Dialog open={showShareOptions} onOpenChange={setShowShareOptions}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share This Product</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 py-4">
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2"
              onClick={() => shareProduct('whatsapp')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M3 21l1.65-3.8a9 9 0 113.4 2.9L3 21"/>
                <path d="M9 10a.5.5 0 001 0V9a.5.5 0 00-1 0v1zM14 10a.5.5 0 001 0V9a.5.5 0 00-1 0v1z"/>
                <path d="M12 18a6 6 0 100-12 6 6 0 000 12z"/>
              </svg>
              WhatsApp
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2"
              onClick={() => shareProduct('facebook')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
              Facebook
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2"
              onClick={() => shareProduct('copy')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
              Copy Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetail;
