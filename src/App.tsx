import { useState } from 'react'
import { HashRouter } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { signOut } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useAuth } from './hooks/useAuth'
import { LoginForm } from './components/LoginForm'
import { InputForm } from './components/InputForm'
import { LoadingSkeleton } from './components/LoadingSkeleton'
import { ResultView } from './components/ResultView'
import { useRepurpose } from './hooks/useRepurpose'
import { useHistory } from './hooks/useHistory'
import { DEMO_EMAIL, DEMO_HISTORY } from './lib/demo'
import { RepurposeResponse, InputMode, Language, HistoryItem } from './types'

type View = 'form' | 'loading' | 'result' | 'error'

export default function App() {
  const { user, loading: authLoading } = useAuth()
  const { submit, loading, error, reset } = useRepurpose()
  const { history, addToHistory } = useHistory()
  const isDemo = user?.email === DEMO_EMAIL

  const [view, setView] = useState<View>('form')
  const [result, setResult] = useState<RepurposeResponse | null>(null)
  const [lastInputType, setLastInputType] = useState<InputMode>('url')
  const [retryParams, setRetryParams] = useState<{ input_type: InputMode; input_value: string; target_language: Language } | null>(null)

  const handleSubmit = async (input_type: InputMode, input_value: string, target_language: Language) => {
    setLastInputType(input_type)
    setRetryParams({ input_type, input_value, target_language })
    setView('loading')
    reset()

    const data = await submit({ input_type, input_value, target_language })

    if (data) {
      setResult(data)
      setView('result')
      addToHistory({
        id: uuidv4(),
        timestamp: Date.now(),
        input_type,
        input_value: input_type === 'text' ? input_value.slice(0, 100) : input_value,
        target_language,
        response: data,
      })
    } else {
      setView('error')
    }
  }

  const handleNewContent = () => {
    reset()
    setResult(null)
    setRetryParams(null)
    setView('form')
  }

  const handleHistorySelect = (item: HistoryItem) => {
    setResult(item.response)
    setView('result')
  }

  const handleRetry = () => {
    if (retryParams) {
      handleSubmit(retryParams.input_type, retryParams.input_value, retryParams.target_language)
    } else {
      handleNewContent()
    }
  }

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Header */}
          <header className="text-center mb-10">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Compartilhator
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Transform video URLs or text into ready-to-publish social media posts
            </p>
            {user && (
              <p className="text-gray-600 mt-3 text-xs">
                {user.email} ·{' '}
                <button onClick={() => void signOut(auth)} className="underline hover:text-gray-400">
                  Sign out
                </button>
              </p>
            )}
          </header>

          {/* The API only answers signed-in users (Firebase ID token). */}
          {!authLoading && !user && <LoginForm />}

          {/* Main content */}
          {user && view === 'form' && (
            <InputForm
              onSubmit={handleSubmit}
              loading={loading}
              history={isDemo ? DEMO_HISTORY : history}
              onHistorySelect={handleHistorySelect}
            />
          )}

          {user && view === 'loading' && <LoadingSkeleton inputType={lastInputType} />}

          {user && view === 'error' && error && (
            <div className="space-y-4">
              <div className="p-5 bg-red-950 border border-red-800 rounded-2xl">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.072 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <p className="text-red-200 font-medium text-sm mb-1">Something went wrong</p>
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleRetry}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-medium transition-all"
                >
                  Try Again
                </button>
                <button
                  onClick={handleNewContent}
                  className="flex-1 py-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 text-sm font-medium transition-all"
                >
                  New Content
                </button>
              </div>
            </div>
          )}

          {user && view === 'result' && result && (
            <ResultView data={result} onNewContent={handleNewContent} />
          )}
        </div>
      </div>
    </HashRouter>
  )
}
