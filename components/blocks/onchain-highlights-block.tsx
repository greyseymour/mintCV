'use client'

import { useState } from 'react'
import type { Block } from '@/types'

interface OnchainHighlightsBlockProps {
  block: Block
  onChange?: (data: any) => void
  readOnly?: boolean
  walletAddress?: string
}

export function OnchainHighlightsBlock({ block, onChange, readOnly = false, walletAddress }: OnchainHighlightsBlockProps) {
  const [data, setData] = useState(block.data || {
    contractsDeployed: 0,
    nftsMinted: 0,
    daoMemberships: [],
    transactions: 0,
  })
  const [loading, setLoading] = useState(false)

  const fetchOnchainData = async () => {
    if (!walletAddress) return

    setLoading(true)
    try {
      // This would call your onchain API
      // For now, using placeholder data
      const placeholderData = {
        contractsDeployed: 3,
        nftsMinted: 12,
        daoMemberships: ['Nouns DAO', 'Developer DAO'],
        transactions: 245,
      }

      setData(placeholderData)
      onChange?.(placeholderData)
    } catch (error) {
      console.error('Error fetching onchain data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (readOnly) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Onchain Activity</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold gradient-text">
              {data.contractsDeployed}
            </div>
            <p className="text-sm text-text-secondary mt-1">Contracts Deployed</p>
          </div>

          <div className="glass rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold gradient-text">
              {data.nftsMinted}
            </div>
            <p className="text-sm text-text-secondary mt-1">NFTs Minted</p>
          </div>

          <div className="glass rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold gradient-text">
              {data.daoMemberships?.length || 0}
            </div>
            <p className="text-sm text-text-secondary mt-1">DAO Memberships</p>
          </div>

          <div className="glass rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold gradient-text">
              {data.transactions}
            </div>
            <p className="text-sm text-text-secondary mt-1">Transactions</p>
          </div>
        </div>

        {data.daoMemberships && data.daoMemberships.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">DAO Memberships</h3>
            <div className="flex flex-wrap gap-2">
              {data.daoMemberships.map((dao: string, index: number) => (
                <span
                  key={index}
                  className="glass px-4 py-2 rounded-xl text-sm"
                >
                  {dao}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="glass-strong rounded-3xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-secondary">Onchain Highlights</h3>
        {walletAddress && (
          <button
            onClick={fetchOnchainData}
            disabled={loading}
            className="text-sm text-primary-500 hover:underline disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Fetch Onchain Data'}
          </button>
        )}
      </div>

      {!walletAddress && (
        <div className="glass rounded-2xl p-4 text-center text-text-tertiary text-sm">
          Connect your wallet to fetch onchain activity
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold gradient-text">
            {data.contractsDeployed}
          </div>
          <p className="text-xs text-text-secondary mt-1">Contracts</p>
        </div>

        <div className="glass rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold gradient-text">
            {data.nftsMinted}
          </div>
          <p className="text-xs text-text-secondary mt-1">NFTs Minted</p>
        </div>

        <div className="glass rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold gradient-text">
            {data.daoMemberships?.length || 0}
          </div>
          <p className="text-xs text-text-secondary mt-1">DAOs</p>
        </div>

        <div className="glass rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold gradient-text">
            {data.transactions}
          </div>
          <p className="text-xs text-text-secondary mt-1">Transactions</p>
        </div>
      </div>
    </div>
  )
}
