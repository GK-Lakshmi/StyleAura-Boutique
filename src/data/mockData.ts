
import { Product, Order, User } from '@/types';
import { lehengaProducts } from './lehengas';
import { newArrivalsProducts } from './newArrivals';
import { bestSellersProducts } from './bestSellers';
import { specialCollectionProducts } from './collections';

// Original Products
const originalProducts: Product[] = [
  {
    id: "1",
    name: "Classic Chanderi Silk Saree",
    price: 4999,
    salePrice: 3999,
    discount: 20,
    description: "Elegant Chanderi silk saree with golden zari work border and handcrafted designs.",
    imageUrl: "https://www.taneira.com/dw/image/v2/BKMH_PRD/on/demandware.static/-/Sites-Taneira-product-catalog/default/dwc2a01f7b/images/Taneira/Catalog/SAPH01AA0408_1.jpg?sw=480&sh=728",
    category: "sarees",
    size: ["Free Size"],
    available: true,
    inStock: 10,
    colors: ["Pink", "Blue", "Green"],
    tags: ["festive", "wedding", "silk"]
  },
  {
    id: "2",
    name: "Embroidered Anarkali Suit",
    price: 6499,
    salePrice: 5499,
    discount: 15,
    description: "Beautiful Anarkali suit with intricate embroidery, perfect for festive occasions.",
    imageUrl: "https://www.rozinaa.com/cdn/shop/products/image00007_0b572d55-26d9-43da-a292-32778f9ab266.jpg?v=1698660067",
    category: "kurtis",
    size: ["S", "M", "L", "XL"],
    available: true,
    inStock: 8,
    colors: ["Red", "Navy", "Black"],
    tags: ["festive", "party", "embroidered"]
  },
  {
    id: "3",
    name: "Designer Party Gown",
    price: 7999,
    salePrice: 6499,
    discount: 18,
    description: "Elegant designer party gown with modern cut and premium fabric for a sophisticated look.",
    imageUrl: "https://i.pinimg.com/474x/6e/be/e5/6ebee5332572a99ecb2a651641c65df4.jpg",
    category: "gowns",
    size: ["XS", "S", "M", "L"],
    available: true,
    inStock: 5,
    colors: ["Black", "Maroon", "Navy"],
    tags: ["party", "designer", "premium"]
  },
  {
    id: "4",
    name: "Fusion Dhoti Style Dress",
    price: 3999,
    salePrice: 3599,
    discount: 10,
    description: "Modern dhoti style dress that combines traditional elements with contemporary fashion.",
    imageUrl: "https://cdn-appdata.seasonsindia.com/uploads/feature_images/U8A1451.jpg",
    category: "indo-western",
    size: ["S", "M", "L"],
    available: true,
    inStock: 12,
    colors: ["Beige", "Blue", "Grey"],
    tags: ["casual", "fusion", "trendy"]
  },
  // Add more products as needed
];

// Combine all products
export const mockProducts: Product[] = [
  ...originalProducts,
  ...lehengaProducts,
  ...newArrivalsProducts,
  ...bestSellersProducts,
  ...specialCollectionProducts
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: "order1",
    userId: "user1",
    items: [
      {
        productId: "1",
        quantity: 1,
        price: 3999
      },
      {
        productId: "2",
        quantity: 2,
        price: 5499
      }
    ],
    total: 14997,
    status: "Delivered",
    date: "2025-05-01",
    shippingAddress: {
      name: 'Meena',
      address: '123 Main Street',
      city: 'Chennai',
      state: 'Tamilnadu',
      pincode: '275321',
      phone: '9876543210'
    }
  },
  {
    id: "order2",
    userId: "user1",
    items: [
      {
        productId: "3",
        quantity: 1,
        price: 6499
      }
    ],
    total: 6499,
    status: "Processing",
    date: "2025-05-05",
    shippingAddress: {
      name: 'Jamuna',
      address: '182E Gandhi Street',
      city: 'Tirunelveli',
      state: 'Tamilnadu',
      pincode: '402201',
      phone: '9876543210'
    }
  },
  {
    id: "order3",
    userId: "user1",
    items: [
      {
        productId: "4",
        quantity: 1,
        price: 3599
      }
    ],
    total: 3599,
    status: "Shipped",
    date: "2025-05-08",
    shippingAddress: {
      name: 'Delsin',
      address: '123 Main Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '640001',
      phone: '9876543210'
    }
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Shyam",
    email: "Shyam@example.com",
    role: "user",
    address: {
      street: "123 Main St, Apt 4B",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    phone: "+91 9876543210"
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin"
  }
];
