import { useState } from 'react'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'

function authErrorMessage(err: unknown): string {
  if (err instanceof FirebaseError) {
    if (err.code === 'auth/invalid-credential') return 'Wrong email or password.'
    if (err.code === 'auth/too-many-requests') return 'Too many attempts. Try again in a few minutes.'
  }
  return err instanceof Error ? err.message : 'Sign-in failed.'
}

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-xl bg-gray-900 border border-gray-800 focus:border-purple-500 focus:outline-none px-4 py-3 text-sm text-gray-100 placeholder-gray-600'

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 p-6 bg-gray-900/50 border border-gray-800 rounded-2xl">
      <p className="text-sm text-gray-400 text-center">Sign in to generate posts.</p>
      <input
        type="email"
        autoComplete="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
        required
      />
      <input
        type="password"
        autoComplete="current-password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputClass}
        required
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading || !email || !password}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white text-sm font-medium transition-all"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}
