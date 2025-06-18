"use client"

import { useState } from "react"
import { View, StyleSheet, ScrollView, Pressable, Text } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useRouter } from "expo-router"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { Feather } from "@expo/vector-icons"
import CheckBox from "expo-checkbox"

import BackButton from "../../../components/BackButton"
import Logo from "../../../components/Logo"
import SlideUpCard from "../../../components/SlideUpCard"
import CustomButton from "../../../components/CustomButton"
import PricingComparisonTable from "../../../components/PricingComparisonTable"
import { usePremium } from "../../../hooks/usePremium"
import { getProfessionalPlans, getPlanDetails } from "../../../utils/pricingPlans"
import { Colors } from "../../../constants/Colors"

export default function GoPremiumProf() {
  const router = useRouter()
  const { premium, subscribeToPremium } = usePremium()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [formData, setFormData] = useState({ acceptTerms: false })
  const [errors, setErrors] = useState({})

  // Get professional plans
  const professionalPlans = getProfessionalPlans()

  const TermRoute = () => {
    router.push("/auth/termsProf")
  }

  const change = (name, value) => setFormData((p) => ({ ...p, [name]: value }))

  const handleSubscribe = async () => {
    if (!formData.acceptTerms) {
      setErrors({ acceptTerms: "Debes aceptar los términos y condiciones" })
      return
    }

    if (selectedPlan) {
      const planDetails = getPlanDetails(selectedPlan)
      const result = await subscribeToPremium(selectedPlan, planDetails)

      if (result.success) {
        router.push({
          pathname: "/tabs/premiumFlow",
          params: { planType: selectedPlan.toUpperCase() },
        })
      }
    }
  }

  // Check if already premium
  if (premium.isPremiumProf && (premium.premiumStatus === "active" || premium.premiumStatus === "trial")) {
    return (
      <>
        <StatusBar style="light-content" />
        <View style={styles.container}>
          <BackButton onPress={() => router.back()} />
          <Logo />
          <SlideUpCard
            title="Ya eres Premium"
            subtitle="Ya disfrutas de todos los beneficios premium profesionales"
            style={styles.card}
          >
            <ScrollView contentContainerStyle={styles.scroll}>
              <Text style={styles.premiumText}>
                Gracias por ser un usuario premium. Disfruta de la experiencia completa.
              </Text>
              <CustomButton
                text="Volver al inicio"
                onPress={() => router.push("/tabs/professional/dashboard")}
                style={styles.subscribeBtn}
              />
              <CustomButton
                text="Gestionar Premium"
                onPress={() => router.push("/tabs/managePremium")}
                style={[styles.subscribeBtn, { backgroundColor: Colors.grayColor }]}
              />
            </ScrollView>
          </SlideUpCard>
        </View>
      </>
    )
  }

  return (
    <>
      <StatusBar style="light-content" />
      <View style={styles.container}>
        <BackButton onPress={() => router.back()} />
        <Logo />
        <SlideUpCard
          title="Publicitá tu servicio"
          subtitle="Proba Dilo con tu propia marca personal"
          style={styles.card}
        >
          <ScrollView contentContainerStyle={styles.scroll}>
            <PricingComparisonTable
              headers={professionalPlans.headers}
              rows={professionalPlans.rows}
              selected={selectedPlan}
              onSelect={setSelectedPlan}
            />

            <View style={styles.radioGroup}>
              {["estandar", "plus"].map((plan) => {
                const isSelected = selectedPlan === plan
                const planDetails = getPlanDetails(plan)
                return (
                  <Pressable key={plan} style={styles.labelRow} onPress={() => setSelectedPlan(plan)}>
                    <Feather
                      name={isSelected ? "check-circle" : "circle"}
                      size={20}
                      color={isSelected ? Colors.orangeColor : Colors.dark}
                    />
                    <View style={styles.planInfo}>
                      <Text style={[styles.label, isSelected && styles.labelSelected]}>
                        {plan === "estandar" ? "Estándar" : "Plus"}
                      </Text>
                      <Text style={styles.planPrice}>${planDetails?.price} USD/mes</Text>
                    </View>
                  </Pressable>
                )
              })}
            </View>

            <View style={styles.checkboxContainer}>
              <CheckBox
                value={formData.acceptTerms}
                onValueChange={(v) => change("acceptTerms", v)}
                tintColors={{ true: Colors.orangeColor }}
              />
              <Text style={styles.checkboxText}>Acepto los </Text>
              <Pressable onPress={TermRoute}>
                <Text style={styles.link}>Términos y Condiciones</Text>
              </Pressable>
            </View>

            {errors.acceptTerms && <Text style={styles.errorText}>{errors.acceptTerms}</Text>}

            <CustomButton
              text="Suscribirme"
              onPress={handleSubscribe}
              disabled={!selectedPlan || !formData.acceptTerms}
              style={styles.subscribeBtn}
            />
          </ScrollView>
        </SlideUpCard>
      </View>
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
    marginTop: hp("20%"),
    paddingVertical: wp("5%"),
    height: hp("80%"),
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  radioGroup: {
    marginTop: hp("3%"),
    marginBottom: hp("2%"),
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: hp("2%"),
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    marginLeft: wp("5%"),
  },
  planInfo: {
    marginLeft: wp("2%"),
  },
  label: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    color: Colors.dark,
  },
  labelSelected: {
    color: Colors.orangeColor,
    fontWeight: "bold",
  },
  planPrice: {
    fontSize: wp("3%"),
    color: Colors.grayColor,
    marginTop: 2,
  },
  link: {
    color: Colors.orangeColor,
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp("1.5%"),
  },
  checkboxText: {
    color: Colors.textColor,
    marginLeft: 10,
  },
  subscribeBtn: {
    marginTop: hp("2%"),
  },
  errorText: {
    color: "red",
    fontSize: wp("3.5%"),
    marginBottom: hp("1%"),
  },
  premiumText: {
    fontSize: hp("2.2%"),
    textAlign: "center",
    marginVertical: hp("3%"),
    color: Colors.blueColor,
  },
})
