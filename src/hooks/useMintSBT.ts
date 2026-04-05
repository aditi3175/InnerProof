import { useState, useCallback } from 'react';
import type { MintParams } from '@/types';
import { useAddress, useWallet } from '../providers/WalletProvider';
import { bcs, MsgExecute } from '@initia/initia.js';

interface UseMintSBTReturn {
  isMinting: boolean;
  mintSuccess: boolean;
  mintError: string | null;
  txHash: string | null;
  mint: (params: MintParams) => Promise<void>;
  resetMintState: () => void;
}

/**
 * 🦾 FINAL VICTORY ADDRESS (PHASE 1 COMPLETE) ✨
 * Hardcoded to bypass any .env or Vite cache issues for the demo video.
 */
const FINAL_CONTRACT_ADDR = '0xced956677c796c53318fd38d5ea8651b73f822a';

export function useMintSBT(_walletAddress: string | undefined): UseMintSBTReturn {
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  
  const address = useAddress();
  const { requestInitiaTx } = useWallet();

  const mint = useCallback(async (params: MintParams) => {
    console.log('🦾 STARTING FINAL MINTING FLOW ✨', params);
    setIsMinting(true);
    setMintError(null);
    setMintSuccess(false);

    try {
      if (!address) throw new Error('Wallet not connected!');
      
      // Using hardcoded victory address instead of .env to ensure success
      const contractAddr = FINAL_CONTRACT_ADDR;
      console.log('🛠️ Targeting Module Address:', contractAddr);

      // Essential rounding for u64 compatibility
      const sessions = Math.floor(params.sessionsCompleted);
      const score = Math.floor(params.improvementScore * 100);
      const timestamp = Math.floor(params.timestamp);

      // Prepare real MsgExecute for Move L1
      const msg = new MsgExecute(
        address,
        contractAddr,
        'soulbound_nft',
        'mint',
        [], // typeArgs
        [
          bcs.u64().serialize(sessions).toBase64(),
          bcs.u64().serialize(score).toBase64(),
          bcs.string().serialize(params.level).toBase64(),
          bcs.u64().serialize(timestamp).toBase64(),
          bcs.string().serialize(params.metadataUri).toBase64(),
        ]
      );

      console.log('🚀 Sending Transaction Request to Wallet...');
      
      // Sign and broadcast via official SDK
      const hash = await requestInitiaTx({
        msgs: [msg],
        memo: 'InnerProof SBT Mint'
      });

      console.log('✅ TRANSACTION SUCCESSFUL! Hash:', hash);
      setTxHash(hash);
      setMintSuccess(true);
    } catch (e: any) {
      console.error('😱 MINTING ERROR:', e);
      const errorMessage = e?.message || 'Failed to mint SBT. Check console.';
      setMintError(errorMessage);
    } finally {
      setIsMinting(false);
      console.log('🔚 Minting flow completed.');
    }
  }, [address, requestInitiaTx]);

  const resetMintState = useCallback(() => {
    setMintSuccess(false);
    setMintError(null);
    setTxHash(null);
  }, []);

  return {
    isMinting,
    mintSuccess,
    mintError,
    txHash,
    mint,
    resetMintState,
  };
}
