
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Box,
  CircuitBoard,
  Database,
  BarChart3,
  Terminal,
  Container,
  Settings,
  UserCircle,
  LogOut,
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      title: 'Overview',
      href: '/',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: 'Blockchain',
      href: '/blockchain',
      icon: <Database className="h-5 w-5" />,
    },
    {
      title: 'Nodes',
      href: '/nodes',
      icon: <CircuitBoard className="h-5 w-5" />,
    },
    {
      title: 'Docker VMIA',
      href: '/docker',
      icon: <Container className="h-5 w-5" />,
    },
    {
      title: 'DEX',
      href: '/dex',
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: 'CLI',
      href: '/cli',
      icon: <Terminal className="h-5 w-5" />,
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card p-4">
      <div className="flex items-center gap-2 px-2 py-4">
        <Box className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold text-primary">Cosmic Nexus</h1>
      </div>
      
      <div className="mt-8 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              location.pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
      
      <div className="mt-auto space-y-1">
        <Link
          to="/profile"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <UserCircle className="h-5 w-5" />
          Admin
        </Link>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground">
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
