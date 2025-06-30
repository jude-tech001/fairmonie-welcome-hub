
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, User, Info, Download, Play } from 'lucide-react';

interface ProfileMenuProps {
  onBack: () => void;
  user: { name: string; email: string };
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onBack, user }) => {
  const handleProfileInfo = () => {
    alert(`Profile Information:\nName: ${user.name}\nEmail: ${user.email}`);
  };

  const handleAbout = () => {
    alert(`About FairMonie Pay:

FairMonie is an automated online moneylender that provides single payment loans and bonus claims, installment loans and payroll loans for borrowers. The amount borrowed is then deducted from your account.

What we offer:
• Data purchase
• Airtime purchase
• All TV subscriptions
• Betting subscription
• Withdrawals

FairMonie Pay is licensed by CBN. All payments are sure and secured with FairPay.`);
  };

  const handleDownloadApp = () => {
    alert('Mobile app download coming soon!');
  };

  const handleWatchTutorial = () => {
    alert('Tutorial videos coming soon!');
  };

  const menuItems = [
    { title: 'Profile Information', icon: User, onClick: handleProfileInfo },
    { title: 'About', icon: Info, onClick: handleAbout },
    { title: 'Download App', icon: Download, onClick: handleDownloadApp },
    { title: 'Watch Tutorial', icon: Play, onClick: handleWatchTutorial }
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
          <h1 className="text-xl font-semibold text-gray-900">More Options</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-3">
        {menuItems.map((item, index) => (
          <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={item.onClick}>
            <CardContent className="p-3">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileMenu;
