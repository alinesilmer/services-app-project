// File: tabs/professional/dashboard.js
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
import Rate from "../../../components/Rate"
import { Colors } from "../../../constants/Colors"
import { usePremium } from "../../../hooks/usePremium"
import { useAdManager } from "../../../hooks/useAdManager"
import { getCompleteUserData } from "../../../utils/storage"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

export default function ProfessionalDashboard() {
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

  const hour = new Date().getHours()
  const greeting =
    hour < 12
      ? `¡Buenos días, ${userData?.fullName}!`
      : hour < 18
      ? `¡Buenas tardes, ${userData?.fullName}!`
      : `¡Buenas noches, ${userData?.fullName}!`

  // Subtitle logic
  let subtitle = "Gestiona tu negocio"
  if (premium.isPremiumProf && premium.premiumStatus === "trial") {
    subtitle = `Prueba (${daysRemaining} días restantes)`
  } else if (premium.isPremiumProf && premium.premiumStatus === "active") {
    subtitle =
      premium.premiumType === "estandar"
        ? "Premium Estándar Activo"
        : "Premium Plus Activo"
  } else if (premium.premiumStatus === "paused") {
    subtitle = "Premium Pausado"
  } else if (premium.premiumStatus === "expired") {
    subtitle = "Premium Expirado"
  }

  const handlePremiumNav = () => {
    if (userIsPremium && premium.isPremiumProf) {
      router.push("/tabs/managePremium")
    } else {
      router.push("/auth/goPremium?type=professional")
    }
  }

  const stats = [
    { label: "Clientes", value: 0 },
    { label: "Citas", value: 0 },
    { label: "Reseñas", value: 0 },
  ]
  const quickActions = [
    { text: "Mi Perfil", route: "/tabs/professional/profile", color: Colors.greenColor },
    { text: "Mi Agenda", route: "/tabs/professional/myAppointments", color: Colors.blueColor },
    { text: "Mis Clientes", route: "/tabs/professional/clientRequest", color: Colors.orangeColor },
    { text: "Mis Servicios", route: "/tabs/professional/services", color: Colors.grayColor },
  ]
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blueColor} />
      <SlideUpCard title={greeting} subtitle={subtitle} style={styles.card}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >

          <View style={styles.userInfoSection}>
            <ProfilePic
              uri={userData?.avatar || "https://randomuser.me/api/portraits/men/73.jpg"}
              size={wp("20%")}
              style={styles.avatar}
            />
            <View style={styles.userTextInfo}>
              <Text style={styles.userName}>{userData?.fullName}</Text>
              <Text style={styles.userProfession}>{userData?.profesion}</Text>
              {userIsPremium && premium.isPremiumProf && (
                <Text style={styles.premiumBadge}>
                  {premium.premiumType === "estandar" ? "Premium Estándar" : "Premium Plus"}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>📊 Estadísticas</Text>
            <View style={styles.statsRow}>
              {stats.map((s) => (
                <View key={s.label} style={styles.statItem}>
                  <Text style={styles.statNumber}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.quickActionsContainer}>
            <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
            {quickActions.map((act) => (
              <CustomButton
                key={act.text}
                text={act.text}
                onPress={() => router.push(act.route)}
                style={[styles.actionButton, { backgroundColor: act.color }]}
              />
            ))}
             <CustomButton
              text={userIsPremium && premium.isPremiumProf ? "Gestionar Premium" : "Obtener Premium"}
              onPress={handlePremiumNav}
              style={styles.premiumButton}
            />
          </View>

          <View style={styles.activitySection}>
            <Text style={styles.sectionTitle}>Actividad Reciente</Text>
            <LongCard title="No hay actividad" subtitle="Configura tus servicios para empezar" rate={<Rate rating={0} />} />
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
    width: "100%"
  },
  scrollContent: {
    flexGrow: 1,
    padding: wp("4%")
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
    marginBottom: hp("3%")
  },
  avatar: {
    marginRight: wp("4%")
  },
  userTextInfo: {
    flex: 1
  },
  userName: {
    fontSize: hp("2.5%"),
    fontWeight: "bold"
  },
  userProfession: {
    fontSize: hp("1.8%"),
    color: Colors.grayColor,
    marginBottom: hp("1%")
  },
  premiumBadge: {
    fontSize: hp("1.6%"),
    color: Colors.orangeColor,
    marginTop: hp("0.5%")
  },

  statsContainer: {
    marginBottom: hp("3%")
  },
  sectionTitle: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginBottom: hp("1%")
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  statItem: {
    alignItems: "center"
  },
  statNumber: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    color: Colors.orangeColor
  },
  statLabel: {
    fontSize: hp("1.6%")
  },

  quickActionsContainer: {
    marginBottom: hp("3%"),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },
  actionButton: {
    marginBottom: hp("2%"),
    width: wp("88%")
  },

  activitySection: {
    marginBottom: hp("3%"),
    color: Colors.orangeColor
  },
})
