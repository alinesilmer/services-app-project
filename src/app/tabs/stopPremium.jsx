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

export default function StopPremium() {
  const router = useRouter()
  const { cancelPremiumPlan, premium } = usePremium()
  const [isLoading, setIsLoading] = useState(false)

  const handleCancelPremium = async () => {
    Alert.alert(
      "Cancelar Premium",
      "¿Estás seguro de que quieres cancelar tu Premium? Perderás todos los beneficios inmediatamente.",
      [
        {
          text: "No, mantener",
          style: "cancel",
        },
        {
          text: "Sí, cancelar",
          style: "destructive",
          onPress: async () => {
            setIsLoading(true)
            const result = await cancelPremiumPlan()
            setIsLoading(false)

            if (result.success) {
              Alert.alert(
                "Premium cancelado",
                "Tu Premium ha sido cancelado. Gracias por usar nuestro servicio. Puedes reactivarlo en cualquier momento.",
                [
                  {
                    text: "OK",
                    onPress: () => router.push("tabs/managePremium"),
                  },
                ],
              )
            } else {
              Alert.alert("Error", "No se pudo cancelar el Premium. Inténtalo de nuevo.")
            }
          },
        },
      ],
    )
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a2f68" />
        <SafeAreaView style={styles.safeArea}>
          <BackButton onPress={() => router.back()} />
          <Logo />
          <SlideUpCard
            title="Cancelar Premium"
            subtitle="Lamentamos que quieras irte. Antes de cancelar, considera pausar tu Premium para conservar tus beneficios."
            style={styles.card}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.row}></View>

              <View style={styles.warningContainer}>
                <Text style={styles.warningTitle}>⚠️ Al cancelar perderás:</Text>
                <Text style={styles.warningItem}>• Acceso sin anuncios</Text>
                <Text style={styles.warningItem}>• Funciones premium</Text>
                <Text style={styles.warningItem}>• Configuraciones personalizadas</Text>
                <Text style={styles.warningItem}>• Beneficios exclusivos</Text>
              </View>

              <View style={styles.alternativeContainer}>
                <Text style={styles.alternativeTitle}>💡 Alternativa recomendada:</Text>
                <Text style={styles.alternativeText}>
                  Pausa tu Premium por hasta 6 meses sin perder nada. Es gratis y puedes reanudar cuando quieras.
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  text="Pausar en su lugar"
                  onPress={() => router.push("tabs/pausePremium")}
                  width="90%"
                  style={{ backgroundColor: Colors.orangeColor }}
                />
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  text={isLoading ? "Cancelando..." : "Cancelar definitivamente"}
                  onPress={handleCancelPremium}
                  disabled={isLoading}
                  width="90%"
                  style={{ backgroundColor: Colors.redColor }}
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
    height: hp("80%"),
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
    marginTop: hp("2%"),
    marginBottom: hp("1%"),
  },
  warningContainer: {
    backgroundColor: "#ffebee",
    padding: wp("4%"),
    borderRadius: wp("2%"),
    marginTop: hp("2%"),
    marginHorizontal: wp("5%"),
    borderLeftWidth: 4,
    borderLeftColor: Colors.redColor,
  },
  warningTitle: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
    color: Colors.redColor,
  },
  warningItem: {
    fontSize: hp("1.8%"),
    marginBottom: hp("0.5%"),
    color: Colors.dark,
  },
  alternativeContainer: {
    backgroundColor: "#e8f5e8",
    padding: wp("4%"),
    borderRadius: wp("2%"),
    marginTop: hp("2%"),
    marginHorizontal: wp("5%"),
    borderLeftWidth: 4,
    borderLeftColor: Colors.greenColor,
  },
  alternativeTitle: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
    color: Colors.greenColor,
  },
  alternativeText: {
    fontSize: hp("1.8%"),
    color: Colors.dark,
  },
})
