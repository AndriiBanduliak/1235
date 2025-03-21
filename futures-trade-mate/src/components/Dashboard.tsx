
import React from 'react';
import StatCard from './StatCard';
import TradeCard, { Trade } from './TradeCard';
import ChartComponent from './ChartComponent';
import { 
  DollarSign, 
  TrendingUp, 
  Activity, 
  Percent, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const mockTrades: Trade[] = [
  {
    id: '1',
    symbol: 'BTC/USDT',
    type: 'LONG',
    entryPrice: 50000,
    currentPrice: 52000,
    quantity: 0.5,
    timestamp: '2023-11-15T10:30:00Z',
    status: 'OPEN',
    stopLoss: 48000,
    takeProfit: 55000,
    leverage: 10,
    pnl: 1000,
    pnlPercentage: 4,
  },
  {
    id: '2',
    symbol: 'ETH/USDT',
    type: 'SHORT',
    entryPrice: 3000,
    currentPrice: 3100,
    quantity: 2,
    timestamp: '2023-11-14T14:45:00Z',
    status: 'OPEN',
    stopLoss: 3200,
    takeProfit: 2800,
    leverage: 5,
    pnl: -200,
    pnlPercentage: -3.33,
  },
  {
    id: '3',
    symbol: 'SOL/USDT',
    type: 'LONG',
    entryPrice: 100,
    currentPrice: 110,
    quantity: 20,
    timestamp: '2023-11-13T09:15:00Z',
    status: 'OPEN',
    stopLoss: 95,
    takeProfit: 120,
    leverage: 3,
    pnl: 200,
    pnlPercentage: 10,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 px-4 pt-6 pb-16 md:px-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor your futures trading performance.
          </p>
        </div>
        <Button className="mt-4 md:mt-0 animate-fade-in flex items-center gap-1">
          <Plus className="h-4 w-4" />
          New Trade
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Portfolio Value" 
          value="$52,493.50" 
          change={12.5} 
          icon={<DollarSign className="h-4 w-4" />}
          className="animate-fade-in animate-delay-100"
        />
        <StatCard 
          title="Total PnL" 
          value="$7,289.25" 
          change={8.2} 
          icon={<TrendingUp className="h-4 w-4" />}
          className="animate-fade-in animate-delay-200"
        />
        <StatCard 
          title="Win Rate" 
          value="73.5%" 
          change={-2.1} 
          icon={<Percent className="h-4 w-4" />}
          className="animate-fade-in animate-delay-300"
        />
        <StatCard 
          title="Active Positions" 
          value="7" 
          change={0} 
          icon={<Activity className="h-4 w-4" />}
          className="animate-fade-in animate-delay-400"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <ChartComponent
          title="Portfolio Performance"
          description="Monthly performance overview"
          data={mockPnLData}
          className="animate-fade-in animate-delay-100"
        />
        <ChartComponent
          title="PnL Distribution"
          description="PnL by asset"
          data={mockPnLData}
          type="bar"
          className="animate-fade-in animate-delay-200"
        />
      </div>

      {/* Recent Trades */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Trades</h3>
          <Button variant="link" className="p-0 h-auto">View all trades</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockTrades.map((trade, index) => (
            <TradeCard 
              key={trade.id} 
              trade={trade} 
              className={`animate-fade-in animate-delay-${index * 100}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
