
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Announcement from '@/components/Announcement';

const Index: React.FC = () => {
  return (
    <div>
      <Announcement 
        message="Summer Sale! Use code SUMMER20 for 20% off."
        link={{ text: "Shop now", url: "/products/category/sale" }}
      />
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Index;
