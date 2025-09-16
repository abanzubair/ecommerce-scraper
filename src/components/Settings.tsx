import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { 
  Bell, 
  Shield, 
  Globe, 
  Clock, 
  Mail, 
  Phone, 
  Eye, 
  Download,
  Upload,
  RefreshCw,
  Save,
  AlertTriangle,
  Check
} from 'lucide-react';

const platformSettings = [
  { name: 'Amazon India', enabled: true, lastSync: '2 hours ago', status: 'active' },
  { name: 'Flipkart', enabled: true, lastSync: '1 hour ago', status: 'active' },
  { name: 'Myntra', enabled: false, lastSync: '3 days ago', status: 'inactive' },
  { name: 'Nykaa', enabled: true, lastSync: '30 minutes ago', status: 'active' },
  { name: 'Snapdeal', enabled: false, lastSync: '1 week ago', status: 'inactive' },
];

export function Settings() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    webPush: true,
    weeklyReports: true,
    criticalViolations: true,
  });

  const [scanning, setScanning] = useState({
    autoScan: true,
    scanInterval: '6',
    deepScan: false,
    confidenceThreshold: '80',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure your compliance monitoring preferences</p>
        </div>
        
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Account Information
                </CardTitle>
                <CardDescription>Update your account details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Rajesh" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Kumar" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="rajesh.kumar@gov.in" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select defaultValue="consumer-affairs">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consumer-affairs">Consumer Affairs</SelectItem>
                      <SelectItem value="commerce">Commerce & Industry</SelectItem>
                      <SelectItem value="legal">Legal Affairs</SelectItem>
                      <SelectItem value="health">Health & Family Welfare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-yellow-600" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to receive alerts and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Alerts
                    </Label>
                    <p className="text-sm text-gray-600">Receive violation alerts via email</p>
                  </div>
                  <Switch 
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailAlerts: checked }))}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      SMS Alerts
                    </Label>
                    <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
                  </div>
                  <Switch 
                    checked={notifications.smsAlerts}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, smsAlerts: checked }))}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Web Push Notifications
                    </Label>
                    <p className="text-sm text-gray-600">Browser notifications for real-time updates</p>
                  </div>
                  <Switch 
                    checked={notifications.webPush}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, webPush: checked }))}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-gray-600">Summary reports every Monday</p>
                  </div>
                  <Switch 
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReports: checked }))}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Critical Violations Only
                    </Label>
                    <p className="text-sm text-gray-600">Only notify for high-priority violations</p>
                  </div>
                  <Switch 
                    checked={notifications.criticalViolations}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, criticalViolations: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Scanning Configuration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-purple-600" />
                  Scanning Configuration
                </CardTitle>
                <CardDescription>Configure automated compliance scanning parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Automatic Scanning</Label>
                    <p className="text-sm text-gray-600">Enable continuous product monitoring</p>
                  </div>
                  <Switch 
                    checked={scanning.autoScan}
                    onCheckedChange={(checked) => setScanning(prev => ({ ...prev, autoScan: checked }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="scanInterval">Scan Interval (hours)</Label>
                  <Select 
                    value={scanning.scanInterval} 
                    onValueChange={(value) => setScanning(prev => ({ ...prev, scanInterval: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Every hour</SelectItem>
                      <SelectItem value="3">Every 3 hours</SelectItem>
                      <SelectItem value="6">Every 6 hours</SelectItem>
                      <SelectItem value="12">Every 12 hours</SelectItem>
                      <SelectItem value="24">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Deep Scan Mode</Label>
                    <p className="text-sm text-gray-600">Enhanced OCR and content analysis</p>
                  </div>
                  <Switch 
                    checked={scanning.deepScan}
                    onCheckedChange={(checked) => setScanning(prev => ({ ...prev, deepScan: checked }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confidenceThreshold">Confidence Threshold (%)</Label>
                  <Input 
                    id="confidenceThreshold" 
                    type="number" 
                    min="0" 
                    max="100" 
                    value={scanning.confidenceThreshold}
                    onChange={(e) => setScanning(prev => ({ ...prev, confidenceThreshold: e.target.value }))}
                  />
                  <p className="text-sm text-gray-600">Minimum confidence score to flag violations</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Platform Integration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-600" />
                  Platform Integration
                </CardTitle>
                <CardDescription>Manage connected e-commerce platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {platformSettings.map((platform, index) => (
                  <div key={platform.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{platform.name}</p>
                        <Badge variant={platform.status === 'active' ? 'default' : 'secondary'}>
                          {platform.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">Last sync: {platform.lastSync}</p>
                    </div>
                    <Switch checked={platform.enabled} />
                  </div>
                ))}
                
                <Button variant="outline" className="w-full gap-2">
                  <Upload className="w-4 h-4" />
                  Add Platform
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">OCR Service</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Gateway</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-yellow-600">Warning</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Backup Service</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Management */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-indigo-600" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="w-4 h-4" />
                  Export Data
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Upload className="w-4 h-4" />
                  Import Data
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Clear Cache
                </Button>
                
                <Separator />
                
                <div className="text-xs text-gray-600 space-y-1">
                  <p>Last backup: 2 hours ago</p>
                  <p>Storage used: 2.4 GB / 10 GB</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}