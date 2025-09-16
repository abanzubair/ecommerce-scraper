import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  RefreshCw,
  AlertTriangle 
} from 'lucide-react';
import type { Product } from '../App';

interface ViolationDetailsProps {
  onProductSelect: (product: Product) => void;
}

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Samsung Galaxy S24 Ultra 256GB',
    image: 'https://images.unsplash.com/photo-1673718423569-27ce5b3857c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZWxlY3Ryb25pY3MlMjBwcm9kdWN0fGVufDF8fHx8MTc1ODAwMDE1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    platform: 'Amazon',
    seller: 'TechWorld Store',
    violationType: 'Missing BIS Certification',
    confidenceScore: 95,
    extractedText: 'Samsung Galaxy S24 Ultra smartphone with advanced camera technology. Model: SM-S928B. Storage: 256GB. RAM: 12GB. Display: 6.8 inch Dynamic AMOLED.',
    missingFields: ['BIS Registration Number', 'Importer Details', 'Warranty Terms']
  },
  {
    id: '2',
    title: 'Organic Honey Pure 500g Jar',
    image: 'https://images.unsplash.com/photo-1597317292822-d0fa5be43aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwYmV2ZXJhZ2UlMjBwcm9kdWN0JTIwcGFja2FnaW5nfGVufDF8fHx8MTc1ODAyMDA0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    platform: 'Flipkart',
    seller: 'Nature\'s Best',
    violationType: 'Incomplete Nutrition Label',
    confidenceScore: 88,
    extractedText: 'Pure organic honey sourced from wildflower nectar. Net weight: 500g. No artificial preservatives. Natural sweetener.',
    missingFields: ['Nutritional Information per 100g', 'FSSAI License Number', 'Expiry Date']
  },
  {
    id: '3',
    title: 'Anti-Aging Vitamin C Serum 30ml',
    image: 'https://images.unsplash.com/photo-1624574966266-1cdd65b74500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBiZWF1dHklMjBwcm9kdWN0fGVufDF8fHx8MTc1ODAyMDA0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    platform: 'Nykaa',
    seller: 'BeautyHub',
    violationType: 'Missing Ingredient List',
    confidenceScore: 92,
    extractedText: 'Advanced anti-aging serum with Vitamin C. Reduces fine lines and brightens skin. Suitable for all skin types. Volume: 30ml.',
    missingFields: ['Complete Ingredient List', 'Manufacturing Date', 'Dermatologically Tested Certificate']
  },
  {
    id: '4',
    title: 'Blood Pressure Monitor Digital',
    image: 'https://images.unsplash.com/photo-1652038448592-27377ec0b7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBoYXJtYWNldXRpY2FsJTIwcHJvZHVjdHxlbnwxfHx8fDE3NTgwMjAwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    platform: 'Amazon',
    seller: 'HealthTech Solutions',
    violationType: 'Missing Medical Device License',
    confidenceScore: 97,
    extractedText: 'Digital blood pressure monitor with large display. Automatic measurement. Memory for 2 users. Battery operated. FDA approved design.',
    missingFields: ['CDSCO Registration', 'Medical Device License', 'Clinical Trial Data']
  },
  {
    id: '5',
    title: 'Educational Building Blocks Set',
    image: 'https://images.unsplash.com/photo-1614897464244-86c6b2fdda79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHRveSUyMHByb2R1Y3R8ZW58MXx8fHwxNzU4MDIwMDc3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    platform: 'Amazon',
    seller: 'KidsWorld Toys',
    violationType: 'No Safety Age Warning',
    confidenceScore: 85,
    extractedText: 'Educational building blocks for children. Colorful plastic blocks. Helps develop motor skills and creativity. 100 pieces included.',
    missingFields: ['Age Recommendation Warning', 'BIS ISI Mark', 'Safety Test Certificate']
  }
];

export function ViolationDetails({ onProductSelect }: ViolationDetailsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [violationFilter, setViolationFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  // Filter products based on search and filters
  React.useEffect(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.seller.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlatform = platformFilter === 'all' || product.platform === platformFilter;
      const matchesViolation = violationFilter === 'all' || product.violationType === violationFilter;
      
      return matchesSearch && matchesPlatform && matchesViolation;
    });
    
    setFilteredProducts(filtered);
  }, [searchTerm, platformFilter, violationFilter]);

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'bg-red-100 text-red-800 border-red-200';
    if (score >= 70) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const getViolationColor = (type: string) => {
    const colors = {
      'Missing BIS Certification': 'bg-red-50 text-red-700 border-red-200',
      'Incomplete Nutrition Label': 'bg-orange-50 text-orange-700 border-orange-200',
      'Missing Ingredient List': 'bg-purple-50 text-purple-700 border-purple-200',
      'Missing Medical Device License': 'bg-red-50 text-red-700 border-red-200',
      'No Safety Age Warning': 'bg-yellow-50 text-yellow-700 border-yellow-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Violation Details</h1>
          <p className="text-gray-600 mt-1">Detailed view of all compliance violations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products, sellers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="Amazon">Amazon</SelectItem>
                  <SelectItem value="Flipkart">Flipkart</SelectItem>
                  <SelectItem value="Nykaa">Nykaa</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={violationFilter} onValueChange={setViolationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Violation Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Violations</SelectItem>
                  <SelectItem value="Missing BIS Certification">Missing BIS Certification</SelectItem>
                  <SelectItem value="Incomplete Nutrition Label">Incomplete Nutrition Label</SelectItem>
                  <SelectItem value="Missing Ingredient List">Missing Ingredient List</SelectItem>
                  <SelectItem value="Missing Medical Device License">Missing Medical Device License</SelectItem>
                  <SelectItem value="No Safety Age Warning">No Safety Age Warning</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} violations found
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Violations Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Flagged Products
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-20">Image</TableHead>
                    <TableHead>Product Title</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Violation Type</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead className="w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredProducts.map((product, index) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => onProductSelect(product)}
                      >
                        <TableCell>
                          <ImageWithFallback
                            src={product.image}
                            alt={product.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900 truncate max-w-xs">
                            {product.title}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.platform}</Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">{product.seller}</TableCell>
                        <TableCell>
                          <Badge className={getViolationColor(product.violationType)}>
                            {product.violationType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getConfidenceColor(product.confidenceScore)}>
                            {product.confidenceScore}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}