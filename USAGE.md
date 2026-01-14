# MintCV - Usage Guide

Welcome to MintCV! This guide will help you get started with building your onchain resume.

## 🚀 Quick Start

### Option 1: Try the Demo (No Setup Required)

1. Navigate to the homepage
2. Click **"Try Demo"**
3. Start building your CV immediately
4. Your work saves to localStorage

### Option 2: Full Setup (With API Integration)

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local`
4. Add your API keys (see below)
5. Run `npm run dev`
6. Visit `http://localhost:3000`

## 🔑 API Keys (Optional)

For full functionality, configure these API keys in `.env.local`:

```bash
# Supabase (for persistence)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Anthropic (for AI enhancement)
ANTHROPIC_API_KEY=your_anthropic_key

# Talent Protocol
TALENT_PROTOCOL_API_KEY=your_talent_protocol_key

# Neynar (Farcaster)
NEYNAR_API_KEY=your_neynar_key

# Alchemy (Onchain data)
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
```

**Note:** The app works without API keys! You can:
- Use all templates
- Build CVs with the block editor
- Preview in real-time
- Save to localStorage

## 📝 Creating Your First CV

### Step 1: Start a New CV

- Click **"Start Building"** on the homepage
- Or navigate directly to `/editor/new`

### Step 2: Add Blocks

Click **"Add Block"** to choose from:

- **Header** - Name, title, contact info, bio
- **Experience** - Work history with descriptions
- **Skills** - Tag-based skills
- **Builder Score** - Talent Protocol integration
- **Onchain Highlights** - Contracts, NFTs, DAOs
- **Links** - Portfolio and social media
- **Custom Text** - Any additional content

### Step 3: Choose a Template

Click the **"Template"** tab to select from:

1. **Minimalist Dark** - Clean, typography-focused
2. **Liquid Glass** - Glassmorphism with gradients
3. **Terminal** - Hacker aesthetic (green-on-black)
4. **Portfolio Grid** - Visual gallery layout

### Step 4: Preview & Adjust

- **Edit** tab - Modify your blocks
- **Preview** tab - See the final result
- **Template** tab - Switch templates

## 🎨 Using Templates

### Minimalist Dark
Perfect for: Traditional roles, clean aesthetic
- Typography-focused design
- Lots of whitespace
- Professional appearance

### Liquid Glass
Perfect for: Creative roles, web3 positions
- Animated gradient backgrounds
- Glassmorphism effects
- Modern, futuristic vibe

### Terminal
Perfect for: Developer roles, technical positions
- Monospace font
- Green-on-black color scheme
- Hacker/cyberpunk aesthetic

### Portfolio Grid
Perfect for: Visual creators, designers
- Card-based layout
- Stats showcase
- Gallery-style presentation

## 🤖 AI Enhancement (Requires Anthropic API Key)

### Polish Your Bio

1. Write your bio in the Header block
2. Click the AI polish button (when implemented in UI)
3. Review the AI-enhanced version

### Polish Job Descriptions

1. Add your work experience
2. Write descriptions
3. Use AI polish to make them more impactful

### Get Improvement Suggestions

API: `POST /api/ai/enhance`
```json
{
  "blocks": [...your blocks],
  "targetRole": "Senior Web3 Engineer"
}
```

Returns specific suggestions for improvement.

## 📄 Exporting Your CV

### PDF Export

1. Build your CV
2. Click **"Export"** (when added to UI)
3. Or call the API directly:

```bash
curl -X POST http://localhost:3000/api/export/pdf \
  -H "Content-Type: application/json" \
  -d '{"blocks": [...], "template": "minimalist-dark"}' \
  --output resume.pdf
```

### Shareable Link

1. Click **"Publish"** to make your CV public
2. Your CV will be available at `mintcv.xyz/your-slug`
3. Share this link anywhere!

## 💾 Saving & Auto-Save

### Manual Save

- Click **"Save"** in the editor toolbar
- Saves immediately to Supabase (or localStorage in demo mode)

### Auto-Save

- Automatically saves every 30 seconds
- See "Last saved" timestamp in the toolbar
- Works in the background while you edit

## 🔗 Web3 Integration

### Builder Score (Talent Protocol)

1. Add a **Builder Score** block
2. Click **"Fetch from Talent Protocol"**
3. Your score and credentials auto-populate

*Requires: Wallet address + Talent Protocol API key*

### Onchain Highlights

1. Add **Onchain Highlights** block
2. Click **"Fetch Onchain Data"**
3. Shows contracts, NFTs, DAOs, transactions

*Requires: Wallet address + Alchemy API key*

## 🎯 Tips & Best Practices

### For Best Results:

1. **Start with Header** - Set your name and title first
2. **Use AI Polish** - Let Claude enhance your descriptions
3. **Preview Often** - Switch between Edit and Preview modes
4. **Try Multiple Templates** - See which fits your style
5. **Keep it Concise** - 2-3 sentences per job description
6. **Quantify Achievements** - Use numbers when possible

### Template Selection Guide:

- **Applying to Web2 companies?** → Minimalist Dark
- **Applying to Web3 startups?** → Liquid Glass
- **Developer/engineer role?** → Terminal
- **Design/creative role?** → Portfolio Grid

## 🐛 Troubleshooting

### "Save failed"
- Check your internet connection
- Verify Supabase credentials in `.env.local`
- Try demo mode (uses localStorage)

### "AI enhancement not working"
- Verify `ANTHROPIC_API_KEY` is set
- Check API key is valid
- Ensure you have API credits

### "Templates not loading"
- Hard refresh the page (Cmd/Ctrl + Shift + R)
- Check browser console for errors
- Try a different browser

### "Onchain data not fetching"
- Verify wallet address is valid
- Check Alchemy API key
- Some chains may not be supported yet

## 🚀 Advanced Features

### API Routes

All API routes are documented:

- `POST /api/cv` - Create CV
- `PATCH /api/cv/[id]` - Update CV
- `GET /api/cv/[id]` - Get CV
- `POST /api/ai/polish` - Polish content
- `POST /api/ai/enhance` - Full CV enhancement
- `POST /api/export/pdf` - Generate PDF

### Block Data Structure

Each block follows this format:
```typescript
{
  id: string
  type: BlockType
  order: number
  data: Record<string, any>
  visible: boolean
}
```

### Custom Blocks

Want to create your own block type? See `components/blocks/` for examples.

## 📱 Mobile Support

MintCV is fully responsive:
- Edit on desktop for best experience
- Preview on mobile to see how it looks
- Share links work perfectly on mobile

## 🎓 Examples

Check out example CVs at:
- `/demo` - Interactive demo
- `/example-cvs/` - Sample CVs (when added)

## 💬 Support

- GitHub Issues: [Report bugs](https://github.com/yourusername/mintcv/issues)
- Documentation: This file + README.md
- Community: [Discord/Telegram when available]

## 🔜 Coming Soon

**V1.1 Features:**
- NFT minting on Base
- Token burn for exports
- Wallet authentication
- Auto-fetch from connected wallet
- Premium templates (stake to unlock)

**V2 Features:**
- LinkedIn integration
- Automated job applications
- Onchain recommendations
- Recruiter dashboard

---

**Built with ❤️ by Grey & Ayrenne**

Powered by: Next.js, Supabase, Anthropic Claude, Base
