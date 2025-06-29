
import React, { useState } from 'react';
import Auth from '@/components/Auth';
import Dashboard from '@/components/Dashboard';
import WelcomeModal from '@/components/WelcomeModal';
import JoinGroup from '@/components/JoinGroup';
import AddMoneyModal from '@/components/AddMoneyModal';
import { toast } from '@/hooks/use-toast';

interface User {
  name: string;
  email: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setShowWelcomeModal(true);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddMoney = () => {
    setShowAddMoneyModal(true);
  };

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  const handleJoinGroup = () => {
    setShowWelcomeModal(false);
    setShowJoinGroup(true);
  };

  const handleBackToWelcome = () => {
    setShowJoinGroup(false);
    setShowWelcomeModal(true);
  };

  const handleCloseJoinGroup = () => {
    setShowJoinGroup(false);
  };

  const handleCloseAddMoney = () => {
    setShowAddMoneyModal(false);
  };

  if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <>
      <Dashboard 
        user={user} 
        onAddMoney={handleAddMoney}
        onLogout={handleLogout}
        onJoinGroup={handleJoinGroup}
      />
      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={handleCloseWelcomeModal}
        userName={user.name}
        onJoinGroup={handleJoinGroup}
      />
      <JoinGroup
        isOpen={showJoinGroup}
        onClose={handleCloseJoinGroup}
        onBack={handleBackToWelcome}
      />
      <AddMoneyModal
        isOpen={showAddMoneyModal}
        onClose={handleCloseAddMoney}
      />
    </>
  );
};

export default Index;
