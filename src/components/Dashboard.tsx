import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { OverviewCards } from './OverviewCards';
import { ComplianceChart } from './ComplianceChart';
import { ViolationTrendsChart } from './ViolationTrendsChart';
import { ComplianceHeatmap } from './ComplianceHeatmap';
import { RecentViolations } from './RecentViolations';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Clock
} from 'lucide-react';

export function Dashboard() {
  const [stats, setStats] = useState({
    complianceScore: 0,
    productsScanned: 0,
    violationsFound: 0,
    violationPercentage: 0
  });

  // Animate counters on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        complianceScore: 87.5,
        productsScanned: 15420,
        violationsFound: 1203,
        violationPercentage: 7.8
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const recentAlerts = [
    {
      id: 1,
      type: 'critical',
      message: 'Missing BIS certification on electronics category',
      time: '2 minutes ago',
      count: 45
    },
    {
      id: 2,
      type: 'warning', 
      message: 'Incomplete nutrition labels detected',
      time: '15 minutes ago',
      count: 23
    },
    {
      id: 3,
      type: 'info',
      message: 'Weekly compliance report generated',
      time: '1 hour ago',
      count: 1
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor product compliance across all platforms</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              System Online
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Clock className="w-3 h-3 mr-1" />
              Last updated: 2 min ago
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Overview Cards */}
      <OverviewCards stats={stats} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ComplianceChart />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ViolationTrendsChart />
        </motion.div>
      </div>

      {/* Heatmap and Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="xl:col-span-2"
        >
          <ComplianceHeatmap />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'critical' ? 'bg-red-500' :
                    alert.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">{alert.time}</p>
                      <Badge variant="secondary" className="text-xs">
                        {alert.count} items
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Violations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <RecentViolations />
      </motion.div>
    </div>
  );
}