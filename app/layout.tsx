import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MintCV - Onchain Resume Builder for Web3 Builders',
  description: 'Create, mint, and share your onchain resume. Verify your web3 credentials and showcase your builder journey.',
  metadataBase: new URL('https://mintcv.xyz'),
  openGraph: {
    title: 'MintCV - Onchain Resume Builder',
    description: 'Create, mint, and share your onchain resume',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MintCV - Onchain Resume Builder',
    description: 'Create, mint, and share your onchain resume',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-text-primary antialiased`}>
        <Providers>
          <div className="min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
