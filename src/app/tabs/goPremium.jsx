"use client"

import { useState, useEffect } from "react"
import { SafeAreaView, View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native"
import { StatusBar } from "expo-status-bar"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { useRouter } from "expo-router"

import BackButton from "../../components/BackButton"
import Logo from "../../components/Logo"
import SlideUpCard from "../../components/SlideUpCard"
import CustomButton from "../../components/CustomButton"
import PricingPlanSelector from "../../components/PricingPlanSelector"
import PaymentList from "../../components/PaymentList"
import ModalCard from "../../components/ModalCard"
import AnimationFeedback from "../../components/AnimationFeedback"

import { pricingPlans } from "../../utils/pricingPlans"
import { paymentMethods } from "../../utils/paymentMethods"
import { Colors } from "../../constants/Colors"
import { setPremiumStatus, isPremiumUser, validateCreditCard } from "../../utils/storage"

export default function GoPremium() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [plan, setPlan] = useState("monthly")
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [isFormValid, setIsFormValid] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showFailure, setShowFailure] = useState(false)
  const [alreadyPremium, setAlreadyPremium] = useState(false)
  const [paymentData, setPaymentData] = useState({
    number: "",
    name: "",
    cvv: "",
    expiry: "",
  })
  const [paymentError, setPaymentError] = useState("")

  useEffect(() => {
    const checkPremiumStatus = async () => {
      const isPremium = await isPremiumUser()
      setAlreadyPremium(isPremium)
    }

    checkPremiumStatus()
  }, [])

  const handleSubscribe = () => setStep(1)

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

    const premiumSaved = await setPremiumStatus(true)

    if (premiumSaved) {
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
        <BackButton onPress={() => router.back()} />
        <Logo />
        <SlideUpCard
          title={alreadyPremium ? "Ya eres Premium" : step === 0 ? "Dilo Premium" : "Pago"}
          subtitle={
            alreadyPremium
              ? "Ya disfrutas de todos los beneficios premium."
              : step === 0
                ? "Suscríbete y disfruta sin anuncios ni interrupciones."
                : "Ingresa los datos de pago"
          }
          style={styles.card}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={hp("5%")}
            style={{ flex: 1 }}
          >
             <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            {alreadyPremium ? (
              <>
                <Text style={styles.premiumText}>
                  Gracias por ser un usuario premium. Disfruta de la experiencia sin anuncios.
                </Text>
                <CustomButton
                  text="Volver al inicio"
                  onPress={() => router.push("tabs/home")}
                  style={styles.subscribeBtn}
                />
              </>
            ) : step === 0 ? (
              <>
                <PricingPlanSelector plans={pricingPlans} selected={plan} onSelect={setPlan} />
                <CustomButton text="Suscribirse" onPress={handleSubscribe} style={styles.subscribeBtn} />
              </>
            ) : (
              <>
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
                  disabled={!isFormValid || !selectedMethod}
                  style={{ marginTop: hp("2%") }}
                />
              </>
            )}
          </ScrollView>
          </KeyboardAvoidingView>
        </SlideUpCard>
      </View>
      <SafeAreaView style={styles.safeArea} />

      {/* SUCCESS MODAL */}
      <ModalCard
        visible={showSuccess}
        title="¡Felicidades!"
        onClose={() => {
          setShowSuccess(false)
          router.back()
        }}
      >
        <AnimationFeedback type="success" />
        <Text style={styles.messageText}>Bienvenido a Dilo Premium.</Text>
      </ModalCard>

      {/* ERROR MODAL */}
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
  subscribeBtn: {
    marginTop: hp("3%"),
    color: "white",
  },
  safeArea: {
    backgroundColor: Colors.whiteColor,
  },
  messageText: {
    fontSize: hp("2%"),
    marginTop: hp("1%"),
    textAlign: "center",
  },
  premiumText: {
    fontSize: hp("2.2%"),
    textAlign: "center",
    marginVertical: hp("3%"),
    color: Colors.blueColor,
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
