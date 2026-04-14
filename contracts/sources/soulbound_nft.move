/// InnerProof Soulbound Progress Token (Multi-Milestone Version)
///
/// A non-transferable NFT collection that records a user's mental health journey progress.
/// Instead of a single SBT, users can now collect multiple badges for different milestones.
module innerproof::soulbound_nft_v2 {
    use std::string::String;
    use std::signer;
    use std::event;
    use std::vector;

    // ==================== Structs ====================

    /// The Soulbound Progress Token
    /// Has `key` but NOT `store` - this makes it non-transferable.
    struct ProgressSBT has key, drop, store {
        /// Wallet address of the owner
        owner: address,
        /// Number of therapy sessions completed
        sessions_completed: u64,
        /// Improvement score in basis points (0-10000 for 0-100.00%)
        improvement_score: u64,
        /// Progress level: "Seed", "Sprout", "Bloom", "Flourish", "Radiant"
        level: String,
        /// Unix timestamp when the SBT was first minted
        minted_at: u64,
        /// Unix timestamp of the most recent update
        last_updated: u64,
        /// URI for IPFS metadata
        metadata_uri: String,
    }

    /// A collection of SBTs for a single user
    struct SBTCollection has key {
        tokens: vector<ProgressSBT>,
    }

    // ==================== Events ====================

    #[event]
    /// Emitted when a new SBT is minted
    struct MintEvent has drop, store {
        owner: address,
        level: String,
        sessions_completed: u64,
        improvement_score: u64,
        metadata_uri: String,
    }

    // ==================== Error Codes ====================

    /// Invalid improvement score (must be 0-10000)
    const E_INVALID_SCORE: u64 = 3;
    /// The account does not have a collection
    const E_NO_COLLECTION: u64 = 4;

    // ==================== Entry Functions ====================

    /// Mint a new milestone NFT. 
    /// Can be called multiple times for different progress levels.
    public entry fun mint(
        account: &signer,
        sessions_completed: u64,
        improvement_score: u64,
        level: String,
        timestamp: u64,
        metadata_uri: String,
    ) acquires SBTCollection {
        let addr = signer::address_of(account);

        // Validate score range
        assert!(improvement_score <= 10000, E_INVALID_SCORE);

        // Create the individual SBT
        let sbt = ProgressSBT {
            owner: addr,
            sessions_completed,
            improvement_score,
            level,
            minted_at: timestamp,
            last_updated: timestamp,
            metadata_uri,
        };

        // Initialize collection if it doesn't exist
        if (!exists<SBTCollection>(addr)) {
            let collection = SBTCollection {
                tokens: vector::empty<ProgressSBT>(),
            };
            vector::push_back(&mut collection.tokens, sbt);
            move_to(account, collection);
        } else {
            // Add to existing collection
            let collection = borrow_global_mut<SBTCollection>(addr);
            vector::push_back(&mut collection.tokens, sbt);
        };

        // Emit mint event
        event::emit(MintEvent {
            owner: addr,
            level,
            sessions_completed,
            improvement_score,
            metadata_uri,
        });
    }

    // ==================== View Functions ====================

    /// Check if an address has any minted SBTs
    #[view]
    public fun has_tokens(addr: address): bool {
        exists<SBTCollection>(addr)
    }

    /// Get the number of tokens in user's collection
    #[view]
    public fun get_token_count(addr: address): u64 acquires SBTCollection {
        if (!exists<SBTCollection>(addr)) {
            0
        } else {
            let collection = borrow_global<SBTCollection>(addr);
            vector::length(&collection.tokens)
        }
    }

    /// Get details of a specific token by index
    #[view]
    public fun get_token_at(addr: address, index: u64): (String, u64, u64, u64, String) acquires SBTCollection {
        assert!(exists<SBTCollection>(addr), E_NO_COLLECTION);
        let collection = borrow_global<SBTCollection>(addr);
        let sbt = vector::borrow(&collection.tokens, index);
        (
            sbt.level,
            sbt.sessions_completed,
            sbt.improvement_score,
            sbt.minted_at,
            sbt.metadata_uri
        )
    }
}
