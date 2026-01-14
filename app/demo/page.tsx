'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DemoPage() {
  const router = useRouter()
  const [starting, setStarting] = useState(false)

  const startDemo = () => {
    setStarting(true)
    // Set demo mode flag
    localStorage.setItem('demo-mode', 'true')
    localStorage.setItem('demo-user-id', 'demo-user-' + Date.now())

    setTimeout(() => {
      router.push('/editor/new')
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold gradient-text">
            MintCV Demo
          </h1>
          <p className="text-xl text-text-secondary">
            Experience the future of onchain resumes
          </p>
        </div>

        {/* Demo Features */}
        <Card variant="glass-strong" className="p-8">
          <CardHeader>
            <CardTitle className="text-3xl gradient-text">What You Can Try</CardTitle>
            <CardDescription className="text-lg">
              Explore all V1 MVP features in this interactive demo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Templates */}
              <div className="glass rounded-2xl p-6 space-y-3">
                <div className="text-3xl">🎨</div>
                <h3 className="text-xl font-semibold">4 Beautiful Templates</h3>
                <p className="text-sm text-text-secondary">
                  Minimalist Dark, Liquid Glass, Terminal, and Portfolio Grid
                </p>
              </div>

              {/* Block Editor */}
              <div className="glass rounded-2xl p-6 space-y-3">
                <div className="text-3xl">📝</div>
                <h3 className="text-xl font-semibold">Block-Based Editor</h3>
                <p className="text-sm text-text-secondary">
                  Drag-and-drop blocks for Header, Experience, Skills, and more
                </p>
              </div>

              {/* AI Enhancement */}
              <div className="glass rounded-2xl p-6 space-y-3">
                <div className="text-3xl">🤖</div>
                <h3 className="text-xl font-semibold">AI Enhancement</h3>
                <p className="text-sm text-text-secondary">
                  Polish your bio and job descriptions with Claude AI (requires API key)
                </p>
              </div>

              {/* PDF Export */}
              <div className="glass rounded-2xl p-6 space-y-3">
                <div className="text-3xl">📄</div>
                <h3 className="text-xl font-semibold">PDF Export</h3>
                <p className="text-sm text-text-secondary">
                  Download professional PDFs of your resume
                </p>
              </div>

              {/* Live Preview */}
              <div className="glass rounded-2xl p-6 space-y-3">
                <div className="text-3xl">👀</div>
                <h3 className="text-xl font-semibold">Live Preview</h3>
                <p className="text-sm text-text-secondary">
                  See real-time changes with Edit/Preview/Template modes
                </p>
              </div>

              {/* Onchain Integration */}
              <div className="glass rounded-2xl p-6 space-y-3">
                <div className="text-3xl">⛓️</div>
                <h3 className="text-xl font-semibold">Web3 Native</h3>
                <p className="text-sm text-text-secondary">
                  Builder scores, onchain activity, and NFT showcases
                </p>
              </div>
            </div>

            {/* Start Button */}
            <div className="text-center pt-6">
              <Button
                variant="primary"
                size="lg"
                onClick={startDemo}
                disabled={starting}
                className="px-12 py-6 text-lg"
              >
                {starting ? 'Starting Demo...' : 'Start Building Your CV →'}
              </Button>
            </div>

            {/* Note */}
            <div className="text-center text-sm text-text-tertiary pt-4">
              <p>
                Demo mode saves to localStorage. For full features including Supabase persistence and AI enhancement, configure your API keys.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Coming Soon */}
        <Card variant="glass" className="p-6">
          <h3 className="text-xl font-semibold mb-4">Coming Soon (V1.1+)</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-text-secondary">
            <div>• Wallet authentication (SIWE)</div>
            <div>• Auto-fetch from Talent Protocol</div>
            <div>• NFT minting on Base</div>
            <div>• Token burn mechanics</div>
            <div>• LinkedIn integration</div>
            <div>• Automated job applications</div>
          </div>
        </Card>

        {/* Back Link */}
        <div className="text-center">
          <a href="/" className="text-text-secondary hover:text-text-primary transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
