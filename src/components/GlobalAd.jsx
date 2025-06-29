
import React from "react"
import Ad from "./Ad"
import { useAd } from "../context/AdContext"

const GlobalAd = () => {
  const { showAd, closeAd } = useAd()
  return <Ad visible={showAd} onClose={closeAd} />
}

export default GlobalAd
