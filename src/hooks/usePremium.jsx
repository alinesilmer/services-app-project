"use client"

import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import {
  setPremiumStatus,
  activatePremium,
  pausePremium,
  resumePremium,
  cancelPremium,
  expirePremium,
  renewPremium,
  upgradeFromTrial,
} from "../redux/slices/premiumSlice"
import { setPremiumStatus as setStoragePremiumStatus, setPremiumProfStatus, isPremiumUser, isPremiumProf } from "../utils/storage"

export function usePremium() {
  const dispatch = useDispatch()
  const premium = useSelector((state) => state.premium)
  const user = useSelector((state) => state.auth.user)

  const initializePremium = async () => {
    try {
      const isPremium = await isPremiumUser()
      const isPremiumProfessional = await isPremiumProf()

      if ((isPremium || isPremiumProfessional) && !premium.premiumStatus) {
        dispatch(
          setPremiumStatus({
            isPremium,
            isPremiumProf: isPremiumProfessional,
            premiumStatus: "active",
            premiumStartDate: new Date().toISOString(),
            premiumEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), 
          }),
        )
      }
    } catch (error) {
      console.error("Error initializing premium:", error)
    }
  }

  const syncWithStorage = async () => {
    try {
      await setStoragePremiumStatus(premium.isPremium)
      await setPremiumProfStatus(premium.isPremiumProf)
    } catch (error) {
      console.error("Error syncing premium with storage:", error)
    }
  }

  const subscribeToPremium = async (planType, planDetails) => {
    try {
      const userType = user?.userType || "client"
      dispatch(
        activatePremium({
          premiumType: planType,
          planDetails,
          userType,
        }),
      )
      await syncWithStorage()
      return { success: true }
    } catch (error) {
      console.error("Error subscribing to premium:", error)
      return { success: false, error: error.message }
    }
  }

  const startFreeTrial = async () => {
    try {
      if (premium.trialUsed) {
        return { success: false, error: "Ya has usado tu prueba gratuita" }
      }

      const userType = user?.userType || "client"
      dispatch(
        activatePremium({
          premiumType: "Prueba",
          planDetails: { planName: "Prueba de 7 días gratis", price: 0 },
          userType,
        }),
      )
      await syncWithStorage()
      return { success: true }
    } catch (error) {
      console.error("Error starting free trial:", error)
      return { success: false, error: error.message }
    }
  }

  const upgradeFromTrialToPaid = async (planType, planDetails) => {
    try {
      dispatch(upgradeFromTrial({ premiumType: planType, planDetails }))
      await syncWithStorage()
      return { success: true }
    } catch (error) {
      console.error("Error upgrading from trial:", error)
      return { success: false, error: error.message }
    }
  }

  const pausePremiumPlan = async (duration = 6) => {
    try {
      dispatch(pausePremium({ pauseDuration: duration }))
      await syncWithStorage()
      return { success: true }
    } catch (error) {
      console.error("Error pausing premium:", error)
      return { success: false, error: error.message }
    }
  }

  const resumePremiumPlan = async () => {
    try {
      dispatch(resumePremium())
      await syncWithStorage()
      return { success: true }
    } catch (error) {
      console.error("Error resuming premium:", error)
      return { success: false, error: error.message }
    }
  }

  const cancelPremiumPlan = async () => {
    try {
      dispatch(cancelPremium())
      await syncWithStorage()
      return { success: true }
    } catch (error) {
      console.error("Error cancelling premium:", error)
      return { success: false, error: error.message }
    }
  }

  const renewPremiumPlan = async (planType) => {
    try {
      dispatch(renewPremium({ premiumType: planType }))
      await syncWithStorage()
      return { success: true }
    } catch (error) {
      console.error("Error renewing premium:", error)
      return { success: false, error: error.message }
    }
  }

  const isExpired = () => {
    if (!premium.premiumEndDate) return false
    return new Date() > new Date(premium.premiumEndDate)
  }

  const shouldResume = () => {
    if (premium.premiumStatus !== "paused") return false
    if (!premium.pausedUntil) return false
    return new Date() > new Date(premium.pausedUntil)
  }

  const getDaysRemaining = () => {
    if (!premium.premiumEndDate) return 0
    const now = new Date()
    const endDate = new Date(premium.premiumEndDate)
    const diffTime = endDate - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  const canStartTrial = () => {
    return !premium.trialUsed && premium.premiumStatus === "inactive"
  }

  useEffect(() => {
    const checkPremiumStatus = () => {
      if (isExpired() && (premium.premiumStatus === "active" || premium.premiumStatus === "trial")) {
        dispatch(expirePremium())
        syncWithStorage()
      }

      if (shouldResume()) {
        dispatch(resumePremium())
        syncWithStorage()
      }
    }

    checkPremiumStatus()

    const interval = setInterval(checkPremiumStatus, 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [premium.premiumEndDate, premium.pausedUntil, premium.premiumStatus])

  useEffect(() => {
    initializePremium()
  }, [])

  return {
    premium,
    isExpired: isExpired(),
    shouldResume: shouldResume(),
    daysRemaining: getDaysRemaining(),
    canStartTrial: canStartTrial(),
    subscribeToPremium,
    startFreeTrial,
    upgradeFromTrialToPaid,
    pausePremiumPlan,
    resumePremiumPlan,
    cancelPremiumPlan,
    renewPremiumPlan,
    initializePremium,
  }
}
