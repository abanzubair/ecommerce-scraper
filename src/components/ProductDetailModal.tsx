import React from 'react';
import { motion } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  X, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  FileText,
  ExternalLink 
} from 'lucide-react';
import type { Product } from '../App';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-red-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-yellow-600';
  };

  const getConfidenceBg = (score: number) => {
    if (score >= 90) return 'bg-red-100';
    if (score >= 70) return 'bg-orange-100';
    return 'bg-yellow-100';
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Product Violation Details
            </span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Detailed analysis of compliance violations detected for this product including OCR extracted text and missing required fields.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Product Image and Basic Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Product Image */}
            <div className="relative">
              <ImageWithFallback
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-red-500 text-white">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Violation Detected
                </Badge>
              </div>
            </div>

            {/* Basic Product Info */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Platform:</span>
                  <div className="mt-1">
                    <Badge variant="outline">{product.platform}</Badge>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Seller:</span>
                  <p className="mt-1 text-gray-900">{product.seller}</p>
                </div>
              </div>

              {/* Violation Type */}
              <div>
                <span className="font-medium text-gray-600">Violation Type:</span>
                <div className="mt-1">
                  <Badge className="bg-red-50 text-red-700 border-red-200">
                    {product.violationType}
                  </Badge>
                </div>
              </div>

              {/* Confidence Score */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-600">Confidence Score</span>
                  <span className={`font-bold ${getConfidenceColor(product.confidenceScore)}`}>
                    {product.confidenceScore}%
                  </span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <Progress 
                    value={product.confidenceScore} 
                    className={`h-3 ${getConfidenceBg(product.confidenceScore)}`}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - OCR Text and Missing Fields */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-4"
          >
            {/* OCR Extracted Text */}
            <div>
              <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4" />
                Extracted Text (OCR)
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.extractedText}
                </p>
              </div>
            </div>

            <Separator />

            {/* Missing Fields */}
            <div>
              <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Missing Required Fields
              </h4>
              <div className="space-y-2">
                {product.missingFields.map((field, index) => (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          '0 0 0 0 rgba(239, 68, 68, 0.4)',
                          '0 0 0 10px rgba(239, 68, 68, 0)',
                          '0 0 0 0 rgba(239, 68, 68, 0)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-red-500 rounded-full"
                    />
                    <span className="text-sm text-red-800 font-medium">{field}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
              <Button className="w-full" variant="default">
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as Reviewed
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Platform
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Compliance Status Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <h4 className="font-semibold text-red-800 mb-2">Compliance Assessment</h4>
          <p className="text-sm text-red-700">
            This product has been flagged for non-compliance with regulatory requirements. 
            The missing fields identified above are mandatory for this product category. 
            Immediate action is required to ensure compliance.
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}