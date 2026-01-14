# MintCV

**Onchain Resume Builder for Web3 Builders**

MintCV is a next-generation resume platform that combines verifiable web3 credentials with a beautiful block-based editor. Create living resumes that automatically update with your onchain activity, mint them as NFTs, and share them with the world.

## Features

### V1 MVP
- **Web3 Authentication** - Connect via Farcaster or wallet (SIWE)
- **Data Aggregation** - Pull credentials from Talent Protocol, GitHub, and Farcaster
- **Block-Based Editor** - Drag-and-drop editing with 10+ block types
- **AI Enhancement** - Polish your resume with AI-powered suggestions
- **Multiple Export Options** - PDF, shareable link, or mint as NFT
- **Token Economics** - $MINTCV token with burn mechanics for exports/mints
- **Liquid Glass UI** - Dark mode-only with stunning glassmorphism effects

### Upcoming (V1.1+)
- Premium templates via token staking
- Automated job application agent
- Onchain attestations (recommendations)
- LinkedIn integration
- Recruiter dashboard

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js, SIWE, RainbowKit
- **Database**: Supabase (PostgreSQL)
- **Blockchain**: Base (via wagmi/viem)
- **APIs**: Talent Protocol, GitHub, Neynar (Farcaster), Alchemy
- **AI**: Anthropic Claude

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- A Supabase account
- API keys for data sources (see `.env.example`)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

See `.env.example` for all required environment variables. Key ones:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - WalletConnect project ID
- `TALENT_PROTOCOL_API_KEY` - For builder scores and credentials
- `ANTHROPIC_API_KEY` - For AI enhancement features

## Project Structure

```
mintCV/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── api/               # API routes
│   └── [slug]/            # Public CV pages
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── blocks/           # CV block components
│   ├── editor/           # Block editor components
│   └── templates/        # CV templates
├── lib/                   # Utilities and libraries
│   ├── api/              # API client functions
│   ├── hooks/            # React hooks
│   └── utils.ts          # Utility functions
├── types/                 # TypeScript type definitions
├── styles/               # Global styles
└── public/               # Static assets
```

## Token Mechanics

### $MINTCV Token (Base)

- **Burn to Use**: Export PDF/DOCX, mint NFT, send email
- **Stake to Unlock**: Premium templates, AI features, auto-syndication
- **No Mint Function**: Fixed supply launched via Clanker

### Burn Amounts (TBD)
- PDF Export: X $MINTCV
- DOCX Export: X $MINTCV
- NFT Mint: X $MINTCV
- CV Update: X $MINTCV

### Stake Tiers (TBD)
- Premium Templates: 1,000 $MINTCV
- AI Enhancement: 500 $MINTCV
- Auto-Syndication: CV + 5,000 $MINTCV

## Design System

MintCV uses a custom **liquid glass** design system with:

- **Colors**: Deep dark backgrounds with subtle gradients
- **Glass Effects**: Glassmorphism with backdrop blur
- **Typography**: Clean, modern fonts with excellent readability
- **Animations**: Smooth, subtle motion design
- **No Light Mode**: Dark mode is our identity

See `tailwind.config.ts` for the complete design token system.

## Contributing

We're not accepting contributions yet as we're in early development. Stay tuned!

## License

Proprietary - All rights reserved

## Contact

- Twitter: [@mintcv](https://twitter.com/mintcv)
- Farcaster: [/mintcv](https://warpcast.com/mintcv)

---

Built with by Grey & Ayrenne
