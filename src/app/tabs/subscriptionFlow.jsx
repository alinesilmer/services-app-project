"use client"

import { useState } from "react"
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"

import SlideUpCard from "../../components/SlideUpCard"
import Logo from "../../components/Logo"
import PaymentList from "../../components/PaymentList"
import CustomButton from "../../components/CustomButton"
import ModalCard from "../../components/ModalCard"
import AnimationFeedback from "../../components/AnimationFeedback"

import { Colors } from "../../constants/Colors"
import { paymentMethods } from "../../utils/paymentMethods"
import { usePremium } from "../../hooks/usePremium"
import { validateCreditCard } from "../../utils/storage"
import { getPlanDetails } from "../../utils/pricingPlans"

export default function SubscriptionFlow() {
  const router = useRouter()
  const { planType } = useLocalSearchParams()
  const { premium, subscribeToPremium } = usePremium()

  const [selectedMethod, setSelectedMethod] = useState(null)
  const [isFormValid, setIsFormValid] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showFailure, setShowFailure] = useState(false)
  const [paymentData, setPaymentData] = useState({
    number: "",
    name: "",
    cvv: "",
    expiry: "",
  })
  const [paymentError, setPaymentError] = useState("")

  const handlePayment = async () => {
    if (!isFormValid || !selectedMethod) {
      setPaymentError("Por favor complete todos los campos correctamente y seleccione un método de pago.")
      setShowFailure(true)
      return
    }

    const paymentResult = validateCreditCard(paymentData)

    if (!paymentResult.success) {
      setPaymentError(paymentResult.message)
      setShowFailure(true)
      return
    }

    const planDetails = getPlanDetails(planType?.toLowerCase() || "mensual")
    const subscriptionResult = await subscribeToPremium(planType?.toLowerCase() || "mensual", {
      ...planDetails,
      paymentMethod: selectedMethod,
      cardType: paymentResult.cardType,
    })

    if (subscriptionResult.success) {
      setShowSuccess(true)
    } else {
      setPaymentError("Error al procesar el pago. Inténtelo de nuevo.")
      setShowFailure(true)
    }
  }

  return (
    <>
      <StatusBar style="light-content" />
      <View style={styles.container}>
        <Logo />
        <SlideUpCard title="Pago" subtitle={`Plan seleccionado: ${planType ?? "N/A"}`} style={styles.card}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <PaymentList
              methods={paymentMethods}
              selected={selectedMethod}
              onSelect={setSelectedMethod}
              onValidityChange={setIsFormValid}
              onPaymentDataChange={setPaymentData}
            />

            <View style={styles.testCardsContainer}>
              <Text style={styles.testCardsTitle}>Tarjetas de prueba:</Text>
              <Text style={styles.testCardText}>VISA: 1111 1111 1111 1111 (CVV: 123, Exp: 12/25)</Text>
              <Text style={styles.testCardText}>MasterCard: 5555 5555 5555 4444 (CVV: 456, Exp: 11/26)</Text>
              <Text style={styles.testCardText}>AMEX: 3782 8224 6310 005 (CVV: 1234, Exp: 10/27)</Text>
            </View>

            <CustomButton
              text="Pagar"
              onPress={handlePayment}
              disabled={!isFormValid}
              style={{ marginTop: hp("2%") }}
            />
          </ScrollView>
        </SlideUpCard>
      </View>
      <SafeAreaView style={styles.safeArea} />

      <ModalCard
        visible={showSuccess}
        title="¡Felicidades!"
        onClose={() => {
          setShowSuccess(false)
          router.push("/tabs/professional/dashboard")
        }}
      >
        <AnimationFeedback type="success" />
        <Text style={styles.messageText}>Bienvenido a Dilo Premium.</Text>
      </ModalCard>

      <ModalCard visible={showFailure} title="Error en el pago" onClose={() => setShowFailure(false)}>
        <AnimationFeedback type="failure" />
        <Text style={styles.messageText}>
          {paymentError || "Por favor revisa la información e inténtalo de nuevo."}
        </Text>
      </ModalCard>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    alignItems: "center",
  },
  card: {
    width: wp("100%"),
    marginTop: hp("30%"),
    paddingVertical: wp("10%"),
    height: hp("70%"),
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  safeArea: {
    backgroundColor: Colors.whiteColor,
  },
  messageText: {
    fontSize: hp("2%"),
    marginTop: hp("1%"),
    textAlign: "center",
  },
  testCardsContainer: {
    backgroundColor: "#f5f5f5",
    padding: wp("3%"),
    borderRadius: wp("2%"),
    marginTop: hp("2%"),
    marginBottom: hp("1%"),
  },
  testCardsTitle: {
    fontSize: hp("1.8%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
    color: Colors.blueColor,
  },
  testCardText: {
    fontSize: hp("1.5%"),
    color: Colors.dark,
    marginBottom: hp("0.5%"),
  },
})
