import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"

export const useAdManager = ({ isPremium = false } = {}) => {
  const [showAd, setShowAd] = useState(false)
  const premium = useSelector((state) => state.premium)
  const user = useSelector((state) => state.auth.user)
  const adTimer = useRef(null)
  const initialCheckDone = useRef(false)

  const userIsPremium = () => {
    if (isPremium) return true

    if (user?.userType === "professional") {
      return premium.isPremiumProf && (premium.premiumStatus === "active" || premium.premiumStatus === "trial")
    } else {
      return premium.isPremium && (premium.premiumStatus === "active" || premium.premiumStatus === "trial")
    }
  }

  useEffect(() => {
    initialCheckDone.current = true
    const isPremiumUser = userIsPremium()

    console.log("Premium status check:", {
      userType: user?.userType,
      isPremium: premium.isPremium,
      isPremiumProf: premium.isPremiumProf,
      premiumStatus: premium.premiumStatus,
      finalIsPremium: isPremiumUser,
    })

    if (isPremiumUser) {
      setShowAd(false)
      if (adTimer.current) {
        clearTimeout(adTimer.current)
        adTimer.current = null
      }
    }
  }, [premium.isPremium, premium.isPremiumProf, premium.premiumStatus, user?.userType, isPremium])

  const triggerAd = () => {
    const isPremiumUser = userIsPremium()
    if (!isPremiumUser && initialCheckDone.current) {
      console.log("Triggering ad - user is not premium")
      setShowAd(true)
    } else {
      console.log("Not showing ad - user is premium or check not done")
    }
  }

  const closeAd = () => {
    setShowAd(false)
    resetAdTimer()
  }

  const resetAdTimer = () => {
    if (adTimer.current) {
      clearTimeout(adTimer.current)
      adTimer.current = null
    }

    const isPremiumUser = userIsPremium()
    if (!isPremiumUser && initialCheckDone.current) {
      console.log("Setting ad timer - user is not premium")
      adTimer.current = setTimeout(
        () => {
          triggerAd()
        },
        7 * 60 * 1000, 
      )
    }
  }

  useEffect(() => {
    const isPremiumUser = userIsPremium()
    console.log("Ad manager effect - userIsPremium:", isPremiumUser)

    if (!isPremiumUser && initialCheckDone.current) {
      triggerAd()
      resetAdTimer()
    } else {
      setShowAd(false)
    }

    return () => {
      if (adTimer.current) {
        clearTimeout(adTimer.current)
        adTimer.current = null
      }
    }
  }, [premium.isPremium, premium.isPremiumProf, premium.premiumStatus, user?.userType])

  return { showAd, triggerAd, closeAd, userIsPremium: userIsPremium() }
}
