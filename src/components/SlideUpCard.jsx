import { Text, StyleSheet, View } from "react-native"
import Animated, { SlideInDown } from "react-native-reanimated"
import { Colors } from "../constants/Colors"
import { Fonts } from "../constants/Fonts"
import { Metrics } from '../constants/Metrics';
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

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
    width: wp("100%"),
    backgroundColor: Colors.whiteColor,
    gap: Metrics.marginXS,
    padding: Metrics.marginM,
    borderTopRightRadius: Metrics.radiusL,
    borderTopLeftRadius: Metrics.radiusL,
    shadowColor: Colors.inputGray,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: Metrics.radiusS,
    elevation: 10,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: Metrics.marginL,
    marginTop: Metrics.marginL,
  },
  title: {
    fontFamily: Fonts.roboto,
    fontSize: Metrics.fontL,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: Metrics.marginM,
  },
  subtitle: {
    fontFamily: Fonts.montserrat,
    fontSize: Metrics.fontM,
    color: "#888",
    textAlign: "center",
  },
})

export default SlideUpCard
