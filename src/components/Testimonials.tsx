
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Singh',
    role: 'Loyal Customer',
    content: 'StyleAura has completely transformed my wardrobe. The materials are luxurious, the designs unique, and the customer service exceptional. I always receive compliments when I wear their pieces.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=32'
  },
  {
    id: 2,
    name: 'Anjali Patel',
    role: 'Fashion Blogger',
    content: 'As someone who reviews fashion for a living, I can confidently say that StyleAura stands out in quality and craftsmanship. Their attention to detail is unmatched in the industry.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=26'
  },
  {
    id: 3,
    name: 'Ravi Sharma',
    role: 'Gift Purchaser',
    content: 'I was searching for the perfect anniversary gift for my wife, and StyleAura exceeded my expectations. The packaging was beautiful and the saree was even more stunning in person.',
    rating: 4,
    image: 'https://i.pravatar.cc/150?img=53'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="aura-container">
        <h2 className="text-3xl font-bold text-center mb-2">What Our Customers Say</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover why our customers love StyleAura's unique blend of tradition and contemporary fashion.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < testimonial.rating ? "#9b87f5" : "none"}
                      stroke={i < testimonial.rating ? "#9b87f5" : "#d1d5db"}
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
