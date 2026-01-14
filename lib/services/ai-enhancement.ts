import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

/**
 * Polish a job description using AI
 */
export async function polishJobDescription(description: string): Promise<string> {
  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Polish this job description for a resume. Make it more professional, concise, and impactful. Focus on achievements and results. Keep it to 2-3 sentences max. Return ONLY the polished description, no explanations.

Original description:
${description}`,
      },
    ],
  })

  const textContent = message.content.find((block) => block.type === 'text')
  return textContent && textContent.type === 'text' ? textContent.text : description
}

/**
 * Polish a bio/summary using AI
 */
export async function polishBio(bio: string): Promise<string> {
  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Polish this professional bio for a resume. Make it compelling, professional, and highlight key strengths. Keep it to 2-3 sentences. Return ONLY the polished bio, no explanations.

Original bio:
${bio}`,
      },
    ],
  })

  const textContent = message.content.find((block) => block.type === 'text')
  return textContent && textContent.type === 'text' ? textContent.text : bio
}

/**
 * Optimize CV for a specific job posting
 */
export async function optimizeForJob(params: {
  cvContent: string
  jobDescription: string
}): Promise<{
  suggestions: string[]
  optimizedContent: any
}> {
  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `You are a professional resume consultant. Given this CV and job description, provide:
1. 3-5 specific suggestions for tailoring the CV to this job
2. Key skills to highlight

Job Description:
${params.jobDescription}

Current CV:
${params.cvContent}

Respond in this JSON format:
{
  "suggestions": ["suggestion 1", "suggestion 2", ...],
  "keySkills": ["skill 1", "skill 2", ...]
}`,
      },
    ],
  })

  const textContent = message.content.find((block) => block.type === 'text')
  if (textContent && textContent.type === 'text') {
    try {
      const response = JSON.parse(textContent.text)
      return {
        suggestions: response.suggestions || [],
        optimizedContent: response,
      }
    } catch (e) {
      return {
        suggestions: [],
        optimizedContent: {},
      }
    }
  }

  return {
    suggestions: [],
    optimizedContent: {},
  }
}

/**
 * Generate skill suggestions based on experience
 */
export async function suggestSkills(experiences: any[]): Promise<string[]> {
  const experienceText = experiences
    .map((exp) => `${exp.title} at ${exp.company}: ${exp.description}`)
    .join('\n\n')

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: `Based on these work experiences, suggest 8-12 relevant technical and professional skills. Return ONLY a comma-separated list of skills, nothing else.

Experiences:
${experienceText}`,
      },
    ],
  })

  const textContent = message.content.find((block) => block.type === 'text')
  if (textContent && textContent.type === 'text') {
    return textContent.text
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }

  return []
}

/**
 * Improve entire CV content
 */
export async function enhanceCV(params: {
  blocks: any[]
  targetRole?: string
}): Promise<{
  enhancedBlocks: any[]
  suggestions: string[]
}> {
  const cvSummary = params.blocks
    .map((block) => {
      if (block.type === 'header') {
        return `Name: ${block.data.name}\nTitle: ${block.data.title}\nBio: ${block.data.bio}`
      }
      if (block.type === 'experience') {
        return block.data.experiences
          ?.map((exp: any) => `${exp.title} at ${exp.company}`)
          .join('\n')
      }
      return ''
    })
    .filter(Boolean)
    .join('\n\n')

  const targetContext = params.targetRole
    ? `\nTarget Role: ${params.targetRole}`
    : ''

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Review this CV and provide 5 specific suggestions for improvement. Focus on:
- Stronger action verbs
- Quantifiable achievements
- Better positioning for ${params.targetRole || 'tech roles'}
- Professional language

CV Summary:
${cvSummary}${targetContext}

Return suggestions as a JSON array of strings:
["suggestion 1", "suggestion 2", ...]`,
      },
    ],
  })

  const textContent = message.content.find((block) => block.type === 'text')
  let suggestions: string[] = []

  if (textContent && textContent.type === 'text') {
    try {
      suggestions = JSON.parse(textContent.text)
    } catch (e) {
      suggestions = textContent.text.split('\n').filter(Boolean)
    }
  }

  return {
    enhancedBlocks: params.blocks, // Return original for now
    suggestions,
  }
}
