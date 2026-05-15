import { RepurposeResponse } from '../types'
import { PlatformCard } from './PlatformCard'

interface ResultViewProps {
  data: RepurposeResponse
  onNewContent: () => void
}

const PLATFORM_BADGE_COLORS: Record<string, string> = {
  instagram: 'bg-pink-900 text-pink-300',
  youtube: 'bg-red-900 text-red-300',
  tiktok: 'bg-gray-800 text-gray-200',
  default: 'bg-gray-800 text-gray-300',
}

export function ResultView({ data, onNewContent }: ResultViewProps) {
  const { source } = data

  return (
    <div className="space-y-6">
      {/* Source info */}
      {source && (
        <div className="flex flex-wrap items-start gap-3 p-4 bg-gray-900 border border-gray-800 rounded-2xl">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
              PLATFORM_BADGE_COLORS[source.platform?.toLowerCase()] ?? PLATFORM_BADGE_COLORS.default
            }`}
          >
            {source.platform ?? 'Video'}
          </span>
          {source.title && (
            <p className="text-gray-300 text-sm flex-1 min-w-0 truncate">{source.title}</p>
          )}
          {source.detected_language && (
            <span className="text-gray-600 text-xs uppercase tracking-wider ml-auto flex-shrink-0">
              {source.detected_language}
            </span>
          )}
        </div>
      )}

      {/* Platform cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PlatformCard platform="instagram" content={data.instagram} />
        <PlatformCard platform="linkedin" content={data.linkedin} />
        <PlatformCard platform="facebook" content={data.facebook} />
        <PlatformCard platform="newsletter" content={data.newsletter} />
      </div>

      {/* Actions */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onNewContent}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 hover:bg-gray-800 text-gray-300 hover:text-white text-sm font-medium transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Content
        </button>
      </div>
    </div>
  )
}
