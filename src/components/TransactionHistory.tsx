
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface TransactionHistoryProps {
  onBack: () => void;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ onBack }) => {
  const transactions = [
    {
      id: 1,
      type: 'out',
      title: 'Transfer to AKANJI KAMORU ADE...',
      amount: 800.00,
      date: 'Jun 28th, 12:13:08',
      status: 'Successful'
    },
    {
      id: 2,
      type: 'in',
      title: 'Transfer from BLUE PAY LTD',
      amount: 200000.00,
      date: 'Jun 28th, 08:33:04',
      status: 'Successful'
    }
  ];

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
          <h1 className="text-xl font-semibold text-gray-900">Transaction History</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No transactions made</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className="bg-white shadow-sm border border-gray-100">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'in' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'in' ? (
                        <ArrowDownLeft className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{transaction.title}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'in' ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {transaction.type === 'in' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-green-500">{transaction.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
