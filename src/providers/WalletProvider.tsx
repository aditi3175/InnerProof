import { type ReactNode } from 'react';
import { WalletWidgetProvider } from '@initia/react-wallet-widget';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Cast required due to type mismatch between @initia/react-wallet-widget exports
// and the local TypeScript version. This is intentional — the runtime API is stable.
const WidgetProvider = WalletWidgetProvider as any;

const manualLayer = {
  chain_id: 'initiation-2',
  chain_name: 'Initia Testnet L1',
  bech32_prefix: 'init',
  network_type: 'testnet',
  apis: {
    rpc: [{ address: 'https://rpc.initiation-2.initia.xyz' }],
    rest: [{ address: 'https://lcd.initiation-2.initia.xyz' }],
  },
  fees: {
    fee_tokens: [{ denom: 'uinit', fixed_min_gas_price: 0.15 }],
  },
};

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WidgetProvider
        customLayer={manualLayer}
        network="testnet"
        theme="dark"
        useKeplrAsDirectSigner={true}
      >
        {children}
      </WidgetProvider>
    </QueryClientProvider>
  );
}

export { useAddress, useWallet } from '@initia/react-wallet-widget';