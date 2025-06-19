"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, Pressable, Text, SafeAreaView } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useRouter, useLocalSearchParams } from "expo-router"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { Feather } from "@expo/vector-icons"
import CheckBox from "expo-checkbox"

import BackButton from "../../components/BackButton"
import Logo from "../../components/Logo"
import SlideUpCard from "../../components/SlideUpCard"
import CustomButton from "../../components/CustomButton"
import PricingComparisonTable from "../../components/PricingComparisonTable"
import { usePremium } from "../../hooks/usePremium"
import { getProfessionalPlans, getClientPlans, getPlanDetails } from "../../utils/pricingPlans"
import { getUserProfile } from "../../utils/storage"
import { Colors } from "../../constants/Colors"

export default function GoPremium() {
  const router = useRouter()
  const { type } = useLocalSearchParams()
  const [userType, setUserType] = useState(type || "client")
  const { premium, subscribeToPremium } = usePremium()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [formData, setFormData] = useState({ acceptTerms: false })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profile = await getUserProfile()
        if (profile?.userType) {
          setUserType(profile.userType)
        }
      } catch (error) {
        console.error("Error loading user profile:", error)
      }
    }

    if (!type) {
      loadUserProfile()
    }
  }, [type])

  const pricingPlans = userType === "professional" ? getProfessionalPlans() : getClientPlans()

  const TermRoute = () => {
    router.push(userType === "professional" ? "/auth/termsProf" : "/auth/terms")
  }

  const change = (name, value) => setFormData((p) => ({ ...p, [name]: value }))

  const handleSubscribe = async () => {
    if (!formData.acceptTerms) {
      setErrors({ acceptTerms: "Debes aceptar los términos y condiciones" })
      return
    }

    if (selectedPlan) {
      const planDetails = getPlanDetails(selectedPlan)
      console.log("Subscribing to plan:", selectedPlan, "with details:", planDetails)

      const result = await subscribeToPremium(selectedPlan, planDetails, userType)

      if (result.success) {
        router.push({
          pathname: "/tabs/SubscriptionFlow",
          params: { planType: selectedPlan.toUpperCase(), userType },
        })
      } else {
        setErrors({ general: result.error || "Error al procesar la suscripción" })
      }
    }
  }

  const getDashboardRoute = () => {
    return userType === "professional" ? "/tabs/professional/dashboard" : "/tabs/client/dashboard"
  }

  const isProfessional = userType === "professional"
  const isPremiumActive =
    (isProfessional &&
      premium.isPremiumProf &&
      (premium.premiumStatus === "active" || premium.premiumStatus === "trial")) ||
    (!isProfessional && premium.isPremium && (premium.premiumStatus === "active" || premium.premiumStatus === "trial"))

  if (isPremiumActive) {
    return (
      <>
        <StatusBar style="light-content" />
        <View style={styles.container}>
          <BackButton onPress={() => router.back()} />
          <Logo />
          <SlideUpCard
            title="Ya eres Premium"
            subtitle={`Ya disfrutas de todos los beneficios premium ${isProfessional ? "profesionales" : "personales"}`}
            style={styles.card}
          >
            <ScrollView contentContainerStyle={styles.scroll} showsHorizontalScrollIndicator={false}>
              <Text style={styles.premiumText}>
                Gracias por ser un usuario premium. Disfruta de la experiencia completa.
              </Text>
              <CustomButton
                text="Volver al inicio"
                onPress={() => router.push(getDashboardRoute())}
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
          title={isProfessional ? "Publicitá tu servicio" : "Disfruta sin límites"}
          subtitle={isProfessional ? "Proba Dilo con tu propia marca personal" : "Obtén la mejor experiencia"}
          style={styles.card}
              >
               <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={styles.scroll}
              showsVerticalScrollIndicator={false}
            >
            <PricingComparisonTable
              headers={pricingPlans.headers}
              rows={pricingPlans.rows}
              selected={selectedPlan}
              onSelect={setSelectedPlan}
                      />
                      
            <View style={styles.radioGroup}>
              {(isProfessional ? ["estandar", "plus"] : ["basico", "premium"]).map((plan) => {
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
                        {plan === "estandar"
                          ? "ESTÁNDAR"
                          : plan === "plus"
                            ? "Plus"
                            : plan === "basico"
                              ? "Básico"
                              : "Premium"}
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
            {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

                          <View style={styles.premiumBtn}>
            <CustomButton
              text="Suscribirme"
              onPress={handleSubscribe}
              disabled={!selectedPlan || !formData.acceptTerms}
              style={styles.subscribeBtn}
                              />
                              </View>
                  </ScrollView>
                  </SafeAreaView>
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
        paddingHorizontal: wp("2%"),
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    marginLeft: wp("7%"),
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
    premiumBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
  }
})
