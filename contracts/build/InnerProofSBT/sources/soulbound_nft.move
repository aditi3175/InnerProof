/// InnerProof Soulbound Progress Token
///
/// A non-transferable NFT that records a user's mental health journey progress.
/// The token has `key` but NOT `store`, making it permanently bound to the minting wallet.
/// Only progress scores are stored - never raw chat data.
module innerproof::soulbound_nft {
    use std::string::String;
    use std::signer;
    use std::event;

    // ==================== Structs ====================

    /// The Soulbound Progress Token
    /// Has `key` but NOT `store` - this makes it non-transferable.
    /// Without `store`, the standard transfer functions cannot move this object.
    struct ProgressSBT has key {
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

    #[event]
    /// Emitted when an existing SBT is updated with new progress
    struct UpdateEvent has drop, store {
        owner: address,
        level: String,
        sessions_completed: u64,
        improvement_score: u64,
        metadata_uri: String,
    }

    // ==================== Error Codes ====================

    /// The account already has an SBT
    const E_ALREADY_HAS_SBT: u64 = 1;
    /// The account does not have an SBT
    const E_NO_SBT: u64 = 2;
    /// Invalid improvement score (must be 0-10000)
    const E_INVALID_SCORE: u64 = 3;

    // ==================== Entry Functions ====================

    /// Mint a new Soulbound Progress Token to the caller.
    /// This can only be called once per account.
    /// The SBT is permanently bound and cannot be transferred.
    public entry fun mint(
        account: &signer,
        sessions_completed: u64,
        improvement_score: u64,
        level: String,
        timestamp: u64,
        metadata_uri: String,
    ) {
        let addr = signer::address_of(account);

        // Ensure the account doesn't already have an SBT
        assert!(!exists<ProgressSBT>(addr), E_ALREADY_HAS_SBT);

        // Validate score range
        assert!(improvement_score <= 10000, E_INVALID_SCORE);

        // Create and bind the SBT to the account
        let sbt = ProgressSBT {
            owner: addr,
            sessions_completed,
            improvement_score,
            level,
            minted_at: timestamp,
            last_updated: timestamp,
            metadata_uri,
        };

        move_to(account, sbt);

        // Emit mint event
        event::emit(MintEvent {
            owner: addr,
            level,
            sessions_completed,
            improvement_score,
            metadata_uri,
        });
    }

    /// Update an existing SBT with new progress data.
    /// Can only be called by the SBT owner.
    public entry fun update_progress(
        account: &signer,
        sessions_completed: u64,
        improvement_score: u64,
        level: String,
        timestamp: u64,
        metadata_uri: String,
    ) acquires ProgressSBT {
        let addr = signer::address_of(account);

        // Ensure the account has an SBT
        assert!(exists<ProgressSBT>(addr), E_NO_SBT);

        // Validate score range
        assert!(improvement_score <= 10000, E_INVALID_SCORE);

        // Update the SBT
        let sbt = borrow_global_mut<ProgressSBT>(addr);
        sbt.sessions_completed = sessions_completed;
        sbt.improvement_score = improvement_score;
        sbt.level = level;
        sbt.last_updated = timestamp;
        sbt.metadata_uri = metadata_uri;

        // Emit update event
        event::emit(UpdateEvent {
            owner: addr,
            level,
            sessions_completed,
            improvement_score,
            metadata_uri,
        });
    }

    // ==================== View Functions ====================

    /// Check if an address has minted an SBT
    #[view]
    public fun has_sbt(addr: address): bool {
        exists<ProgressSBT>(addr)
    }

    /// Get the progress level of an address's SBT
    #[view]
    public fun get_level(addr: address): String acquires ProgressSBT {
        assert!(exists<ProgressSBT>(addr), E_NO_SBT);
        borrow_global<ProgressSBT>(addr).level
    }

    /// Get the number of sessions completed
    #[view]
    public fun get_sessions(addr: address): u64 acquires ProgressSBT {
        assert!(exists<ProgressSBT>(addr), E_NO_SBT);
        borrow_global<ProgressSBT>(addr).sessions_completed
    }

    /// Get the improvement score (in basis points)
    #[view]
    public fun get_improvement_score(addr: address): u64 acquires ProgressSBT {
        assert!(exists<ProgressSBT>(addr), E_NO_SBT);
        borrow_global<ProgressSBT>(addr).improvement_score
    }
}
