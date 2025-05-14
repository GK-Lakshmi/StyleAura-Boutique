
import React from 'react';
import { Truck, Package, Clock, Info, ArrowDown, RefreshCcw } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Shipping: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-center mb-10">Shipping & Returns</h1>
      
      {/* Shipping Information */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Truck className="mr-2 h-6 w-6 text-aura-purple" />
          Shipping Information
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="bg-aura-purple/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-aura-purple" />
            </div>
            <h3 className="text-lg font-medium mb-2">Free Standard Shipping</h3>
            <p className="text-gray-600">On all orders above ₹999. Standard delivery takes 5-7 business days.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="bg-aura-purple/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-aura-purple" />
            </div>
            <h3 className="text-lg font-medium mb-2">Express Shipping</h3>
            <p className="text-gray-600">Get your order within 2-3 business days for an additional fee of ₹200.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="bg-aura-purple/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Info className="h-6 w-6 text-aura-purple" />
            </div>
            <h3 className="text-lg font-medium mb-2">International Shipping</h3>
            <p className="text-gray-600">We ship to select countries. International shipping takes 10-14 business days.</p>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-medium text-lg mb-3">Shipping Process</h3>
          <ol className="space-y-6">
            <li className="flex">
              <div className="mr-4 bg-aura-purple text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center">1</div>
              <div>
                <h4 className="font-medium">Order Placement</h4>
                <p className="text-gray-600">Your order is confirmed once payment is completed.</p>
              </div>
            </li>
            <li className="flex">
              <div className="mr-4 bg-aura-purple text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center">2</div>
              <div>
                <h4 className="font-medium">Order Processing</h4>
                <p className="text-gray-600">We process your order within 24-48 hours.</p>
              </div>
            </li>
            <li className="flex">
              <div className="mr-4 bg-aura-purple text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center">3</div>
              <div>
                <h4 className="font-medium">Quality Check</h4>
                <p className="text-gray-600">All products undergo a thorough quality check before shipping.</p>
              </div>
            </li>
            <li className="flex">
              <div className="mr-4 bg-aura-purple text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center">4</div>
              <div>
                <h4 className="font-medium">Shipping</h4>
                <p className="text-gray-600">Your order is handed over to our shipping partner with tracking information.</p>
              </div>
            </li>
            <li className="flex">
              <div className="mr-4 bg-aura-purple text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center">5</div>
              <div>
                <h4 className="font-medium">Delivery</h4>
                <p className="text-gray-600">Your package is delivered to your provided address.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
      
      {/* Returns Information */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <RefreshCcw className="mr-2 h-6 w-6 text-aura-purple" />
          Returns Policy
        </h2>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
          <p className="mb-4">At StyleAura, we want you to be completely satisfied with your purchase. If for any reason you're not happy with your order, we offer a simple and hassle-free return process.</p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-medium text-lg mb-3">Return Eligibility</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="text-aura-purple mr-2">•</div>
                  <span>Items must be returned within 7 days of delivery</span>
                </li>
                <li className="flex items-start">
                  <div className="text-aura-purple mr-2">•</div>
                  <span>Products must be unworn, unwashed, and with original tags</span>
                </li>
                <li className="flex items-start">
                  <div className="text-aura-purple mr-2">•</div>
                  <span>Original packaging must be intact</span>
                </li>
                <li className="flex items-start">
                  <div className="text-aura-purple mr-2">•</div>
                  <span>Sale items can only be exchanged, not returned</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Non-Returnable Items</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="text-aura-purple mr-2">•</div>
                  <span>Customized or personalized products</span>
                </li>
                <li className="flex items-start">
                  <div className="text-aura-purple mr-2">•</div>
                  <span>Items marked as non-returnable</span>
                </li>
                <li className="flex items-start">
                  <div className="text-aura-purple mr-2">•</div>
                  <span>Products with signs of wear or damage by customer</span>
                </li>
                <li className="flex items-start">
                  <div className="text-aura-purple mr-2">•</div>
                  <span>Intimate apparel and accessories for hygiene reasons</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-medium text-lg mb-3">Return Process</h3>
          <ol className="space-y-6">
            <li className="flex">
              <div className="mr-4 bg-aura-purple text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center">1</div>
              <div>
                <h4 className="font-medium">Initiate Return</h4>
                <p className="text-gray-600">Log in to your account, go to order history, and select the items you wish to return.</p>
              </div>
            </li>
            <li className="flex">
              <div className="mr-4 bg-aura-purple text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center">2</div>
              <div>
                <h4 className="font-medium">Pack the Items</h4>
                <p className="text-gray-600">Pack the items securely in their original packaging with all tags attached.</p>
              </div>
            </li>
            <li className="flex">
              <div className="mr-4 bg-aura-purple text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center">3</div>
              <div>
                <h4 className="font-medium">Ship the Items</h4>
                <p className="text-gray-600">Use the prepaid return label provided or ship to the address provided.</p>
              </div>
            </li>
            <li className="flex">
              <div className="mr-4 bg-aura-purple text-white rounded-full w-6 h-6 flex-shrink-0 flex items-center justify-center">4</div>
              <div>
                <h4 className="font-medium">Refund Processing</h4>
                <p className="text-gray-600">Once we receive and inspect the return, we'll process your refund within 5-7 business days.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
      
      {/* FAQs */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <ArrowDown className="mr-2 h-6 w-6 text-aura-purple" />
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">How long does shipping take?</AccordionTrigger>
            <AccordionContent>
              Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. International shipping takes 10-14 business days.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">Do you ship internationally?</AccordionTrigger>
            <AccordionContent>
              Yes, we ship to select countries. International shipping costs vary by location and will be calculated at checkout.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">How can I track my order?</AccordionTrigger>
            <AccordionContent>
              Once your order ships, you'll receive a tracking number via email. You can also check your order status in your account dashboard.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">Can I exchange an item for a different size?</AccordionTrigger>
            <AccordionContent>
              Yes, exchanges are allowed within 7 days of delivery. Follow the same return process but select "Exchange" instead of "Return" in your order history.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">How long does the refund process take?</AccordionTrigger>
            <AccordionContent>
              Once we receive and inspect your return, refunds are processed within 5-7 business days. The time it takes for the refund to appear in your account depends on your payment method and financial institution.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Shipping;
