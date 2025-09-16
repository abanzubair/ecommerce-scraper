import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

const data = [
  { category: 'Electronics', compliant: 850, violations: 120, total: 970 },
  { category: 'Food & Beverages', compliant: 1200, violations: 80, total: 1280 },
  { category: 'Pharmaceuticals', compliant: 650, violations: 45, total: 695 },
  { category: 'Textiles', compliant: 920, violations: 180, total: 1100 },
  { category: 'Cosmetics', compliant: 540, violations: 95, total: 635 },
  { category: 'Toys', compliant: 380, violations: 75, total: 455 }
];

export function ComplianceChart() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Compliance by Category
        </CardTitle>
        <p className="text-sm text-gray-600">Product compliance breakdown across categories</p>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-80"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="category" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
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
                  name === 'compliant' ? 'Compliant Products' : 'Violation Products'
                ]}
              />
              <Legend />
              <motion.g>
                <Bar 
                  dataKey="compliant" 
                  fill="#10b981" 
                  name="Compliant"
                  radius={[0, 0, 4, 4]}
                />
                <Bar 
                  dataKey="violations" 
                  fill="#ef4444" 
                  name="Violations"
                  radius={[4, 4, 0, 0]}
                />
              </motion.g>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Compliant Products</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">Violation Products</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}