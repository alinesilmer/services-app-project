"use client"
import React, { useEffect, useState } from "react"
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  View,
  Text,
  StyleSheet,
} from "react-native"
import { useRouter } from "expo-router"
import SlideUpCard from "../../../components/SlideUpCard"
import CustomButton from "../../../components/CustomButton"
import Ad from "../../../components/Ad"
import BottomNavBar from "../../../components/NavBar"
import ProfilePic from "../../../components/ProfilePic"
import LongCard from "../../../components/LongCard"

import { Colors } from "../../../constants/Colors"
import { usePremium } from "../../../hooks/usePremium"
import { useAdManager } from "../../../hooks/useAdManager"
import { getCompleteUserData } from "../../../utils/storage"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

export default function ClientDashboard() {
  const router = useRouter()
  const { premium, daysRemaining, initializePremium } = usePremium()
  const { showAd, closeAd, userIsPremium } = useAdManager()
  const [refreshing, setRefreshing] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    ;(async () => {
      const d = await getCompleteUserData()
      setUserData(d)
    })()
    initializePremium()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    const d = await getCompleteUserData()
    setUserData(d)
    setRefreshing(false)
  }

  const handlePremiumNav = () => {
    if (userIsPremium) router.push("/tabs/managePremium")
    else router.push("/auth/goPremium")
  }

  const hour = new Date().getHours()
  const greeting =
    hour < 12
      ? `¡Buenos días, ${userData?.fullName}!`
      : hour < 18
      ? `¡Buenas tardes, ${userData?.fullName}!`
      : `¡Buenas noches, ${userData?.fullName}!`

  let subtitle = "Bienvenido a tu panel de usuario"
  if (premium.premiumStatus === "trial")
    subtitle = `Prueba (${daysRemaining} días restante${daysRemaining !== 1 ? "s" : ""})`
  if (premium.premiumStatus === "active") subtitle = "Premium Activo"
  if (premium.premiumStatus === "paused") subtitle = "Premium Pausado"
  if (premium.premiumStatus === "expired") subtitle = "Premium Expirado"

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={Colors.blueColor} />

      <SlideUpCard title={greeting} subtitle={subtitle} style={styles.card}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >

          <View style={styles.userInfoSection}>
            <ProfilePic
              uri={
                userData?.avatar ||
                "https://i.pinimg.com/736x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg"
              }
              size={wp("20%")}
              style={styles.avatar}
            />
            <View style={styles.userTextInfo}>
              <Text style={styles.userName}>{userData?.fullName}</Text>
              {userIsPremium && (
                <Text style={styles.premiumBadge}>Usuario Premium</Text>
              )}
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Citas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Favoritos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Reseñas</Text>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <CustomButton
              text="Mi Perfil"
              onPress={() => router.push("/tabs/client/profile")}
              style={styles.actionButton}
            />
            <CustomButton
              text="Buscar Profesionales"
              onPress={() => router.push("/tabs/client/services")}
              style={styles.actionButton}
            />
            <CustomButton
              text="Solicitud Personalizada"
              onPress={() => router.push("/tabs/client/requestAd")}
              style={styles.actionButton}
            />
            <CustomButton
              text={userIsPremium ? "Gestionar Premium" : "Obtener Premium"}
              onPress={handlePremiumNav}
              style={styles.premiumButton}
            />
            <CustomButton
              text="Inicio"
              onPress={() => router.push("/tabs/client/home")}
              style={styles.actionButton}
            />
          </View>

          <View style={styles.activitySection}>
            <Text style={styles.sectionTitle}>Actividad Reciente</Text>
            <LongCard
              title="No hay actividad"
              subtitle="Comienza buscando profesionales"
            />
          </View>
        </ScrollView>
      </SlideUpCard>

      <Ad visible={showAd} onClose={closeAd} />
      <BottomNavBar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor
  },
  card: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    padding: wp("4%"),
  },
  premiumNav: {
    alignItems: "center",
    marginBottom: hp("2%")
  },
  premiumButton: {
    width: wp("88%")
  },
  userInfoSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("3%"),
  },
  avatar: {
    marginRight: wp("8%"),
  },
  userTextInfo: {
    flex: 1
  },
  userName: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    marginLeft: wp("3%"),
  },
  premiumBadge: {
    fontSize: hp("1.6%"),
    color: Colors.greenColor,
    marginTop: hp("0.5%"),
    marginLeft: wp("3%"),
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: hp("3%"),
  },
  statItem: {
    alignItems: "center"
  },
  statNumber: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    color: Colors.orangeColor,
  },
  statLabel: {
    fontSize: hp("1.6%")
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginBottom: hp("3%"),
    marginTop: hp("5%")
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("2%"),
    width: wp("100%"),
    textAlign: "center",
  },
  activitySection: {
    marginTop: hp("2%")
  },
  sectionTitle: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
    color: Colors.orangeColor,
  },
})
