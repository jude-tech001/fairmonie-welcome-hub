
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Shield, CreditCard } from 'lucide-react';

interface AuthProps {
  onAuthSuccess: (user: { name: string; email: string }) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onAuthSuccess({ name: 'Vicky', email: loginData.email });
      setIsLoading(false);
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onAuthSuccess({ name: signupData.name, email: signupData.email });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen gradient-green flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-lg"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-fadeIn">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <CreditCard className="w-12 h-12 text-green-600" />
              <Shield className="w-6 h-6 text-green-500 absolute -top-1 -right-1" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold gradient-green bg-clip-text text-transparent mb-2">
            FairMonie Pay
          </CardTitle>
          <p className="text-sm text-gray-600">Your lifestyle bank</p>
          <p className="text-xs text-gray-500 mt-1">Insured by NDIC and licensed by CBN</p>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger value="login" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                LOGIN
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                CREATE ACCOUNT
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full transition-all duration-200 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'LOGIN'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    required
                    className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                    className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                    className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    required
                    className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-white hover:bg-gray-50 text-green-600 font-medium rounded-full border-2 border-green-600 transition-all duration-200 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'CREATE ACCOUNT'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
