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

export default function PausePremium() {
  const router = useRouter()
  const { pausePremiumPlan } = usePremium()
  const [isLoading, setIsLoading] = useState(false)

  const handlePausePremium = async () => {
    Alert.alert("Pausar Premium", "¿Estás seguro de que quieres pausar tu Premium por 6 meses?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Pausar",
        onPress: async () => {
          setIsLoading(true)
          const result = await pausePremiumPlan(6) // 6 months
          setIsLoading(false)

          if (result.success) {
            Alert.alert(
              "Premium pausado",
              "Tu Premium ha sido pausado por 6 meses. Podrás reanudarlo en cualquier momento.",
              [
                {
                  text: "OK",
                  onPress: () => router.push("tabs/managePremium"),
                },
              ],
            )
          } else {
            Alert.alert("Error", "No se pudo pausar el Premium. Inténtalo de nuevo.")
          }
        },
      },
    ])
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a2f68" />
        <SafeAreaView style={styles.safeArea}>
          <BackButton onPress={() => router.back()} />
          <Logo />
          <SlideUpCard
            title="Pausar Premium"
            subtitle="Pausa tu Premium por hasta 6 meses sin perder tus beneficios. Al reanudar, todo estará como lo dejaste."
            style={styles.card}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.row}></View>

              <View style={styles.benefitsContainer}>
                <Text style={styles.benefitsTitle}>Beneficios de pausar:</Text>
                <Text style={styles.benefitItem}>• Conservas todos tus datos</Text>
                <Text style={styles.benefitItem}>• No se cobra durante la pausa</Text>
                <Text style={styles.benefitItem}>• Puedes reanudar cuando quieras</Text>
                <Text style={styles.benefitItem}>• Sorpresa especial al reanudar</Text>
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  text={isLoading ? "Pausando..." : "Confirmar pausa"}
                  onPress={handlePausePremium}
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
    marginTop: hp("3%"),
    marginBottom: hp("1%"),
  },
  benefitsContainer: {
    backgroundColor: Colors.lightGray,
    padding: wp("4%"),
    borderRadius: wp("2%"),
    marginTop: hp("2%"),
    marginHorizontal: wp("5%"),
  },
  benefitsTitle: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
    color: Colors.dark,
  },
  benefitItem: {
    fontSize: hp("1.8%"),
    marginBottom: hp("0.5%"),
    color: Colors.dark,
  },
})
