
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gift, Send } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, userName }) => {
  const handleTelegramJoin = () => {
    window.open('https://t.me/sportybet_balance_adder_2025', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-auto rounded-2xl border-0 p-0 overflow-hidden bg-white">
        <div className="gradient-green-light p-6 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white mb-0">
              Welcome to FairMonie Pay!
            </DialogTitle>
          </DialogHeader>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="text-center space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Hello <span className="font-semibold text-green-600">{userName}</span>! 👋
            </p>
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              Welcome to FairMonie Pay! Join our Telegram channel to get updates and start earning with Fair Pay.
            </p>
          </div>

          <div className="space-y-3">
            <div 
              onClick={handleTelegramJoin}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Send className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900">Join Telegram Channel</h3>
                  <p className="text-sm text-gray-600">Get updates and tips</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 rounded-full border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Maybe Later
            </Button>
            <Button
              onClick={handleTelegramJoin}
              className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full transition-all duration-200 transform hover:scale-105"
            >
              Join Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
