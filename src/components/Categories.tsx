
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'sarees',
    name: 'Sarees',
    image: 'https://www.rozinaa.com/cdn/shop/products/image00005_9aa2ed3c-b39c-4044-b3e9-1b9cf7645d67.jpg?v=1698666123',
    description: 'Traditional elegance for every occasion'
  },
  {
    id: 'kurtis',
    name: 'Kurtis',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3',
    description: 'Comfort meets style in our kurti collection'
  },
  {
    id: 'gowns',
    name: 'Gowns',
    image: 'https://www.rozinaa.com/cdn/shop/products/Rozina_AliaAlRufai_Nayab_Shot2_21-09-238142.jpg?v=1698663691&width=533',
    description: 'Statement pieces for special moments'
  },
  {
    id: 'lehengas',
    name: 'Lehengas',
    image: 'https://www.rozinaa.com/cdn/shop/collections/Lehengas.jpg?v=1702619806',
    description: 'Traditional bridal and occasion wear'
  },
  {
    id: 'indo-western',
    name: 'Indo-Western',
    image: 'https://www.rozinaa.com/cdn/shop/products/Rozina_AliaAlRufai_Nayab_21-09-237837.jpg?v=1698689485&width=533',
    description: 'The perfect fusion of tradition and modernity'
  }
];

const Categories: React.FC = () => {
  return (
    <section className="py-16 bg-aura-soft-gray">
      <div className="aura-container">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link 
              to={`/products/category/${category.id}`} 
              key={category.id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
