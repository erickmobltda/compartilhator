interface LoadingSkeletonProps {
  inputType: 'url' | 'text'
}

const platforms = [
  { label: 'Instagram', accent: 'from-pink-500 to-purple-600' },
  { label: 'LinkedIn', accent: 'from-blue-500 to-blue-700' },
  { label: 'Facebook', accent: 'from-blue-700 to-blue-900' },
  { label: 'Newsletter', accent: 'from-teal-500 to-teal-700' },
]

export function LoadingSkeleton({ inputType }: LoadingSkeletonProps) {
  return (
    <div className="space-y-4">
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-3 text-gray-400 text-sm">
          <svg className="animate-spin h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>
            Generating your content…
            {inputType === 'url' && (
              <span className="ml-1 text-gray-500">This may take up to 40 seconds for video URLs.</span>
            )}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map(({ label, accent }) => (
          <div key={label} className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
            <div className={`h-1.5 bg-gradient-to-r ${accent}`} />
            <div className="p-5 space-y-3 animate-pulse">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-700" />
                <div className="h-4 w-24 bg-gray-700 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-700 rounded w-5/6" />
                <div className="h-3 bg-gray-700 rounded w-4/6" />
              </div>
              <div className="flex gap-2 pt-1">
                <div className="h-3 w-16 bg-gray-800 rounded" />
                <div className="h-3 w-12 bg-gray-800 rounded" />
                <div className="h-3 w-20 bg-gray-800 rounded" />
              </div>
              <div className="h-8 bg-gray-800 rounded-lg w-24 mt-2" />
            </div>
            <div className="px-5 pb-4 text-xs text-gray-600">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
