
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

export const useAdManager = () => {
  const [showAd, setShowAd] = useState(false)
  const premium = useSelector((s) => s.premium)
  const userData = useSelector((s) => s.auth.user)
  const timerRef = useRef(null)

  const userIsPremium = () =>
    (premium.isPremium || premium.isPremiumProf) &&
    ["active", "trial"].includes(premium.premiumStatus)

  useEffect(() => {
    if (userData?.fullName && !userIsPremium()) {
      setShowAd(true)
      timerRef.current = setTimeout(() => setShowAd(true), 1 * 60 * 1000)
    } else {
      setShowAd(false)
      clearTimeout(timerRef.current)
    }

    return () => clearTimeout(timerRef.current)
  }, [userData?.fullName, premium.premiumStatus])

  const closeAd = () => {
    setShowAd(false)
    clearTimeout(timerRef.current)
    if (!userIsPremium()) {
      timerRef.current = setTimeout(() => setShowAd(true), 1 * 60 * 1000)
    }
  }

  return { showAd, closeAd, userIsPremium: userIsPremium() }
}
