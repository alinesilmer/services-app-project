"use client"

import React, { useEffect, useState } from "react"
import { SafeAreaView, StatusBar, ScrollView, RefreshControl, View, Text, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import SlideUpCard from "../../../components/SlideUpCard"
import CustomButton from "../../../components/CustomButton"
import Ad from "../../../components/Ad"
import BottomNavBar from "../../../components/NavBar"
import ProfilePic from "../../../components/ProfilePic"
import LongCard from "../../../components/LongCard"
import Rate from "../../../components/Rate"
import { Colors } from "../../../constants/Colors"
import { Metrics } from "../../../constants/Metrics"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { usePremium } from "../../../hooks/usePremium"
import { useAdManager } from "../../../hooks/useAdManager"
import { getCompleteUserData } from "../../../utils/storage"

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
    if (premium.isPremiumProf) {
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        > 

          <View style={styles.userInfoSection}>
            <ProfilePic
              uri={userData?.avatar || "https://randomuser.me/api/portraits/men/73.jpg"}
              size={Metrics.marginTotal}
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
              text={premium.isPremiumProf ? "Gestionar Premium" : "Obtener Premium"}
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
    marginTop: Metrics.topSpace,
    height: Metrics.screenL,
    alignItems: "stretch",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    padding: Metrics.marginS,
  },

  premiumNav: {
    alignItems: "center",
    marginBottom: Metrics.marginS,
  },
  premiumButton: {
    width: wp("90%"),
  },

  userInfoSection: {
    flexDirection: "row",
    alignItems: 'center',
    gap: Metrics.marginL,
    marginBottom: Metrics.marginXL,
  },
  avatar: {
    margin: Metrics.marginS,
  },
  userTextInfo: {
    flex: 1,
    alignItems: 'center',
  },
  userName: {
    fontSize: Metrics.fontL,
    fontWeight: "bold"
  },
  userProfession: {
    fontSize: Metrics.fontS,
    color: Colors.grayColor,
    marginBottom: Metrics.marginS,
  },
  premiumBadge: {
    fontSize: Metrics.fontXS,
    color: Colors.orangeColor,
    marginTop: Metrics.marginS,
  },

  statsContainer: {
    marginBottom: Metrics.marginS,
  },
  sectionTitle: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    marginBottom: Metrics.marginS,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  statItem: {
    alignItems: "center"
  },
  statNumber: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    color: Colors.orangeColor
  },
  statLabel: {
    fontSize: Metrics.fontXS,
  },

  quickActionsContainer: {
    marginBottom: Metrics.marginS,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: Metrics.marginS,
  },
  actionButton: {
    marginBottom: Metrics.marginS,
  },

  activitySection: {
    marginBottom: Metrics.marginS,
    color: Colors.orangeColor
  },
})
