
import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface WithdrawalNotification {
  name: string;
  amount: number;
}

interface WithdrawalNotificationsProps {
  isVisible?: boolean;
  onRestart?: () => void;
}

const WithdrawalNotifications: React.FC<WithdrawalNotificationsProps> = ({ isVisible = true, onRestart }) => {
  const [currentNotification, setCurrentNotification] = useState<WithdrawalNotification | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // List of Nigerian names with withdrawal amounts (90,000 - 250,000)
  const notifications: WithdrawalNotification[] = [
    { name: 'Adebayo Ogundimu', amount: 125000 },
    { name: 'Chioma Nwachukwu', amount: 145000 },
    { name: 'Ibrahim Musa', amount: 98000 },
    { name: 'Folake Adeyemi', amount: 167000 },
    { name: 'Emeka Okafor', amount: 132000 },
    { name: 'Aisha Bello', amount: 154000 },
    { name: 'Tunde Bakare', amount: 128000 },
    { name: 'Grace Okoro', amount: 141000 },
    { name: 'Yusuf Aliyu', amount: 136000 },
    { name: 'Ngozi Emenike', amount: 152000 },
    { name: 'Babatunde Adegoke', amount: 123000 },
    { name: 'Fatima Abdullahi', amount: 148000 },
    { name: 'Chinedu Okoye', amount: 139000 },
    { name: 'Blessing Ikechukwu', amount: 161000 },
    { name: 'Hassan Mohammed', amount: 144000 },
    { name: 'Kemi Oluwaseun', amount: 135000 },
    { name: 'Victor Nnamdi', amount: 158000 },
    { name: 'Amina Garba', amount: 129000 },
    { name: 'Olumide Ajayi', amount: 147000 },
    { name: 'Patience Eze', amount: 133000 },
    { name: 'Segun Adebayo', amount: 192000 },
    { name: 'Funmi Olaleye', amount: 218000 },
    { name: 'Kelechi Nwosu', amount: 205000 },
    { name: 'Maryam Yakubu', amount: 234000 },
    { name: 'Chijioke Eze', amount: 187000 },
    { name: 'Aminat Lawal', amount: 226000 },
    { name: 'Biodun Fagbemi', amount: 198000 },
    { name: 'Zainab Usman', amount: 242000 },
    { name: 'Chuka Okonkwo', amount: 176000 },
    { name: 'Hadiza Ibrahim', amount: 250000 }
  ];

  useEffect(() => {
    if (!isVisible) return;

    const startCycle = () => {
      // Show notification
      const notification = notifications[currentIndex];
      setCurrentNotification(notification);
      setShowNotification(true);

      // Hide after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      // Move to next notification
      setCurrentIndex((prevIndex) => (prevIndex + 1) % notifications.length);
    };

    // Start first notification immediately
    startCycle();

    // Then repeat every 12 seconds
    const interval = setInterval(startCycle, 12000);

    return () => clearInterval(interval);
  }, [isVisible, currentIndex]);

  // Reset to a random index when returning to dashboard
  useEffect(() => {
    if (isVisible) {
      const randomIndex = Math.floor(Math.random() * notifications.length);
      setCurrentIndex(randomIndex);
    }
  }, [isVisible]);

  if (!currentNotification || !isVisible) return null;

  return (
    <div
      className={`fixed top-20 left-4 right-4 z-50 transform transition-all duration-500 ease-in-out ${
        showNotification 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}
    >
      <div className="bg-green-50 border border-green-200 rounded-lg shadow-lg p-3 mx-auto max-w-sm">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-green-800">
                Withdrawal Successful
              </p>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-xs text-green-700 mt-1">
              <span className="font-semibold">{currentNotification.name}</span> successfully withdrew{' '}
              <span className="font-bold">₦{currentNotification.amount.toLocaleString()}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalNotifications;
