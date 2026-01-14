'use client'

import { useState, useEffect } from 'react'
import type { Block } from '@/types'

interface BuilderScoreBlockProps {
  block: Block
  onChange?: (data: any) => void
  readOnly?: boolean
  walletAddress?: string
}

export function BuilderScoreBlock({ block, onChange, readOnly = false, walletAddress }: BuilderScoreBlockProps) {
  const [score, setScore] = useState<number>(block.data?.score || 0)
  const [credentials, setCredentials] = useState<any[]>(block.data?.credentials || [])
  const [loading, setLoading] = useState(false)

  const fetchTalentData = async () => {
    if (!walletAddress) return

    setLoading(true)
    try {
      const response = await fetch(`/api/data/talent?address=${walletAddress}`)
      const data = await response.json()

      if (data.builderScore !== undefined) {
        setScore(data.builderScore)
        setCredentials(data.credentials || [])
        onChange?.({
          score: data.builderScore,
          credentials: data.credentials,
          passportId: data.passportId,
        })
      }
    } catch (error) {
      console.error('Error fetching Talent Protocol data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (readOnly) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Builder Score</h2>

        <div className="glass-liquid rounded-3xl p-8 text-center space-y-4">
          <div className="text-6xl font-bold gradient-text">
            {score}
          </div>
          <p className="text-text-secondary">Talent Protocol Score</p>
        </div>

        {credentials.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Verified Credentials</h3>
            <div className="grid gap-3">
              {credentials.map((cred, index) => (
                <div key={index} className="glass rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{cred.name}</p>
                    <p className="text-sm text-text-tertiary">{cred.issuer}</p>
                  </div>
                  {cred.verificationUrl && (
                    <a
                      href={cred.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-500 hover:underline"
                    >
                      Verify
                    </a>
                  )}
                </div>
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
        <h3 className="text-sm font-semibold text-text-secondary">Builder Score</h3>
        {walletAddress && (
          <button
            onClick={fetchTalentData}
            disabled={loading}
            className="text-sm text-primary-500 hover:underline disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Fetch from Talent Protocol'}
          </button>
        )}
      </div>

      {!walletAddress && (
        <div className="glass rounded-2xl p-4 text-center text-text-tertiary text-sm">
          Connect your wallet to fetch your builder score
        </div>
      )}

      {score > 0 && (
        <div className="glass-liquid rounded-2xl p-6 text-center space-y-2">
          <div className="text-5xl font-bold gradient-text">
            {score}
          </div>
          <p className="text-text-secondary text-sm">Talent Protocol Score</p>
        </div>
      )}

      {credentials.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-text-secondary">{credentials.length} Credentials</p>
          <div className="grid gap-2">
            {credentials.slice(0, 3).map((cred, index) => (
              <div key={index} className="glass rounded-xl p-3">
                <p className="text-sm font-semibold">{cred.name}</p>
                <p className="text-xs text-text-tertiary">{cred.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
