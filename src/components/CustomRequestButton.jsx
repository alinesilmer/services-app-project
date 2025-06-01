"use client"

import { useRef } from "react"
import { Text, Animated, Easing, StyleSheet } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { router } from "expo-router"
import { Colors } from "../constants/Colors"

const CustomRequestButton = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePress = () => {
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
      ¿No encontraste lo que buscas?{" "}
      <Animated.Text
        onPress={handlePress}
        style={[
          styles.linkText,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {" >"} Presione aquí {"<"}
      </Animated.Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  selectedLabel: {
    marginTop: 34,
    fontSize: wp("4%"),
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
