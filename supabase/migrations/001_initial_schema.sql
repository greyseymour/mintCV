-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  wallet_address TEXT UNIQUE,
  farcaster_fid TEXT UNIQUE,
  github_username TEXT,
  linkedin_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on wallet_address for faster lookups
CREATE INDEX idx_users_wallet ON users(wallet_address);
CREATE INDEX idx_users_farcaster ON users(farcaster_fid);

-- CVs table
CREATE TABLE cvs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  template TEXT NOT NULL DEFAULT 'minimalist-dark',
  blocks JSONB NOT NULL DEFAULT '[]',
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  nft_token_id TEXT,
  nft_chain_id INTEGER,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for CVs
CREATE INDEX idx_cvs_user_id ON cvs(user_id);
CREATE INDEX idx_cvs_slug ON cvs(slug);
CREATE INDEX idx_cvs_published ON cvs(published) WHERE published = TRUE;

-- Unique constraint on slug
CREATE UNIQUE INDEX idx_cvs_unique_slug ON cvs(slug);

-- Data sources table (stores connected account info)
CREATE TABLE data_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source_type TEXT NOT NULL, -- 'talent_protocol', 'github', 'farcaster', etc.
  source_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  data JSONB DEFAULT '{}',
  last_synced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, source_type)
);

-- Create index for data sources
CREATE INDEX idx_data_sources_user_id ON data_sources(user_id);

-- Token balances table
CREATE TABLE token_balances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  balance TEXT NOT NULL DEFAULT '0',
  staked_amount TEXT NOT NULL DEFAULT '0',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Burn transactions table
CREATE TABLE burn_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cv_id UUID REFERENCES cvs(id) ON DELETE SET NULL,
  amount TEXT NOT NULL,
  reason TEXT NOT NULL, -- 'export-pdf', 'export-docx', 'mint-nft', 'update-cv', 'send-email'
  tx_hash TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'failed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for burn transactions
CREATE INDEX idx_burn_transactions_user_id ON burn_transactions(user_id);
CREATE INDEX idx_burn_transactions_cv_id ON burn_transactions(cv_id);
CREATE INDEX idx_burn_transactions_created_at ON burn_transactions(created_at DESC);

-- Exports table (track PDF/DOCX exports)
CREATE TABLE exports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cv_id UUID NOT NULL REFERENCES cvs(id) ON DELETE CASCADE,
  format TEXT NOT NULL, -- 'pdf', 'docx'
  file_url TEXT,
  burn_transaction_id UUID REFERENCES burn_transactions(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for exports
CREATE INDEX idx_exports_user_id ON exports(user_id);
CREATE INDEX idx_exports_cv_id ON exports(cv_id);

-- Attestations table (V2 - onchain recommendations)
CREATE TABLE attestations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cv_id UUID NOT NULL REFERENCES cvs(id) ON DELETE CASCADE,
  from_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  from_wallet TEXT NOT NULL,
  content TEXT NOT NULL,
  onchain_attestation_id TEXT,
  tx_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for attestations
CREATE INDEX idx_attestations_cv_id ON attestations(cv_id);

-- Job applications table (V2 - auto-syndication tracking)
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cv_id UUID NOT NULL REFERENCES cvs(id) ON DELETE CASCADE,
  job_title TEXT NOT NULL,
  company TEXT,
  job_url TEXT,
  status TEXT DEFAULT 'applied', -- 'applied', 'viewed', 'responded', 'rejected'
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for job applications
CREATE INDEX idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX idx_job_applications_cv_id ON job_applications(cv_id);

-- Templates table
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  thumbnail_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  stake_requirement TEXT, -- Amount of $MINTCV required to unlock
  category TEXT NOT NULL, -- 'minimalist', 'liquid-glass', 'terminal', 'portfolio'
  template_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default templates
INSERT INTO templates (name, description, thumbnail_url, is_premium, category) VALUES
  ('Minimalist Dark', 'Clean, typography-focused design with lots of whitespace', NULL, FALSE, 'minimalist'),
  ('Liquid Glass', 'Full glassmorphism with gradient backgrounds and depth effects', NULL, FALSE, 'liquid-glass'),
  ('Terminal', 'Monospace, green-on-black, hacker aesthetic', NULL, FALSE, 'terminal'),
  ('Portfolio Grid', 'Image-heavy, gallery-style for visual builders', NULL, FALSE, 'portfolio');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cvs_updated_at BEFORE UPDATE ON cvs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_data_sources_updated_at BEFORE UPDATE ON data_sources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE burn_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE attestations ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- CVs policies
CREATE POLICY "Users can read own CVs" ON cvs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read published CVs" ON cvs
  FOR SELECT USING (published = TRUE);

CREATE POLICY "Users can create own CVs" ON cvs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own CVs" ON cvs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own CVs" ON cvs
  FOR DELETE USING (auth.uid() = user_id);

-- Data sources policies
CREATE POLICY "Users can manage own data sources" ON data_sources
  FOR ALL USING (auth.uid() = user_id);

-- Token balances policies
CREATE POLICY "Users can read own token balance" ON token_balances
  FOR SELECT USING (auth.uid() = user_id);

-- Burn transactions policies
CREATE POLICY "Users can read own burn transactions" ON burn_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Exports policies
CREATE POLICY "Users can read own exports" ON exports
  FOR SELECT USING (auth.uid() = user_id);

-- Attestations policies
CREATE POLICY "Anyone can read attestations for published CVs" ON attestations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM cvs WHERE cvs.id = attestations.cv_id AND cvs.published = TRUE
    )
  );

-- Job applications policies
CREATE POLICY "Users can manage own job applications" ON job_applications
  FOR ALL USING (auth.uid() = user_id);

-- Templates are public read
CREATE POLICY "Anyone can read templates" ON templates
  FOR SELECT USING (TRUE);
