
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Gift, Share, Copy, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface InviteEarnProps {
  onBack: () => void;
  user: { name: string; email: string };
  onBalanceUpdate: (amount: number) => void;
}

const InviteEarn: React.FC<InviteEarnProps> = ({ onBack, user, onBalanceUpdate }) => {
  const [referralCode] = useState(`FMP${user.name.toUpperCase().slice(0, 3)}${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
  const [referralLink] = useState(`https://fairmoniepayregistration.vercel.app/?ref=${referralCode}`);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalReferrals, setTotalReferrals] = useState(0);
  const [referralsList, setReferralsList] = useState<any[]>([]);

  useEffect(() => {
    // Load referral data
    const referrals = JSON.parse(localStorage.getItem('referrals') || '{}');
    const userReferrals = referrals[referralCode] || [];
    
    setReferralsList(userReferrals);
    setTotalReferrals(userReferrals.length);
    const earnings = userReferrals.reduce((total: number, ref: any) => total + (ref.earnings || 6500), 0);
    setTotalEarnings(earnings);

    // Credit user balance for new referrals
    const creditedReferrals = JSON.parse(localStorage.getItem('creditedReferrals') || '[]');
    const newReferrals = userReferrals.filter((ref: any) => 
      !creditedReferrals.some((credited: any) => credited.email === ref.email)
    );

    if (newReferrals.length > 0) {
      const newEarnings = newReferrals.length * 6500;
      onBalanceUpdate(newEarnings);
      
      // Mark these referrals as credited
      const updatedCredited = [...creditedReferrals, ...newReferrals];
      localStorage.setItem('creditedReferrals', JSON.stringify(updatedCredited));
      
      toast({
        title: "Referral Bonus!",
        description: `You earned ₦${newEarnings.toLocaleString()} from ${newReferrals.length} new referral${newReferrals.length > 1 ? 's' : ''}!`,
        duration: 5000,
      });
    }
  }, [referralCode, onBalanceUpdate]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link Copied!",
      description: "Referral link copied to clipboard",
      duration: 2000,
    });
  };

  const handleShare = () => {
    const shareText = `Join me on FairMonie Pay and start earning! 

FairMonie - Financial services. Manage your finance, buy airtime, data, TV subscriptions and loan with fairpay.

Sign up using my link: ${referralLink}`;

    if (navigator.share) {
      navigator.share({
        title: 'Join FairMonie Pay',
        text: shareText,
        url: referralLink,
      });
    } else {
      // Social media sharing URLs
      const shareUrls = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
        instagram: `https://www.instagram.com/`,
      };

      // Create share options dialog
      const shareOptions = Object.entries(shareUrls).map(([platform, url]) => 
        `<a href="${url}" target="_blank" style="display: block; padding: 10px; text-decoration: none; color: #333; border-bottom: 1px solid #eee;">${platform.charAt(0).toUpperCase() + platform.slice(1)}</a>`
      ).join('');

      const shareDialog = window.open('', '_blank', 'width=400,height=600');
      shareDialog?.document.write(`
        <html>
          <head><title>Share on Social Media</title></head>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h3>Share on:</h3>
            ${shareOptions}
            <button onclick="window.close()" style="margin-top: 20px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px;">Close</button>
          </body>
        </html>
      `);
    }
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
          <h1 className="text-xl font-semibold text-gray-900">Invite & Earn</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Earnings Summary */}
        <Card className="gradient-green text-white border-0">
          <CardContent className="p-6 text-center">
            <Gift className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">₦{totalEarnings.toLocaleString()}</h2>
            <p className="text-green-100 mb-4">Total Earnings</p>
            <div className="flex justify-center items-center space-x-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{totalReferrals}</p>
                <p className="text-sm text-green-100">Referrals</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">₦6,500</p>
                <p className="text-sm text-green-100">Per Referral</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Referrals */}
        {referralsList.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Referrals</h3>
              <div className="space-y-3">
                {referralsList.slice(0, 5).map((referral, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{referral.name}</p>
                      <p className="text-sm text-gray-600">{new Date(referral.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+₦6,500</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* How it Works */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How it Works</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-green-600">1</span>
                </div>
                <p className="text-sm text-gray-600">Share your referral link with friends</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-green-600">2</span>
                </div>
                <p className="text-sm text-gray-600">They sign up using your link</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-green-600">3</span>
                </div>
                <p className="text-sm text-gray-600">You automatically earn ₦6,500 for each successful referral</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Link */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Referral Link</h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input value={referralLink} readOnly className="flex-1 text-xs" />
                <Button onClick={handleCopyLink} variant="outline" size="icon">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleShare} className="flex-1 bg-green-600 hover:bg-green-700">
                  <Share className="w-4 h-4 mr-2" />
                  Share on Social Media
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InviteEarn;
