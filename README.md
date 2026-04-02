# 🛡 InnerProof

> **Your Mind, Your Proof. Zero Exposure.**

A privacy-centric mental health appchain on [Initia](https://initia.xyz) that enables **anonymous AI therapy** and **verifiable progress tracking** via Soulbound NFTs.

---

## 🔍 The Problem

Traditional mental health platforms like BetterHelp and Cerebral have faced severe privacy scandals — sharing user data with advertisers, leaking therapy sessions, and requiring extensive PII (Personally Identifiable Information). Users are forced to choose between getting help and protecting their privacy.

## 💡 The Solution

**InnerProof** eliminates this tradeoff entirely:

- **🔒 100% Anonymous** — Wallet-only login. No emails, no names, no personal data.
- **🤖 AI Companion** — A compassionate AI therapist available 24/7, powered by evidence-based CBT and mindfulness techniques.
- **🏆 Soulbound Proof** — Your progress is minted as a **non-transferable NFT** on your own Initia rollup. It proves your commitment without exposing private conversations.
- **💬 Session Privacy** — Chat logs are **never** stored on-chain. Only aggregated progress scores are recorded.

---

## 🏗 Architecture

```

┌─────────────────────────────────────────────────────────────┐
│                     USER LAYER                              │
│   React App ──► InterwovenKit ──► Initia Wallet             │
│                  (Session UX / Auto-Sign)                   │
├─────────────────────────────────────────────────────────────┤
│                  INTERACTION LAYER                          │
│   Chat UI ──► Gemini AI API ──► Mood Score Extraction       │
├─────────────────────────────────────────────────────────────┤
│                    LOGIC LAYER                              │
│   Mood-to-Score Algorithm ──► Progress Level Calculation    │
│   LocalStorage (sessions) ──► Never raw chat on-chain       │
├─────────────────────────────────────────────────────────────┤
│              SETTLEMENT LAYER (InnerProof Rollup)           │
│   Move Smart Contract ──► Soulbound NFT (ProgressSBT)       │
│   key ability, NO store ──► Non-transferable by design      │
└─────────────────────────────────────────────────────────────┘

```

## 🛠 Tech Stack

| Component | Technology |
|---|---|
| Frontend | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS v4 |
| Wallet | `@initia/interwovenkit-react` + wagmi + viem |
| Session UX | `enableAutoSign` (Initia native) |
| AI Engine | Google Gemini 2.0 Flash |
| Smart Contract | Move (MoveVM rollup) |
| Storage | LocalStorage (chat) + On-chain (SBT) |
| Infrastructure | Initia Appchain via Weave CLI |

## 🎯 Initia-Native Features

1. **InterwovenKit** — Wallet connection and transaction handling via `@initia/interwovenkit-react`
2. **Session UX (Auto-Signing)** — Configured `enableAutoSign` to eliminate wallet popups during therapy sessions, enabling frictionless AI conversations
3. **Custom Appchain** — Dedicated InnerProof rollup deployed via Weave CLI

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm
- A [Gemini API key](https://aistudio.google.com/apikey) (free tier)

### Setup

```bash
# Clone the repository
git clone <REPO_URL>
cd InnerProof

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env and add your VITE_GEMINI_API_KEY

# Start development server
npm run dev

```

### Deploy Rollup (requires Linux/macOS/WSL)

```bash
# Install Weave CLI
brew install initia-labs/tap/weave

# Setup gas station
weave gas-station init

# Launch InnerProof rollup (MoveVM)
weave rollup launch

```

## 📂 Project Structure

```

InnerProof/
├── .initia/submission.json     # Hackathon submission
├── contracts/                  # Move smart contract
│   ├── Move.toml
│   └── sources/
│       └── soulbound_nft.move  # Soulbound NFT (non-transferable)
├── src/
│   ├── components/             # React components
│   │   ├── chat/               # AI therapy chat UI
│   │   ├── layout/             # Sidebar, Navbar, Layout
│   │   ├── mood/               # Mood tracking & charts
│   │   └── nft/                # SBT minting & viewing
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities & constants
│   ├── pages/                  # Route pages
│   ├── providers/              # Wallet provider
│   └── types/                  # TypeScript types
├── .env.example
└── README.md

```

## 🔐 Privacy Architecture

| Data | Where Stored | On-Chain? |
|---|---|---|
| Chat messages | Browser memory only | ❌ Never |
| Session scores | LocalStorage (encrypted per wallet) | ❌ No |
| Progress level | LocalStorage + SBT metadata | ✅ Yes |
| Wallet address | Blockchain | ✅ Yes |
| Personal info | **Nowhere** | ❌ N/A |

## 🌱 Progress Levels

| Level | Improvement Score | Emoji |
|---|---|---|
| Seed | 0–20% | 🌱 |
| Sprout | 21–40% | 🌿 |
| Bloom | 41–60% | 🌸 |
| Flourish | 61–80% | 🌳 |
| Radiant | 81–100% | ✨ |

## 📜 Smart Contract (Soulbound NFT)

The `ProgressSBT` struct uses Move's type system to enforce non-transferability:

```move
// Has `key` but NOT `store` — cannot be transferred
struct ProgressSBT has key {
    owner: address,
    sessions_completed: u64,
    improvement_score: u64,
    level: String,
    minted_at: u64,
    last_updated: u64,
}

```

Without the `store` ability, standard transfer functions **cannot move this object** — making it truly soulbound at the compiler/runtime level.

---

## 👥 Team

Built for the **INITIATE: The Initia Hackathon Season 1** (March–April 2026)

### Deployment Details
- **Network**: `innerproof-1` (Local Weave Devnet)
- **Module ID**: `0x94cef9ea0c6eafd80d8aff27d9aad9f1c8972f11::soulbound_nft`
- **Deployment Tx**: `465524E53C2002CA85421D5FAB0E6BC25FF85043F035150C1901906248E677E2`

---

## 📄 License

MIT
