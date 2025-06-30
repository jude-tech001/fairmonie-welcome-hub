
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, DollarSign, Loader2, CheckCircle } from 'lucide-react';

interface LoanPageProps {
  onBack: () => void;
}

const LoanPage: React.FC<LoanPageProps> = ({ onBack }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankName, setBankName] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [fairCode, setFairCode] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const banks = ['First Bank', 'GTBank', 'Access Bank', 'Zenith Bank', 'UBA', 'Fidelity Bank'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountNumber || !accountName || !bankName || !loanAmount || !fairCode) {
      return;
    }

    // Check faircode first
    if (fairCode !== 'F-187377') {
      setShowError(true);
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmProceed = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);

    // 7 seconds loading
    await new Promise(resolve => setTimeout(resolve, 7000));

    setIsLoading(false);
    setShowSuccess(true);
  };

  const handleSuccessOk = () => {
    setShowSuccess(false);
    setAccountNumber('');
    setAccountName('');
    setBankName('');
    setLoanAmount('');
    setFairCode('');
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Loan Approved!</h3>
              <p className="text-gray-600">
                Your loan application for ₦{loanAmount} has been approved successfully. The amount will be credited to your account shortly.
              </p>
            </div>
            <Button
              onClick={handleSuccessOk}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-full"
            >
              OK
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <h1 className="text-xl font-semibold text-gray-900">Apply for Loan</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number
                </label>
                <Input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter account number"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Name
                </label>
                <Input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Enter account name"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {banks.map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setBankName(bank)}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        bankName === bank
                          ? 'bg-green-100 border-green-500 text-green-700'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Loan Amount
                </label>
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="Enter loan amount"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fair Code
                </label>
                <Input
                  type="text"
                  value={fairCode}
                  onChange={(e) => setFairCode(e.target.value)}
                  placeholder="Enter your faircode"
                  className="w-full"
                />
              </div>

              {showError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">
                    Wrong faircode! Contact support to get your faircode.
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={!accountNumber || !accountName || !bankName || !loanAmount || !fairCode || isLoading}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-full disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing Application...
                  </>
                ) : (
                  'Proceed'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-md mx-auto rounded-2xl border-0 p-0 overflow-hidden bg-white fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="p-6 text-center space-y-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900">
                Confirm Loan Application
              </DialogTitle>
            </DialogHeader>
            <p className="text-gray-600">
              Loan request submitted. Are you sure all your details are correct?
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={() => setShowConfirmModal(false)}
                variant="outline"
                className="flex-1 h-12 rounded-full border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmProceed}
                className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full"
              >
                Proceed
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoanPage;
