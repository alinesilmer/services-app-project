"use client"

import { useEffect, useState, useRef } from "react"
import { isPremiumUser } from "../utils/storage"

export const useAdManager = ({ isPremium = false } = {}) => {
  const [showAd, setShowAd] = useState(false)
  const [userIsPremium, setUserIsPremium] = useState(isPremium)
  const adTimer = useRef(null)
  const initialCheckDone = useRef(false)

  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        const premium = await isPremiumUser()
        console.log("Premium status check:", premium)
        setUserIsPremium(premium || isPremium)
        initialCheckDone.current = true

        if (premium || isPremium) {
          setShowAd(false)
          if (adTimer.current) {
            clearTimeout(adTimer.current)
            adTimer.current = null
          }
        }
      } catch (error) {
        console.error("Error checking premium status:", error)
      }
    }

    checkPremiumStatus()
  }, [isPremium])

  const triggerAd = () => {
    if (!userIsPremium && initialCheckDone.current) {
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

    if (!userIsPremium && initialCheckDone.current) {
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
    console.log("Ad manager effect - userIsPremium:", userIsPremium)

    if (!userIsPremium && initialCheckDone.current) {
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
  }, [userIsPremium])

  return { showAd, triggerAd, closeAd }
}
