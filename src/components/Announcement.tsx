
import React from 'react';
import { X } from 'lucide-react';

interface AnnouncementProps {
  message: string;
  link?: {
    text: string;
    url: string;
  };
}

const Announcement: React.FC<AnnouncementProps> = ({ message, link }) => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-aura-purple text-white py-2">
      <div className="aura-container flex justify-between items-center">
        <div className="flex-1"></div>
        <p className="text-center flex-1 text-sm">
          {message}
          {link && (
            <a 
              href={link.url} 
              className="underline ml-1 font-medium hover:text-white/90 transition-colors"
            >
              {link.text}
            </a>
          )}
        </p>
        <div className="flex-1 flex justify-end">
          <button 
            onClick={() => setIsVisible(false)}
            className="focus:outline-none hover:text-white/80 transition-colors"
            aria-label="Close announcement"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
