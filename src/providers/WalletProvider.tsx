import { type ReactNode } from 'react';
import { WalletWidgetProvider } from '@initia/react-wallet-widget';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Cast the provider as any to bypass inconsistent local type definitions
const WidgetProvider = WalletWidgetProvider as any;

/**
 * 🦾 SURGICAL LAYER CONFIG (PHASE 1 FINAL) ✨
 * Removed 'chain_type' and 'coin_type' as they trigger ZodError in newer SDK versions.
 */
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

/**
 * 🪙 BASE64 FAIL-SAFE LOGOS
 */
const LOGOS = {
  LEAP: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%2334D3B0'/%3E%3Cpath d='M30 50 L70 50 M50 30 L50 70' stroke='white' stroke-width='8'/%3E%3C/svg%3E",
  OKX: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='black'/%3E%3Cpath d='M25 25 H45 V45 H25 V25 Z M55 55 H75 V75 H55 V55 Z M25 55 H45 V75 H25 V55 Z M55 25 H75 V45 H55 V25 Z' fill='white'/%3E%3C/svg%3E",
  TRUST: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%23337FFF'/%3E%3Cpath d='M30 35 L50 25 L70 35 V50 C70 65 50 75 50 75 C50 75 30 65 30 50 V35 Z' fill='white'/%3E%3C/svg%3E",
  BINANCE: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%23F3BA2F'/%3E%3Cpath d='M50 30 L40 40 L50 50 L60 40 L50 30 Z M68 48 L58 58 L50 48 L58 38 L68 48 Z M32 48 L42 38 L50 48 L42 58 L32 48 Z M50 66 L60 56 L50 46 L40 56 L50 66 Z' fill='black'/%3E%3C/svg%3E",
  INITIA: "https://initia.xyz/logo.png",
  RABBY: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='%236478FF'/%3E%3C/svg%3E",
  STATION: "https://assets.terra.money/icon/station-extension/icon.png",
  COINBASE: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230052ff'/%3E%3Ccircle cx='50' cy='50' r='20' fill='white'/%3E%3C/svg%3E"
};

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WidgetProvider
        customLayer={manualLayer}
        network="testnet"
        theme="dark"
        useKeplrAsDirectSigner={true}
        additionalWallets={[
          { name: "Leap Wallet", type: "cosmos", network_type: "initia", logo: LOGOS.LEAP },
          { name: "Station Wallet", type: "cosmos", network_type: "initia", logo: LOGOS.STATION },
          { name: "Initia Wallet", type: "cosmos", network_type: "initia", logo: LOGOS.INITIA },
          { name: "OKX Wallet ", type: "evm", network_type: "evm", logo: LOGOS.OKX },
          { name: "Trust Wallet ", type: "evm", network_type: "evm", logo: LOGOS.TRUST },
          { name: "Binance Wallet ", type: "evm", network_type: "evm", logo: LOGOS.BINANCE },
          { name: "Rabby Wallet ", type: "evm", network_type: "evm", logo: LOGOS.RABBY },
          { name: "Coinbase Wallet ", type: "evm", network_type: "evm", logo: LOGOS.COINBASE }
        ]}
      >
        {children}
      </WidgetProvider>
    </QueryClientProvider>
  );
}

export { useAddress, useWallet } from '@initia/react-wallet-widget';