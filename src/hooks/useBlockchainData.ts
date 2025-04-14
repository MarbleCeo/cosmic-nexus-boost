
import { useQuery } from "@tanstack/react-query";
import { BlockData, NetworkStats, NodeData, VmiaPerformance, TokenData, WalletInfo } from "@/types/blockchain";
import { useMemo, useState } from "react";

async function fetchBlocks(): Promise<BlockData[]> {
  // This would be replaced with your actual API call
  const response = await fetch('/api/blocks');
  if (!response.ok) {
    throw new Error('Failed to fetch blocks');
  }
  return response.json();
}

async function fetchNetworkStats(): Promise<NetworkStats> {
  const response = await fetch('/api/network/stats');
  if (!response.ok) {
    throw new Error('Failed to fetch network stats');
  }
  return response.json();
}

async function fetchNodes(): Promise<NodeData[]> {
  const response = await fetch('/api/nodes');
  if (!response.ok) {
    throw new Error('Failed to fetch nodes');
  }
  return response.json();
}

async function fetchVmiaPerformance(): Promise<VmiaPerformance[]> {
  const response = await fetch('/api/vmia/performance');
  if (!response.ok) {
    throw new Error('Failed to fetch VMIA performance');
  }
  return response.json();
}

async function fetchDexData(): Promise<TokenData[]> {
  const response = await fetch('/api/dex/overview');
  if (!response.ok) {
    throw new Error('Failed to fetch DEX data');
  }
  return response.json();
}

// Mock implementation of the Solflare wallet connection
export function useSolflareWallet() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if Solflare is installed
      if (typeof window !== 'undefined' && 'solflare' in window) {
        // @ts-ignore - Solflare is injected into the window object
        const solflare = window.solflare;
        
        // Try to connect
        await solflare.connect();
        
        // Get the wallet info
        const publicKey = await solflare.publicKey.toString();
        
        setWallet({
          address: publicKey,
          balance: "0.00",
          network: "devnet",
        });
        
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
    if (typeof window !== 'undefined' && 'solflare' in window) {
      // @ts-ignore
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
