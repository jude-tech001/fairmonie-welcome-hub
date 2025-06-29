
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Eye, 
  History, 
  Users, 
  Building, 
  TrendingUp, 
  Smartphone, 
  Wifi, 
  Target, 
  Tv, 
  ShieldCheck, 
  DollarSign, 
  UserPlus, 
  MoreHorizontal,
  Headphones,
  Maximize,
  Bell,
  Gift
} from 'lucide-react';

interface User {
  name: string;
  email: string;
}

interface DashboardProps {
  user: User;
  onAddMoney: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onAddMoney }) => {
  const [balance] = useState(0.00);
  const [showBalance, setShowBalance] = useState(true);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);

  const quickActions = [
    { title: 'Support', icon: Users, color: 'bg-green-100 text-green-600' },
    { title: 'Groups', icon: Building, color: 'bg-green-100 text-green-600' },
    { title: 'Withdraw', icon: TrendingUp, color: 'bg-green-100 text-green-600' }
  ];

  const services = [
    { title: 'Airtime', icon: Smartphone, color: 'bg-green-100 text-green-600' },
    { title: 'Data', icon: Wifi, color: 'bg-green-100 text-green-600' },
    { title: 'Betting', icon: Target, color: 'bg-green-100 text-green-600' },
    { title: 'TV', icon: Tv, color: 'bg-green-100 text-green-600' },
    { title: 'Safebox', icon: ShieldCheck, color: 'bg-green-100 text-green-600' },
    { title: 'Loan', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { title: 'Invitation', icon: UserPlus, color: 'bg-green-100 text-green-600' },
    { title: 'More', icon: MoreHorizontal, color: 'bg-green-100 text-green-600' }
  ];

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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-green-100 text-green-600 font-semibold">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-lg font-medium text-gray-900">Hi, {user.name}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Headphones className="w-6 h-6 text-gray-600" />
            <Maximize className="w-6 h-6 text-gray-600" />
            <button
              onClick={() => setShowTransactionHistory(true)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Balance Card */}
        <Card className="gradient-green text-white border-0 shadow-lg animate-slideUp">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm font-medium">Available Balance</span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center mb-6">
              <div className="text-3xl font-bold mb-4">
                {showBalance ? `₦${balance.toLocaleString()}.00` : '****'}
              </div>
              <Button
                onClick={onAddMoney}
                className="bg-white text-green-600 hover:bg-gray-50 rounded-full px-6 py-2 font-medium transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Money
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mx-auto mb-3`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-700">{action.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-4 gap-4">
          {services.map((service, index) => (
            <Card key={index} className="bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-3 text-center">
                <div className={`w-10 h-10 rounded-full ${service.color} flex items-center justify-center mx-auto mb-2`}>
                  <service.icon className="w-5 h-5" />
                </div>
                <p className="text-xs font-medium text-gray-700">{service.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Promotional Banner */}
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold">Cash up for grabs!</p>
                <p className="text-sm opacity-90">Invite friends to earn up to ₦5,600 Bonus</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History Modal */}
      <Dialog open={showTransactionHistory} onOpenChange={setShowTransactionHistory}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <History className="w-5 h-5 text-green-600" />
              <span>Transaction History</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-96 overflow-y-auto">
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
