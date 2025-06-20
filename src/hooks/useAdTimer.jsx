// useAdTimer: countdown timer that enables an action when it reaches 0.
// Props: start boolean to start countdown
// Returns: { canClose, timer }
//------------------------------------------------------------------//
// File: hooks/useAdTimer.js
import { useEffect, useState } from "react"

export const useAdTimer = (start) => {
  const [canClose, setCanClose] = useState(false)
  const [timer, setTimer] = useState(5)

  useEffect(() => {
    let interval
    if (start) {
      setCanClose(false)
      setTimer(5)
      interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            clearInterval(interval)
            setCanClose(true)
            return 0
          }
          return t - 1
        })
      }, 1000)
    } else {
      setCanClose(false)
      setTimer(5)
    }
    return () => clearInterval(interval)
  }, [start])

  return { canClose, timer }
}
