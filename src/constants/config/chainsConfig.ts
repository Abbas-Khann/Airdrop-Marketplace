import { sepolia, arbitrum, morphSepolia } from "wagmi/chains";

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
    iconUrl: "/chain-icons/arbitrum.png",
  },
];
export const testnetChains: Network[] = [
  {
    ...morphSepolia,
    iconUrl: "/chain-icons/morph.jpg",
  },
  {
    ...sepolia,
    iconUrl: "/chain-icons/sepolia.svg",
  },
];

export const getSupportedChains = () => {
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT;
  switch (env) {
    case "mainnet":
      return mainnetChains;
    case "testnet":
      return testnetChains;
    default:
      console.error(`Unsupported ENVIRONMENT value: ${env}`);
      return [];
  }
};

export const activeChains: Network[] = getSupportedChains();
