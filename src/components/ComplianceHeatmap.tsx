import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, AlertCircle } from 'lucide-react';

const stateData = [
  { state: 'Maharashtra', violations: 245, severity: 'high', x: 75, y: 60 },
  { state: 'Delhi', violations: 189, severity: 'high', x: 77, y: 30 },
  { state: 'Karnataka', violations: 156, severity: 'medium', x: 76, y: 80 },
  { state: 'Tamil Nadu', violations: 134, severity: 'medium', x: 78, y: 90 },
  { state: 'Gujarat', violations: 178, severity: 'high', x: 72, y: 45 },
  { state: 'Uttar Pradesh', violations: 298, severity: 'critical', x: 80, y: 35 },
  { state: 'West Bengal', violations: 167, severity: 'medium', x: 87, y: 45 },
  { state: 'Rajasthan', violations: 123, severity: 'medium', x: 74, y: 40 },
  { state: 'Telangana', violations: 89, severity: 'low', x: 79, y: 75 },
  { state: 'Kerala', violations: 67, severity: 'low', x: 76, y: 95 }
];

export function ComplianceHeatmap() {
  const [selectedState, setSelectedState] = useState<typeof stateData[0] | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Compliance Heatmap - India
        </CardTitle>
        <p className="text-sm text-gray-600">Geographic distribution of violations across states</p>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-gray-50 rounded-lg p-6 h-96 overflow-hidden"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f9fafb' fill-opacity='0.4'%3E%3Cpath d='M40 40V20c0-11.046-8.954-20-20-20S0 8.954 0 20v20h40z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            {/* India Map Outline (Simplified) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-80 border-2 border-gray-300 rounded-lg bg-white/80 backdrop-blur-sm">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                  INDIA
                </div>
                
                {/* State Violation Points */}
                {stateData.map((state, index) => (
                  <motion.div
                    key={state.state}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className={`absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${getSeverityColor(state.severity)}`}
                    style={{ left: `${state.x}%`, top: `${state.y}%` }}
                    onClick={() => setSelectedState(state)}
                    whileHover={{ scale: 1.5 }}
                  >
                    {/* Pulsing animation for high severity violations */}
                    {(state.severity === 'critical' || state.severity === 'high') && (
                      <motion.div
                        className={`absolute inset-0 rounded-full ${getSeverityColor(state.severity)} opacity-40`}
                        animate={{ scale: [1, 2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {state.state}: {state.violations} violations
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* State Details Panel */}
          {selectedState && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedState.state}</h4>
                  <p className="text-sm text-gray-600">{selectedState.violations} violations detected</p>
                </div>
                <Badge className={getSeverityBadgeColor(selectedState.severity)}>
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {selectedState.severity.toUpperCase()}
                </Badge>
              </div>
            </motion.div>
          )}

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Low (0-100)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-gray-600">Medium (101-200)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">High (201-250)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span className="text-gray-600">Critical (250+)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}