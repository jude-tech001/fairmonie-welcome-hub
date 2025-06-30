
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
      text: `Hello ${user.name}! I'm your FairMonie Pay assistant. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const botResponses = {
    balance: "Your current balance is displayed on the dashboard. You can add money by clicking the 'Add Money' button.",
    transfer: "To transfer money, navigate to the Transfer section and enter the recipient's details.",
    support: "For additional support, you can contact us through Telegram, email, or use this chat.",
    withdraw: "To withdraw funds, go to the Withdraw section and follow the instructions.",
    default: "I'm here to help! You can ask me about your balance, transfers, withdrawals, or any other FairMonie Pay features."
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
      
      if (lowerInput.includes('balance')) {
        botResponse = botResponses.balance;
      } else if (lowerInput.includes('transfer')) {
        botResponse = botResponses.transfer;
      } else if (lowerInput.includes('support') || lowerInput.includes('help')) {
        botResponse = botResponses.support;
      } else if (lowerInput.includes('withdraw')) {
        botResponse = botResponses.withdraw;
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
            placeholder="Type your message..."
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
