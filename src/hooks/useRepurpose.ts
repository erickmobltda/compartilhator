import { useState, useRef, useCallback } from 'react'
import { RepurposeResponse, Language } from '../types'
import { auth } from '../lib/firebase'

const API_URL = import.meta.env.VITE_API_URL as string
const TIMEOUT_MS = 60_000

interface SubmitParams {
  input_type: 'url' | 'text'
  input_value: string
  target_language: Language
}

interface UseRepurposeResult {
  submit: (params: SubmitParams) => Promise<RepurposeResponse | null>
  loading: boolean
  error: string | null
  data: RepurposeResponse | null
  reset: () => void
}

function getErrorMessage(status: number, body: string): string {
  if (status === 429) return 'Too many requests. Please wait a moment and try again.'
  if (status === 401) return 'Your session expired. Sign in again.'
  try {
    const parsed = JSON.parse(body)
    const detail = parsed?.detail ?? parsed?.message ?? parsed?.error
    if (detail) return `Error: ${detail}`
  } catch {
    // ignore parse error
  }
  return `Server error (${status}). Please try again.`
}

export function useRepurpose(): UseRepurposeResult {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<RepurposeResponse | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setLoading(false)
    setError(null)
    setData(null)
  }, [])

  const submit = useCallback(async ({ input_type, input_value, target_language }: SubmitParams): Promise<RepurposeResponse | null> => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const timer = setTimeout(() => controller.abort('timeout'), TIMEOUT_MS)

    setLoading(true)
    setError(null)
    setData(null)

    const body: Record<string, string> = { target_language }
    if (input_type === 'url') {
      body.url = input_value
    } else {
      body.text = input_value
    }

    try {
      const token = await auth.currentUser?.getIdToken()
      if (!token) {
        setError('Your session expired. Sign in again.')
        return null
      }
      const res = await fetch(`${API_URL}/repurpose`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
        signal: controller.signal,
      })

      const text = await res.text()

      if (!res.ok) {
        const msg = getErrorMessage(res.status, text)
        setError(msg)
        return null
      }

      const json = JSON.parse(text) as RepurposeResponse
      setData(json)
      return json
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        const msg = (err.message === 'timeout')
          ? 'Request timed out after 60 seconds. Please try again.'
          : null
        if (msg) setError(msg)
      } else {
        setError('Could not reach the server. Check your connection.')
      }
      return null
    } finally {
      clearTimeout(timer)
      setLoading(false)
    }
  }, [])

  return { submit, loading, error, data, reset }
}
