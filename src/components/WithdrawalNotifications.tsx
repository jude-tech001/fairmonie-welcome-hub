
import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface WithdrawalNotification {
  name: string;
  amount: number;
}

const WithdrawalNotifications: React.FC = () => {
  const [currentNotification, setCurrentNotification] = useState<WithdrawalNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // List of Nigerian names with withdrawal amounts
  const notifications: WithdrawalNotification[] = [
    { name: 'Adebayo Ogundimu', amount: 25000 },
    { name: 'Chioma Nwachukwu', amount: 45000 },
    { name: 'Ibrahim Musa', amount: 18000 },
    { name: 'Folake Adeyemi', amount: 67000 },
    { name: 'Emeka Okafor', amount: 32000 },
    { name: 'Aisha Bello', amount: 54000 },
    { name: 'Tunde Bakare', amount: 28000 },
    { name: 'Grace Okoro', amount: 41000 },
    { name: 'Yusuf Aliyu', amount: 36000 },
    { name: 'Ngozi Emenike', amount: 52000 },
    { name: 'Babatunde Adegoke', amount: 23000 },
    { name: 'Fatima Abdullahi', amount: 48000 },
    { name: 'Chinedu Okoye', amount: 39000 },
    { name: 'Blessing Ikechukwu', amount: 61000 },
    { name: 'Hassan Mohammed', amount: 44000 },
    { name: 'Kemi Oluwaseun', amount: 35000 },
    { name: 'Victor Nnamdi', amount: 58000 },
    { name: 'Amina Garba', amount: 29000 },
    { name: 'Olumide Ajayi', amount: 47000 },
    { name: 'Patience Eze', amount: 33000 }
  ];

  useEffect(() => {
    let notificationIndex = 0;

    const showNotification = () => {
      const notification = notifications[notificationIndex];
      setCurrentNotification(notification);
      setIsVisible(true);

      // Hide notification after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);

      // Move to next notification
      notificationIndex = (notificationIndex + 1) % notifications.length;
    };

    // Show first notification immediately
    showNotification();

    // Then show notifications every 6 seconds (4s visible + 2s gap)
    const interval = setInterval(showNotification, 6000);

    return () => clearInterval(interval);
  }, []);

  if (!currentNotification) return null;

  return (
    <div
      className={`fixed top-20 left-4 right-4 z-50 transform transition-all duration-500 ease-in-out ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}
    >
      <div className="bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 mx-auto max-w-sm">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-green-800">
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
