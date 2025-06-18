"use client"
import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useRouter } from "expo-router"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"

import ProfilePic from "../../../components/ProfilePic"
import DisplayField from "../../../components/DisplayField"
import IconButton from "../../../components/IconButton"
import SlideUpCard from "../../../components/SlideUpCard"
import BackButton from "../../../components/BackButton"
import CustomButton from "../../../components/CustomButton"
import { Colors } from "../../../constants/Colors"
import BottomNavBar from "../../../components/NavBar"
import ModalWrapper from "../../../components/ModalWrapper"
import { usePremium } from "../../../hooks/usePremium"
import { useProfile } from "../../../hooks/useProfile"
import { getUserData, logoutUser } from "../../../utils/storage"

export default function ProfessionalProfileScreen() {
  const router = useRouter()
  const { premium, daysRemaining } = usePremium()
  const { data, formData, isModalVisible, openModal, closeModal, saveForm, updateFormData } = useProfile()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const data = await getUserData()
      setUserData(data)
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }

  const getPremiumStatusText = () => {
    if (premium.premiumStatus === "active" && premium.isPremiumProf) {
      const planName = premium.premiumType === "estandar" ? "Estándar" : "Plus"
      return `Premium ${planName}`
    }
    return null
  }

  const getPremiumButtonText = () => {
    if (premium.premiumStatus === "inactive") {
      return "Obtener Premium Profesional"
    } else if (premium.premiumStatus === "expired") {
      return "Renovar Premium"
    } else {
      return "Gestionar Premium"
    }
  }

  const handlePremiumAction = () => {
    if (premium.premiumStatus === "inactive" || premium.premiumStatus === "expired") {
      router.push("/auth/goPremium?type=professional")
    } else {
      router.push("/tabs/managePremium")
    }
  }

  const isPremiumActive =
    premium.isPremiumProf && (premium.premiumStatus === "active" || premium.premiumStatus === "trial")

  const handleLogout = async () => {
    console.log("Cerrando sesión...")
    await logoutUser()
    router.replace("/welcome")
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={Colors.blueColor} />
      <BackButton style={styles.backButton} onPress={() => router.back()} />
      <View style={styles.container}>
        <View style={styles.mainContent}>
          <SlideUpCard title="Mi Perfil Profesional" style={styles.card}>
            <IconButton name="edit" size={24} color={Colors.textColor} style={styles.editButton} onPress={openModal} />

            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <ProfilePic
                uri={
                  userData?.avatar ||
                  data.avatar ||
                  "https://image.freepik.com/foto-gratis/hermosa-mujer-sobre-fondo-blanco_144627-2849.jpg"
                }
                size={wp("30%")}
                style={styles.avatar}
              />

              <View style={styles.usernameView}>
                <Text style={styles.name}>
                  {userData?.fullName || data.fullName || "Profesional"}
                  {isPremiumActive && <Text style={styles.premiumBadge}> {getPremiumStatusText()}</Text>}
                </Text>
                <Text style={styles.profession}>{userData?.profesion || data.profesion || "Profesional"}</Text>
              </View>

              <View style={styles.fieldWrapper}>
                <DisplayField label="Email" value={userData?.email || data.email || "No especificado"} />
              </View>
              <View style={styles.fieldWrapper}>
                <DisplayField label="Profesión" value={userData?.profesion || data.profesion || "No especificado"} />
              </View>
              <View style={styles.fieldWrapper}>
                <DisplayField
                  label="Descripción"
                  value={userData?.descripcion || data.descripcion || "No especificado"}
                />
              </View>
              <View style={styles.fieldWrapper}>
                <DisplayField
                  label="Disponibilidad"
                  value={userData?.availability || data.availability || "No especificado"}
                />
              </View>
              <View style={styles.fieldWrapper}>
                <DisplayField label="Provincia" value={userData?.province || data.province || "No especificado"} />
              </View>
              <View style={styles.fieldWrapper}>
                <DisplayField label="Ciudad" value={userData?.department || data.department || "No especificado"} />
              </View>
              <View style={styles.fieldWrapper}>
                <DisplayField label="Dirección" value={userData?.address || data.address || "No especificado"} />
              </View>

              {/* Premium Status Card for Professionals */}
              {premium.premiumStatus !== "inactive" && premium.isPremiumProf && (
                <View style={styles.premiumStatusCard}>
                  <Text style={styles.premiumStatusTitle}>Estado Premium Profesional:</Text>
                  <Text style={styles.premiumStatusText}>
                    {premium.premiumStatus === "active" && "✅ Activo"}
                    {premium.premiumStatus === "paused" && "⏸️ Pausado"}
                    {premium.premiumStatus === "cancelled" && "❌ Cancelado"}
                    {premium.premiumStatus === "expired" && "⏰ Expirado"}
                  </Text>
                  {premium.planDetails && (
                    <>
                      <Text style={styles.planDetailsText}>
                        Plan: {premium.premiumType === "estandar" ? "Estándar" : "Plus"}
                      </Text>
                      <Text style={styles.planDetailsText}>
                        Precio: ${premium.premiumType === "estandar" ? "2" : "5"} USD/mes
                      </Text>
                    </>
                  )}
                  {premium.premiumEndDate && (
                    <Text style={styles.expirationText}>
                      Renovación: {new Date(premium.premiumEndDate).toLocaleDateString()}
                    </Text>
                  )}
                </View>
              )}

              <View style={styles.buttonContainer}>
                <CustomButton
                  text={getPremiumButtonText()}
                  onPress={handlePremiumAction}
                  style={[
                    styles.customButton,
                    {
                      backgroundColor:
                        premium.premiumStatus === "inactive" || premium.premiumStatus === "expired"
                          ? Colors.orangeColor
                          : Colors.blueColor,
                    },
                  ]}
                />
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  text="Cerrar Sesión"
                  onPress={handleLogout}
                  backgroundColor="#DC3545"
                  style={styles.customButton}
                />
              </View>
            </ScrollView>
          </SlideUpCard>
        </View>

        <ModalWrapper
          visible={isModalVisible}
          title="Editar perfil profesional"
          onCancel={closeModal}
          onSubmit={saveForm}
          cancelLabel="Cancelar"
          submitLabel="Guardar"
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: wp("2%") }}
            showsVerticalScrollIndicator={true}
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            <DisplayField
              label="Nombre completo"
              value={formData.fullName}
              editable
              onChangeText={(text) => updateFormData("fullName", text)}
            />
            <DisplayField
              label="Email"
              value={formData.email}
              editable
              onChangeText={(text) => updateFormData("email", text)}
            />
            <DisplayField
              label="Profesión"
              value={formData.profesion}
              editable
              onChangeText={(text) => updateFormData("profesion", text)}
            />
            <DisplayField
              label="Descripción"
              value={formData.descripcion}
              editable
              onChangeText={(text) => updateFormData("descripcion", text)}
            />
            <DisplayField
              label="Disponibilidad"
              value={formData.availability}
              editable
              onChangeText={(text) => updateFormData("availability", text)}
            />
            <DisplayField
              label="Provincia"
              value={formData.province}
              editable
              onChangeText={(text) => updateFormData("province", text)}
            />
            <DisplayField
              label="Ciudad"
              value={formData.department}
              editable
              onChangeText={(text) => updateFormData("city", text)}
            />
            <DisplayField
              label="Dirección"
              value={formData.address}
              editable
              onChangeText={(text) => updateFormData("address", text)}
            />
          </ScrollView>
        </ModalWrapper>
        <BottomNavBar />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    paddingTop: hp("1.5%"),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    width: "100%", // Use percentage instead of wp
  },
  mainContent: {
    flex: 1,
    justifyContent: "flex-start",
  },
  backButton: {
    marginTop: hp("1%"),
    marginLeft: wp("5%"),
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: hp("4%"),
    paddingHorizontal: wp("4%"), // Reduce padding
    paddingBottom: hp("2%"),
    shadowColor: "black",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    marginTop: hp("15%"),
    width: "100%", // Full width
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: hp("12%"),
    paddingHorizontal: 0, // Remove horizontal padding
    width: "100%", // Full width
    flexGrow: 1,
  },
  avatar: {
    marginTop: hp("2%"),
    borderWidth: 4,
    borderColor: "white",
  },
  usernameView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    marginTop: hp("1.5%"),
    marginBottom: hp("0.5%"),
    fontSize: wp("5.5%"),
    fontWeight: "700",
    color: "black",
    textAlign: "center",
  },
  profession: {
    fontSize: wp("4%"),
    color: Colors.grayColor,
    textAlign: "center",
    marginBottom: hp("2%"),
    fontStyle: "italic",
  },
  premiumBadge: {
    fontSize: wp("4%"),
    color: Colors.orangeColor,
    fontWeight: "bold",
  },
  fieldWrapper: {
    width: wp("92%"), // Explicit width to prevent overflow
    maxWidth: 400,
    marginBottom: hp("2%"),
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignSelf: "center",
  },
  editButton: {
    position: "absolute",
    top: hp("3%"),
    right: wp("6%"),
    zIndex: 10,
  },
  customButton: {
    marginTop: hp("1%"),
    width: "100%",
  },
  buttonContainer: {
    width: wp("88%"), // Slightly smaller
    alignItems: "center",
    marginTop: hp("2%"),
    marginBottom: hp("1%"),
    alignSelf: "center",
  },
  premiumStatusCard: {
    backgroundColor: Colors.lightGray,
    padding: wp("4%"),
    borderRadius: wp("3%"),
    marginVertical: hp("2%"),
    width: wp("92%"), // Explicit width
    alignItems: "center",
    alignSelf: "center",
  },
  premiumStatusTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: hp("1%"),
  },
  premiumStatusText: {
    fontSize: wp("4%"),
    color: Colors.dark,
    marginBottom: hp("0.5%"),
    textAlign: "center",
  },
  planDetailsText: {
    fontSize: wp("3.5%"),
    color: Colors.grayColor,
    marginBottom: hp("0.5%"),
    textAlign: "center",
  },
  expirationText: {
    fontSize: wp("3.5%"),
    color: Colors.grayColor,
    textAlign: "center",
  },
})
