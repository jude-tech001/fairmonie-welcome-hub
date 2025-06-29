
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMoneyModal: React.FC<AddMoneyModalProps> = ({ isOpen, onClose }) => {
  const [stage, setStage] = useState<'loading' | 'success'>('loading');

  useEffect(() => {
    if (isOpen) {
      setStage('loading');
      const timer = setTimeout(() => {
        setStage('success');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setStage('loading');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md mx-auto rounded-2xl border-0 p-0 overflow-hidden bg-white">
        {stage === 'loading' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-green-600">
              <Loader2 className="w-16 h-16 animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Claiming Bonus in Progress
            </h3>
            <p className="text-gray-600">
              Please wait while we process your bonus claim...
            </p>
          </div>
        )}

        {stage === 'success' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 text-green-600">
              <CheckCircle className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Successful!
            </h3>
            <p className="text-gray-600 mb-6">
              Claimed FairMonie bonus of <span className="font-semibold text-green-600">₦250,000</span>
            </p>
            <Button
              onClick={handleClose}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-full transition-all duration-200"
            >
              OK
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddMoneyModal;
