
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import TradeCard, { Trade } from '@/components/TradeCard';
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Download 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data
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
  {
    id: '4',
    symbol: 'BNB/USDT',
    type: 'LONG',
    entryPrice: 250,
    currentPrice: 245,
    quantity: 10,
    timestamp: '2023-11-10T16:20:00Z',
    status: 'CLOSED',
    leverage: 2,
    pnl: -50,
    pnlPercentage: -2,
  },
  {
    id: '5',
    symbol: 'ADA/USDT',
    type: 'SHORT',
    entryPrice: 0.5,
    currentPrice: 0.45,
    quantity: 5000,
    timestamp: '2023-11-08T11:30:00Z',
    status: 'CLOSED',
    leverage: 3,
    pnl: 250,
    pnlPercentage: 10,
  },
  {
    id: '6',
    symbol: 'XRP/USDT',
    type: 'LONG',
    entryPrice: 0.65,
    currentPrice: 0.68,
    quantity: 10000,
    timestamp: '2023-11-05T08:15:00Z',
    status: 'CLOSED',
    leverage: 5,
    pnl: 300,
    pnlPercentage: 4.62,
  },
];

const Trades = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter and sort trades
  const filteredTrades = mockTrades.filter((trade) => {
    // Filter by search term
    const matchesSearch = trade.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'open' && trade.status === 'OPEN') || 
      (statusFilter === 'closed' && trade.status === 'CLOSED');
      
    // Filter by type
    const matchesType = 
      typeFilter === 'all' || 
      (typeFilter === 'long' && trade.type === 'LONG') || 
      (typeFilter === 'short' && trade.type === 'SHORT');
      
    return matchesSearch && matchesStatus && matchesType;
  }).sort((a, b) => {
    // Sort by selected field
    if (sortBy === 'date') {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    } else if (sortBy === 'pnl') {
      return a.pnl - b.pnl;
    } else if (sortBy === 'pnlPercentage') {
      return a.pnlPercentage - b.pnlPercentage;
    } else {
      return 0;
    }
  });

  // Apply sort order
  if (sortOrder === 'desc') {
    filteredTrades.reverse();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Trades - FuturesTradeMate</title>
        <meta name="description" content="Manage your futures trades" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Trades</h2>
                <p className="text-muted-foreground">
                  Manage and monitor all your futures trades.
                </p>
              </div>
              <Button className="mt-4 md:mt-0 animate-fade-in">
                <Plus className="h-4 w-4 mr-2" />
                New Trade
              </Button>
            </div>

            {/* Filters and controls */}
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search trades..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="long">Long</SelectItem>
                  <SelectItem value="short">Short</SelectItem>
                </SelectContent>
              </Select>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      Sort by
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setSortBy('date')}>
                      Date
                      {sortBy === 'date' && (
                        <span className="ml-auto">✓</span>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('pnl')}>
                      P&L
                      {sortBy === 'pnl' && (
                        <span className="ml-auto">✓</span>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('pnlPercentage')}>
                      P&L Percentage
                      {sortBy === 'pnlPercentage' && (
                        <span className="ml-auto">✓</span>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setSortOrder('asc')}>
                      Ascending
                      {sortOrder === 'asc' && (
                        <span className="ml-auto">✓</span>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOrder('desc')}>
                      Descending
                      {sortOrder === 'desc' && (
                        <span className="ml-auto">✓</span>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full md:w-auto grid grid-cols-3">
                <TabsTrigger value="all">All Trades</TabsTrigger>
                <TabsTrigger value="open">Open Positions</TabsTrigger>
                <TabsTrigger value="closed">Closed Positions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredTrades.map((trade, index) => (
                    <TradeCard 
                      key={trade.id} 
                      trade={trade} 
                      className={`animate-fade-in animate-delay-${index % 5 * 100}`}
                    />
                  ))}
                </div>
                
                {filteredTrades.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No trades found matching your filters.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="open" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredTrades
                    .filter(trade => trade.status === 'OPEN')
                    .map((trade, index) => (
                      <TradeCard 
                        key={trade.id} 
                        trade={trade} 
                        className={`animate-fade-in animate-delay-${index % 5 * 100}`}
                      />
                    ))}
                </div>
                
                {filteredTrades.filter(trade => trade.status === 'OPEN').length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No open trades found matching your filters.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="closed" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredTrades
                    .filter(trade => trade.status === 'CLOSED')
                    .map((trade, index) => (
                      <TradeCard 
                        key={trade.id} 
                        trade={trade} 
                        className={`animate-fade-in animate-delay-${index % 5 * 100}`}
                      />
                    ))}
                </div>
                
                {filteredTrades.filter(trade => trade.status === 'CLOSED').length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No closed trades found matching your filters.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            {filteredTrades.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Export Trades
                </Button>
              </div>
            )}
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

export default Trades;
