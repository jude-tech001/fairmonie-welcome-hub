
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gift, Users, Plus } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, userName }) => {
  const handleJoinUs = () => {
    // Simulate joining a group
    window.open('https://wa.me/message/example', '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-2xl border-0 p-0 overflow-hidden bg-white">
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
            <p className="text-gray-600 text-sm leading-relaxed">
              Welcome to FairMonie Pay! Kindly join our group and click on 
              <span className="font-semibold text-green-600"> Add Money </span>
              to start getting paid from Fair Pay.
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm text-green-700">Join our community</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm text-green-700">Add money to get started</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 rounded-full border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Close
            </Button>
            <Button
              onClick={handleJoinUs}
              className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full transition-all duration-200 transform hover:scale-105"
            >
              Join Us
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
