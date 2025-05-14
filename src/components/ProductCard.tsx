
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from '@/types';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isWishlist, setIsWishlist] = useState(false);
  const [showSizeDialog, setShowSizeDialog] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
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
    
    // For products with sizes (except sarees which are always "Free Size")
    if (product.category !== 'sarees' && product.size && product.size.length > 0) {
      setShowSizeDialog(true);
    } else {
      // For products without size options or sarees
      addToCart(product, 1);
      toast({
        title: "Added to cart",
        description: `${product.name} added to your cart`
      });
    }
  };

  const confirmAddToCart = () => {
    if (selectedSize) {
      addToCart(product, 1, selectedSize);
      toast({
        title: "Added to cart",
        description: `${product.name} (Size: ${selectedSize}) added to your cart`
      });
      setShowSizeDialog(false);
      setSelectedSize(undefined);
    } else {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <div className="group relative overflow-hidden transition-all duration-300 rounded-lg">
        {/* Favorite Button */}
        <button 
          className={`absolute right-3 top-3 z-10 bg-white rounded-full p-1.5 ${isWishlist ? 'opacity-100' : 'opacity-70 hover:opacity-100'} transition-opacity`}
          onClick={toggleWishlist}
        >
          <Heart className={`h-4 w-4 ${isWishlist ? 'fill-aura-purple text-aura-purple' : 'text-aura-purple'}`} />
        </button>
        
        {/* Share Button */}
        <button 
          className="absolute right-3 top-12 z-10 bg-white rounded-full p-1.5 opacity-70 hover:opacity-100 transition-opacity"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 text-aura-purple" />
        </button>
        
        {/* Product Image */}
        <Link to={`/products/${product.id}`} className="block relative h-80 overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Discount Badge */}
          {product.discount > 0 && (
            <span className="absolute top-3 left-3 bg-aura-purple text-white text-xs px-2 py-1 rounded">
              {product.discount}% OFF
            </span>
          )}
        </Link>
        
        {/* Product Info */}
        <div className="px-4 pt-4 pb-5">
          <h3 className="font-medium text-gray-900 mb-1">
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </h3>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                {product.discount > 0 ? (
                  <>
                    <span className="text-lg font-semibold">₹{product.salePrice}</span>
                    <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                  </>
                ) : (
                  <span className="text-lg font-semibold">₹{product.price}</span>
                )}
              </div>
            </div>
            
            <Button 
              onClick={handleAddToCart} 
              variant="outline" 
              size="sm" 
              className="text-aura-purple border-aura-purple hover:bg-aura-purple hover:text-white transition-colors"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      {/* Size Selection Dialog */}
      <Dialog open={showSizeDialog} onOpenChange={setShowSizeDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select Size</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-2 py-4">
            {product.size?.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                className={selectedSize === size ? "bg-aura-purple hover:bg-aura-dark-purple" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSizeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAddToCart} className="bg-aura-purple hover:bg-aura-dark-purple">
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Share Options Dialog */}
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
    </>
  );
};

export default ProductCard;
