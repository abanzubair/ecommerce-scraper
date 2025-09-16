import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Shield, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react';

interface OverviewCardsProps {
  stats: {
    complianceScore: number;
    productsScanned: number;
    violationsFound: number;
    violationPercentage: number;
  };
}

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

function AnimatedCounter({ value, duration = 2000, suffix = '', prefix = '', decimals = 0 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(value * easeOutQuart);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (value > 0) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return (
    <span>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
}

export function OverviewCards({ stats }: OverviewCardsProps) {
  const cards = [
    {
      title: 'Compliance Score',
      value: stats.complianceScore,
      suffix: '%',
      icon: Shield,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      trend: { value: 2.3, isPositive: true },
      decimals: 1
    },
    {
      title: 'Products Scanned',
      value: stats.productsScanned,
      icon: Package,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      trend: { value: 12.5, isPositive: true },
      decimals: 0
    },
    {
      title: 'Violations Found',
      value: stats.violationsFound,
      icon: AlertTriangle,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      trend: { value: 5.2, isPositive: false },
      decimals: 0
    },
    {
      title: 'Violation Rate',
      value: stats.violationPercentage,
      suffix: '%',
      icon: TrendingDown,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      trend: { value: 1.8, isPositive: false },
      decimals: 1
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const TrendIcon = card.trend.isPositive ? TrendingUp : TrendingDown;
        
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${card.bgColor}`}>
                    <Icon className={`w-6 h-6 ${card.textColor}`} />
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${
                      card.trend.isPositive 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-red-50 text-red-700 border-red-200'
                    }`}
                  >
                    <TrendIcon className="w-3 h-3 mr-1" />
                    {card.trend.value}%
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                  <div className={`text-3xl font-bold ${card.textColor}`}>
                    <AnimatedCounter 
                      value={card.value} 
                      suffix={card.suffix || ''} 
                      decimals={card.decimals}
                      duration={1500 + index * 200}
                    />
                  </div>
                </div>

                {/* Progress bar for compliance score */}
                {card.title === 'Compliance Score' && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-green-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.complianceScore}%` }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}