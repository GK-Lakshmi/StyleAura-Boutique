
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon!",
    });
    
    // Clear the form
    form.reset();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-6 text-gray-600">
            Have questions about our products or services? We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Address</h3>
              <p className="text-gray-600">123 Fashion Street, Style City, SC 12345</p>
            </div>
            
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-gray-600">contact@styleaura.com</p>
            </div>
            
            <div>
              <h3 className="font-medium">Phone</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
            
            <div>
              <h3 className="font-medium">Hours</h3>
              <p className="text-gray-600">Monday - Saturday: 10:00 AM - 8:00 PM</p>
              <p className="text-gray-600">Sunday: 12:00 PM - 6:00 PM</p>
            </div>
          </div>
        </div>
        
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <Input id="name" type="text" placeholder="Your Name" required />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input id="email" type="email" placeholder="your.email@gmail.com" required />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <Input id="subject" type="text" placeholder="How can we help you?" required />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <Textarea 
                id="message" 
                placeholder="Tell us more about your inquiry..." 
                rows={5}
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-aura-purple hover:bg-aura-dark-purple">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
