import { MinimalistDark } from './minimalist-dark'
import { LiquidGlass } from './liquid-glass'
import { Terminal } from './terminal'
import { PortfolioGrid } from './portfolio-grid'

export type TemplateType = 'minimalist-dark' | 'liquid-glass' | 'terminal' | 'portfolio-grid'

export const TEMPLATES = {
  'minimalist-dark': MinimalistDark,
  'liquid-glass': LiquidGlass,
  'terminal': Terminal,
  'portfolio-grid': PortfolioGrid,
}

export const TEMPLATE_METADATA: Record<TemplateType, {
  name: string
  description: string
  category: string
  isPremium: boolean
  preview: string
}> = {
  'minimalist-dark': {
    name: 'Minimalist Dark',
    description: 'Clean, typography-focused design with lots of whitespace',
    category: 'minimalist',
    isPremium: false,
    preview: '/templates/minimalist-dark.png',
  },
  'liquid-glass': {
    name: 'Liquid Glass',
    description: 'Full glassmorphism with gradient backgrounds and depth effects',
    category: 'liquid-glass',
    isPremium: false,
    preview: '/templates/liquid-glass.png',
  },
  'terminal': {
    name: 'Terminal',
    description: 'Monospace, green-on-black, hacker aesthetic',
    category: 'terminal',
    isPremium: false,
    preview: '/templates/terminal.png',
  },
  'portfolio-grid': {
    name: 'Portfolio Grid',
    description: 'Image-heavy, gallery-style for visual builders',
    category: 'portfolio',
    isPremium: false,
    preview: '/templates/portfolio-grid.png',
  },
}

export function getTemplate(templateType: TemplateType) {
  return TEMPLATES[templateType] || MinimalistDark
}
