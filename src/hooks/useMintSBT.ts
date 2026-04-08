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
 * Deployed contract address on initiation-2 testnet.
 * Bech32: init1pnke2enhc7tv2vccl5udt65x2xmnlq32f3860c
 */
const CONTRACT_ADDRESS = '0xced956677c796c53318fd38d5ea8651b73f822a';

export function useMintSBT(_walletAddress: string | undefined): UseMintSBTReturn {
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const address = useAddress();
  const { requestInitiaTx } = useWallet();

  const mint = useCallback(async (params: MintParams) => {
    setIsMinting(true);
    setMintError(null);
    setMintSuccess(false);

    try {
      if (!address) {
        throw new Error('Wallet not connected. Please connect your wallet first.');
      }

      const sessions = Math.floor(params.sessionsCompleted);
      const score = Math.floor(params.improvementScore * 100);
      const timestamp = Math.floor(params.timestamp);

      const msg = new MsgExecute(
        address,
        CONTRACT_ADDRESS,
        'soulbound_nft',
        'mint',
        [],
        [
          bcs.u64().serialize(sessions).toBase64(),
          bcs.u64().serialize(score).toBase64(),
          bcs.string().serialize(params.level).toBase64(),
          bcs.u64().serialize(timestamp).toBase64(),
          bcs.string().serialize(params.metadataUri).toBase64(),
        ]
      );

      const hash = await requestInitiaTx({
        msgs: [msg],
        memo: 'InnerProof SBT Mint',
      });

      setTxHash(hash);
      setMintSuccess(true);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to mint SBT.';

      if (message.includes('LINKER_ERROR')) {
        setMintError('Contract not found on-chain. It may not be deployed yet.');
      } else if (message.includes('rejected') || message.includes('denied')) {
        setMintError('Transaction was rejected in your wallet.');
      } else {
        setMintError(message);
      }
    } finally {
      setIsMinting(false);
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