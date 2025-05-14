
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

const FAQ: React.FC = () => {
  const faqCategories: FAQCategory[] = [
    {
      category: 'Shopping & Orders',
      items: [
        {
          question: 'How do I place an order?',
          answer: 'To place an order, browse our products, select the items you like, add them to your cart, and proceed to checkout. Follow the instructions to enter your shipping address and payment information.'
        },
        {
          question: 'Can I modify my order after placing it?',
          answer: 'Orders can only be modified within 1 hour of placing them. Please contact our customer service immediately if you need to make changes.'
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also check your order status in your account dashboard under "Orders".'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept credit/debit cards (Visa, MasterCard, American Express), UPI, net banking, and cash on delivery (COD) for orders under ₹10,000.'
        },
        {
          question: 'Are there any discounts for bulk orders?',
          answer: 'Yes, we offer special discounts for bulk orders. Please contact our customer service for custom quotes.'
        }
      ]
    },
    {
      category: 'Shipping & Delivery',
      items: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. International shipping takes 10-14 business days.'
        },
        {
          question: 'Do you offer free shipping?',
          answer: 'Yes, we offer free standard shipping on all orders above ₹999 within India.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to select countries. International shipping costs vary by location and will be calculated at checkout.'
        },
        {
          question: 'What happens if I\'m not available to receive my delivery?',
          answer: 'Our courier partners will attempt delivery 3 times. If unable to deliver, the package will be returned to the nearest collection point where you can collect it within 7 days.'
        },
        {
          question: 'Do you deliver to all areas in India?',
          answer: 'We deliver to most areas in India. However, there may be remote locations where our courier partners have limited access. The system will notify you during checkout if we cannot deliver to your area.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      items: [
        {
          question: 'What is your return policy?',
          answer: 'We accept returns within 7 days of delivery. Items must be unworn, unwashed, with original tags, and in their original packaging.'
        },
        {
          question: 'How do I initiate a return?',
          answer: 'Log in to your account, go to your order history, select the items you wish to return, and follow the instructions to generate a return label.'
        },
        {
          question: 'Do I need to pay for return shipping?',
          answer: 'Return shipping is free for defective or incorrect items. For size exchanges or other return reasons, a shipping fee may be deducted from your refund.'
        },
        {
          question: 'How long does the refund process take?',
          answer: 'Once we receive and inspect your return, refunds are processed within 5-7 business days. The time it takes for the refund to appear in your account depends on your payment method and financial institution.'
        },
        {
          question: 'Can I exchange an item for a different size or color?',
          answer: 'Yes, exchanges are allowed within 7 days of delivery. Follow the same return process but select "Exchange" instead of "Return" in your order history.'
        }
      ]
    },
    {
      category: 'Product Information',
      items: [
        {
          question: 'How do I find the right size?',
          answer: 'We provide detailed size guides for all our products. You can find the size guide on each product page. If you\'re still unsure, please contact our customer service for assistance.'
        },
        {
          question: 'Are the colors accurate in the product photos?',
          answer: 'We make every effort to display product colors accurately, but screen settings can affect how colors appear. There might be slight variations between the actual product and the images.'
        },
        {
          question: 'How do I care for my garments?',
          answer: 'Care instructions are provided on the product tags. Generally, we recommend dry cleaning for sarees and delicate items, and gentle machine or hand wash for cotton kurtis.'
        },
        {
          question: 'Are the products handmade?',
          answer: 'Many of our products feature handcrafted elements like embroidery, block prints, or handloom weaving. Product descriptions specify which parts are handcrafted.'
        },
        {
          question: 'Can I get custom alterations?',
          answer: "We don't offer custom alterations directly, but we do provide detailed measurements to help you get alterations done locally after purchase."
        }
      ]
    },
    {
      category: 'Account & Privacy',
      items: [
        {
          question: 'How do I create an account?',
          answer: 'Click on the "Register" button at the top of the page and fill out the registration form with your details.'
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'Click on the "Login" button, then select "Forgot Password". Enter your email address to receive a password reset link.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we use industry-standard encryption and security measures to protect your personal information. Please review our Privacy Policy for more details.'
        },
        {
          question: 'Can I delete my account?',
          answer: 'Yes, you can request account deletion from your account settings or by contacting our customer service.'
        },
        {
          question: 'Do you share my information with third parties?',
          answer: 'We only share your information with trusted partners necessary for order processing and delivery. We never sell your data to third parties.'
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h1>
      <p className="text-center text-gray-600 mb-10">Find answers to the most common questions about our products and services.</p>
      
      <div className="space-y-8">
        {faqCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold mb-4 text-aura-dark-purple">{category.category}</h2>
            
            <Accordion type="single" collapsible className="w-full">
              {category.items.map((item, itemIndex) => (
                <AccordionItem value={`item-${index}-${itemIndex}`} key={itemIndex}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
      
      <div className="mt-10 bg-gray-50 p-6 rounded-lg text-center">
        <h3 className="text-lg font-medium mb-2">Still have questions?</h3>
        <p className="mb-4 text-gray-600">Our customer support team is here to help you.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/contact" className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-aura-purple hover:bg-aura-dark-purple">
            Contact Us
          </a>
          <a href="mailto:support@styleaura.com" className="inline-flex items-center justify-center px-6 py-2 border border-aura-purple text-base font-medium rounded-md text-aura-purple bg-white hover:bg-aura-purple/10">
            Email Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
