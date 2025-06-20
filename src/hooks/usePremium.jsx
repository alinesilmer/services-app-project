// File: hooks/usePremium.js
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  initializePremiumForUser,
  resetPremiumState,
  activatePremium,
  pausePremium,
  resumePremium,
  cancelPremium,
  expirePremium,
  renewPremium,
  upgradeFromTrial,
} from "../redux/slices/premiumSlice"
import {
  getUserPremiumData,
  saveUserPremiumData,
} from "../utils/storage"

export function usePremium() {
  const dispatch = useDispatch()
  const premium = useSelector((s) => s.premium)
  const user = useSelector((s) => s.auth.user)

  // Helper to get a stable userId
  const getUserId = () => user?.email || user?.id || "default"

  // Load from AsyncStorage into Redux
  const initializePremium = async () => {
    const userId = getUserId()
    const stored = await getUserPremiumData(userId)
    dispatch(initializePremiumForUser({ userId, premiumData: stored }))
  }

  // After any Redux change, sync back to AsyncStorage
  useEffect(() => {
    if (!premium.currentUserId) return
    const userId = premium.currentUserId
    saveUserPremiumData(userId, {
      isPremium: premium.isPremium,
      isPremiumProf: premium.isPremiumProf,
      premiumType: premium.premiumType,
      premiumStatus: premium.premiumStatus,
      premiumStartDate: premium.premiumStartDate,
      premiumEndDate: premium.premiumEndDate,
      pausedUntil: premium.pausedUntil,
      planDetails: premium.planDetails,
      trialUsed: premium.trialUsed,
    })
  }, [premium])

  // Reset on logout
  useEffect(() => {
    if (!user) dispatch(resetPremiumState())
    else initializePremium()
  }, [user])

  // Business methods
  const subscribeToPremium = async (plan, details, userType) => {
    const userId = getUserId()
    dispatch(activatePremium({ userId, premiumType: plan, planDetails: details, userType }))
    return { success: true }
  }
  const pausePremiumPlan = async (duration = 6) => {
    dispatch(pausePremium({ userId: getUserId(), pauseDuration: duration }))
    return { success: true }
  }
  const resumePremiumPlan = async () => {
    dispatch(resumePremium({ userId: getUserId() }))
    return { success: true }
  }
  const cancelPremiumPlan = async () => {
    dispatch(cancelPremium({ userId: getUserId() }))
    return { success: true }
  }
  const renewPremiumPlan = async (plan) => {
    dispatch(renewPremium({ userId: getUserId(), premiumType: plan }))
    return { success: true }
  }
  const upgradeFromTrialToPaid = async (plan, details) => {
    dispatch(upgradeFromTrial({ userId: getUserId(), premiumType: plan, planDetails: details }))
    return { success: true }
  }

  // Helpers
  const now = Date.now()
  const isExpired = () => premium.premiumEndDate && new Date(premium.premiumEndDate) < new Date(now)
  const shouldResume = () => premium.premiumStatus === "paused" && premium.pausedUntil && new Date(premium.pausedUntil) < new Date(now)
  const daysRemaining = premium.premiumEndDate
    ? Math.max(0, Math.ceil((new Date(premium.premiumEndDate) - new Date(now)) / 86400000))
    : 0
  const canStartTrial = () => !premium.trialUsed && premium.premiumStatus === "inactive"

  // Auto–expire or auto–resume
  useEffect(() => {
    if (!premium.currentUserId) return
    if (isExpired() && ["active", "trial"].includes(premium.premiumStatus)) {
      dispatch(expirePremium({ userId: getUserId() }))
    }
    if (shouldResume()) {
      dispatch(resumePremium({ userId: getUserId() }))
    }
  }, [premium.premiumEndDate, premium.pausedUntil, premium.premiumStatus])

  return {
    premium,
    daysRemaining,
    canStartTrial,
    subscribeToPremium,
    pausePremiumPlan,
    resumePremiumPlan,
    cancelPremiumPlan,
    renewPremiumPlan,
    upgradeFromTrialToPaid,
    initializePremium,
  }
}
