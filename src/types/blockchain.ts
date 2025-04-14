
export interface BlockData {
  height: number;
  hash: string;
  timestamp: string;
  txCount: number;
  size: string;
  proposer: string;
  consensus: "POH" | "POS" | "VMIA";
}

export interface NodeData {
  id: string;
  name: string;
  status: "online" | "offline" | "idle";
  cpu: number;
  memory: number;
  storage: number;
  rewards: string;
  uptime: string;
}

export interface NetworkStats {
  tps: number;
  blockHeight: number;
  blockTime: number;
  activeValidators: number;
  vmiaNodes: number;
  totalUsers: number;
}

export interface VmiaPerformance {
  time: string;
  ops: number;
  containers: number;
}

export interface TokenData {
  name: string;
  value: number;
}

export interface WalletInfo {
  address: string;
  balance: string;
  network: "mainnet" | "testnet" | "devnet";
}

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: string;
  timestamp: string;
  status: "confirmed" | "pending" | "failed";
  type: "transfer" | "swap" | "stake" | "unstake" | "vmia-reward";
}

// Solflare wallet type definitions
export interface SolflareWallet {
  connect: () => Promise<void>;
  disconnect: () => void;
  publicKey: {
    toString: () => string;
  };
  isConnected: boolean;
}

// Extend Window interface to include solflare
declare global {
  interface Window {
    solflare?: SolflareWallet;
  }
}
