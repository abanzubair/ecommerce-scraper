import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  FileBarChart, 
  TrendingUp, 
  Settings,
  X
} from 'lucide-react';
import Logo from '@/assets/logo.svg';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'violations', name: 'Violations', icon: AlertTriangle },
  { id: 'reports', name: 'Reports', icon: FileBarChart },
  { id: 'trends', name: 'Trends', icon: TrendingUp },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export function Sidebar({ currentPage, setCurrentPage, isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
        className={cn(
          'fixed lg:relative inset-y-0 left-0 z-50 w-72 bg-white/90 backdrop-blur border-r border-gray-200/80 flex flex-col shadow-lg lg:shadow-none',
          'lg:translate-x-0'
        )}
      >
        {/* Compact logo header on mobile */}
        <div className="lg:hidden flex items-center justify-between gap-2 p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="h-7 w-7 rounded-md" />
            <span className="text-sm font-semibold tracking-tight">Compliance</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 sm:px-4 pb-4 pt-3 space-y-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <motion.div
                key={item.id}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3 h-11 transition-all duration-200 rounded-xl',
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  )}
                  onClick={() => {
                    setCurrentPage(item.id);
                    if (window.innerWidth < 1024) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                  {item.id === 'violations' && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                    >
                      23
                    </motion.span>
                  )}
                </Button>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200/80">
          <div className="text-[11px] text-gray-500 text-center leading-relaxed">
            <p>Compliance Checker v2.1</p>
            <p>© 2024 Government of India</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}