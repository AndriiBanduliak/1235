
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus 
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  className?: string;
}

const StatCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  className 
}: StatCardProps) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  const isNeutral = change === 0 || change === undefined;
  
  return (
    <div 
      className={cn(
        "neo-morphism rounded-xl p-6 transition-all duration-200 hover:translate-y-[-2px]",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
        </div>
        {icon && (
          <div className="rounded-full bg-secondary p-2 text-secondary-foreground">
            {icon}
          </div>
        )}
      </div>
      
      {!isNeutral && (
        <div className="mt-4 flex items-center">
          <div 
            className={cn(
              "flex items-center rounded-md px-2 py-1 text-xs font-medium",
              isPositive ? "bg-positive/10 text-positive" : "bg-negative/10 text-negative"
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownRight className="mr-1 h-3 w-3" />
            )}
            <span>{Math.abs(change).toFixed(2)}%</span>
          </div>
          <span className="ml-2 text-xs text-muted-foreground">from previous period</span>
        </div>
      )}
      
      {isNeutral && (
        <div className="mt-4 flex items-center">
          <div className="flex items-center rounded-md bg-neutral/10 px-2 py-1 text-xs font-medium text-neutral">
            <Minus className="mr-1 h-3 w-3" />
            <span>0.00%</span>
          </div>
          <span className="ml-2 text-xs text-muted-foreground">no change</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
