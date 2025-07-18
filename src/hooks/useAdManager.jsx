import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useAdTimer } from './useAdTimer'

export const useAdManager = () => {
  const premium = useSelector(s => s.premium)
  const user = useSelector(s => s.auth.user)
  const [showAd, setShowAd] = useState(false)
  const { canClose, timer } = useAdTimer(showAd)
  const timerRef = useRef(null)

  const AD_DELAY_MS = 300000 // 5 minutos

  const isPremium = useMemo(() => {
    return (
      (premium.isPremium || premium.isPremiumProf) &&
      ['active', 'trial'].includes(premium.premiumStatus)
    )
  }, [premium.isPremium, premium.isPremiumProf, premium.premiumStatus])

  useEffect(() => {
    clearTimeout(timerRef.current)
    setShowAd(false)

    if (!user || isPremium) return

    timerRef.current = setTimeout(() => setShowAd(true), AD_DELAY_MS)
    return () => clearTimeout(timerRef.current)
  }, [user, isPremium])

  const closeAd = useCallback(() => {
    if (!canClose) return
    setShowAd(false)
    clearTimeout(timerRef.current)
    if (user && !isPremium) {
      timerRef.current = setTimeout(() => setShowAd(true), AD_DELAY_MS)
    }
  }, [canClose, isPremium, user])

  return { showAd, closeAd, canClose, timer, isPremium }
}
