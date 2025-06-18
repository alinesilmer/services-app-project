"use client"
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native"
import { StatusBar } from "react-native"
import { useRouter } from "expo-router"
import { useSelector } from "react-redux"
import Logo from "../../components/Logo"
import BackButton from "../../components/BackButton"
import SlideUpCard from "../../components/SlideUpCard"
import { Colors } from "../../constants/Colors"
import CustomButton from "../../components/CustomButton"
import { usePremium } from "../../hooks/usePremium"
import { formatPrice } from "../../utils/pricingPlans"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"

export default function ManagePremium() {
  const router = useRouter()
  const { premium, daysRemaining } = usePremium()
  const user = useSelector((state) => state.auth.user)

  const getPremiumStatusText = () => {
    switch (premium.premiumStatus) {
      case "active":
        return "Tu Premium está activo"
      case "trial":
        return "Prueba gratuita activa"
      case "paused":
        return "Tu Premium está pausado"
      case "cancelled":
        return "Tu Premium ha sido cancelado"
      case "expired":
        return "Tu Premium ha expirado"
      default:
        return "No tienes Premium activo"
    }
  }

  const getSubtitleText = () => {
    if (premium.premiumStatus === "active") {
      return `Disfruta de todos los beneficios Premium. Tu plan ${premium.planDetails?.label || premium.premiumType} está activo.`
    } else if (premium.premiumStatus === "trial") {
      return `Te quedan ${daysRemaining} días de prueba gratuita. ¡Actualiza para continuar disfrutando!`
    } else if (premium.premiumStatus === "paused") {
      return "Tu Premium está pausado. Puedes reanudarlo en cualquier momento o cancelarlo definitivamente."
    } else if (premium.premiumStatus === "cancelled") {
      return "Tu Premium ha sido cancelado. Puedes reactivarlo en cualquier momento."
    } else if (premium.premiumStatus === "expired") {
      return "Tu Premium ha expirado. Renueva para seguir disfrutando de los beneficios."
    }
    return "Gestiona tu Premium desde aquí."
  }

  const getCorrectPremiumRoute = () => {
    if (user?.userType === "professional") {
      return "/tabs/professional/goPremiumProf"
    } else {
      return "/tabs/client/goPremium"
    }
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a2f68" />
        <SafeAreaView style={styles.safeArea}>
          <BackButton onPress={() => router.back()} />
          <Logo />
          <SlideUpCard title={getPremiumStatusText()} subtitle={getSubtitleText()} style={styles.card}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {premium.planDetails && (
                <View style={styles.planDetailsContainer}>
                  <Text style={styles.planDetailsTitle}>Detalles del plan:</Text>
                  <Text style={styles.planDetailsText}>Plan: {premium.planDetails.label || premium.premiumType}</Text>
                  <Text style={styles.planDetailsText}>Precio: {formatPrice(premium.planDetails.price)}</Text>
                  {premium.premiumEndDate && (
                    <Text style={styles.planDetailsText}>
                      {premium.premiumStatus === "trial" ? "Prueba termina" : "Renovación"}:{" "}
                      {new Date(premium.premiumEndDate).toLocaleDateString()}
                    </Text>
                  )}
                </View>
              )}

              <View style={styles.row}></View>

              {premium.premiumStatus === "active" && (
                <>
                  <View style={styles.buttonContainer}>
                    <CustomButton text="Pausar Premium" onPress={() => router.push("/tabs/pausePremium")} width="90%" />
                  </View>
                  <View style={styles.buttonContainer}>
                    <CustomButton text="Cancelar Premium" onPress={() => router.push("/tabs/stopPremium")} width="90%" />
                  </View>
                </>
              )}

              {premium.premiumStatus === "trial" && (
                <>
                  <View style={styles.buttonContainer}>
                    <CustomButton
                      text="Actualizar a plan pago"
                      onPress={() => router.push(getCorrectPremiumRoute())}
                      width="90%"
                      style={{ backgroundColor: Colors.orangeColor }}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <CustomButton text="Cancelar prueba" onPress={() => router.push("/tabs/stopPremium")} width="90%" />
                  </View>
                </>
              )}

              {premium.premiumStatus === "paused" && (
                <>
                  <View style={styles.buttonContainer}>
                    <CustomButton
                      text="Reanudar Premium"
                      onPress={() => router.push("/tabs/resumePremium")}
                      width="90%"
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <CustomButton
                      text="Cancelar definitivamente"
                      onPress={() => router.push("/tabs/stopPremium")}
                      width="90%"
                    />
                  </View>
                </>
              )}

              {(premium.premiumStatus === "cancelled" || premium.premiumStatus === "expired") && (
                <View style={styles.buttonContainer}>
                  <CustomButton
                    text="Reactivar Premium"
                    onPress={() => router.push(getCorrectPremiumRoute())}
                    width="90%"
                  />
                </View>
              )}

              {premium.premiumStatus === "inactive" && (
                <View style={styles.buttonContainer}>
                  <CustomButton
                    text="Obtener Premium"
                    onPress={() => router.push(getCorrectPremiumRoute())}
                    width="90%"
                  />
                </View>
              )}
            </ScrollView>
          </SlideUpCard>
        </SafeAreaView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
  },
  card: {
    position: "absolute",
    bottom: 0,
    width: wp("100%"),
    height: hp("70%"),
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 15,
    marginTop: 30,
    alignSelf: "flex-start",
  },
  buttonContainer: {
    width: wp("90%"),
    alignItems: "center",
    marginTop: hp("1%"),
    marginBottom: hp("1%"),
  },
  planDetailsContainer: {
    backgroundColor: Colors.lightGray,
    padding: wp("4%"),
    borderRadius: wp("2%"),
    marginTop: hp("1%"),
    marginHorizontal: wp("5%"),
  },
  planDetailsTitle: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
    color: Colors.dark,
  },
  planDetailsText: {
    fontSize: hp("1.8%"),
    marginBottom: hp("0.5%"),
    color: Colors.dark,
  },
})
