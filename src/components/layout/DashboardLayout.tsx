
import React from 'react';
import Sidebar from './Sidebar';
import { ThemeProvider } from '@/components/theme/theme-provider';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="cosmic-theme">
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </ThemeProvider>
  );
};

export default DashboardLayout;
