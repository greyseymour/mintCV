import axios from 'axios'
import { API_ENDPOINTS } from '@/config/constants'
import type { GitHubData, Repository } from '@/types'

const client = axios.create({
  baseURL: API_ENDPOINTS.GITHUB,
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
})

// Add auth token if available
if (process.env.GITHUB_CLIENT_ID) {
  client.defaults.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
}

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  html_url: string
  created_at: string
  updated_at: string
  topics: string[]
}

interface GitHubUser {
  login: string
  name: string
  bio: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}

/**
 * Fetch GitHub user data and repositories
 */
export async function getGitHubData(username: string): Promise<GitHubData | null> {
  try {
    // Fetch user info
    const userResponse = await client.get(`/users/${username}`)
    const user = userResponse.data as GitHubUser

    // Fetch repositories
    const reposResponse = await client.get(`/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: 100,
      },
    })
    const repos = reposResponse.data as GitHubRepo[]

    // Calculate stats
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)

    // Get unique languages
    const languages = Array.from(
      new Set(repos.map(repo => repo.language).filter(Boolean))
    ) as string[]

    // Map repositories to our format
    const repositories: Repository[] = repos
      .filter(repo => !repo.name.startsWith('.')) // Filter out config repos
      .map(repo => ({
        name: repo.name,
        description: repo.description || '',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || 'Unknown',
        url: repo.html_url,
      }))
      .sort((a, b) => b.stars - a.stars) // Sort by stars
      .slice(0, 20) // Top 20 repos

    // Fetch commit count (approximate via events)
    let totalCommits = 0
    try {
      const eventsResponse = await client.get(`/users/${username}/events/public`)
      const events = eventsResponse.data
      const pushEvents = events.filter((e: any) => e.type === 'PushEvent')
      totalCommits = pushEvents.reduce((sum: number, e: any) => sum + (e.payload?.commits?.length || 0), 0)
    } catch (error) {
      console.error('Error fetching commit count:', error)
    }

    return {
      username: user.login,
      repositories,
      totalStars,
      totalCommits,
      languages,
    }
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
    return null
  }
}

/**
 * Fetch a single repository
 */
export async function getRepository(owner: string, repo: string): Promise<Repository | null> {
  try {
    const response = await client.get(`/repos/${owner}/${repo}`)
    const data = response.data as GitHubRepo

    return {
      name: data.name,
      description: data.description || '',
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language || 'Unknown',
      url: data.html_url,
    }
  } catch (error) {
    console.error('Error fetching repository:', error)
    return null
  }
}

/**
 * Fetch user's contribution stats
 */
export async function getContributionStats(username: string) {
  try {
    const response = await client.get(`/users/${username}/events/public`, {
      params: { per_page: 100 },
    })

    const events = response.data

    // Analyze events
    const stats = {
      totalEvents: events.length,
      pushEvents: events.filter((e: any) => e.type === 'PushEvent').length,
      pullRequests: events.filter((e: any) => e.type === 'PullRequestEvent').length,
      issues: events.filter((e: any) => e.type === 'IssuesEvent').length,
      stars: events.filter((e: any) => e.type === 'WatchEvent').length,
    }

    return stats
  } catch (error) {
    console.error('Error fetching contribution stats:', error)
    return null
  }
}

/**
 * Fetch programming language breakdown
 */
export async function getLanguageBreakdown(username: string): Promise<Record<string, number>> {
  try {
    const reposResponse = await client.get(`/users/${username}/repos`, {
      params: { per_page: 100 },
    })
    const repos = reposResponse.data as GitHubRepo[]

    const languageCounts: Record<string, number> = {}

    for (const repo of repos) {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1
      }
    }

    return languageCounts
  } catch (error) {
    console.error('Error fetching language breakdown:', error)
    return {}
  }
}
