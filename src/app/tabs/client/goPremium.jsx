"use client"
import { useState } from "react"
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { StatusBar } from "expo-status-bar"
import { useRouter } from "expo-router"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"

import BackButton from "../../../components/BackButton"
import Logo from "../../../components/Logo"
import SlideUpCard from "../../../components/SlideUpCard"
import CustomButton from "../../../components/CustomButton"
import PricingPlanSelector from "../../../components/PricingPlanSelector"
import PaymentList from "../../../components/PaymentList"
import ModalCard from "../../../components/ModalCard"
import AnimationFeedback from "../../../components/AnimationFeedback"

import {
  getPricingPlans,
  getPlanDetails,
  formatPrice,
} from "../../../utils/pricingPlans"
import { paymentMethods } from "../../../utils/paymentMethods"
import { usePremium } from "../../../hooks/usePremium"
import { validateCreditCard } from "../../../utils/storage"
import { Colors } from "../../../constants/Colors"

export default function GoPremium() {
  const router = useRouter()
  const { premium, canStartTrial, startFreeTrial, subscribeToPremium, daysRemaining } = usePremium()

  const [step, setStep] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState("Mensual")
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

  // **Use the helper correctly:**
  const clientPlans = getPricingPlans()

  const handleStartTrial = async () => {
    const result = await startFreeTrial()
    if (result.success) {
      setShowSuccess(true)
    } else {
      setPaymentError(result.error || "Error al iniciar la prueba gratuita")
      setShowFailure(true)
    }
  }

  const handleSubscribe = () => {
    if (selectedPlan === "Prueba") {
      handleStartTrial()
    } else if (selectedPlan === "Empresarial") {
      router.push("/contact/enterprise")
    } else {
      setStep(1)
    }
  }

  const handlePayment = async () => {
    if (!isFormValid || !selectedMethod) {
      setPaymentError(
        "Por favor complete todos los campos correctamente y seleccione un método de pago."
      )
      setShowFailure(true)
      return
    }

    const paymentResult = validateCreditCard(paymentData)
    if (!paymentResult.success) {
      setPaymentError(paymentResult.message)
      setShowFailure(true)
      return
    }

    const planDetails = getPlanDetails(selectedPlan)
    const subscriptionResult = await subscribeToPremium(selectedPlan, {
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

  if (premium.isPremium && (premium.premiumStatus === "active" || premium.premiumStatus === "trial")) {
    return (
      <>
        <StatusBar style="light-content" />
        <View style={styles.container}>
          <BackButton onPress={() => router.back()} />
          <Logo />
          <SlideUpCard
            title="Ya eres Premium"
            subtitle={
              premium.premiumStatus === "trial"
                ? `Te quedan ${daysRemaining} días de prueba gratuita`
                : "Ya disfrutas de todos los beneficios premium"
            }
            style={styles.card}
          >
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={styles.premiumText}>
                {premium.premiumStatus === "trial"
                  ? "Tu prueba gratuita está activa."
                  : "Gracias por ser un usuario premium."}
              </Text>

              <View style={styles.planDetailsContainer}>
              {premium.premiumStatus === "trial" && (
                <CustomButton
                  text="Actualizar a plan pago"
                  onPress={() => {
                    setStep(0)
                    setSelectedPlan("Mensual")
                  }}
                  style={styles.subscribeBtn}
                />
              )}

              <CustomButton
                text="Volver al inicio"
                onPress={() => router.push("/tabs/client/dashboard")}
                style={[styles.subscribeBtn, { backgroundColor: Colors.grayColor }]}
              />

              <CustomButton
                text="Gestionar Premium"
                onPress={() => router.push("/tabs/managePremium")}
                style={[styles.subscribeBtn, { backgroundColor: Colors.orangeColor }]}
              />
              </View>
            </ScrollView>
          </SlideUpCard>
        </View>
      </>
    )
  }

  // Main flow
  return (
    <>
      <StatusBar style="light-content" />
      <View style={styles.container}>
        <BackButton onPress={() => router.back()} />
        <Logo />
        <SlideUpCard
          title={step === 0 ? "Dilo Premium" : "Pago"}
          subtitle={
            step === 0
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
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              {step === 0 ? (
                <>
                  <PricingPlanSelector
                    plans={clientPlans}
                    selected={selectedPlan}
                    onSelect={setSelectedPlan}
                    canStartTrial={canStartTrial}
                    trialUsed={premium.trialUsed}
                  />

                  <View style={styles.BtnsContainer}>
                    <Text style={styles.planDetailsTitle}>Plan seleccionado:</Text>
                    <Text style={styles.planDetailsText}>
                      {getPlanDetails(selectedPlan)?.label} -{" "}
                      {formatPrice(getPlanDetails(selectedPlan)?.price)}
                    </Text>
                  </View>

                  <View style={styles.SuscribeBtnContainer}>
                    <CustomButton
                      text={
                        selectedPlan === "Prueba"
                          ? "Iniciar prueba gratuita"
                        : selectedPlan === "Empresarial"
                        ? "Contactar ventas"
                        : "Suscribirse"
                    }
                    onPress={handleSubscribe}
                    style={styles.subscribeBtn}
                    />
                    </View>
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
                    <Text style={styles.testCardText}>
                      VISA: 1111 1111 1111 1111 (CVV: 123, Exp: 12/25)
                    </Text>
                    <Text style={styles.testCardText}>
                      MasterCard: 5555 5555 5555 4444 (CVV: 456, Exp: 11/26)
                    </Text>
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

      <ModalCard
        visible={showSuccess}
        title="¡Felicidades!"
        onClose={() => {
          setShowSuccess(false)
          router.back()
        }}
      >
        <AnimationFeedback type="success" />
        <Text style={styles.messageText}>
          {selectedPlan === "Prueba"
            ? "¡Tu prueba gratuita ha comenzado!"
            : "Bienvenido a Dilo Premium."}
        </Text>
      </ModalCard>

      <ModalCard visible={showFailure} title="Error" onClose={() => setShowFailure(false)}>
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
    alignItems: "center"
  },
  card: {
    width: wp("100%"),
    marginTop: hp("30%"),
    paddingVertical: wp("10%"),
    height: hp("70%")
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start"
  },
  subscribeBtn: {
    marginBottom: 20
  },
  safeArea: {
    backgroundColor: Colors.whiteColor
  },
  messageText: {
    fontSize: hp("2%"),
    marginTop: hp("1%"),
    textAlign: "center"
  },
  premiumText: {
    fontSize: hp("2.2%"),
    textAlign: "center",
    marginVertical: hp("3%"),
    color: Colors.blueColor
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
    color: Colors.blueColor
  },
  planDetailsContainer: {
    backgroundColor: Colors.lightBlue,
    padding: wp("4%"),
    borderRadius: wp("2%"),
    marginTop: hp("2%"),
  },
  planDetailsTitle: {
    fontSize: hp("1.8%"),
    fontWeight: "bold",
    marginBottom: hp("0.5%")
  },
  planDetailsText: {
    fontSize: hp("1.6%")
  },
  BtnsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    gap: 10,
  },
  SuscribeBtnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("2%")
  }
})
