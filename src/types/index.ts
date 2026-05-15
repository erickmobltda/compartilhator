export interface InstagramContent {
  caption: string
  hashtags: string[]
}

export interface LinkedInContent {
  title: string
  body: string
  hashtags: string[]
}

export interface FacebookContent {
  text: string
}

export interface NewsletterContent {
  subject: string
  preview_text: string
  body: string
}

export interface SourceInfo {
  url: string
  title: string
  platform: string
  detected_language: string
}

export interface RepurposeResponse {
  instagram: InstagramContent
  linkedin: LinkedInContent
  facebook: FacebookContent
  newsletter: NewsletterContent
  source?: SourceInfo
}

export interface HistoryItem {
  id: string
  timestamp: number
  input_type: 'url' | 'text'
  input_value: string
  target_language: string
  response: RepurposeResponse
}

export type InputMode = 'url' | 'text'
export type Language = 'pt' | 'en' | 'es'
