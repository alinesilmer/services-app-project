"use client"
import React, { useState, useEffect } from "react"
import { View, ScrollView, Text, StyleSheet, StatusBar, Platform } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { Colors } from "../../../constants/Colors"
import { Metrics } from "../../../constants/Metrics"
import SearchBar from "../../../components/SearchBar"
import ServiceIconLabel from "../../../components/ServiceIconLabel"
import ServiceDropdown from "../../../components/ServiceDropdown"
import SubcategorySelector from "../../../components/SubcategorySelector"
import FilterSelector from "../../../components/FilterSelector"
import FilterTags from "../../../components/FilterTags"
import ProfileGrid from "../../../components/ProfileGrid"
import CustomRequestButton from "../../../components/CustomRequestButton"
import AdsImage from "../../../components/AdsImage"
import { categories } from "../../../data/mockCategories"
import profiles from "../../../data/mockProfiles"
import { useProfileFiltering } from "../../../hooks/useProfileFiltering"
import BackButton from "../../../components/BackButton"
import { getUserData, isPremiumUser, isUserLoggedIn } from "../../../utils/storage";
import { usePremium } from "../../../hooks/usePremium"

const service = () => {

const [isLoggedIn, setIsLoggedIn] = useState(false)

useEffect(() => {
  const checkLoginStatus = async () => {
    const loggedIn = await isUserLoggedIn()
    setIsLoggedIn(loggedIn)
  }

  checkLoginStatus()
}, [])

  const { label, icon, useFeather } = useLocalSearchParams()

  const initialService = label ? { label, icon, useFeather: useFeather === "true" } : null

  const {
    selectedService,
    setSelectedService,
    selectedSubcategories,
    selectedFilter,
    setSelectedFilter,
    toggleSubcategory,
    getSelectedSubcategoriesArray,
    filteredProfiles,
  } = useProfileFiltering(profiles, initialService)
    const { premium } = usePremium()
  
      const userIsPremium =
        (premium.isPremium || premium.isPremiumProf) &&
        ["active", "trial"].includes(premium.premiumStatus)

  const handleProfilePress = (prof) => {
      if (!isLoggedIn) {
    router.push("/auth/login")
    return
  }
    router.push({
      pathname: "/tabs/client/profileDetail",
      params: {
        profileId: prof.id,
        nombre: prof.nombre,
        profesion: prof.profesion,
        categoria: prof.categoria,
        calificaciones: prof.calificaciones,
        ubicacion: prof.ubicacion,
        disponibilidad: prof.disponibilidad,
        avatar: prof.avatar,
        correo: prof.correo,
      },
    })
  }

  return (
    <View style={styles.safeArea}>
      <BackButton/>
      <SearchBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        {selectedService && (
          <ServiceIconLabel
            label={selectedService.label}
            icon={selectedService.icon}
            useFeather={selectedService.useFeather}
          />
        )}

        <Text style={styles.label}>¿Qué servicio está buscando?</Text>
        <ServiceDropdown onSelect={setSelectedService} />

        <Text style={styles.label}>Elegir categoría</Text>
        <SubcategorySelector
          selectedService={selectedService}
          subcategories={categories}
          selectedSubcategories={selectedSubcategories}
          toggleSubcategory={toggleSubcategory}
        />

        <Text style={styles.label}>Filtrar por:</Text>
        <FilterSelector selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />

        <CustomRequestButton />

        <FilterTags selectedSubcategories={getSelectedSubcategoriesArray()} />

        <AdsImage onPress isPremium={userIsPremium}/>

        <ProfileGrid
          profiles={filteredProfiles}
          onProfilePress={handleProfilePress}
          selectedService={selectedService}
          selectedSubcategories={getSelectedSubcategoriesArray()}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  label: {
    marginTop: Metrics.marginM,
    marginLeft: Metrics.marginM,
    fontSize: Metrics.fontS,
    color: Colors.serviceLabel,
  },
})

export default service
