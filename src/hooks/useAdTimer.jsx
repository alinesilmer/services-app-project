// useAdTimer: countdown timer that enables an action when it reaches 0.
// Props: start boolean to start countdown
// Returns: { canClose, timer }
//------------------------------------------------------------------//

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
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            setCanClose(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      setCanClose(false)
      setTimer(5)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [start])

  return { canClose, timer }
}
