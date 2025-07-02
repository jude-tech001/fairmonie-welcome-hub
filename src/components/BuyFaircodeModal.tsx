import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Loader2, CreditCard, AlertCircle } from 'lucide-react';

interface BuyFaircodeModalProps {
  onBack: () => void;
  user: { name: string; email: string };
}

const BuyFaircodeModal: React.FC<BuyFaircodeModalProps> = ({ onBack, user }) => {
  const [step, setStep] = useState<'form' | 'loading' | 'payment' | 'confirm' | 'declined'>('form');
  const [fullName, setFullName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleProceedToPayment = async () => {
    if (!fullName.trim() || !email.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setStep('loading');
    setIsLoading(true);

    // 7 seconds loading
    setTimeout(() => {
      setIsLoading(false);
      setStep('payment');
    }, 7000);
  };

  const handlePaymentConfirm = () => {
    setStep('confirm');
    setIsLoading(true);

    // 10 seconds loading then decline
    setTimeout(() => {
      setIsLoading(false);
      setStep('declined');
    }, 10000);
  };

  if (step === 'form') {
    return (
      <div className="min-h-screen bg-green-50">
        {/* Header */}
        <div className="bg-green-600 px-4 py-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-green-700 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-xl font-semibold text-white">Buy Faircode</h1>
          </div>
        </div>

        <div className="px-4 py-6">
          <Card className="border-green-200 shadow-lg">
            <CardHeader className="bg-green-100">
              <CardTitle className="text-green-800 text-center">
                <CreditCard className="w-8 h-8 mx-auto mb-2" />
                Faircode Purchase
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">₦8,200</div>
                <p className="text-gray-600">One-time purchase</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 border-green-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-12 border-green-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <Button
                onClick={handleProceedToPayment}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"
              >
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <Card className="w-full max-w-sm border-green-200">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Processing...</h3>
            <p className="text-green-600">Preparing payment account details</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-green-50">
        {/* Header */}
        <div className="bg-green-600 px-4 py-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setStep('form')}
              className="p-2 hover:bg-green-700 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-xl font-semibold text-white">Make Payment</h1>
          </div>
        </div>

        <div className="px-4 py-6 flex items-center justify-center">
          <Card className="w-full max-w-sm border-green-200 shadow-lg">
            <CardContent className="p-4 space-y-3">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                    <div className="w-3 h-1 bg-white rounded"></div>
                  </div>
                </div>
                
                <h2 className="text-lg font-semibold text-green-800 mb-2">Make Payment</h2>
                <p className="text-green-600 text-sm mb-4">Transfer to the account below</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <div>
                    <p className="text-xs text-gray-600">Account Number</p>
                    <p className="font-semibold text-sm">1100806996</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <div>
                    <p className="text-xs text-gray-600">Bank</p>
                    <p className="font-semibold text-sm">9PSB BANK</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <div>
                    <p className="text-xs text-gray-600">Account Name</p>
                    <p className="font-semibold text-sm">fairPay-Jude Samuel</p>
                  </div>
                </div>
              </div>

              <div className="p-2 bg-green-50 border border-green-200 rounded">
                <p className="text-xs text-gray-600">Fee</p>
                <p className="text-xl font-bold text-green-600">₦8,200</p>
              </div>

              <Button
                onClick={handlePaymentConfirm}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full text-sm"
              >
                I have paid
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <Card className="w-full max-w-sm border-green-200">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Confirming...</h3>
            <p className="text-green-600">Confirming with Flutterwave payment</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'declined') {
    return (
      <div className="min-h-screen bg-green-50">
        {/* Header */}
        <div className="bg-red-600 px-4 py-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-red-700 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-xl font-semibold text-white">Payment Status</h1>
          </div>
        </div>

        <div className="px-4 py-6">
          <Card className="border-red-200 shadow-lg">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-600 mb-4">Payment Not Confirmed</h3>
              <p className="text-gray-700 mb-6">
                Payment not confirmed. Please don't dispute any transfer to us. Contact support instead.
              </p>
              <Button
                onClick={onBack}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default BuyFaircodeModal;
