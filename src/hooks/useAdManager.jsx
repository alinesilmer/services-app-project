import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

export const useAdManager = () => {
  const [showAd, setShowAd] = useState(false)
  const premium = useSelector((state) => state.premium)
  const timerRef = useRef()

  const userIsPremium = () =>
    (premium.isPremium || premium.isPremiumProf) &&
    ["active", "trial"].includes(premium.premiumStatus)

  useEffect(() => {
    if (!userIsPremium()) {
      setShowAd(true)
      scheduleNextAd()
    } else {
      setShowAd(false)
      clearTimeout(timerRef.current)
    }

    return () => clearTimeout(timerRef.current)
  }, [premium])

  function scheduleNextAd() {
    clearTimeout(timerRef.current)
    if (userIsPremium()) return
    timerRef.current = setTimeout(() => setShowAd(true), 7 * 60 * 1000)
  }

  function closeAd() {
    setShowAd(false)
    scheduleNextAd()
  }

  return {
    showAd,
    closeAd,
    userIsPremium: userIsPremium(),
  }
}
