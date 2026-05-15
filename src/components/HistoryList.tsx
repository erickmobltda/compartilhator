import { HistoryItem } from '../types'

interface HistoryListProps {
  history: HistoryItem[]
  onSelect: (item: HistoryItem) => void
}

function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts
  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

function truncate(s: string, n: number): string {
  return s.length > n ? s.slice(0, n) + '…' : s
}

export function HistoryList({ history, onSelect }: HistoryListProps) {
  const recent = history.slice(0, 5)

  if (recent.length === 0) {
    return (
      <div className="mt-8 text-center py-8 border border-dashed border-gray-700 rounded-2xl">
        <svg className="w-10 h-10 text-gray-700 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-gray-500 text-sm">No generations yet — try your first one above!</p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-medium">Recent</h3>
      <div className="space-y-2">
        {recent.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 hover:bg-gray-800 transition-colors group"
          >
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                item.input_type === 'url'
                  ? 'bg-purple-900 text-purple-300'
                  : 'bg-teal-900 text-teal-300'
              }`}
            >
              {item.input_type === 'url' ? 'URL' : 'Text'}
            </span>
            <span className="text-gray-300 text-sm truncate flex-1 group-hover:text-white transition-colors">
              {truncate(item.input_value, 60)}
            </span>
            <span className="text-gray-600 text-xs flex-shrink-0">{formatRelativeTime(item.timestamp)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
