# 🚀 How to View Your MintCV App

## The Situation

You're running Claude Code in a web-based environment (sandbox), so the Next.js dev server running on `localhost:3000` inside the container **isn't accessible from your browser**.

## ✅ Solution: Run It Locally on Your Machine

### Step 1: Get the Code

The code is already pushed to your git repository at branch `claude/mintcv-resume-platform-xuJHF`.

**Clone it to your local machine:**

```bash
git clone <your-repo-url>
cd mintCV
git checkout claude/mintcv-resume-platform-xuJHF
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment (Optional)

For basic demo functionality, you don't need any API keys!

```bash
# Optional: Copy environment template
cp .env.example .env.local

# The app works without API keys!
# You can add them later for full features
```

### Step 4: Run the App

```bash
npm run dev
```

### Step 5: Open in Browser

Now open your **local browser** and visit:

**http://localhost:3000**

You should see the beautiful MintCV landing page! 🎉

---

## 🎯 What You'll See

### **Landing Page** (/)
- Animated gradient background with floating blobs
- "MintCV" in gradient text
- "Try Demo" and "Start Building" buttons
- Feature cards showcasing the app
- V1 MVP features grid
- Status banner at bottom

### **Demo Page** (/demo)
- Comprehensive feature showcase
- 6 feature cards explaining what you can do
- "Start Building Your CV" button
- Beautiful liquid glass cards

### **Editor** (/editor/new)
- Three-tab interface: Edit | Preview | Template
- Block editor with "Add Block" button
- Choose from 7 block types
- Live auto-save (see timestamp)
- Save and Publish buttons
- Template selector

### **Templates to Try**

1. **Minimalist Dark** - Clean typography
2. **Liquid Glass** - Animated glassmorphism (signature!)
3. **Terminal** - Green-on-black hacker aesthetic
4. **Portfolio Grid** - Visual gallery layout

---

## 🎨 Quick Demo Flow

1. Visit **http://localhost:3000**
2. Click **"Try Demo"** or **"Start Building"**
3. Add a **Header** block
   - Enter your name: "Jane Builder"
   - Title: "Web3 Developer"
   - Bio: "Building the future onchain"
4. Add an **Experience** block
   - Add a job position
5. Add **Skills** block
   - Type skills and press Enter
6. Switch to **Preview** tab → See it rendered beautifully!
7. Switch to **Template** tab → Try different templates!

---

## 🌐 Alternative: Deploy to Vercel (5 Minutes)

If you want it live on the internet:

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy
```bash
# In the mintCV directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? mintcv
# - Directory? ./
# - Override settings? No
```

### 3. Get Your Live URL

Vercel will give you a URL like: `https://mintcv-xyz123.vercel.app`

Open it in your browser! 🚀

---

## 📝 Environment Variables for Full Features

Edit `.env.local` with these (all optional for basic demo):

```bash
# Supabase (for persistence)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Anthropic (for AI enhancement)
ANTHROPIC_API_KEY=sk-ant-api03-...

# WalletConnect (for wallet auth)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id
```

**Without API keys, you can:**
- ✅ Use all 4 templates
- ✅ Build CVs with the block editor
- ✅ Preview in real-time
- ✅ Export PDFs (might need API)
- ✅ Save to localStorage

---

## ❓ Troubleshooting

### "Module not found" errors
```bash
npm install
```

### "Port 3000 already in use"
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### TypeScript errors
```bash
npm run type-check
```

---

## 🎊 What to Expect

The app is **stunning** with:
- 🌌 Animated gradient backgrounds
- 💎 Liquid glass effects throughout
- ✨ Smooth transitions and hover states
- 🎨 4 completely different template styles
- 📝 Intuitive block-based editing
- 👀 Real-time preview as you type
- 💾 Auto-save every 30 seconds

It's **fully functional** and ready to use!

---

## 🚀 Next Steps After Viewing

Once you've played with the app locally:

1. **Connect Supabase** - Add your Supabase credentials
2. **Add Anthropic API** - Enable AI enhancement
3. **Deploy to Vercel** - Make it live
4. **Add Wallet Auth** - Connect via RainbowKit
5. **Integrate Web3 Data** - Auto-fetch from Talent Protocol

Everything is ready and waiting for your API keys! 🎉
