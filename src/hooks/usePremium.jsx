"use client"

import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import {
  resetPremiumState,
  initializePremiumForUser,
  activatePremium,
  pausePremium,
  resumePremium,
  cancelPremium,
  expirePremium,
  renewPremium,
  upgradeFromTrial,
} from "../redux/slices/premiumSlice"
import {
  saveUserPremiumData,
  getUserPremiumData,
  setPremiumStatus as setStoragePremiumStatus,
  setPremiumProfStatus,
} from "../utils/storage"

export function usePremium() {
  const dispatch = useDispatch()
  const premium = useSelector((state) => state.premium)
  const user = useSelector((state) => state.auth.user)

  const getUserId = () => {
    return user?.email || user?.id || "default"
  }

  const initializePremium = async () => {
    try {
      const userId = getUserId()

      const userPremiumData = await getUserPremiumData(userId)

      dispatch(
        initializePremiumForUser({
          userId,
          premiumData: userPremiumData,
        }),
      )

      console.log(`Premium initialized for user: ${userId}`, userPremiumData)
    } catch (error) {
      console.error("Error initializing premium:", error)
    }
  }

  const syncWithStorage = async () => {
    try {
      const userId = getUserId()

      const premiumDataToSave = {
        isPremium: premium.isPremium,
        isPremiumProf: premium.isPremiumProf,
        premiumType: premium.premiumType,
        premiumStatus: premium.premiumStatus,
        premiumStartDate: premium.premiumStartDate,
        premiumEndDate: premium.premiumEndDate,
        pausedUntil: premium.pausedUntil,
        planDetails: premium.planDetails,
        trialUsed: premium.trialUsed,
      }

      await saveUserPremiumData(userId, premiumDataToSave)

      // Also update legacy storage for backward compatibility
      await setStoragePremiumStatus(premium.isPremium, userId)
      await setPremiumProfStatus(premium.isPremiumProf, userId)

      console.log(`Premium data synced for user: ${userId}`)
    } catch (error) {
      console.error("Error syncing premium with storage:", error)
    }
  }

  const resetPremium = () => {
    dispatch(resetPremiumState())
  }

  const subscribeToPremium = async (planType, planDetails) => {
    try {
      const userId = getUserId()
      const userType = user?.userType || "client"

      dispatch(
        activatePremium({
          premiumType: planType,
          planDetails,
          userType,
          userId,
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

      const userId = getUserId()
      const userType = user?.userType || "client"

      dispatch(
        activatePremium({
          premiumType: "Prueba",
          planDetails: { planName: "Prueba de 7 días gratis", price: 0 },
          userType,
          userId,
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
      const userId = getUserId()

      dispatch(
        upgradeFromTrial({
          premiumType: planType,
          planDetails,
          userId,
        }),
      )

      await syncWithStorage()
      return { success: true }
    } catch (error) {
      console.error("Error upgrading from trial:", error)
      return { success: false, error: error.message }
    }
  }

  const pausePremiumPlan = async (duration = 6) => {
    try {
      const userId = getUserId()

      dispatch(
        pausePremium({
          pauseDuration: duration,
          userId,
        }),
      )

      await syncWithStorage()
      return { success: true }
    } catch (error) {
      console.error("Error pausing premium:", error)
      return { success: false, error: error.message }
    }
  }

  const resumePremiumPlan = async () => {
    try {
      const userId = getUserId()

      dispatch(resumePremium({ userId }))
      await syncWithStorage()
      return { success: true }
    } catch (error) {
      console.error("Error resuming premium:", error)
      return { success: false, error: error.message }
    }
  }

  const cancelPremiumPlan = async () => {
    try {
      const userId = getUserId()

      dispatch(cancelPremium({ userId }))
      await syncWithStorage()
      return { success: true }
    } catch (error) {
      console.error("Error cancelling premium:", error)
      return { success: false, error: error.message }
    }
  }

  const renewPremiumPlan = async (planType) => {
    try {
      const userId = getUserId()

      dispatch(
        renewPremium({
          premiumType: planType,
          userId,
        }),
      )

      await syncWithStorage()
      return { success: true }
    } catch (error) {
      console.error("Error renewing premium:", error)
      return { success: false, error: error.message }
    }
  }

  // Check if premium is expired
  const isExpired = () => {
    if (!premium.premiumEndDate) return false
    return new Date() > new Date(premium.premiumEndDate)
  }

  // Check if premium is paused and should be resumed
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
      const userId = getUserId()

      if (isExpired() && (premium.premiumStatus === "active" || premium.premiumStatus === "trial")) {
        dispatch(expirePremium({ userId }))
        syncWithStorage()
      }

      if (shouldResume()) {
        dispatch(resumePremium({ userId }))
        syncWithStorage()
      }
    }

    if (premium.currentUserId) {
      checkPremiumStatus()
      const interval = setInterval(checkPremiumStatus, 60 * 60 * 1000)
      return () => clearInterval(interval)
    }
  }, [premium.premiumEndDate, premium.pausedUntil, premium.premiumStatus])

  useEffect(() => {
    if (user) {
      initializePremium()
    } else {
      resetPremium()
    }
  }, [user])

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
    resetPremium,
  }
}
