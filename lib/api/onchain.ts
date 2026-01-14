import { createPublicClient, http, parseAbi } from 'viem'
import { base, mainnet } from 'viem/chains'
import type { OnchainActivity, DaoMembership } from '@/types'

// Create clients for different chains
const baseClient = createPublicClient({
  chain: base,
  transport: http(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
    ? `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    : undefined
  ),
})

const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
    ? `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
    : undefined
  ),
})

/**
 * Fetch basic onchain activity for a wallet address
 */
export async function getOnchainActivity(address: `0x${string}`): Promise<OnchainActivity | null> {
  try {
    // Fetch transaction count
    const txCount = await baseClient.getTransactionCount({
      address,
    })

    // For now, return basic data
    // In production, you'd want to:
    // 1. Use Alchemy's NFT API for NFT data
    // 2. Use Etherscan/Basescan API for contract deployments
    // 3. Use The Graph for DAO memberships

    return {
      address,
      contractsDeployed: 0, // TODO: Implement via Basescan API
      nftsMinted: 0, // TODO: Implement via Alchemy NFT API
      nftsCollected: 0, // TODO: Implement via Alchemy NFT API
      daoMemberships: [], // TODO: Implement via The Graph
      transactions: Number(txCount),
    }
  } catch (error) {
    console.error('Error fetching onchain activity:', error)
    return null
  }
}

/**
 * Fetch NFTs owned by an address
 * This is a placeholder - you'll want to use Alchemy's NFT API
 */
export async function getNFTsOwned(address: `0x${string}`) {
  try {
    // Use Alchemy's NFT API
    const response = await fetch(
      `https://base-mainnet.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForOwner?owner=${address}&withMetadata=true`,
      {
        method: 'GET',
      }
    )

    const data = await response.json()
    return data.ownedNfts || []
  } catch (error) {
    console.error('Error fetching NFTs:', error)
    return []
  }
}

/**
 * Fetch ERC-20 token balances
 */
export async function getTokenBalances(address: `0x${string}`) {
  try {
    const response = await fetch(
      `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'alchemy_getTokenBalances',
          params: [address],
          id: 1,
        }),
      }
    )

    const data = await response.json()
    return data.result?.tokenBalances || []
  } catch (error) {
    console.error('Error fetching token balances:', error)
    return []
  }
}

/**
 * Check if address has deployed contracts
 */
export async function getDeployedContracts(address: `0x${string}`) {
  try {
    // This requires Basescan API or similar
    // For now, return empty array
    // TODO: Implement via Basescan API
    return []
  } catch (error) {
    console.error('Error fetching deployed contracts:', error)
    return []
  }
}

/**
 * Fetch DAO memberships by checking token balances of known DAOs
 * This is a simplified version - in production you'd use The Graph
 */
export async function getDAOMemberships(address: `0x${string}`): Promise<DaoMembership[]> {
  try {
    // Known DAO token addresses on Base (examples)
    const daoTokens: { name: string; address: `0x${string}` }[] = [
      // Add known DAO token addresses here
      // Example:
      // { name: 'Nouns DAO', address: '0x...' },
    ]

    const memberships: DaoMembership[] = []

    for (const dao of daoTokens) {
      try {
        const balance = await baseClient.readContract({
          address: dao.address,
          abi: parseAbi(['function balanceOf(address) view returns (uint256)']),
          functionName: 'balanceOf',
          args: [address],
        })

        if (balance > 0n) {
          memberships.push({
            name: dao.name,
            tokenAddress: dao.address,
            balance: balance.toString(),
          })
        }
      } catch (error) {
        console.error(`Error checking ${dao.name} membership:`, error)
      }
    }

    return memberships
  } catch (error) {
    console.error('Error fetching DAO memberships:', error)
    return []
  }
}

/**
 * Get transaction history summary
 */
export async function getTransactionHistory(address: `0x${string}`, limit: number = 100) {
  try {
    // Use Alchemy's Transfer API
    const response = await fetch(
      `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'alchemy_getAssetTransfers',
          params: [
            {
              fromAddress: address,
              category: ['external', 'internal', 'erc20', 'erc721', 'erc1155'],
              maxCount: `0x${limit.toString(16)}`,
              withMetadata: true,
            },
          ],
          id: 1,
        }),
      }
    )

    const data = await response.json()
    return data.result?.transfers || []
  } catch (error) {
    console.error('Error fetching transaction history:', error)
    return []
  }
}

/**
 * Get ENS or Basename for an address
 */
export async function getNameForAddress(address: `0x${string}`): Promise<string | null> {
  try {
    // Check for ENS name
    const ensName = await mainnetClient.getEnsName({
      address,
    })

    if (ensName) {
      return ensName
    }

    // TODO: Check for Basename
    // This would require querying Base's name service

    return null
  } catch (error) {
    console.error('Error fetching name for address:', error)
    return null
  }
}
