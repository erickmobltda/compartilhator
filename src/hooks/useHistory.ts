import { useState, useCallback } from 'react'
import { HistoryItem } from '../types'

const STORAGE_KEY = 'compartilhator_history'
const MAX_ITEMS = 20

function readHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as HistoryItem[]) : []
  } catch {
    return []
  }
}

function writeHistory(items: HistoryItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(readHistory)

  const addToHistory = useCallback((item: HistoryItem) => {
    setHistory((prev) => {
      const next = [item, ...prev].slice(0, MAX_ITEMS)
      writeHistory(next)
      return next
    })
  }, [])

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setHistory([])
  }, [])

  return { history, addToHistory, clearHistory }
}
