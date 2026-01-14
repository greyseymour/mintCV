export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string | null
          wallet_address: string | null
          farcaster_fid: string | null
          github_username: string | null
          linkedin_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email?: string | null
          wallet_address?: string | null
          farcaster_fid?: string | null
          github_username?: string | null
          linkedin_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          wallet_address?: string | null
          farcaster_fid?: string | null
          github_username?: string | null
          linkedin_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cvs: {
        Row: {
          id: string
          user_id: string
          slug: string
          title: string
          template: string
          blocks: Json
          published: boolean
          published_at: string | null
          nft_token_id: string | null
          nft_chain_id: number | null
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          slug: string
          title: string
          template?: string
          blocks?: Json
          published?: boolean
          published_at?: string | null
          nft_token_id?: string | null
          nft_chain_id?: number | null
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          slug?: string
          title?: string
          template?: string
          blocks?: Json
          published?: boolean
          published_at?: string | null
          nft_token_id?: string | null
          nft_chain_id?: number | null
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      data_sources: {
        Row: {
          id: string
          user_id: string
          source_type: string
          source_id: string
          access_token: string | null
          refresh_token: string | null
          data: Json
          last_synced_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          source_type: string
          source_id: string
          access_token?: string | null
          refresh_token?: string | null
          data?: Json
          last_synced_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          source_type?: string
          source_id?: string
          access_token?: string | null
          refresh_token?: string | null
          data?: Json
          last_synced_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      token_balances: {
        Row: {
          id: string
          user_id: string
          balance: string
          staked_amount: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          balance?: string
          staked_amount?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          balance?: string
          staked_amount?: string
          updated_at?: string
        }
      }
      burn_transactions: {
        Row: {
          id: string
          user_id: string
          cv_id: string | null
          amount: string
          reason: string
          tx_hash: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          cv_id?: string | null
          amount: string
          reason: string
          tx_hash?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          cv_id?: string | null
          amount?: string
          reason?: string
          tx_hash?: string | null
          status?: string
          created_at?: string
        }
      }
      exports: {
        Row: {
          id: string
          user_id: string
          cv_id: string
          format: string
          file_url: string | null
          burn_transaction_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          cv_id: string
          format: string
          file_url?: string | null
          burn_transaction_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          cv_id?: string
          format?: string
          file_url?: string | null
          burn_transaction_id?: string | null
          created_at?: string
        }
      }
      attestations: {
        Row: {
          id: string
          cv_id: string
          from_user_id: string | null
          from_wallet: string
          content: string
          onchain_attestation_id: string | null
          tx_hash: string | null
          created_at: string
        }
        Insert: {
          id?: string
          cv_id: string
          from_user_id?: string | null
          from_wallet: string
          content: string
          onchain_attestation_id?: string | null
          tx_hash?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          cv_id?: string
          from_user_id?: string | null
          from_wallet?: string
          content?: string
          onchain_attestation_id?: string | null
          tx_hash?: string | null
          created_at?: string
        }
      }
      job_applications: {
        Row: {
          id: string
          user_id: string
          cv_id: string
          job_title: string
          company: string | null
          job_url: string | null
          status: string
          applied_at: string
        }
        Insert: {
          id?: string
          user_id: string
          cv_id: string
          job_title: string
          company?: string | null
          job_url?: string | null
          status?: string
          applied_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          cv_id?: string
          job_title?: string
          company?: string | null
          job_url?: string | null
          status?: string
          applied_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          name: string
          description: string | null
          thumbnail_url: string | null
          is_premium: boolean
          stake_requirement: string | null
          category: string
          template_data: Json
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          thumbnail_url?: string | null
          is_premium?: boolean
          stake_requirement?: string | null
          category: string
          template_data?: Json
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          thumbnail_url?: string | null
          is_premium?: boolean
          stake_requirement?: string | null
          category?: string
          template_data?: Json
          created_at?: string
        }
      }
    }
  }
}
