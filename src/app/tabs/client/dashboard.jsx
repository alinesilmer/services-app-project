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

export default function ClientDashboard() {
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
    const name = userData?.fullName || "Usuario"
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
    if (premium.premiumStatus === "trial") {
      return `Premium (Prueba - ${daysRemaining} días)`
    } else if (premium.premiumStatus === "active") {
      return "Premium Activo"
    } else if (premium.premiumStatus === "paused") {
      return "Premium Pausado"
    } else if (premium.premiumStatus === "expired") {
      return "Premium Expirado"
    }
    return "Bienvenido a tu panel de usuario"
  }

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
                  uri="https://image.freepik.com/foto-gratis/hermosa-mujer-sobre-fondo-blanco_144627-2849.jpg"
                  size={wp("20%")}
                  style={styles.avatar}
                />
                <View style={styles.userTextInfo}>
                  <Text style={styles.userName}>{userData?.fullName || "Usuario"}</Text>
                  <Text style={styles.userEmail}>{userData?.email || "email@ejemplo.com"}</Text>
                  {userIsPremium && (
                    <View style={styles.premiumBadge}>
                      <Text style={styles.premiumBadgeText}>✨ Usuario Premium</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Quick Stats */}
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

              {/* Action Buttons */}
              
              <View style={styles.buttonContainer}>


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

                {/* Premium Button */}
                <CustomButton
                  text={userIsPremium ? "Gestionar Premium" : "Obtener Premium"}
                  onPress={() => router.push(userIsPremium ? "/tabs/managePremium" : "/auth/goPremium")}
                  style={[
                    styles.actionButton,
                    { backgroundColor: userIsPremium ? Colors.greenColor : Colors.orangeColor },
                  ]}
                />

<CustomButton
                  text="Inicio"
                  onPress={() => router.push("/tabs/client/home")}
                  style={styles.actionButton}
                />
              </View>

              {/* Ads for non-premium users */}
              {!userIsPremium && (
                <View style={styles.adsSection}>
                  <AdsImage onPress={() => router.push("/auth/goPremium")} isPremium={userIsPremium} />
                </View>
              )}

              {/* Recent Activity */}
              <View style={styles.activitySection}>
                <Text style={styles.sectionTitle}>Actividad Reciente</Text>
                <View style={styles.activityItem}>
                  <Text style={styles.activityText}>No hay actividad reciente</Text>
                  <Text style={styles.activitySubtext}>Comienza buscando profesionales en tu área</Text>
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
    flexGrow: 1,
    width: "100%",
  },
  userInfoSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("3%"),
    paddingHorizontal: wp("2%"),
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
  userEmail: {
    fontSize: hp("1.8%"),
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
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: Colors.lightGray,
    padding: wp("4%"),
    borderRadius: wp("3%"),
    marginBottom: hp("3%"),
    marginHorizontal: wp("2%"),
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    color: Colors.blueColor,
  },
  statLabel: {
    fontSize: hp("1.6%"),
    color: Colors.grayColor,
    marginTop: hp("0.5%"),
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingLeft: 60
  },
  actionButton: {
    marginBottom: hp("2.5%"),
    width: wp("85%"),
    height: hp("6%"),
  },
  adsSection: {
    marginVertical: hp("2%"),
    paddingHorizontal: wp("2%"),
  },
  activitySection: {
    marginTop: hp("2%"),
    paddingHorizontal: wp("2%"),
  },
  sectionTitle: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    color: Colors.dark,
    marginBottom: hp("1.5%"),
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
