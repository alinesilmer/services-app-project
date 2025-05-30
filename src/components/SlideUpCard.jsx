import { Text, StyleSheet, View } from "react-native"
import Animated, { SlideInDown } from "react-native-reanimated"
import { Colors } from "../constants/Colors"
import { Fonts } from "../constants/Fonts"

const SlideUpCard = ({ title, subtitle, children, style, showHeader = true }) => {
  return (
    <Animated.View entering={SlideInDown.duration(700)} style={[styles.card, style]}>
      {showHeader && (title || subtitle) && (
        <View style={styles.headerContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.whiteColor,
    padding: 20,
    borderTopRightRadius: 90,
    borderTopLeftRadius: 20,
    shadowColor: Colors.inputGray,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 40,
  },
  title: {
    fontFamily: Fonts.roboto,
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: Fonts.montserrat,
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
})

export default SlideUpCard
