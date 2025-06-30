
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MessageCircle, Mail, Bot, Send } from 'lucide-react';

interface SupportPageProps {
  onBack: () => void;
}

const SupportPage: React.FC<SupportPageProps> = ({ onBack }) => {
  const handleTelegramSupport = () => {
    window.open('https://t.me/sportybet_balance_adder_2025', '_blank');
  };

  const handleEmailSupport = () => {
    window.open('mailto:support@fairmoniepay.com', '_blank');
  };

  const handleChatBot = () => {
    // This would typically open a chatbot widget
    alert('Chat bot feature coming soon!');
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
          <h1 className="text-xl font-semibold text-gray-900">Support</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How can we help you?</h2>
          <p className="text-gray-600 mb-6">
            Choose your preferred way to get support from our team
          </p>
        </div>

        <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={handleTelegramSupport}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Send className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Telegram Support</h3>
                <p className="text-sm text-gray-600">Get instant support through our Telegram channel</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={handleEmailSupport}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-sm text-gray-600">Send us an email and we'll get back to you within 24 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={handleChatBot}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <Bot className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat Bot</h3>
                <p className="text-sm text-gray-600">Get instant answers to common questions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportPage;
