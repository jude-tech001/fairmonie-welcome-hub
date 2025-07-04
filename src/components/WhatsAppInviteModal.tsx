
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Gift } from 'lucide-react';

interface WhatsAppInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string };
}

const WhatsAppInviteModal: React.FC<WhatsAppInviteModalProps> = ({ isOpen, onClose, user }) => {
  const referralCode = `FMP${user.name.toUpperCase().slice(0, 3)}${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const referralLink = `https://fairmoniepayregistration.vercel.app/?ref=${referralCode}`;

  const handleWhatsAppShare = () => {
    const shareText = `Join fairmonie Pay and get ₦250,000 welcome bonus instantly! I'm already earning with Fairmonie pay. Sign up using my link: ${referralLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto p-0 bg-white rounded-3xl overflow-hidden border-0 shadow-2xl">
        {/* Header with close button */}
        <div className="relative bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Refer & Earn</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          {/* Gift Icon */}
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-yellow-600" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-2">Earn ₦6,500!</h2>

          {/* Description */}
          <div className="text-sm text-gray-600 mb-4 space-y-1">
            <p>Invite your friends using your referral link.</p>
            <p>Earn ₦6,500 for each successful signup.</p>
            <p>Get a discount on your PAY ID purchase.</p>
          </div>

          {/* WhatsApp Share Button */}
          <Button
            onClick={handleWhatsAppShare}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-medium text-base mb-4 transition-all duration-200 transform hover:scale-105"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Share on WhatsApp
          </Button>

          {/* Bottom text */}
          <p className="text-xs text-gray-500">
            Start earning and save on PAY ID costs today!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppInviteModal;
