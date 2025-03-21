
import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  Calendar 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type Trade = {
  id: string;
  symbol: string;
  type: 'LONG' | 'SHORT';
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  timestamp: string;
  status: 'OPEN' | 'CLOSED';
  stopLoss?: number;
  takeProfit?: number;
  leverage: number;
  pnl: number;
  pnlPercentage: number;
};

interface TradeCardProps {
  trade: Trade;
  className?: string;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const TradeCard = ({ trade, className }: TradeCardProps) => {
  const isProfit = trade.pnl > 0;
  const isLoss = trade.pnl < 0;
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold">{trade.symbol}</span>
            <Badge variant={trade.type === 'LONG' ? 'default' : 'destructive'}>
              {trade.type}
            </Badge>
            <Badge variant={trade.status === 'OPEN' ? 'outline' : 'secondary'}>
              {trade.status}
            </Badge>
          </div>
          <div>
            <Badge variant="outline" className="font-mono">
              {trade.leverage}x
            </Badge>
          </div>
        </div>
        <CardDescription className="flex items-center mt-1">
          <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
          {formatDate(trade.timestamp)}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-4 py-2">
          <div>
            <p className="text-sm text-muted-foreground">Entry Price</p>
            <p className="font-medium">{formatCurrency(trade.entryPrice)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Price</p>
            <p className="font-medium">{formatCurrency(trade.currentPrice)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Quantity</p>
            <p className="font-medium">{trade.quantity.toFixed(4)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Value</p>
            <p className="font-medium">
              {formatCurrency(trade.quantity * trade.currentPrice)}
            </p>
          </div>
        </div>
        
        {(trade.stopLoss || trade.takeProfit) && (
          <div className="grid grid-cols-2 gap-4 mt-2 pt-2 border-t">
            {trade.stopLoss && (
              <div>
                <p className="text-sm text-muted-foreground">Stop Loss</p>
                <p className="font-medium text-negative">{formatCurrency(trade.stopLoss)}</p>
              </div>
            )}
            {trade.takeProfit && (
              <div>
                <p className="text-sm text-muted-foreground">Take Profit</p>
                <p className="font-medium text-positive">{formatCurrency(trade.takeProfit)}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-2 border-t">
        <div>
          <div className="flex items-center">
            <p className={cn(
              "text-lg font-bold",
              isProfit ? "text-positive" : isLoss ? "text-negative" : "text-neutral"
            )}>
              {isProfit ? "+" : ""}{formatCurrency(trade.pnl)}
            </p>
            <div
              className={cn(
                "ml-2 flex items-center rounded-full px-1.5 py-0.5 text-xs",
                isProfit ? "bg-positive/10 text-positive" : 
                isLoss ? "bg-negative/10 text-negative" : 
                "bg-neutral/10 text-neutral"
              )}
            >
              {isProfit ? (
                <ArrowUpRight className="mr-0.5 h-3 w-3" />
              ) : (
                <ArrowDownRight className="mr-0.5 h-3 w-3" />
              )}
              <span>
                {isProfit ? "+" : ""}{trade.pnlPercentage.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
        
        {trade.status === 'OPEN' && (
          <Button variant="outline" size="sm">
            Close Position
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TradeCard;
