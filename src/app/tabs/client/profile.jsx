"use client"
import React, { useEffect, useState } from "react"
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  StatusBar,
} from "react-native"
import { useRouter } from "expo-router"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"

import ProfilePic from "../../../components/ProfilePic"
import DisplayField from "../../../components/DisplayField"
import IconButton from "../../../components/IconButton"
import SlideUpCard from "../../../components/SlideUpCard"
import BackButton from "../../../components/BackButton"
import CustomButton from "../../../components/CustomButton"
import ModalWrapper from "../../../components/ModalWrapper"
import BottomNavBar from "../../../components/NavBar"

import { Colors } from "../../../constants/Colors"
import { usePremium } from "../../../hooks/usePremium"
import { useProfile } from "../../../hooks/useProfile"
import { getUserData, logoutUser } from "../../../utils/storage"

export default function ProfileScreen() {
  const router = useRouter()
  const { premium, daysRemaining } = usePremium()
  const {
    data,
    formData,
    isModalVisible,
    openModal,
    closeModal,
    saveForm,
    updateFormData,
  } = useProfile()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const d = await getUserData()
        setUserData(d)
      } catch (e) {
        console.error("Error loading user data:", e)
      }
    })()
  }, [])

  const isPremiumActive =
    premium.isPremium && ["active", "trial"].includes(premium.premiumStatus)

  const getPremiumStatusText = () => {
    switch (premium.premiumStatus) {
      case "trial":
        return `Prueba (${daysRemaining} días restantes)`
      case "active":
        return "Premium Activo"
      case "paused":
        return "Premium Pausado"
      case "expired":
        return "Premium Expirado"
      case "cancelled":
        return "Premium Cancelado"
      default:
        return null
    }
  }

  const getPremiumButtonText = () => {
    if (["inactive", "expired"].includes(premium.premiumStatus)) {
      return premium.premiumStatus === "expired"
        ? "Renovar Premium"
        : "Obtener Premium"
    }
    return "Gestionar Premium"
  }

  const handlePremiumAction = () => {
    if (["inactive", "expired"].includes(premium.premiumStatus)) {
      router.push("/auth/goPremium")
    } else {
      router.push("/tabs/managePremium")
    }
  }

  const handleLogout = async () => {
    await logoutUser()
    router.replace("/welcome")
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={Colors.blueColor} />
      <BackButton onPress={() => router.back()} />

      <SlideUpCard title="Mi Perfil" style={styles.card}>
        <IconButton
          name="edit"
          size={24}
          color={Colors.textColor}
          style={styles.editButton}
          onPress={openModal}
        />

        <ScrollView style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}>
          <ProfilePic
            uri={
              userData?.avatar ||
              data.avatar ||
              "https://i.pinimg.com/736x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg"
            }
            size={wp("30%")}
            style={styles.avatar}
          />

          <Text style={styles.name}>
            {userData?.fullName || data.fullName || "Usuario"}
            {isPremiumActive && (
              <Text style={styles.premiumBadge}>
                {" "}
                {getPremiumStatusText()}
              </Text>
            )}
          </Text>
          {premium.premiumStatus === "trial" && (
            <Text style={styles.trialInfo}>
              ¡Actualiza antes de que termine la prueba!
            </Text>
          )}

          {[
            ["Email", userData?.email || data.email],
            ["Provincia", userData?.province || data.province],
            ["Ciudad", userData?.department || data.department],
            ["Dirección", userData?.address || data.address],
          ].map(([label, value]) => (
            <DisplayField
              key={label}
              label={label}
              value={value || "No especificado"}
              style={styles.fieldWrapper}
            />
          ))}

          {getPremiumStatusText() && (
            <View style={styles.premiumStatusCard}>
              <Text style={styles.premiumStatusText}>
                {getPremiumStatusText()}
              </Text>
            </View>
          )}

          <View style={styles.buttonsWrapper}>
          <CustomButton
            text={getPremiumButtonText()}
            onPress={handlePremiumAction}
            style={[
              styles.button,
              {
                backgroundColor: ["inactive", "expired"].includes(
                  premium.premiumStatus
                )
                  ? Colors.orangeColor
                  : Colors.blueColor,
              },
            ]}
          />

          <CustomButton
            text="Cerrar Sesión"
            onPress={handleLogout}
            style={[styles.button, { backgroundColor: "#DC3545" }]}
            />
            
            </View>
        </ScrollView>
      </SlideUpCard>

      <ModalWrapper
        visible={isModalVisible}
        title="Editar Perfil"
        onCancel={closeModal}
        onSubmit={saveForm}
      >
        <ScrollView contentContainerStyle={styles.modalScroll}>
          {[
            ["Nombre completo", formData.fullName, "fullName"],
            ["Email", formData.email, "email"],
            ["Provincia", formData.province, "province"],
            ["Ciudad", formData.department, "department"],
            ["Dirección", formData.address, "address"],
          ].map(([label, val, key]) => (
            <DisplayField
              key={key}
              label={label}
              value={val}
              editable
              onChangeText={(text) => updateFormData(key, text)}
            />
          ))}
        </ScrollView>
      </ModalWrapper>

      <BottomNavBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    paddingTop: hp("1.5%"),
  },
  card: {
    flex: 1,
    width: "100%",
    marginTop: hp("15%"),
    padding: wp("5%"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: hp("2%"),
    flexGrow: 1,
  },
  avatar: {
    marginTop: hp("2%"),
    borderWidth: 4,
    borderColor: "white",
  },
  name: {
    fontSize: wp("5%"),
    fontWeight: "700",
    textAlign: "center",
    marginTop: hp("1%"),
  },
  premiumBadge: {
    fontSize: wp("4%"),
    color: Colors.orangeColor,
  },
  trialInfo: {
    fontSize: wp("3.5%"),
    color: Colors.orangeColor,
    marginBottom: hp("2%"),
  },
  fieldWrapper: {
    width: wp("100%"),
    marginVertical: hp("1%"),
  },
  premiumStatusCard: {
    padding: hp("1%"),
    marginVertical: hp("2%"),
  },
  premiumStatusText: {
    fontSize: wp("4%"),
    textAlign: "center",
    fontWeight: "bold"
  },
  button: {
    marginTop: hp("1%"),
  },
  buttonsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20
  },
  editButton: {
    position: "absolute",
    top: hp("3%"),
    right: wp("6%"),
  },
  modalScroll: {
    paddingBottom: 20,
  },
})
