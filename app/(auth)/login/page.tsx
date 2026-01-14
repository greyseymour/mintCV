import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ConnectWalletButton } from '@/components/auth/connect-wallet-button'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-5xl font-bold gradient-text mb-2">
            MintCV
          </h1>
          <p className="text-text-secondary">
            Sign in to create your onchain resume
          </p>
        </div>

        {/* Login Card */}
        <Card variant="glass-strong">
          <CardHeader>
            <CardTitle>Connect to get started</CardTitle>
            <CardDescription>
              Choose your preferred authentication method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Wallet Connect */}
            <ConnectWalletButton />

            {/* Farcaster */}
            <Button variant="glass" className="w-full" size="lg">
              Sign in with Farcaster
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background-secondary px-2 text-text-tertiary">
                  Or continue with
                </span>
              </div>
            </div>

            {/* GitHub */}
            <Button variant="outline" className="w-full">
              GitHub
            </Button>

            {/* More options (V2) */}
            <div className="text-center text-sm text-text-tertiary pt-4">
              <p>LinkedIn and Google coming soon</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-text-tertiary">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
