import { useCallback, useEffect, useRef, useState } from "react"

/** Brief "Added" state for add-to-cart buttons. */
export function useAddedFeedback(ms = 1500) {
  const [added, setAdded] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const trigger = useCallback(() => {
    setAdded(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), ms)
  }, [ms])

  useEffect(() => () => clearTimeout(timer.current), [])

  return [added, trigger] as const
}
