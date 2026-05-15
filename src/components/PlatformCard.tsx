import { useState } from 'react'
import {
  InstagramContent,
  LinkedInContent,
  FacebookContent,
  NewsletterContent,
} from '../types'

type PlatformContent =
  | { platform: 'instagram'; content: InstagramContent }
  | { platform: 'linkedin'; content: LinkedInContent }
  | { platform: 'facebook'; content: FacebookContent }
  | { platform: 'newsletter'; content: NewsletterContent }

type Props = PlatformContent

const PLATFORM_META = {
  instagram: {
    label: 'Instagram',
    accent: 'from-pink-500 to-purple-600',
    iconPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  linkedin: {
    label: 'LinkedIn',
    accent: 'from-blue-500 to-blue-700',
    iconPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  facebook: {
    label: 'Facebook',
    accent: 'from-blue-700 to-blue-900',
    iconPath: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  newsletter: {
    label: 'Newsletter',
    accent: 'from-teal-500 to-teal-700',
    iconPath: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  },
}

function formatHashtags(tags: string[]): string {
  return tags.map((t) => (t.startsWith('#') ? t : `#${t}`)).join(' ')
}

function buildCopyText(p: Props): string {
  if (p.platform === 'instagram') {
    const tags = formatHashtags(p.content.hashtags)
    return [p.content.caption, tags].filter(Boolean).join('\n')
  }
  if (p.platform === 'linkedin') {
    const tags = formatHashtags(p.content.hashtags)
    return [p.content.title, p.content.body, tags].filter(Boolean).join('\n\n')
  }
  if (p.platform === 'facebook') {
    return p.content.text
  }
  // newsletter
  return [p.content.subject, p.content.preview_text, p.content.body].filter(Boolean).join('\n\n')
}

function CardBody(p: Props) {
  if (p.platform === 'instagram') {
    const { caption, hashtags } = p.content
    return (
      <>
        <p className="text-gray-200 text-sm whitespace-pre-wrap leading-relaxed">{caption}</p>
        {hashtags.length > 0 && (
          <p className="text-purple-400 text-xs mt-2 leading-relaxed">{formatHashtags(hashtags)}</p>
        )}
      </>
    )
  }
  if (p.platform === 'linkedin') {
    const { title, body, hashtags } = p.content
    return (
      <>
        {title && <p className="text-white font-semibold text-sm mb-2">{title}</p>}
        <p className="text-gray-200 text-sm whitespace-pre-wrap leading-relaxed">{body}</p>
        {hashtags.length > 0 && (
          <p className="text-blue-400 text-xs mt-2">{formatHashtags(hashtags)}</p>
        )}
      </>
    )
  }
  if (p.platform === 'facebook') {
    return <p className="text-gray-200 text-sm whitespace-pre-wrap leading-relaxed">{p.content.text}</p>
  }
  // newsletter
  const { subject, preview_text, body } = p.content
  return (
    <>
      {subject && <p className="text-white font-semibold text-sm mb-1">Subject: {subject}</p>}
      {preview_text && <p className="text-teal-400 text-xs mb-2 italic">{preview_text}</p>}
      <p className="text-gray-200 text-sm whitespace-pre-wrap leading-relaxed">{body}</p>
    </>
  )
}

export function PlatformCard(props: Props) {
  const [copied, setCopied] = useState(false)
  const meta = PLATFORM_META[props.platform]

  const handleCopy = () => {
    const text = buildCopyText(props)
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 flex flex-col">
      <div className={`h-1.5 bg-gradient-to-r ${meta.accent}`} />
      <div className="p-5 flex-1 space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <div className={`p-1.5 rounded-lg bg-gradient-to-br ${meta.accent}`}>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d={meta.iconPath} />
            </svg>
          </div>
          <span className="text-white font-medium text-sm">{meta.label}</span>
        </div>

        <div className="max-h-64 overflow-y-auto pr-1 scrollbar-thin">
          <CardBody {...props} />
        </div>
      </div>

      <div className="px-5 pb-5">
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  )
}
