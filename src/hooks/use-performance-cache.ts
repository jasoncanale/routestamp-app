import { useRef, useCallback } from 'react'

// Global cache for expensive computations
const globalCache = new Map<string, any>()

export function usePerformanceCache<T>(
  key: string,
  computeFn: () => T,
  dependencies: any[] = []
): T {
  const cacheKey = `${key}-${JSON.stringify(dependencies)}`
  
  if (globalCache.has(cacheKey)) {
    return globalCache.get(cacheKey)
  }
  
  const result = computeFn()
  globalCache.set(cacheKey, result)
  return result
}

export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: any[] = []
): T {
  const callbackRef = useRef<T>(callback)
  callbackRef.current = callback
  
  return useCallback((...args: any[]) => {
    return callbackRef.current(...args)
  }, dependencies) as T
}

export function clearGlobalCache() {
  globalCache.clear()
}

export function getCacheSize() {
  return globalCache.size
}

export function getCacheKeys() {
  return Array.from(globalCache.keys())
} 