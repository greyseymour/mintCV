export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-strong border-b border-border-strong">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold gradient-text">
                MintCV
              </h1>

              {/* Nav Links */}
              <div className="hidden md:flex items-center space-x-6">
                <a href="/dashboard" className="text-text-secondary hover:text-text-primary transition-colors">
                  Dashboard
                </a>
                <a href="/dashboard/editor" className="text-text-secondary hover:text-text-primary transition-colors">
                  Editor
                </a>
                <a href="/dashboard/templates" className="text-text-secondary hover:text-text-primary transition-colors">
                  Templates
                </a>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Token Balance */}
              <div className="glass px-4 py-2 rounded-xl">
                <p className="text-sm text-text-secondary">
                  Balance: <span className="text-text-primary font-semibold">0 $MINTCV</span>
                </p>
              </div>

              {/* Profile */}
              <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                <span className="text-sm font-semibold">?</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
