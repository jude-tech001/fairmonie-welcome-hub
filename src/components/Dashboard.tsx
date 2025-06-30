import React, { useState, useEffect } from 'react';
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
  LogOut, 
  DollarSign, 
  UserPlus, 
  MoreHorizontal,
  Headphones,
  Maximize,
  Bell,
  Gift,
  Loader2,
  ShieldCheck,
  MessageCircle,
  Mail,
  Bot,
  User,
  Info,
  Download,
  Play
} from 'lucide-react';
import AddMoneyModal from '@/components/AddMoneyModal';
import TransactionHistory from '@/components/TransactionHistory';
import JoinGroupPage from '@/components/JoinGroupPage';
import SupportPage from '@/components/SupportPage';
import LiveChat from '@/components/LiveChat';
import ProfileMenu from '@/components/ProfileMenu';
import InviteEarn from '@/components/InviteEarn';
import TVRechargePage from '@/components/TVRechargePage';
import BettingPage from '@/components/BettingPage';
import AboutPage from '@/components/AboutPage';
import ProfileInfoPage from '@/components/ProfileInfoPage';
import AirtimePage from '@/components/AirtimePage';
import DataPage from '@/components/DataPage';
import LoanPage from '@/components/LoanPage';

interface User {
  name: string;
  email: string;
}

interface DashboardProps {
  user: User;
  onAddMoney: () => void;
  onLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onAddMoney, onLogout }) => {
  const [balance, setBalance] = useState(0.00);
  const [showBalance, setShowBalance] = useState(true);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showInviteEarn, setShowInviteEarn] = useState(false);
  const [showTVRecharge, setShowTVRecharge] = useState(false);
  const [showBetting, setShowBetting] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showAirtime, setShowAirtime] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showLoan, setShowLoan] = useState(false);

  // Load balance from localStorage on component mount
  useEffect(() => {
    const savedBalance = localStorage.getItem(`userBalance_${user.email}`);
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    }
  }, [user.email]);

  // Save balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`userBalance_${user.email}`, balance.toString());
  }, [balance, user.email]);

  const quickActions = [
    { title: 'Support', icon: Users, color: 'bg-green-100 text-green-600', onClick: () => setShowSupport(true) },
    { title: 'Groups', icon: Building, color: 'bg-green-100 text-green-600', onClick: () => setShowJoinGroup(true) },
    { title: 'Withdraw', icon: TrendingUp, color: 'bg-green-100 text-green-600' }
  ];

  const services = [
    { title: 'Airtime', icon: Smartphone, color: 'bg-green-100 text-green-600', onClick: () => setShowAirtime(true) },
    { title: 'Data', icon: Wifi, color: 'bg-green-100 text-green-600', onClick: () => setShowData(true) },
    { title: 'Betting', icon: Target, color: 'bg-green-100 text-green-600', onClick: () => setShowBetting(true) },
    { title: 'TV', icon: Tv, color: 'bg-green-100 text-green-600', onClick: () => setShowTVRecharge(true) },
    { title: 'Log Out', icon: LogOut, color: 'bg-red-100 text-red-600', onClick: onLogout },
    { title: 'Loan', icon: () => <span className="text-green-600 font-bold">₦</span>, color: 'bg-green-100 text-green-600', onClick: () => setShowLoan(true) },
    { title: 'Invitation', icon: UserPlus, color: 'bg-green-100 text-green-600', onClick: () => setShowInviteEarn(true) },
    { title: 'More', icon: MoreHorizontal, color: 'bg-green-100 text-green-600', onClick: () => setShowProfileMenu(true) }
  ];

  const handleAddMoneyClick = () => {
    setShowAddMoneyModal(true);
  };

  const handleBonusClaimed = (amount: number) => {
    setBalance(prevBalance => prevBalance + amount);
  };

  const handleServiceClick = (service: any) => {
    if (service.onClick) {
      service.onClick();
    }
  };

  const handleQuickActionClick = (action: any) => {
    if (action.onClick) {
      action.onClick();
    }
  };

  // Show full page components
  if (showTransactionHistory) {
    return <TransactionHistory onBack={() => setShowTransactionHistory(false)} />;
  }

  if (showJoinGroup) {
    return <JoinGroupPage onBack={() => setShowJoinGroup(false)} />;
  }

  if (showSupport) {
    return <SupportPage onBack={() => setShowSupport(false)} />;
  }

  if (showLiveChat) {
    return <LiveChat onBack={() => setShowLiveChat(false)} user={user} />;
  }

  if (showProfileMenu) {
    return (
      <ProfileMenu 
        onBack={() => setShowProfileMenu(false)} 
        user={user}
        onProfileInfo={() => {
          setShowProfileMenu(false);
          setShowProfileInfo(true);
        }}
        onAbout={() => {
          setShowProfileMenu(false);
          setShowAbout(true);
        }}
      />
    );
  }

  if (showAbout) {
    return <AboutPage onBack={() => setShowAbout(false)} />;
  }

  if (showProfileInfo) {
    return <ProfileInfoPage onBack={() => setShowProfileInfo(false)} user={user} />;
  }

  if (showInviteEarn) {
    return <InviteEarn onBack={() => setShowInviteEarn(false)} user={user} />;
  }

  if (showTVRecharge) {
    return <TVRechargePage onBack={() => setShowTVRecharge(false)} />;
  }

  if (showBetting) {
    return <BettingPage onBack={() => setShowBetting(false)} />;
  }

  if (showAirtime) {
    return <AirtimePage onBack={() => setShowAirtime(false)} />;
  }

  if (showData) {
    return <DataPage onBack={() => setShowData(false)} />;
  }

  if (showLoan) {
    return <LoanPage onBack={() => setShowLoan(false)} />;
  }

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
            <button 
              onClick={() => setShowLiveChat(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Headphones className="w-6 h-6 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Maximize className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={() => setShowTransactionHistory(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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
                onClick={handleAddMoneyClick}
                className="bg-white text-green-600 hover:bg-gray-50 rounded-full px-6 py-2 font-medium transition-all duration-200 transform hover:scale-105"
              >
                <Gift className="w-4 h-4 mr-2" />
                Claim Bonus 🎁
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <div key={index} className="text-center cursor-pointer" onClick={() => handleQuickActionClick(action)}>
              <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mx-auto mb-3`}>
                <action.icon className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-gray-700">{action.title}</p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-4 gap-4">
          {services.map((service, index) => (
            <div key={index} className="text-center cursor-pointer" onClick={() => handleServiceClick(service)}>
              <div className={`w-10 h-10 rounded-full ${service.color} flex items-center justify-center mx-auto mb-2`}>
                {typeof service.icon === 'function' ? (
                  <service.icon />
                ) : (
                  <service.icon className="w-5 h-5" />
                )}
              </div>
              <p className="text-xs font-medium text-gray-700">{service.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Money Modal - Centered */}
      <AddMoneyModal 
        isOpen={showAddMoneyModal}
        onClose={() => setShowAddMoneyModal(false)}
        onBonusClaimed={handleBonusClaimed}
      />
    </div>
  );
};

export default Dashboard;
