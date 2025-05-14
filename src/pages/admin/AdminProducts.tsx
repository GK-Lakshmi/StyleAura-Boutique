
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Plus, Trash, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockProducts } from '@/data/mockData';
import { Product } from '@/types';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AdminProducts: React.FC = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  
  // New product form state
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    size: ['Free Size'],
    available: true,
    inStock: 10,
    discount: 0
  });

  // Filtered products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle product edit
  const handleEditClick = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  // Handle product delete
  const handleDeleteClick = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Handle form input changes for new product
  const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'discount' || name === 'inStock' ? Number(value) : value
    }));
  };

  // Handle form input changes for editing product
  const handleEditProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!currentProduct) return;
    
    const { name, value } = e.target;
    setCurrentProduct(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        [name]: name === 'price' || name === 'discount' || name === 'inStock' ? Number(value) : value
      };
    });
  };

  // Handle new product submit
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add new product with a generated ID
    const newProductWithId = {
      ...newProduct,
      id: `product-${products.length + 1}`,
      salePrice: newProduct.discount && newProduct.price 
        ? Math.round(newProduct.price * (1 - (newProduct.discount / 100))) 
        : undefined
    } as Product;
    
    setProducts([...products, newProductWithId]);
    
    toast({
      title: 'Product added',
      description: `${newProductWithId.name} has been added to the catalog.`
    });
    
    setIsAddDialogOpen(false);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      category: '',
      imageUrl: '',
      size: ['Free Size'],
      available: true,
      inStock: 10,
      discount: 0
    });
  };

  // Handle edit product submit
  const handleEditProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentProduct) return;
    
    // Update the product
    const updatedProducts = products.map(product => 
      product.id === currentProduct.id 
        ? {
            ...currentProduct,
            salePrice: currentProduct.discount && currentProduct.price 
              ? Math.round(currentProduct.price * (1 - (currentProduct.discount / 100))) 
              : undefined
          } 
        : product
    );
    
    setProducts(updatedProducts);
    
    toast({
      title: 'Product updated',
      description: `${currentProduct.name} has been updated.`
    });
    
    setIsEditDialogOpen(false);
    setCurrentProduct(null);
  };

  // Handle delete product submit
  const handleDeleteProductSubmit = () => {
    if (!currentProduct) return;
    
    // Remove the product
    const filteredProducts = products.filter(product => product.id !== currentProduct.id);
    setProducts(filteredProducts);
    
    toast({
      title: 'Product deleted',
      description: `${currentProduct.name} has been removed from the catalog.`,
      variant: 'destructive'
    });
    
    setIsDeleteDialogOpen(false);
    setCurrentProduct(null);
  };

  const categories = [
    { value: "sarees", label: "Sarees" },
    { value: "kurtis", label: "Kurtis" },
    { value: "gowns", label: "Gowns" },
    { value: "indo-western", label: "Indo-Western" },
    { value: "lehengas", label: "Lehengas" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-aura-purple hover:bg-aura-dark-purple flex items-center gap-2">
              <Plus size={16} /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleAddProductSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new product to your catalog.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    className="col-span-3"
                    value={newProduct.name}
                    onChange={handleNewProductChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price (₹)
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    className="col-span-3"
                    value={newProduct.price || ''}
                    onChange={handleNewProductChange}
                    min={0}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="discount" className="text-right">
                    Discount (%)
                  </Label>
                  <Input
                    id="discount"
                    name="discount"
                    type="number"
                    className="col-span-3"
                    value={newProduct.discount || ''}
                    onChange={handleNewProductChange}
                    min={0}
                    max={100}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <select
                    id="category"
                    name="category"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newProduct.category}
                    onChange={handleNewProductChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    className="col-span-3"
                    rows={3}
                    value={newProduct.description}
                    onChange={handleNewProductChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="imageUrl" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    className="col-span-3"
                    value={newProduct.imageUrl}
                    onChange={handleNewProductChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="inStock" className="text-right">
                    Stock Count
                  </Label>
                  <Input
                    id="inStock"
                    name="inStock"
                    type="number"
                    className="col-span-3"
                    value={newProduct.inStock || ''}
                    onChange={handleNewProductChange}
                    min={0}
                    required
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-aura-purple hover:bg-aura-dark-purple">
                  Add Product
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Search and Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Search Products</CardTitle>
          <CardDescription>
            Find products by name or category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Products Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
          <CardDescription>
            Manage your product catalog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="h-16 w-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      {product.discount > 0 ? (
                        <div>
                          <span className="font-semibold">₹{product.salePrice}</span>{' '}
                          <span className="text-sm line-through text-gray-500">₹{product.price}</span>
                        </div>
                      ) : (
                        <span>₹{product.price}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`${product.inStock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                        {product.inStock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditClick(product)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-500"
                          onClick={() => handleDeleteClick(product)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          {currentProduct && (
            <form onSubmit={handleEditProductSubmit}>
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>
                  Update the details of {currentProduct.name}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    name="name"
                    className="col-span-3"
                    value={currentProduct.name}
                    onChange={handleEditProductChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-price" className="text-right">
                    Price (₹)
                  </Label>
                  <Input
                    id="edit-price"
                    name="price"
                    type="number"
                    className="col-span-3"
                    value={currentProduct.price}
                    onChange={handleEditProductChange}
                    min={0}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-discount" className="text-right">
                    Discount (%)
                  </Label>
                  <Input
                    id="edit-discount"
                    name="discount"
                    type="number"
                    className="col-span-3"
                    value={currentProduct.discount || 0}
                    onChange={handleEditProductChange}
                    min={0}
                    max={100}
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-category" className="text-right">
                    Category
                  </Label>
                  <select
                    id="edit-category"
                    name="category"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={currentProduct.category}
                    onChange={handleEditProductChange}
                    required
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="edit-description"
                    name="description"
                    className="col-span-3"
                    rows={3}
                    value={currentProduct.description}
                    onChange={handleEditProductChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-imageUrl" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="edit-imageUrl"
                    name="imageUrl"
                    className="col-span-3"
                    value={currentProduct.imageUrl}
                    onChange={handleEditProductChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-inStock" className="text-right">
                    Stock Count
                  </Label>
                  <Input
                    id="edit-inStock"
                    name="inStock"
                    type="number"
                    className="col-span-3"
                    value={currentProduct.inStock || 0}
                    onChange={handleEditProductChange}
                    min={0}
                    required
                  />
                </div>
                
                {/* Preview image */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right">Preview</div>
                  <div className="col-span-3">
                    <img
                      src={currentProduct.imageUrl}
                      alt={currentProduct.name}
                      className="h-32 w-32 object-cover rounded"
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-aura-purple hover:bg-aura-dark-purple">
                  Update Product
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentProduct?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProductSubmit}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
