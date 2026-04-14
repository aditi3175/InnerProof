import { useState, useCallback, useEffect } from 'react';
import type { MintParams, MintedMilestone, MilestoneWithStatus } from '@/types';
import { useAddress, useWallet } from '../providers/WalletProvider';
import { bcs, MsgExecute } from '@initia/initia.js';
import { MILESTONES, CONTRACT_ADDRESS } from '@/lib/constants';
import { storage } from '@/lib/storage';

interface UseMintSBTReturn {
  isMinting: boolean;
  mintingMilestoneId: number | null;
  mintSuccess: boolean;
  mintError: string | null;
  txHash: string | null;
  milestones: MilestoneWithStatus[];
  mintedCount: number;
  mint: (params: MintParams) => Promise<void>;
  resetMintState: () => void;
}

const IPFS_BASE = 'ipfs://bafybeih2kve2yp2a6p5aclb7ehzemkyaclsoj3mxegxfbtz3ip5yju4my4/';

export function useMintSBT(walletAddress: string | undefined): UseMintSBTReturn {
  const [isMinting, setIsMinting] = useState(false);
  const [mintingMilestoneId, setMintingMilestoneId] = useState<number | null>(null);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [mintedMilestones, setMintedMilestones] = useState<MintedMilestone[]>([]);

  const address = useAddress();
  const { requestInitiaTx } = useWallet();

  // Load minted milestones from localStorage
  useEffect(() => {
    if (walletAddress) {
      const saved = storage.get<MintedMilestone[]>(walletAddress, 'minted_milestones');
      if (saved) setMintedMilestones(saved);
    }
  }, [walletAddress]);

  // Compute milestone statuses
  const sessionsCompleted = storage.get<{ entries: { date: string }[]; totalSessions: number }>(
    walletAddress || '', 'mood_history'
  )?.totalSessions || 0;

  const milestones: MilestoneWithStatus[] = MILESTONES.map(m => {
    const minted = mintedMilestones.find(mm => mm.milestoneId === m.id);
    let status: MilestoneWithStatus['status'] = 'locked';
    if (minted) {
      status = 'minted';
    } else if (sessionsCompleted >= m.sessions) {
      status = 'unlocked';
    }
    return {
      ...m,
      status,
      txHash: minted?.txHash,
      mintedAt: minted?.mintedAt,
    };
  });

  const mintedCount = mintedMilestones.length;

  const mint = useCallback(async (params: MintParams) => {
    setIsMinting(true);
    setMintingMilestoneId(params.milestoneId);
    setMintError(null);
    setMintSuccess(false);

    try {
      if (!address) {
        throw new Error('Wallet not connected. Please connect your wallet first.');
      }

      // Check if already minted
      const alreadyMinted = mintedMilestones.find(m => m.milestoneId === params.milestoneId);
      if (alreadyMinted) {
        throw new Error('This milestone has already been minted!');
      }

      const sessions = Math.floor(params.sessionsCompleted);
      const score = Math.floor(params.improvementScore * 100);
      const timestamp = Math.floor(params.timestamp);

      const msg = new MsgExecute(
        address,
        CONTRACT_ADDRESS,
        'soulbound_nft_v2',
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
        memo: `InnerProof Milestone #${params.milestoneId}`,
      });

      // Save minted milestone
      const newMinted: MintedMilestone = {
        milestoneId: params.milestoneId,
        txHash: hash,
        mintedAt: Date.now(),
      };
      const updated = [...mintedMilestones, newMinted];
      setMintedMilestones(updated);
      if (walletAddress) {
        storage.set(walletAddress, 'minted_milestones', updated);
      }

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
  }, [address, requestInitiaTx, mintedMilestones, walletAddress]);

  const resetMintState = useCallback(() => {
    setMintSuccess(false);
    setMintError(null);
    setTxHash(null);
    setMintingMilestoneId(null);
  }, []);

  return {
    isMinting,
    mintingMilestoneId,
    mintSuccess,
    mintError,
    txHash,
    milestones,
    mintedCount,
    mint,
    resetMintState,
  };
}