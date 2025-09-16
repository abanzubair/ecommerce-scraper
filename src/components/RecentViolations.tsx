import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AlertTriangle, Eye, ChevronRight } from 'lucide-react';

const recentViolations = [
  {
    id: '1',
    title: 'Samsung Galaxy S24 Ultra',
    image: 'https://images.unsplash.com/photo-1673718423569-27ce5b3857c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBwcm9kdWN0fGVufDF8fHx8MTc1ODAwMDE1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    platform: 'Amazon',
    seller: 'TechWorld Store',
    violationType: 'Missing BIS Certification',
    confidenceScore: 95,
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    title: 'Organic Honey 500g',
    image: 'https://images.unsplash.com/photo-1597317292822-d0fa5be43aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwYmV2ZXJhZ2UlMjBwcm9kdWN0JTIwcGFja2FnaW5nfGVufDF8fHx8MTc1ODAyMDA0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    platform: 'Flipkart',
    seller: 'Nature\'s Best',
    violationType: 'Incomplete Nutrition Label',
    confidenceScore: 88,
    timestamp: '4 hours ago'
  },
  {
    id: '3',
    title: 'Anti-Aging Serum 30ml',
    image: 'https://images.unsplash.com/photo-1624574966266-1cdd65b74500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBiZWF1dHklMjBwcm9kdWN0fGVufDF8fHx8MTc1ODAyMDA0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    platform: 'Nykaa',
    seller: 'BeautyHub',
    violationType: 'Missing Ingredient List',
    confidenceScore: 92,
    timestamp: '6 hours ago'
  }
];

export function RecentViolations() {
  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'bg-red-100 text-red-800 border-red-200';
    if (score >= 70) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Recent Violations
          </CardTitle>
          <Button variant="outline" size="sm">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <p className="text-sm text-gray-600">Latest compliance violations detected by the system</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentViolations.map((violation, index) => (
            <motion.div
              key={violation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 group cursor-pointer"
            >
              {/* Product Image */}
              <div className="flex-shrink-0">
                <ImageWithFallback
                  src={violation.image}
                  alt={violation.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                  {violation.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-600">{violation.platform}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{violation.seller}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    {violation.violationType}
                  </Badge>
                  <span className="text-xs text-gray-500">{violation.timestamp}</span>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="flex-shrink-0 text-center">
                <Badge className={getConfidenceColor(violation.confidenceScore)}>
                  {violation.confidenceScore}% confident
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}