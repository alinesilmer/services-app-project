"use client"

import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Pressable } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { Feather } from "@expo/vector-icons"
import { Video } from "expo-av"
import LottieView from "lottie-react-native"
import { useRouter } from "expo-router"
import { useAdTimer } from "../hooks/useAdTimer"
import { useSelector } from "react-redux"

const Ad = ({ visible, onClose, source, type = "image" }) => {
  const { canClose, timer } = useAdTimer(visible)
  const router = useRouter()
  const user = useSelector((state) => state.auth.user)

  const handleGoPremium = () => {
    onClose()
    router.push("/auth/goPremium")
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.adContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose} disabled={!canClose}>
            {canClose ? (
              <Feather name="x" size={32} color="white" />
            ) : (
              <LottieView
                source={require("../assets/animations/loading-ad.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            )}
          </TouchableOpacity>

          {type === "image" ? (
            <Image
              key={visible ? "image-visible" : "image-hidden"}
              source={source}
              style={styles.media}
              resizeMode="cover"
            />
          ) : (
            <Video
              key={visible ? "video-visible" : "video-hidden"}
              source={source}
              rate={1.0}
              volume={1.0}
              isMuted={!visible}
              resizeMode="cover"
              shouldPlay={visible}
              isLooping
              useNativeControls
              style={styles.media}
            />
          )}

          <Pressable onPress={handleGoPremium} style={styles.premiumLink}>
            <Text style={styles.premiumText}>¿Cansado de anuncios? {"\n"}¡Obtén Premium aquí!</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

export default Ad

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  adContainer: {
    width: wp("90%"),
    height: hp("80%"),
    backgroundColor: "black",
    borderRadius: wp("5%"),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: hp("3%"),
    right: wp("5%"),
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: wp("5%"),
    padding: wp("2%"),
  },
  lottie: {
    width: wp("8%"),
    height: wp("8%"),
  },
  media: {
    width: "100%",
    height: "100%",
  },
  premiumLink: {
    position: "absolute",
    bottom: hp("2%"),
    alignSelf: "center",
  },
  premiumText: {
    color: "white",
    fontSize: wp("4%"),
    textDecorationLine: "underline",
    opacity: 0.8,
    textAlign: "center",
  },
})
