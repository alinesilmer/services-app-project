'use client';
import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, ScrollView, StyleSheet, StatusBar, Pressable, SafeAreaView, Platform, FlatList } from 'react-native'
import { useRouter, useFocusEffect } from 'expo-router'
import { useDispatch } from 'react-redux'

import ProfilePicture from '../../../components/ProfilePic'
import SearchBar from '../../../components/SearchBar'
import BottomNavBar from '../../../components/NavBar'
import ServiceList from '../../../components/ServiceList'
import PublicityProfessional from '../../../components/PublicityProfessional'
import Notifications from '../../../components/Notifications'
import LongCard from '../../../components/LongCard'
import allServices from '../../../data/mockServices'
import Rate from '../../../components/Rate'
import { filterServices } from '../../../utils/filterServices'
import { logout } from '../../../redux/slices/authSlice'
import { resetPremiumState } from '../../../redux/slices/premiumSlice'
import { logoutUser } from '../../../utils/storage'
import { Colors } from '../../../constants/Colors'
import { Metrics } from '../../../constants/Metrics'
import { getCompleteUserData } from '../../../utils/storage'
import { usePremium } from '../../../hooks/usePremium'

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { premium } = usePremium()
  const userIsPremium = (premium.isPremium || premium.isPremiumProf) && ['active','trial'].includes(premium.premiumStatus)

  const [username, setUsername] = useState('Usuario')
  const [search, setSearch] = useState('')

  const filteredResults = filterServices(search, allServices)

  const loadUserData = useCallback(async () => {
    try {
      const data = await getCompleteUserData()
      if (data.fullName) setUsername(data.fullName)
    } catch (e) {
      console.error('Error loading user data:', e)
    }
  }, [])

  useEffect(() => { loadUserData() }, [loadUserData])
  useFocusEffect(useCallback(() => { loadUserData() }, [loadUserData]))

  const handleLogout = async () => {
    try {
      await logoutUser()
      dispatch(logout())
      dispatch(resetPremiumState())
      router.replace('/auth/login')
    } catch (e) { console.error('Error al cerrar sesi\u00f3n', e) }
  }


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>

        <View style={styles.header}>
          <View style={styles.topRow}>
            <Pressable
              style={styles.profileContainer}
              onPress={() => router.push("/tabs/client/dashboard")}
            >
              <ProfilePicture uri="https://i.pinimg.com/736x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg" />
              <View style={styles.profileText}>
                <Text style={styles.welcome}>Bienvenido</Text>
                <Text style={styles.username}>{username}</Text>
                {userIsPremium && (
                  <Text style={styles.premiumBadge}>Premium</Text>
                )}
              </View>
            </Pressable>
            <Notifications />
          </View>

          <SearchBar value={search} onChangeText={setSearch} />
          {search.trim().length > 0 && (
            <View style={styles.searchResults}>
              <FlatList
                data={filteredResults}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.resultItem}
                    onPress={() => console.log("Detalle", item.servicio)}
                  >
                    <Text style={styles.resultText}>
                      {item.servicio} - ${item.precio}
                    </Text>
                  </Pressable>
                )}
                ListEmptyComponent={
                  <Text style={styles.noResults}>
                    No se encontraron servicios
                  </Text>
                }
              />
            </View>
          )}
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
  container: { flex: 1 },
  header: {
    marginTop: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
    paddingBottom: Metrics.marginS,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Metrics.marginS,
  },
  profileContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center"
  },
  profileText: { 
    marginLeft: Metrics.marginS, 
  },
  welcome: {
    fontSize: Metrics.fontM,
    color: Colors.whiteColor,
  },
  username: {
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    color: Colors.whiteColor,
  },
  premiumBadge: {
    fontSize: Metrics.fontS,
    color: Colors.orangeColor,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Metrics.marginS,
    paddingTop: Metrics.marginS,
  },
  sectionTitle: {
    fontSize: Metrics.fontM,
    fontWeight: "600",
    color: Colors.orangeColor,
    marginTop: Metrics.marginL,
    marginBottom: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
  },
  searchResults: {
    backgroundColor: "#fff",
    borderRadius: Metrics.radiusS,
    paddingVertical: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
    elevation: 3,
    marginTop: Metrics.marginS,
  },
  resultItem: {
    paddingVertical: Metrics.marginS,
    borderBottomWidth: Metrics.marginXS,
    borderBottomColor: "#eee",
  },
  resultText: {
    fontSize: Metrics.fontS,
    color: Colors.textColor,
  },
  noResults: {
    fontSize: Metrics.fontS,
    textAlign: "center",
    padding: Metrics.marginS,
    color: "gray",
  },
})