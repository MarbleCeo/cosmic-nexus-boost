
import { useQuery } from "@tanstack/react-query";
import { BlockData, NetworkStats, NodeData, VmiaPerformance, TokenData, WalletInfo, SolflareWallet, Transaction, VmiaClientStatus, TransactionHistory, BlockchainNotification, VmiaContainer } from "@/types/blockchain";
import { useMemo, useState, useEffect } from "react";

// Real-time API endpoints
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

async function fetchBlocks(): Promise<BlockData[]> {
  const response = await fetch(`${API_BASE}/blocks`);
  if (!response.ok) {
    throw new Error('Failed to fetch blocks');
  }
  return response.json();
}

async function fetchNetworkStats(): Promise<NetworkStats> {
  const response = await fetch(`${API_BASE}/network/stats`);
  if (!response.ok) {
    throw new Error('Failed to fetch network stats');
  }
  return response.json();
}

async function fetchNodes(): Promise<NodeData[]> {
  const response = await fetch(`${API_BASE}/nodes`);
  if (!response.ok) {
    throw new Error('Failed to fetch nodes');
  }
  return response.json();
}

async function fetchVmiaPerformance(): Promise<VmiaPerformance[]> {
  const response = await fetch(`${API_BASE}/vmia/performance`);
  if (!response.ok) {
    throw new Error('Failed to fetch VMIA performance');
  }
  return response.json();
}

async function fetchDexData(): Promise<TokenData[]> {
  const response = await fetch(`${API_BASE}/dex/overview`);
  if (!response.ok) {
    throw new Error('Failed to fetch DEX data');
  }
  return response.json();
}

async function fetchTransactions(address?: string, limit = 10): Promise<TransactionHistory> {
  const url = address 
    ? `${API_BASE}/transactions?address=${address}&limit=${limit}` 
    : `${API_BASE}/transactions?limit=${limit}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
}

async function fetchVmiaClientStatus(address?: string): Promise<VmiaClientStatus | null> {
  if (!address) return null;
  
  const response = await fetch(`${API_BASE}/vmia/client/${address}`);
  if (!response.ok) {
    throw new Error('Failed to fetch VMIA client status');
  }
  return response.json();
}

async function fetchVmiaContainers(address?: string): Promise<VmiaContainer[]> {
  const url = address 
    ? `${API_BASE}/vmia/containers?address=${address}` 
    : `${API_BASE}/vmia/containers`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch VMIA containers');
  }
  return response.json();
}

async function fetchNotifications(address?: string): Promise<BlockchainNotification[]> {
  if (!address) return [];
  
  const response = await fetch(`${API_BASE}/notifications/${address}`);
  if (!response.ok) {
    throw new Error('Failed to fetch notifications');
  }
  return response.json();
}

// Docker VMIA operations
export async function startVmiaContainer(address: string): Promise<{ success: boolean, message: string, containerId?: string }> {
  try {
    const response = await fetch(`${API_BASE}/vmia/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to start VMIA container');
    }
    
    return response.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function stopVmiaContainer(containerId: string): Promise<{ success: boolean, message: string }> {
  try {
    const response = await fetch(`${API_BASE}/vmia/stop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ containerId }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to stop VMIA container');
    }
    
    return response.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Enhanced Solflare wallet integration
export function useSolflareWallet() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.solflare && window.solflare.isConnected) {
        try {
          const publicKey = window.solflare.publicKey.toString();
          
          // Fetch wallet balance from API
          const response = await fetch(`${API_BASE}/wallet/${publicKey}`);
          if (response.ok) {
            const walletData = await response.json();
            setWallet(walletData);
            setConnected(true);
          }
        } catch (err) {
          console.error("Error checking wallet connection:", err);
        }
      }
    };
    
    checkConnection();
  }, []);

  const connect = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if Solflare is installed
      if (typeof window !== 'undefined' && window.solflare) {
        // Access the typed Solflare wallet
        const solflare = window.solflare;
        
        // Try to connect
        await solflare.connect();
        
        // Get the wallet info
        const publicKey = solflare.publicKey.toString();
        
        // Fetch wallet data from the API
        const response = await fetch(`${API_BASE}/wallet/${publicKey}`);
        
        if (response.ok) {
          const walletData = await response.json();
          setWallet(walletData);
        } else {
          // Fallback to minimal wallet info if API fails
          setWallet({
            address: publicKey,
            balance: "0.00",
            network: "devnet",
          });
        }
        
        setConnected(true);
      } else {
        setError("Solflare wallet not found. Please install the Solflare extension.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect to Solflare");
    } finally {
      setLoading(false);
    }
  };

  const disconnect = () => {
    if (typeof window !== 'undefined' && window.solflare) {
      window.solflare.disconnect();
    }
    setConnected(false);
    setWallet(null);
  };

  return {
    connect,
    disconnect,
    connected,
    loading,
    wallet,
    error,
  };
}

// Real-time data hooks with automatic refetching
export function useBlocks() {
  return useQuery({
    queryKey: ['blocks'],
    queryFn: fetchBlocks,
    refetchInterval: 3000, // Refetch every 3 seconds
  });
}

export function useNetworkStats() {
  return useQuery({
    queryKey: ['networkStats'],
    queryFn: fetchNetworkStats,
    refetchInterval: 1000,
  });
}

export function useNodes() {
  return useQuery({
    queryKey: ['nodes'],
    queryFn: fetchNodes,
    refetchInterval: 5000,
  });
}

export function useVmiaPerformance() {
  return useQuery({
    queryKey: ['vmiaPerformance'],
    queryFn: fetchVmiaPerformance,
    refetchInterval: 5000,
  });
}

export function useDexData() {
  return useQuery({
    queryKey: ['dexData'],
    queryFn: fetchDexData,
    refetchInterval: 10000,
  });
}

export function useTransactions(address?: string) {
  return useQuery({
    queryKey: ['transactions', address],
    queryFn: () => fetchTransactions(address),
    refetchInterval: 5000,
  });
}

export function useVmiaClientStatus(address?: string) {
  return useQuery({
    queryKey: ['vmiaClientStatus', address],
    queryFn: () => fetchVmiaClientStatus(address),
    refetchInterval: 5000,
    enabled: !!address,
  });
}

export function useVmiaContainers(address?: string) {
  return useQuery({
    queryKey: ['vmiaContainers', address],
    queryFn: () => fetchVmiaContainers(address),
    refetchInterval: 10000,
  });
}

export function useNotifications(address?: string) {
  return useQuery({
    queryKey: ['notifications', address],
    queryFn: () => fetchNotifications(address),
    refetchInterval: 30000,
    enabled: !!address,
  });
}
