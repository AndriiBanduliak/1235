
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import { 
  CheckCircle, 
  AlertTriangle, 
  Save, 
  Lock, 
  User, 
  Bell, 
  Settings as SettingsIcon, 
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: 'Settings saved',
      description: 'Your settings have been successfully updated.',
      variant: 'default',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Settings - FuturesTradeMate</title>
        <meta name="description" content="Configure your futures trading platform" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
              <p className="text-muted-foreground">
                Manage your preferences and account settings.
              </p>
            </div>

            <Tabs defaultValue="account" className="space-y-4">
              <TabsList className="bg-muted w-full md:w-auto grid grid-cols-4 md:inline-flex">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="api">API Keys</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="space-y-4">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Manage your personal details and profile settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 py-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="Your email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="utc">
                          <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc">UTC (GMT)</SelectItem>
                            <SelectItem value="est">Eastern Time (EST/EDT)</SelectItem>
                            <SelectItem value="pst">Pacific Time (PST/PDT)</SelectItem>
                            <SelectItem value="cet">Central European Time (CET)</SelectItem>
                            <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Default Currency</Label>
                        <Select defaultValue="usd">
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD ($)</SelectItem>
                            <SelectItem value="eur">EUR (€)</SelectItem>
                            <SelectItem value="gbp">GBP (£)</SelectItem>
                            <SelectItem value="jpy">JPY (¥)</SelectItem>
                            <SelectItem value="btc">BTC (₿)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={handleSaveSettings} className="flex items-center">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="animate-fade-in animate-delay-100">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Update your password and security preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 py-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-base">Session Timeout</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically log out after inactivity
                          </p>
                        </div>
                        <Select defaultValue="30">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select timeout" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="240">4 hours</SelectItem>
                            <SelectItem value="0">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button onClick={handleSaveSettings} className="flex items-center">
                      <Lock className="mr-2 h-4 w-4" />
                      Update Security
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure how and when you receive alerts and notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Trade Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Position Opened</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications when a new position is opened
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Position Closed</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications when a position is closed
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Take Profit Reached</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications when a take profit level is reached
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Stop Loss Triggered</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications when a stop loss is triggered
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Market Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Price Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications when price targets are reached
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Market News</Label>
                          <p className="text-sm text-muted-foreground">
                            Important news that may affect your positions
                          </p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Volatility Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications during high market volatility
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <Button onClick={handleSaveSettings} className="flex items-center">
                      <Bell className="mr-2 h-4 w-4" />
                      Save Notification Preferences
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="api" className="space-y-4">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>
                      Manage your exchange API keys for automated trading.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-md bg-muted p-4">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-500" />
                        <div>
                          <h4 className="text-sm font-medium">Important Security Notice</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Never share your API keys with anyone. For optimal security, use API keys with trade-only permissions and enable IP restrictions.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Binance Futures</h3>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="binance-api-key">API Key</Label>
                          <Input id="binance-api-key" type="password" defaultValue="••••••••••••••••" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="binance-api-secret">API Secret</Label>
                          <Input id="binance-api-secret" type="password" defaultValue="••••••••••••••••" />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-positive" />
                        <span>Connected and working properly</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">ByBit Futures</h3>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="bybit-api-key">API Key</Label>
                          <Input id="bybit-api-key" placeholder="Enter API Key" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bybit-api-secret">API Secret</Label>
                          <Input id="bybit-api-secret" placeholder="Enter API Secret" />
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={handleSaveSettings} className="flex items-center">
                      <Save className="mr-2 h-4 w-4" />
                      Save API Keys
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-4">
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle>Application Preferences</CardTitle>
                    <CardDescription>
                      Customize your trading environment and display settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Display Settings</h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Dark Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Toggle between light and dark themes
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Trade Card Expanded View</Label>
                          <p className="text-sm text-muted-foreground">
                            Show more details on trade cards by default
                          </p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="default-chart-type">Default Chart Type</Label>
                        <Select defaultValue="candle">
                          <SelectTrigger>
                            <SelectValue placeholder="Select chart type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="candle">Candlestick</SelectItem>
                            <SelectItem value="line">Line</SelectItem>
                            <SelectItem value="area">Area</SelectItem>
                            <SelectItem value="bar">Bar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Trading Preferences</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="default-leverage">Default Leverage</Label>
                        <Select defaultValue="5">
                          <SelectTrigger>
                            <SelectValue placeholder="Select leverage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1x</SelectItem>
                            <SelectItem value="3">3x</SelectItem>
                            <SelectItem value="5">5x</SelectItem>
                            <SelectItem value="10">10x</SelectItem>
                            <SelectItem value="20">20x</SelectItem>
                            <SelectItem value="50">50x</SelectItem>
                            <SelectItem value="100">100x</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Risk Management</Label>
                          <p className="text-sm text-muted-foreground">
                            Enforce stop loss on all trades
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base">Trade Confirmations</Label>
                          <p className="text-sm text-muted-foreground">
                            Show confirmation dialog before executing trades
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <Button onClick={handleSaveSettings} className="flex items-center">
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Save Preferences
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="animate-fade-in animate-delay-100">
                  <CardHeader>
                    <CardTitle className="text-negative">Danger Zone</CardTitle>
                    <CardDescription>
                      Irreversible account actions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-md border border-negative/20 p-4">
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-medium">Reset Account Settings</h4>
                        <p className="text-sm text-muted-foreground">
                          This will reset all your application settings to default values. Your trades and data will not be affected.
                        </p>
                        <div className="mt-2">
                          <Button variant="outline" className="text-negative border-negative/20 hover:bg-negative/10">
                            Reset Settings
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-md border border-negative/20 p-4">
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-medium">Delete Account</h4>
                        <p className="text-sm text-muted-foreground">
                          This will permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <div className="mt-2">
                          <Button variant="destructive" className="flex items-center">
                            <LogOut className="mr-2 h-4 w-4" />
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2023 FuturesTradeMate. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Settings;
