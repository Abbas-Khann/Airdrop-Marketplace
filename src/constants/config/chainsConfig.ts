import { sepolia, arbitrum } from "wagmi/chains";

export type RpcUrls = {
  http: readonly string[];
  webSocket?: readonly string[];
};

export interface Network {
  id: number;
  network?: string;
  name: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    [key: string]: RpcUrls;
    default: RpcUrls;
  };
  iconUrl?: string;
  blockExplorers?: any;
  contracts?: {
    [key: string]: any;
  };
  testnet?: boolean;
}

export const mainnetChains: Network[] = [
  {
    ...arbitrum,
    iconUrl: "/chain-icons/arbitrum.svg",
  },
];
export const testnetChains: Network[] = [
  {
    ...sepolia,
    iconUrl: "/chain-icons/eth-logo.svg",
  },
];

export const getSupportedChains = () => {
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT;
  switch (env) {
    case "mainnet":
      return mainnetChains.map((chain) => ({
        ...chain,
      }));
    case "testnet":
      return testnetChains.map((chain) => ({
        ...chain,
      }));
    default:
      console.error(`Unsupported ENVIRONMENT value: ${env}`);
      return [];
  }
};

export const activeChains: Network[] = getSupportedChains();
