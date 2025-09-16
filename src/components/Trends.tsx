import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, Filter, Download } from 'lucide-react';

const monthlyTrends = [
  { month: 'Jan', violations: 245, resolved: 220, pending: 25 },
  { month: 'Feb', violations: 312, resolved: 298, pending: 14 },
  { month: 'Mar', violations: 189, resolved: 175, pending: 14 },
  { month: 'Apr', violations: 267, resolved: 251, pending: 16 },
  { month: 'May', violations: 334, resolved: 310, pending: 24 },
  { month: 'Jun', violations: 298, resolved: 278, pending: 20 },
  { month: 'Jul', violations: 423, resolved: 395, pending: 28 },
  { month: 'Aug', violations: 378, resolved: 356, pending: 22 },
  { month: 'Sep', violations: 445, resolved: 418, pending: 27 },
  { month: 'Oct', violations: 356, resolved: 334, pending: 22 },
  { month: 'Nov', violations: 289, resolved: 271, pending: 18 },
  { month: 'Dec', violations: 234, resolved: 219, pending: 15 }
];

const platformTrends = [
  { platform: 'Amazon', violations: 1245, growth: 12 },
  { platform: 'Flipkart', violations: 987, growth: -8 },
  { platform: 'Myntra', violations: 654, growth: 23 },
  { platform: 'Nykaa', violations: 432, growth: 15 },
  { platform: 'Snapdeal', violations: 321, growth: -12 },
];

const violationTypes = [
  { name: 'Misleading Claims', value: 35, color: '#ef4444' },
  { name: 'Missing Ingredients', value: 28, color: '#f97316' },
  { name: 'Price Violations', value: 20, color: '#eab308' },
  { name: 'Quality Issues', value: 12, color: '#22c55e' },
  { name: 'Labeling Errors', value: 5, color: '#3b82f6' },
];

const regionData = [
  { region: 'North India', violations: 1245, change: 8.2 },
  { region: 'South India', violations: 987, change: -3.1 },
  { region: 'West India', violations: 856, change: 12.5 },
  { region: 'East India', violations: 543, change: 5.7 },
  { region: 'Northeast', violations: 234, change: -1.2 },
];

export function Trends() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('12months');
  const [selectedMetric, setSelectedMetric] = useState('violations');

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Violation Trends</h1>
          <p className="text-gray-600 mt-1">Comprehensive analytics and patterns in compliance violations</p>
        </div>
        
        <div className="flex gap-3">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="12months">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { title: 'Total Violations', value: '4,267', change: '+12.3%', trend: 'up', color: 'text-red-600' },
          { title: 'Resolved Issues', value: '3,935', change: '+15.2%', trend: 'up', color: 'text-green-600' },
          { title: 'Avg. Resolution Time', value: '2.4 days', change: '-8.1%', trend: 'down', color: 'text-blue-600' },
          { title: 'Platform Coverage', value: '847', change: '+5.7%', trend: 'up', color: 'text-purple-600' },
        ].map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`flex items-center gap-1 ${stat.color}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-96">
            <CardHeader>
              <CardTitle>Monthly Violation Trends</CardTitle>
              <CardDescription>Violations detected and resolved over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area type="monotone" dataKey="violations" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="resolved" stackId="2" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Violation Types Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-96">
            <CardHeader>
              <CardTitle>Violation Types Distribution</CardTitle>
              <CardDescription>Breakdown of violation categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={violationTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {violationTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-4">
                {violationTypes.map((type, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                    <span className="text-sm text-gray-600">{type.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Platform Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Platform Performance Trends</CardTitle>
            <CardDescription>Violation patterns across different e-commerce platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformTrends.map((platform, index) => (
                <motion.div
                  key={platform.platform}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">{platform.platform[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{platform.platform}</h4>
                      <p className="text-sm text-gray-600">{platform.violations} violations detected</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={platform.growth > 0 ? "destructive" : "secondary"}
                      className="gap-1"
                    >
                      {platform.growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(platform.growth)}%
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Regional Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Regional Analysis</CardTitle>
            <CardDescription>Violation distribution across Indian regions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="region" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="violations" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}