"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { Video } from "expo-av";
import LottieView from "lottie-react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useAd } from "../context/AdContext";
import { Metrics } from "../constants/Metrics";
import { Colors } from "../constants/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const adsList = [
  {
    type: "video",
    source: require("../assets/videos/propaganda1.mp4"),
  },
  {
    type: "video",
    source: require("../assets/videos/propaganda2.mp4"),
  }
];

export default function Ad() {
  const { showAd, closeAd, canClose } = useAd()
  const router = useRouter()
  const [randomAd, setRandomAd] = useState(null)

  useEffect(() => {
    if (showAd) {
      const idx = Math.floor(Math.random() * adsList.length)
      setRandomAd(adsList[idx])
    } else {
      setRandomAd(null)
    }
  }, [showAd])

  if (!randomAd) return null

  return (
    <Modal visible={showAd} transparent animationType='fade'>
      <View style={styles.overlay}>
        <View style={styles.adContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeAd} disabled={!canClose}>
            {canClose ? (
              <Feather name='x' size={Metrics.iconSmall} color={Colors.whiteColor} />
            ) : (
              <LottieView source={require('../assets/animations/loading-ad.json')} autoPlay loop style={styles.lottie} />
            )}
          </TouchableOpacity>

          {randomAd.type === 'image' ? (
            <Image source={randomAd.source} style={styles.media} resizeMode='cover' />
          ) : (
            <Video source={randomAd.source} shouldPlay={showAd} isLooping resizeMode='cover' style={styles.media} />
          )}

          <Pressable onPress={() => { closeAd(); router.push('/auth/goPremium') }} style={styles.premiumLink}>
            <Text style={styles.premiumText}>¿Cansado de anuncios?{"\n"}¡Obtén Premium aquí!</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  adContainer: {
    width: wp("90%"),
    height: Metrics.screenM,
    backgroundColor: Colors.textColor,
    borderRadius: Metrics.radiusS,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: Metrics.marginS,
    right: Metrics.marginM,
    zIndex: 2,
    padding: Metrics.marginS,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: Metrics.radiusS,
  },
  lottie: { width: Metrics.animationS, height: Metrics.animationS },
  media: { width: Metrics.screenL, height: Metrics.screenS },
  premiumLink: {
    position: "absolute",
    bottom: Metrics.marginM,
    alignSelf: "center",
  },
  premiumText: {
    color: Colors.light.background,
    fontSize: Metrics.fontXS,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
