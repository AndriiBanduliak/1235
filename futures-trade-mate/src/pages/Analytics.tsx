
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import ChartComponent from '@/components/ChartComponent';
import StatCard from '@/components/StatCard';
import { 
  BarChart, 
  PieChart, 
  TrendingUp, 
  ArrowDownRight, 
  Calendar, 
  Download, 
  Clock, 
  RefreshCw 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  PieChart as ReChartsPie,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Sample data
const mockPnLData = [
  { date: 'Jan', value: 1000 },
  { date: 'Feb', value: 1200 },
  { date: 'Mar', value: 900 },
  { date: 'Apr', value: 1500 },
  { date: 'May', value: 2000 },
  { date: 'Jun', value: 1800 },
  { date: 'Jul', value: 2200 },
  { date: 'Aug', value: 2600 },
  { date: 'Sep', value: 2400 },
  { date: 'Oct', value: 2800 },
  { date: 'Nov', value: 3500 },
  { date: 'Dec', value: 3800 },
];

const mockPieData = [
  { name: 'BTC', value: 45 },
  { name: 'ETH', value: 25 },
  { name: 'SOL', value: 15 },
  { name: 'Other', value: 15 },
];

const COLORS = ['#3b82f6', '#10b981', '#6366f1', '#f43f5e'];

const mockTradeStats = [
  {
    title: 'Total Trades',
    value: 124,
    change: 15.2,
  },
  {
    title: 'Win Rate',
    value: '67.8%',
    change: 3.4,
  },
  {
    title: 'Average Profit',
    value: '$418.50',
    change: 7.8,
  },
  {
    title: 'Average Loss',
    value: '$217.25',
    change: -12.3,
  },
  {
    title: 'Profit Factor',
    value: '1.92',
    change: 0.15,
  },
  {
    title: 'Max Drawdown',
    value: '$12,480',
    change: -5.3,
  },
  {
    title: 'Avg. Hold Time (Profit)',
    value: '2.4 days',
    change: -15.6,
  },
  {
    title: 'Avg. Hold Time (Loss)',
    value: '5.7 days',
    change: 20.1,
  },
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Analytics - FuturesTradeMate</title>
        <meta name="description" content="Track and analyze your futures trading performance" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
                <p className="text-muted-foreground">
                  Track and analyze your futures trading performance.
                </p>
              </div>
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 3 months</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="hidden md:flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            {/* Overview Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                title="Total P&L" 
                value="$23,568.45" 
                change={18.7} 
                icon={<TrendingUp className="h-4 w-4" />}
                className="animate-fade-in animate-delay-100"
              />
              <StatCard 
                title="Total Trades" 
                value="124" 
                change={15.2} 
                icon={<RefreshCw className="h-4 w-4" />}
                className="animate-fade-in animate-delay-200"
              />
              <StatCard 
                title="Win/Loss Ratio" 
                value="2.1" 
                change={5.7} 
                icon={<BarChart className="h-4 w-4" />}
                className="animate-fade-in animate-delay-300"
              />
              <StatCard 
                title="Max Drawdown" 
                value="$12,480" 
                change={-5.3} 
                icon={<ArrowDownRight className="h-4 w-4" />}
                className="animate-fade-in animate-delay-400"
              />
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2">
              <ChartComponent
                title="Cumulative P&L"
                description="P&L over time"
                data={mockPnLData}
                className="animate-fade-in animate-delay-100"
              />
              
              <Card className="overflow-hidden animate-fade-in animate-delay-200">
                <CardHeader className="pb-2">
                  <CardTitle>Portfolio Allocation</CardTitle>
                  <CardDescription>Allocation by asset</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ReChartsPie>
                        <Pie
                          data={mockPieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {mockPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Allocation']}
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            borderColor: 'hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                      </ReChartsPie>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed stats */}
            <div>
              <Tabs defaultValue="performance">
                <TabsList className="w-full md:w-auto grid grid-cols-2">
                  <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
                  <TabsTrigger value="trades">Trade Analysis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="performance" className="mt-6">
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                    {mockTradeStats.map((stat, index) => (
                      <StatCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        className={`animate-fade-in animate-delay-${index % 4 * 100}`}
                      />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="trades" className="mt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <ChartComponent
                      title="Wins/Losses by Asset"
                      description="Distribution of wins and losses"
                      data={mockPnLData}
                      type="bar"
                    />
                    
                    <ChartComponent
                      title="Trade Duration vs P&L"
                      description="Correlation between hold time and profit"
                      data={mockPnLData}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
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

export default Analytics;
