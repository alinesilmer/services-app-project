"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView, RefreshControl } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useRouter } from "expo-router"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"

import SlideUpCard from "../../../components/SlideUpCard"
import CustomButton from "../../../components/CustomButton"
import AdsImage from "../../../components/AdsImage"
import Ad from "../../../components/Ad"
import BottomNavBar from "../../../components/NavBar"
import ProfilePic from "../../../components/ProfilePic"
import { Colors } from "../../../constants/Colors"
import { usePremium } from "../../../hooks/usePremium"
import { useAdManager } from "../../../hooks/useAdManager"
import { getCompleteUserData } from "../../../utils/storage"

export default function ProfessionalDashboard() {
  const router = useRouter()
  const { premium, daysRemaining } = usePremium()
  const { showAd, closeAd, userIsPremium } = useAdManager()
  const [refreshing, setRefreshing] = useState(false)
  const [userData, setUserData] = useState(null)

  // Sample ads data
  const adsData = [
    { id: 1, source: require("../../../assets/ads/ads1.jpeg"), type: "image" },
    { id: 2, source: require("../../../assets/ads/ads2.jpeg"), type: "image" },
    { id: 3, source: require("../../../assets/ads/ads3.jpeg"), type: "image" },
  ]

  const [currentAd, setCurrentAd] = useState(adsData[0])

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const data = await getCompleteUserData()
      setUserData(data)
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadUserData()
    setRefreshing(false)
  }

  const handleAdClose = () => {
    closeAd()
    const currentIndex = adsData.findIndex((ad) => ad.id === currentAd.id)
    const nextIndex = (currentIndex + 1) % adsData.length
    setCurrentAd(adsData[nextIndex])
  }

  const getWelcomeMessage = () => {
    const name = userData?.fullName || "Profesional"
    const hour = new Date().getHours()

    if (hour < 12) {
      return `¡Buenos días, ${name}!`
    } else if (hour < 18) {
      return `¡Buenas tardes, ${name}!`
    } else {
      return `¡Buenas noches, ${name}!`
    }
  }

  const getPremiumStatusText = () => {
    if (premium.premiumStatus === "active" && premium.isPremiumProf) {
      const planName = premium.premiumType === "estandar" ? "Estándar" : "Plus"
      return `Premium ${planName} Activo`
    } else if (premium.premiumStatus === "paused") {
      return "Premium Pausado"
    } else if (premium.premiumStatus === "expired") {
      return "Premium Expirado"
    }
    return "Gestiona tu negocio"
  }

  const getPremiumFeatures = () => {
    if (premium.premiumType === "plus") {
      return {
        advertisingDays: "4 días por semana",
        features: ["Publicidad 4 días/semana", "Eliges tus días", "Cancelación gratuita", "Soporte prioritario"],
      }
    } else if (premium.premiumType === "estandar") {
      return {
        advertisingDays: "4 días por mes",
        features: ["Publicidad 4 días/mes", "Días automáticos", "Cancelación gratuita"],
      }
    }
    return {
      advertisingDays: "Sin publicidad",
      features: ["Perfil básico", "Búsquedas limitadas"],
    }
  }

  const premiumFeatures = getPremiumFeatures()

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={Colors.blueColor} />
      <View style={styles.container}>
        <View style={styles.mainContent}>
          <SlideUpCard title={getWelcomeMessage()} subtitle={getPremiumStatusText()} style={styles.card}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
              {/* User Info Section */}
              <View style={styles.userInfoSection}>
                <ProfilePic
                  uri={
                    userData?.avatar ||
                    "https://image.freepik.com/foto-gratis/hermosa-mujer-sobre-fondo-blanco_144627-2849.jpg"
                  }
                  size={wp("20%")}
                  style={styles.avatar}
                />
                <View style={styles.userTextInfo}>
                  <Text style={styles.userName}>{userData?.fullName || "Profesional"}</Text>
                  <Text style={styles.userProfession}>{userData?.profesion || "Profesional"}</Text>
                  <Text style={styles.userEmail}>{userData?.email || "email@ejemplo.com"}</Text>
                  {userIsPremium && (
                    <View style={styles.premiumBadge}>
                      <Text style={styles.premiumBadgeText}>
                        ✨ {premium.premiumType === "estandar" ? "Premium Estándar" : "Premium Plus"}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Premium Status Card */}
              <View
                style={[
                  styles.premiumCard,
                  { backgroundColor: userIsPremium ? Colors.lightGreen : Colors.lightOrange },
                ]}
              >
                <Text style={styles.premiumCardTitle}>
                  {userIsPremium ? "🎉 ¡Eres Premium!" : "✨ Impulsa tu Negocio"}
                </Text>
                <Text style={styles.premiumCardText}>
                  {userIsPremium
                    ? `Plan ${premium.premiumType === "estandar" ? "Estándar" : "Plus"} - ${premiumFeatures.advertisingDays}`
                    : "Obtén más visibilidad y clientes con nuestros planes profesionales."}
                </Text>
              </View>

              {/* Business Stats */}
              <View style={styles.statsContainer}>
                <Text style={styles.sectionTitle}>📊 Estadísticas del Negocio</Text>
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Clientes</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Citas</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Reseñas</Text>
                  </View>
                </View>
              </View>

              {/* Quick Actions */}
              <View style={styles.quickActionsContainer}>
                <Text style={styles.sectionTitle}>Acciones Rápidas</Text>

                <CustomButton
                    text="Mi Perfil"
                    onPress={() => router.push("/tabs/professional/profile")}
                    style={[styles.actionButton, { backgroundColor: Colors.greenColor }]}
                />
                
                  <CustomButton
                    text="Mi Agenda"
                    onPress={() => router.push("/tabs/professional/myAppointments")}
                    style={[styles.actionButton, { backgroundColor: Colors.blueColor }]}
                  />

                  <CustomButton
                    text="Mis Clientes"
                    onPress={() => router.push("/tabs/professional/clientRequest")}
                    style={[styles.actionButton, { backgroundColor: Colors.orangeColor }]}
                  />

                  <CustomButton
                    text="Mis Servicios"
                    onPress={() => router.push("/tabs/professional/services")}
                    style={[styles.actionButton, { backgroundColor: Colors.grayColor }]}
                  />


              {/* Premium Action Button */}
              <View style={styles.premiumActionContainer}>
                <CustomButton
                  text={userIsPremium ? "Gestionar Premium" : "Obtener Premium"}
                  onPress={() => router.push(userIsPremium ? "/tabs/managePremium" : "/auth/goPremium")}
                  style={[
                    styles.premiumActionButton,
                    {
                      backgroundColor:
                        premium.premiumStatus === "inactive" || premium.premiumStatus === "expired"
                          ? Colors.orangeColor
                          : Colors.blueColor,
                    },
                  ]}
                />
              </View>

              </View>

              {/* Recent Activity */}
              <View style={styles.recentActivityContainer}>
                <Text style={styles.sectionTitle}>Actividad Reciente</Text>
                <View style={styles.activityItem}>
                  <Text style={styles.activityText}>No hay actividad reciente</Text>
                  <Text style={styles.activitySubtext}>Configura tus servicios para comenzar a recibir clientes</Text>
                </View>
              </View>
            </ScrollView>
          </SlideUpCard>
        </View>

        {/* Full-screen Ad Modal */}
        <Ad visible={showAd} onClose={handleAdClose} source={currentAd.source} type={currentAd.type} />

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
    width: wp("100%"),
  },
  mainContent: {
    flex: 1,
    justifyContent: "flex-start",
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: hp("4%"),
    paddingHorizontal: wp("5%"),
    paddingBottom: hp("2%"),
    shadowColor: "black",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: hp("15%"),
    width: wp("100%"),
  },
  scrollContent: {
    paddingBottom: hp("12%"),
    width: "100%",
    paddingHorizontal: 0, 
  },
  userInfoSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("3%"),
    paddingHorizontal: wp("4%"), 
    width: "100%",
  },
  avatar: {
    marginRight: wp("4%"),
  },
  userTextInfo: {
    flex: 1,
  },
  userName: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: hp("0.5%"),
  },
  userProfession: {
    fontSize: hp("1.8%"),
    color: Colors.blueColor,
    fontWeight: "600",
    marginBottom: hp("0.5%"),
  },
  userEmail: {
    fontSize: hp("1.6%"),
    color: Colors.grayColor,
    marginBottom: hp("1%"),
  },
  premiumBadge: {
    backgroundColor: Colors.lightGreen,
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.5%"),
    borderRadius: wp("3%"),
    alignSelf: "flex-start",
  },
  premiumBadgeText: {
    color: Colors.greenColor,
    fontWeight: "bold",
    fontSize: hp("1.6%"),
  },
  premiumCard: {
    padding: wp("4%"),
    borderRadius: wp("3%"),
    marginBottom: hp("3%"),
    alignItems: "center",
    marginHorizontal: wp("4%"), 
    width: wp("92%"), 
    alignSelf: "center",
  },
  premiumCardTitle: {
    fontSize: hp("2.2%"),
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: hp("1%"),
    textAlign: "center",
  },
  premiumCardText: {
    fontSize: hp("1.8%"),
    color: Colors.dark,
    textAlign: "center",
    lineHeight: hp("2.5%"),
  },
  statsContainer: {
    marginBottom: hp("3%"),
    paddingHorizontal: wp("4%"),
    width: "100%",
  },
  sectionTitle: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: hp("2%"),
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.lightGray,
    padding: wp("4%"),
    borderRadius: wp("3%"),
    width: "100%",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    color: Colors.blueColor,
  },
  statLabel: {
    fontSize: hp("1.6%"),
    color: Colors.grayColor,
    marginTop: hp("0.5%"),
  },
  quickActionsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginBottom: hp("3%"),
    paddingLeft: 100,
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("2.5%"),
    width: "100%",
  },
  actionButton: {
    width: wp("42%"), 
    height: hp("6%"),
  },
  premiumActionContainer: {
    marginBottom: hp("3%"),
    alignItems: "center",
    paddingHorizontal: wp("4%"),
    width: "100%",
  },
  premiumActionButton: {
    width: wp("88%"),
    height: hp("6%"),
  },
  adsContainer: {
    marginBottom: hp("3%"),
    paddingHorizontal: wp("4%"),
    width: "100%",
  },
  adsTitle: {
    fontSize: hp("1.8%"),
    fontWeight: "bold",
    color: Colors.grayColor,
    marginBottom: hp("1%"),
  },
  recentActivityContainer: {
    marginBottom: hp("3%"),
    paddingHorizontal: wp("4%"),
    width: "100%",
  },
  activityItem: {
    backgroundColor: Colors.lightGray,
    padding: wp("4%"),
    borderRadius: wp("2%"),
    alignItems: "center",
  },
  activityText: {
    fontSize: hp("1.8%"),
    color: Colors.dark,
    fontWeight: "500",
  },
  activitySubtext: {
    fontSize: hp("1.5%"),
    color: Colors.grayColor,
    marginTop: hp("0.5%"),
    textAlign: "center",
  },
})
