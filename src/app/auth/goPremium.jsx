import React, { useState, useEffect } from "react"
import { View, Text, ScrollView, Pressable, StyleSheet, StatusBar, } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter, useLocalSearchParams } from "expo-router"
import CheckBox from "expo-checkbox"
import BackButton from "../../components/BackButton"
import Logo from "../../components/Logo"
import SlideUpCard from "../../components/SlideUpCard"
import CustomButton from "../../components/CustomButton"
import PricingComparisonTable from "../../components/PricingComparisonTable"
import { Colors } from "../../constants/Colors"
import { Metrics } from "../../constants/Metrics"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { getProfessionalPlans, getPricingPlans, getPlanDetails, } from "../../utils/pricingPlans"
import { getUserProfile } from "../../utils/storage"
import { usePremium } from "../../hooks/usePremium"

export default function GoPremium() {
  const router = useRouter()
  const { type } = useLocalSearchParams()
  const [userType, setUserType] = useState(null)
  const { subscribeToPremium } = usePremium()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [formData, setFormData] = useState({ acceptTerms: false })
  const [errors, setErrors] = useState({})

  const normalize = (t) =>
    ["professional", "cliente"].includes(t) ? t : "cliente"
  useEffect(() => {
    getUserProfile().then((profile) =>
      setUserType(normalize(type || profile?.userType))
    )
  }, [type])

  const isProf = userType === "professional"
  const plans = isProf ? getProfessionalPlans() : getPricingPlans()
  const opts = isProf ? ["estandar", "plus"] : ["Prueba", "Mensual", "Anual"]

  const handleSubscribe = async () => {
    if (!formData.acceptTerms) {
      return setErrors({ acceptTerms: "Debes aceptar los términos" })
    }
    if (!selectedPlan) return

    const details = getPlanDetails(selectedPlan)
    const res = await subscribeToPremium(
      selectedPlan,
      details,
      userType
    )
    if (res.success) {
      router.push({
        pathname: "/tabs/subscriptionFlow",
        params: { planType: selectedPlan, userType },
      })
    } else {
      setErrors({ general: res.error })
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blueColor} />
      <BackButton onPress={() => router.back()} />
      <Logo />

        <SlideUpCard
          title={isProf ? "Publicitá tu servicio" : "Disfruta sin límites"}
          subtitle={isProf ? "Planes profesionales" : "Planes personales"}
          style={styles.card}  
        >
        <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scroll}>

            <View style={styles.tableContainer}>
              <PricingComparisonTable
                headers={plans.headers}
                rows={plans.rows}
                selected={selectedPlan}
                onSelect={setSelectedPlan}
              />
            </View>

            {opts.map((p) => {
              const sel = selectedPlan === p
              const info = getPlanDetails(p)
              return (
                <Pressable
                  key={p}
                  style={styles.optionRow}
                  onPress={() => setSelectedPlan(p)}
                >
                  <Text style={[styles.optionLabel, sel && styles.selected]}>
                    {p}
                  </Text>
                  <Text>
                    {typeof info.price === "number"
                      ? `$${info.price}`
                      : info.price}
                  </Text>
                </Pressable>
              )
            })}

            <View style={styles.checkboxContainer}>
              <CheckBox
                value={formData.acceptTerms}
                onValueChange={(v) =>
                  setFormData({ acceptTerms: v })
                }
                tintColors={{ true: Colors.orangeColor }}
              />
              <Text style={styles.linkText}>
                Acepto Términos y Condiciones
              </Text>
            </View>
            {errors.acceptTerms && (
              <Text style={styles.error}>{errors.acceptTerms}</Text>
            )}
            {errors.general && (
              <Text style={styles.error}>{errors.general}</Text>
            )}

            <View style={styles.subscribeBtnWrapper}>
              <CustomButton
                text="Suscribirme"
                onPress={handleSubscribe}
                disabled={
                  !selectedPlan || !formData.acceptTerms
                }
              />
            </View>
          </ScrollView>
        </SafeAreaView>
        </SlideUpCard>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: Metrics.screenM,
    overflow: "hidden",
    alignItems: "stretch",
  },
  scroll: {
    paddingHorizontal: Metrics.marginS,  
    paddingTop: Metrics.marginS,
    paddingBottom: Metrics.marginL,
    justifyContent: "center",
  },
  tableContainer: {
    width: wp("85%"),              
    marginBottom: Metrics.marginS,
    backgroundColor: Colors.lightGray,
    borderRadius: Metrics.radiusS,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.inputGray,  
  },
  optionRow: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
  },
  optionLabel: {
    fontWeight: "600",
    fontSize: Metrics.fontS,
  },
  selected: {
    color: Colors.orangeColor,
  },
  checkboxContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: Metrics.marginS,
    marginBottom: Metrics.marginS,
  },
  linkText: {
    marginLeft: Metrics.marginS,
    color: Colors.blueColor,
  },
  subscribeBtnWrapper: {
    alignItems: "center",
    marginTop: Metrics.marginS,
  },
  error: {
    color: Colors.errorColor,
    marginTop: Metrics.marginS,
    textAlign: "center",
  },
})
