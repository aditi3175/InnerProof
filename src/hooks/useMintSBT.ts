import { useState, useCallback } from 'react';
import type { MintParams } from '@/types';
import { useInterwovenKit } from '@initia/interwovenkit-react';
import { bcs } from '@initia/initia.js';

interface UseMintSBTReturn {
  isMinting: boolean;
  mintSuccess: boolean;
  mintError: string | null;
  txHash: string | null;
  mint: (params: MintParams) => Promise<void>;
  resetMintState: () => void;
}

export function useMintSBT(_walletAddress: string | undefined): UseMintSBTReturn {
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const { initiaAddress, requestTxBlock } = useInterwovenKit();

  const mint = useCallback(async (params: MintParams) => {
    setIsMinting(true);
    setMintError(null);
    setMintSuccess(false);

    try {

      const tx = await requestTxBlock({
        messages: [{
          typeUrl: '/initia.move.v1.MsgExecute',
          value: {
            sender: initiaAddress,
            moduleAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
            moduleName: 'soulbound_nft',
            functionName: 'mint',
            typeArgs: [],
            args: [
              bcs.u64().serialize(params.sessionsCompleted).toBase64(),
              bcs.u64().serialize(params.improvementScore).toBase64(),
              bcs.string().serialize(params.level).toBase64(),
              bcs.u64().serialize(params.timestamp).toBase64(),
            ],
          },
        }],
      });

      setTxHash(tx.transactionHash);
      setMintSuccess(true);

      console.log('SBT Mint params:', params);
      console.log('Real tx hash:', tx.transactionHash);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to mint SBT';
      setMintError(errorMessage);
    } finally {
      setIsMinting(false);
    }
  }, [initiaAddress, requestTxBlock]);

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
