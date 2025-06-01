"use client"

import { useRouter } from "expo-router"
import { useState, useEffect } from "react"
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native"

const AdsImage = ({ onPress, style, isPremium }) => {
  const [currentAd, setCurrentAd] = useState(null)

  const router = useRouter();
  const handleAdClick = () => {
    router.push("/tabs/client/goPremium")
  }

  const adsImages = [
    require("../assets/ads/ads1.jpeg"),
    require("../assets/ads/ads2.jpeg"),
    require("../assets/ads/ads3.jpeg"),
    require("../assets/ads/ads4.jpeg"),
    require("../assets/ads/ads5.jpeg"),
  ]

  const getRandomAd = () => {
    const randomIndex = Math.floor(Math.random() * adsImages.length)
    return adsImages[randomIndex]
  }

  useEffect(() => {
    if (!isPremium) {
      setCurrentAd(getRandomAd())
    }
  }, [isPremium])

  if (isPremium || !currentAd) {
    return null
  }

  const AdContent = (
    <View style={[styles.container, style]}>
      <Image source={currentAd} style={styles.image} resizeMode="cover" />

      <View style={styles.adLabel}>
        <Text style={styles.adLabelText}>Anuncio</Text>
      </View>
    </View>
  )

  if (onPress) {
    return (
      <TouchableOpacity onPress={handleAdClick} activeOpacity={0.8}>
        {AdContent}
      </TouchableOpacity>
    )
  }

  return AdContent
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    marginTop: 20,
    marginBottom: 20, 
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  adLabel: {
    position: "absolute",
    bottom: 4,
    left: 4,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  adLabelText: {
    color: "white",
    fontSize: 10,
    fontWeight: "500",
  },
})

export default AdsImage
