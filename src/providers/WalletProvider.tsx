import { type ReactNode } from 'react';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defineChain } from 'viem';
import { InterwovenKitProvider } from '@initia/interwovenkit-react';

// Define the InnerProof custom chain
const innerproofChain = defineChain({
  id: 1,
  name: 'InnerProof',
  nativeCurrency: {
    decimals: 6,
    name: 'INIT',
    symbol: 'INIT',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.initia.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'InitiaScan',
      url: 'https://scan.testnet.initia.xyz',
    },
  },
});

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [innerproofChain],
  transports: {
    [innerproofChain.id]: http(),
  },
});

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <InterwovenKitProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </InterwovenKitProvider>
  );
}
