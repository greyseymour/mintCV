export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Logo/Title */}
          <div className="space-y-4">
            <h1 className="text-7xl font-bold gradient-text">
              MintCV
            </h1>
            <p className="text-2xl text-text-secondary">
              Onchain Resume Builder for Web3 Builders
            </p>
          </div>

          {/* Glass Card */}
          <div className="glass-liquid rounded-3xl p-8 max-w-2xl mx-auto space-y-6">
            <p className="text-lg text-text-secondary">
              Connect your web3 identity, aggregate verifiable credentials, and create a living resume that updates with your onchain activity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="glass-strong px-8 py-4 rounded-2xl font-semibold hover:glow-primary transition-all duration-300">
                Get Started
              </button>
              <button className="glass px-8 py-4 rounded-2xl font-semibold text-text-secondary hover:text-text-primary transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <FeatureCard
              title="Verifiable Credentials"
              description="Pull in your Talent Protocol score, GitHub activity, and onchain achievements"
            />
            <FeatureCard
              title="Living Resume"
              description="Your CV automatically updates with new contracts, NFT mints, and DAO participation"
            />
            <FeatureCard
              title="Mint & Share"
              description="Export as PDF, mint onchain as NFT, or share your custom link"
            />
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="glass px-6 py-3 rounded-full border border-border-strong">
          <p className="text-sm text-text-secondary">
            🚀 V1 MVP in Development • Powered by $MINTCV on Base
          </p>
        </div>
      </div>
    </main>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="glass rounded-2xl p-6 space-y-3 hover:glass-strong transition-all duration-300 group">
      <h3 className="text-xl font-semibold group-hover:gradient-text transition-all duration-300">
        {title}
      </h3>
      <p className="text-text-secondary text-sm">
        {description}
      </p>
    </div>
  )
}
