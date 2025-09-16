import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Activity } from 'lucide-react';

const data = [
  { date: 'Jan 1', violations: 45, scanned: 1200 },
  { date: 'Jan 8', violations: 52, scanned: 1350 },
  { date: 'Jan 15', violations: 38, scanned: 1180 },
  { date: 'Jan 22', violations: 65, scanned: 1420 },
  { date: 'Jan 29', violations: 43, scanned: 1300 },
  { date: 'Feb 5', violations: 58, scanned: 1380 },
  { date: 'Feb 12', violations: 41, scanned: 1250 },
  { date: 'Feb 19', violations: 69, scanned: 1480 },
  { date: 'Feb 26', violations: 47, scanned: 1320 },
  { date: 'Mar 5', violations: 55, scanned: 1400 },
  { date: 'Mar 12', violations: 39, scanned: 1280 },
  { date: 'Mar 19', violations: 72, scanned: 1520 }
];

export function ViolationTrendsChart() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-600" />
          Violation Trends
        </CardTitle>
        <p className="text-sm text-gray-600">Weekly violation detection over time</p>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-80"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="violationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="scannedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => [
                  value,
                  name === 'violations' ? 'Violations Detected' : 'Products Scanned'
                ]}
              />
              <Area
                type="monotone"
                dataKey="scanned"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#scannedGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="violations"
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#violationGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Products Scanned</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-gray-600">Violations Detected</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}