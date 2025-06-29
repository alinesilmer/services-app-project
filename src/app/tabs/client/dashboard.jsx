"use client";

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";

import SlideUpCard from "../../../components/SlideUpCard";
import CustomButton from "../../../components/CustomButton";
import Ad from "../../../components/Ad";
import BottomNavBar from "../../../components/NavBar";
import ProfilePic from "../../../components/ProfilePic";
import LongCard from "../../../components/LongCard";

import { Colors } from "../../../constants/Colors";
import { Metrics } from "../../../constants/Metrics";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { usePremium } from "../../../hooks/usePremium";
import { useAdManager } from "../../../hooks/useAdManager";
import { getCompleteUserData, logoutUser } from "../../../utils/storage";
import { logout } from "../../../redux/slices/authSlice";
import { resetPremiumState } from "../../../redux/slices/premiumSlice";

export default function ClientDashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { premium, daysRemaining, initializePremium } = usePremium();
  const { showAd, closeAd, userIsPremium } = useAdManager();
  const isPremium = usePremium(); 

  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    (async () => {
      const d = await getCompleteUserData();
      setUserData(d);
    })();
    initializePremium();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    const d = await getCompleteUserData();
    setUserData(d);
    setRefreshing(false);
  };

  const isValidUser = () =>
    !!userData?.fullName && userData.fullName !== "undefined";

  const handleSecureNavigation = (route) => {
    if (!isValidUser()) router.push("/auth/register");
    else router.push(route);
  };

  const handlePremiumNav = () => {
    const route = isPremium
      ? "/tabs/managePremium"
      : "/auth/goPremium";
    handleSecureNavigation(route);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      dispatch(resetPremiumState());
      router.replace("/auth/login");
    } catch (e) {
      console.error("Error al cerrar sesión", e);
    }
  };

  const hour = new Date().getHours();
  const greeting = !isValidUser()
    ? "¡Bienvenido, Usuario!"
    : hour < 12
    ? `¡Buenos días, ${userData.fullName}!`
    : hour < 18
    ? `¡Buenas tardes, ${userData.fullName}!`
    : `¡Buenas noches, ${userData.fullName}!`;

  let subtitle = "Bienvenido a tu panel de usuario";
  if (premium.premiumStatus === "trial")
    subtitle = `Prueba (${daysRemaining} día${
      daysRemaining !== 1 ? "s" : ""
    } restante)`;
  if (premium.premiumStatus === "active") subtitle = "Premium Activo";
  if (premium.premiumStatus === "paused") subtitle = "Premium Pausado";
  if (premium.premiumStatus === "expired")
    subtitle = "Premium Expirado";

  return (
    <>
      <StatusBar style="light" backgroundColor={Colors.blueColor} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <SlideUpCard title={greeting} subtitle={subtitle} style={styles.card}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <View style={styles.userInfoSection}>
                <View style={styles.avatarWrapper}>
                  <ProfilePic
                    uri={
                      userData?.avatar ||
                      "https://i.pinimg.com/736x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg"
                    }
                    size={Metrics.iconXLarge}
                    style={styles.avatar}
                  />
                </View>
                <View style={styles.userTextInfo}>
                  <Text style={styles.userName}>
                    {userData?.fullName || "Usuario"}
                  </Text>
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
                  onPress={() => handleSecureNavigation("/tabs/client/services")}
                  style={styles.actionButton}
                />
                <CustomButton
                  text="Solicitud Personalizada"
                  onPress={() => handleSecureNavigation("/tabs/client/requestAd")}
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
              <CustomButton
                  text="Cerrar Sesión"
                  onPress={handleLogout}
                  style={[styles.actionButton, { backgroundColor: "#DC3545" }]}
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
        </View>
        <Ad visible={showAd} onClose={closeAd} />
      </SafeAreaView>

      <BottomNavBar />
      <SafeAreaView style={styles.safeAreaBottom} />
    </>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    height: Metrics.safeArea,
  },
  safeAreaBottom: {
    backgroundColor: Colors.blueColor,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: "absolute",
    bottom: 0,
    height: Metrics.screenM,
    alignItems: "stretch",
  },
  scrollView: {
    flex: 1,
    width: wp("100%"),
  },
  scrollContent: {
    flexGrow: 1,
    padding: Metrics.marginS,
  },
  premiumButton: {
    width: wp("90%"),
  },
  userInfoSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Metrics.marginS,
  },
  avatarWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    marginRight: Metrics.marginS,
  },
  userTextInfo: {
    flex: 1,
  },
  userName: {
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    marginLeft: Metrics.marginS,
  },
  premiumBadge: {
    fontSize: Metrics.fontS,
    color: Colors.greenColor,
    marginTop: Metrics.marginS,
    marginLeft: Metrics.marginS,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: Metrics.marginS,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    color: Colors.orangeColor,
  },
  statLabel: {
    fontSize: Metrics.fontS,
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: Metrics.marginS,
    marginBottom: Metrics.marginS,
    marginTop: Metrics.marginS,
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Metrics.marginS,
    width: wp("100%"),
    textAlign: "center",
  },
  activitySection: {
    marginTop: Metrics.marginS,
  },
  sectionTitle: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    marginBottom: Metrics.marginS,
    color: Colors.orangeColor,
  },
})
