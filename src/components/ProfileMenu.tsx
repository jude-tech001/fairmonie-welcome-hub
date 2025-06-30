
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, User, Info, Download, Play } from 'lucide-react';

interface ProfileMenuProps {
  onBack: () => void;
  user: { name: string; email: string };
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ onBack, user }) => {
  const handleProfileInfo = () => {
    alert('Profile information feature coming soon!');
  };

  const handleAbout = () => {
    alert('About FairMonie Pay: Your trusted financial partner.');
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

      <div className="px-4 py-6 space-y-4">
        {menuItems.map((item, index) => (
          <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={item.onClick}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-green-600" />
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
