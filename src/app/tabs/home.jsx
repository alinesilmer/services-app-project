"use client"

import { useEffect, useState, useCallback } from "react"
import { View, Text, ScrollView, StyleSheet, StatusBar, Pressable, SafeAreaView, Platform } from "react-native"
import { useRouter, useFocusEffect } from "expo-router"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"

import ProfilePicture from "../../components/ProfilePic"
import SearchBar from "../../components/SearchBar"
import BottomNavBar from "../../components/NavBar"
import ServiceList from "../../components/ServiceList"
import PublicityProfessional from "../../components/PublicityProfessional"
import Notifications from "../../components/Notifications"
import LongCard from "../../components/LongCard"
import Rate from "../../components/Rate"
import Ad from "../../components/Ad"
import { useAdManager } from "../../hooks/useAdManager"
import { Colors } from "../../constants/Colors"
import { getUserData, isPremiumUser } from "../../utils/storage"

const ads = [
  require('../../assets/videos/propaganda1.mp4'),
  require('../../assets/videos/propaganda2.mp4'),
  require('../../assets/videos/propaganda3.mp4'),
  require('../../assets/videos/propaganda4.mp4'),
  require('../../assets/videos/propaganda5.mp4'),
];

const Home = () => {
  const router = useRouter()
  const [username, setUsername] = useState("Usuario")
  const [premium, setPremium] = useState(false)
  const { showAd, closeAd } = useAdManager({ isPremium: premium })

  const loadUserData = useCallback(async () => {
    try {
      const userData = await getUserData()
      if (userData && userData.username) {
        setUsername(userData.username)
      }
      const userIsPremium = await isPremiumUser()
      console.log("Home: Premium status check:", userIsPremium)
      setPremium(userIsPremium)
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }, [])
  useEffect(() => {
    loadUserData()
  }, [loadUserData])

  useFocusEffect(
    useCallback(() => {
      loadUserData()
    }, [loadUserData]),
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.topRow}>
            <Pressable style={styles.profileContainer} onPress={() => router.push("tabs/client/dashboard")}>
              <ProfilePicture uri="https://randomuser.me/api/portraits/men/32.jpg" />
              <View style={styles.profileText}>
                <Text style={styles.welcome}>Bienvenido</Text>
                <Text style={styles.username}>{username}</Text>
                {premium && <Text style={styles.premiumBadge}>Premium</Text>}
              </View>
            </Pressable>
            <Notifications />
          </View>
          <SearchBar />
        </View>

        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Servicios</Text>
            <ServiceList />

            <PublicityProfessional
              uris={[
                "https://i.ytimg.com/vi/OWlt_26nd_M/maxresdefault.jpg",
                "https://www.rankingbyseo.com/wp-content/uploads/2022/07/plumber-Marketing-2.jpg",
                "https://mobilemusicdjservices.ca/wp-content/uploads/2020/07/Mobile-Music-DJ-Services-Promo-Ad-1080x675.png",
              ]}
            />

            <Text style={styles.sectionTitle}>Vistos Recientemente</Text>
            <LongCard
              title="Cecilia Molo"
              subtitle="Pintura"
              profilePicUri="https://img.freepik.com/free-photo/strict-young-builder-woman-uniform-gloves-holding-crossing-paint-brush-with-roller-brush-isolated-olive-green-wall_141793-86469.jpg"
              rate={<Rate rating={4.5} />}
            />
          </ScrollView>
        </View>

        <BottomNavBar />

        {!premium && (
          <Ad visible={showAd} onClose={closeAd} source={require("../../assets/videos/propaganda.mp4")} type="video" />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    marginTop: hp("2%"),
    paddingHorizontal: wp("6%"),
    paddingBottom: hp("2.5%"),
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileText: {
    marginLeft: wp("2%"),
  },
  welcome: {
    fontSize: wp("4.5%"),
    color: Colors.whiteColor,
  },
  username: {
    fontSize: wp("4.2%"),
    fontWeight: "bold",
    color: Colors.whiteColor,
  },
  premiumBadge: {
    fontSize: wp("3.5%"),
    color: Colors.orangeColor,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: wp("8%"),
    borderTopRightRadius: wp("8%"),
    paddingHorizontal: wp("5%"),
    paddingTop: hp("2.5%"),
  },
  sectionTitle: {
    fontSize: wp("5%"),
    fontWeight: "600",
    color: Colors.orangeColor,
    marginTop: hp("5%"),
    marginBottom: hp("1.5%"),
    paddingHorizontal: wp("1%"),
  },
})

export default Home
