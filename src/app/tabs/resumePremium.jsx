"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert } from "react-native"
import { StatusBar } from "react-native"
import { useRouter } from "expo-router"
import CustomButton from "../../components/CustomButton"
import BackButton from "../../components/BackButton"
import Logo from "../../components/Logo"
import SlideUpCard from "../../components/SlideUpCard"
import { Colors } from "../../constants/Colors"
import { usePremium } from "../../hooks/usePremium"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"

export default function ResumePremium() {
  const router = useRouter()
  const { resumePremiumPlan, premium } = usePremium()
  const [isLoading, setIsLoading] = useState(false)

  const handleResumePremium = async () => {
    Alert.alert("Reanudar Premium", "¿Estás listo para reanudar tu Premium?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Reanudar",
        onPress: async () => {
          setIsLoading(true)
          const result = await resumePremiumPlan()
          setIsLoading(false)

          if (result.success) {
            Alert.alert(
              "¡Bienvenido de vuelta!",
              "Tu Premium ha sido reanudado. ¡Aquí tienes tu sorpresa especial! 🎉",
              [
                {
                  text: "¡Genial!",
                  onPress: () => router.push("tabs/managePremium"),
                },
              ],
            )
          } else {
            Alert.alert("Error", "No se pudo reanudar el Premium. Inténtalo de nuevo.")
          }
        },
      },
    ])
  }

  const getPausedDaysLeft = () => {
    if (!premium.pausedUntil) return 0
    const now = new Date()
    const pausedUntil = new Date(premium.pausedUntil)
    const diffTime = pausedUntil - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a2f68" />
        <SafeAreaView style={styles.safeArea}>
          <BackButton onPress={() => router.back()} />
          <Logo />
          <SlideUpCard
            title="Reanudar Premium"
            subtitle="¡Te extrañamos! Reanuda tu Premium y vuelve a disfrutar de todos los beneficios."
            style={styles.card}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.row}></View>

              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Estado de tu pausa:</Text>
                <Text style={styles.infoText}>Días restantes de pausa: {getPausedDaysLeft()}</Text>
                <Text style={styles.infoText}>Plan: {premium.planDetails?.label || "Premium"}</Text>
              </View>

              <View style={styles.surpriseContainer}>
                <Text style={styles.surpriseTitle}>🎁 Tu sorpresa especial:</Text>
                <Text style={styles.surpriseText}>
                  Al reanudar recibirás 7 días adicionales gratis y acceso a funciones exclusivas por tiempo limitado.
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  text={isLoading ? "Reanudando..." : "Reanudar ahora"}
                  onPress={handleResumePremium}
                  disabled={isLoading}
                  width="90%"
                />
              </View>
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
    height: hp("75%"),
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
    marginTop: hp("3%"),
    marginBottom: hp("1%"),
  },
  infoContainer: {
    backgroundColor: Colors.lightBlue,
    padding: wp("4%"),
    borderRadius: wp("2%"),
    marginTop: hp("2%"),
    marginHorizontal: wp("5%"),
  },
  infoTitle: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
    color: Colors.dark,
  },
  infoText: {
    fontSize: hp("1.8%"),
    marginBottom: hp("0.5%"),
    color: Colors.dark,
  },
  surpriseContainer: {
    backgroundColor: Colors.orangeColor,
    padding: wp("4%"),
    borderRadius: wp("2%"),
    marginTop: hp("2%"),
    marginHorizontal: wp("5%"),
  },
  surpriseTitle: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
    color: Colors.whiteColor,
  },
  surpriseText: {
    fontSize: hp("1.8%"),
    color: Colors.whiteColor,
  },
})
