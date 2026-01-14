import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Welcome back
          </h1>
          <p className="text-text-secondary">
            Manage your onchain resumes and track your web3 credentials
          </p>
        </div>
        <Button variant="primary" size="lg">
          Create New CV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard
          title="Total CVs"
          value="0"
          description="Resumes created"
        />
        <StatCard
          title="Views"
          value="0"
          description="This month"
        />
        <StatCard
          title="Builder Score"
          value="—"
          description="Talent Protocol"
        />
        <StatCard
          title="Tokens Staked"
          value="0"
          description="$MINTCV"
        />
      </div>

      {/* Recent CVs */}
      <Card variant="glass-strong">
        <CardHeader>
          <CardTitle>Your CVs</CardTitle>
          <CardDescription>
            Manage and edit your existing resumes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-text-secondary mb-4">
              You haven't created any CVs yet
            </p>
            <Button variant="glass">
              Create Your First CV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Connected Data Sources */}
      <Card variant="glass-strong">
        <CardHeader>
          <CardTitle>Connected Data Sources</CardTitle>
          <CardDescription>
            Link your accounts to pull in verifiable credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <DataSourceCard
              name="Talent Protocol"
              connected={false}
              description="Builder score and credentials"
            />
            <DataSourceCard
              name="GitHub"
              connected={false}
              description="Repositories and contributions"
            />
            <DataSourceCard
              name="Farcaster"
              connected={false}
              description="Social graph and engagement"
            />
            <DataSourceCard
              name="Wallet Activity"
              connected={false}
              description="Onchain transactions and NFTs"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <Card variant="glass">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <p className="text-sm text-text-secondary">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-xs text-text-tertiary">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function DataSourceCard({ name, connected, description }: { name: string; connected: boolean; description: string }) {
  return (
    <div className="glass rounded-2xl p-4 flex items-center justify-between group hover:glass-strong transition-all">
      <div className="space-y-1">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
      {connected ? (
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-accent-green rounded-full"></span>
          <span className="text-sm text-text-secondary">Connected</span>
        </div>
      ) : (
        <Button variant="outline" size="sm">
          Connect
        </Button>
      )}
    </div>
  )
}
