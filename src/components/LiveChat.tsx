
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Send, Bot } from 'lucide-react';

interface LiveChatProps {
  onBack: () => void;
  user: { name: string; email: string };
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const LiveChat: React.FC<LiveChatProps> = ({ onBack, user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hello ${user.name}! I'm your FairMonie Pay assistant. I can help you with balance inquiries, transactions, airtime/data purchases, TV subscriptions, loans, betting, withdrawals, referrals, and any other app features. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const botResponses = {
    balance: "Your current balance is displayed on the dashboard. You can add money by clicking the 'Claim Bonus' button. Your balance updates automatically when you make transactions.",
    airtime: "To buy airtime, go to the Airtime section from the dashboard. Select your network provider, enter the phone number and amount, then proceed with payment. The airtime will be credited instantly.",
    data: "For data purchases, navigate to the Data section. Choose your network, select a data plan, enter your phone number, and complete the payment. Data will be activated immediately.",
    tv: "To recharge your TV subscription, go to the TV section. Select your TV provider (DSTV, GOTV, etc.), enter your smartcard number, choose a package, and pay. Your subscription will be renewed instantly.",
    loan: "You can apply for a loan from the Loan section. Fill in your bank details, enter the loan amount, and provide your Faircode (F-187377). Loan approval is subject to verification.",
    betting: "Access betting services through the Betting section. You can fund your betting account and place bets on various sports and games.",
    withdraw: "To withdraw funds, use the Withdraw option in the quick actions. Enter your bank details and withdrawal amount. Processing time is usually 24-48 hours.",
    referral: "Earn ₦6,500 for each friend you refer! Go to the Invitation section to get your referral link. Share it with friends, and when they sign up, you'll earn rewards.",
    faircode: "You can purchase a Faircode for ₦8,200 from the 'More' section. Click 'Buy Faircode', fill in your details, and complete the payment process.",
    support: "For additional support, you can contact us through Telegram (@fairmonie_earning_bot), email (fairmoniepays@gmail.com), or continue chatting here.",
    transaction: "You can view all your transactions by clicking the bell icon in the top right. It shows your transaction history including credits, debits, and transfers.",
    security: "Your account is secured with password protection and all transactions are encrypted. Never share your login details with anyone.",
    default: "I'm here to help with all FairMonie Pay features! You can ask me about balance, airtime, data, TV subscriptions, loans, betting, withdrawals, referrals, transactions, or any other app features."
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    setTimeout(() => {
      let botResponse = botResponses.default;
      const lowerInput = inputMessage.toLowerCase();
      
      if (lowerInput.includes('balance') || lowerInput.includes('money')) {
        botResponse = botResponses.balance;
      } else if (lowerInput.includes('airtime') || lowerInput.includes('recharge')) {
        botResponse = botResponses.airtime;
      } else if (lowerInput.includes('data') || lowerInput.includes('internet')) {
        botResponse = botResponses.data;
      } else if (lowerInput.includes('tv') || lowerInput.includes('dstv') || lowerInput.includes('gotv')) {
        botResponse = botResponses.tv;
      } else if (lowerInput.includes('loan') || lowerInput.includes('borrow')) {
        botResponse = botResponses.loan;
      } else if (lowerInput.includes('bet') || lowerInput.includes('sport')) {
        botResponse = botResponses.betting;
      } else if (lowerInput.includes('withdraw') || lowerInput.includes('transfer')) {
        botResponse = botResponses.withdraw;
      } else if (lowerInput.includes('refer') || lowerInput.includes('invite') || lowerInput.includes('friend')) {
        botResponse = botResponses.referral;
      } else if (lowerInput.includes('faircode') || lowerInput.includes('code')) {
        botResponse = botResponses.faircode;
      } else if (lowerInput.includes('support') || lowerInput.includes('help') || lowerInput.includes('contact')) {
        botResponse = botResponses.support;
      } else if (lowerInput.includes('transaction') || lowerInput.includes('history')) {
        botResponse = botResponses.transaction;
      } else if (lowerInput.includes('security') || lowerInput.includes('safe') || lowerInput.includes('secure')) {
        botResponse = botResponses.security;
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-green-600" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Live Chat Support</h1>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <Card className={`max-w-xs ${message.sender === 'user' ? 'bg-green-600 text-white' : 'bg-white'}`}>
              <CardContent className="p-3">
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-green-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white px-4 py-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about FairMonie Pay..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
