"use client"

import { useRef } from "react"
import { Text, Animated, Easing, StyleSheet } from "react-native"
import { router } from "expo-router"
import { Colors } from "../constants/Colors"
import { Metrics } from "../constants/Metrics"
import { isUserLoggedIn } from "../utils/storage"

const CustomRequestButton = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePress = async () => {
      const loggedIn = await isUserLoggedIn()
  if (!loggedIn) {
    router.push("/auth/login")
    return
  }
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push("/tabs/client/requestAd")
    })
  }

  return (
    <Text style={styles.selectedLabel}>
      ¿No encontras lo que buscas?{"\n"}
      <Animated.Text
        onPress={handlePress}
        style={[
          styles.linkText,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {">"} Presione aquí {"<"}
      </Animated.Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  selectedLabel: {
    marginTop: Metrics.marginM,
    marginBottom: Metrics.marginM,
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    color: Colors.whiteColor,
    textAlign: "center",
  },
  linkText: {
    color: Colors.orangeColor,
    fontWeight: "bold",
  },
})

export default CustomRequestButton
