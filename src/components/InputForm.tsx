import { useState } from 'react'
import { InputMode, Language, HistoryItem } from '../types'
import { HistoryList } from './HistoryList'

interface InputFormProps {
  onSubmit: (input_type: InputMode, input_value: string, target_language: Language) => void
  loading: boolean
  history: HistoryItem[]
  onHistorySelect: (item: HistoryItem) => void
}

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'pt', label: 'Português (BR)' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
]

function isValidUrl(s: string): boolean {
  try {
    const url = new URL(s)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function InputForm({ onSubmit, loading, history, onHistorySelect }: InputFormProps) {
  const [mode, setMode] = useState<InputMode>('url')
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  const [language, setLanguage] = useState<Language>('pt')
  const [urlError, setUrlError] = useState('')

  const inputValue = mode === 'url' ? url : text
  const isEmpty = inputValue.trim() === ''

  const handleModeSwitch = (next: InputMode) => {
    setMode(next)
    setUrlError('')
  }

  const handleUrlChange = (v: string) => {
    setUrl(v)
    if (urlError && (v === '' || isValidUrl(v))) setUrlError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEmpty) return
    if (mode === 'url') {
      if (!isValidUrl(url.trim())) {
        setUrlError('Please enter a valid URL (must start with http:// or https://)')
        return
      }
    }
    onSubmit(mode, inputValue.trim(), language)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Mode toggle */}
      <div className="flex bg-gray-900 rounded-xl p-1 border border-gray-800">
        {(['url', 'text'] as InputMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => handleModeSwitch(m)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              mode === m
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {m === 'url' ? '🎬 Video URL' : '📝 Text'}
          </button>
        ))}
      </div>

      {/* Input */}
      {mode === 'url' ? (
        <div>
          <input
            type="url"
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://www.instagram.com/reel/..."
            className={`w-full bg-gray-900 border rounded-xl px-4 py-3.5 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
              urlError ? 'border-red-500' : 'border-gray-800 hover:border-gray-700'
            }`}
          />
          {urlError && <p className="mt-1.5 text-red-400 text-xs">{urlError}</p>}
          <p className="mt-1.5 text-gray-600 text-xs">Supports Instagram Reels, YouTube, and TikTok</p>
        </div>
      ) : (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your raw content here…"
          rows={6}
          className="w-full bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl px-4 py-3.5 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors resize-none"
        />
      )}

      {/* Language */}
      <div>
        <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">
          Target Language
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
        >
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isEmpty || loading}
        className="w-full py-4 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-purple-900/30"
      >
        {loading ? 'Generating…' : '✨ Generate Posts'}
      </button>

      <HistoryList history={history} onSelect={onHistorySelect} />
    </form>
  )
}
