"use client"

import React, { useRef, useEffect } from "react"
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { Colors } from "../../../constants/Colors"
import SearchBar from "../../../components/SearchBar"
import ServiceIconLabel from "../../../components/ServiceIconLabel"
import ServiceDropdown from "../../../components/ServiceDropdown"
import SubcategorySelector from "../../../components/SubcategorySelector"
import FilterSelector from "../../../components/FilterSelector"
import { categories } from "../../../data/mockCategories"
import profiles from "../../../data/mockProfiles"

const service = () => {
  const { label, icon, useFeather } = useLocalSearchParams()
  const scaleAnim = useRef(new Animated.Value(1)).current

  const profile = profiles

  const initialService = label ? { label, icon, useFeather: useFeather === "true" } : null

  const [selectedService, setSelectedService] = React.useState(initialService)
  const [selectedSubcategories, setSelectedSubcategories] = React.useState({})
  const [selectedFilter, setSelectedFilter] = React.useState("valorados")

  // Resetear subcategorías cuando cambia el servicio
  useEffect(() => {
    setSelectedSubcategories({})
  }, [selectedService?.label])

  const toggleSubcategory = (sub) => {
    setSelectedSubcategories((prev) => ({
      ...prev,
      [sub]: !prev[sub],
    }))
  }

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push("/custom-request")
    })
  }

  // Función para navegar al perfil del profesional
  const handleProfilePress = (prof) => {
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

  // Función para obtener las subcategorías seleccionadas
  const getSelectedSubcategoriesArray = () => {
    return Object.keys(selectedSubcategories).filter((key) => selectedSubcategories[key])
  }

  // Función para ordenar perfiles según el filtro seleccionado
  const sortProfiles = (profiles) => {
    switch (selectedFilter) {
      case "valorados":
        return profiles.sort((a, b) => b.calificaciones - a.calificaciones)
      case "alfabetico":
        return profiles.sort((a, b) => a.nombre.localeCompare(b.nombre))
      case "disponibilidad":
        return profiles.sort((a, b) => a.disponibilidad.localeCompare(b.disponibilidad))
      default:
        return profiles
    }
  }

  // Función para filtrar perfiles
  const getFilteredProfiles = () => {
    const filteredProfiles = profile.filter((prof) => {
      // Si no hay servicio seleccionado, mostrar todos
      if (!selectedService) return true

      // Mapear los servicios del dropdown con las profesiones del mockProfiles
      const serviceMapping = {
        Plomería: "Plomería",
        Refacción: "Refacción",
        Electricista: "Electricista",
        Carpintería: "Carpintería",
        Limpieza: "Limpieza",
        Pintura: "Pintura",
        Mudanza: "Mudanza",
        Técnico: "Técnico",
      }

      // Filtrar por la profesión que coincida con el servicio seleccionado
      const matchesService = prof.profesion === serviceMapping[selectedService.label]

      if (!matchesService) return false

      // Si no hay subcategorías seleccionadas, mostrar todos los del servicio
      const selectedSubcategoriesArray = getSelectedSubcategoriesArray()
      if (selectedSubcategoriesArray.length === 0) return true

      // Si hay subcategorías seleccionadas, filtrar por ellas
      return selectedSubcategoriesArray.includes(prof.categoria)
    })

    // Aplicar ordenamiento según el filtro seleccionado
    return sortProfiles(filteredProfiles)
  }

  const filteredProfiles = getFilteredProfiles()

  return (
    <View style={styles.safeArea}>
      <SearchBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        {selectedService && (
          <ServiceIconLabel
            label={selectedService.label}
            icon={selectedService.icon}
            useFeather={selectedService.useFeather}
          />
        )}

        <Text style={styles.label}>¿Qué servicio está{"\n"} buscando?</Text>
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

        <Text style={styles.selectedLabel}>
          ¿No encontraste lo que buscas?{" "}
          <Animated.Text
            onPress={handlePress}
            style={[
              styles.linkText,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {" >"} Presione aquí {"<"}
          </Animated.Text>
        </Text>

        <View style={styles.profilesContainer}>
          <Text style={styles.profilesLabel}>Profesionales disponibles: {filteredProfiles.length}</Text>

          {/* Mostrar subcategorías seleccionadas */}
          {getSelectedSubcategoriesArray().length > 0 && (
            <View style={styles.selectedFiltersContainer}>
              <Text style={styles.selectedFiltersLabel}>Filtros activos:</Text>
              <View style={styles.filterTagsContainer}>
                {getSelectedSubcategoriesArray().map((subcategory) => (
                  <View key={subcategory} style={styles.filterTag}>
                    <Text style={styles.filterTagText}>{subcategory}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.profilesGrid}>
            {filteredProfiles.map((prof) => (
              <TouchableOpacity
                key={prof.id}
                style={styles.profileCard}
                activeOpacity={0.8}
                onPress={() => handleProfilePress(prof)}
              >
                <Image source={{ uri: prof.avatar }} style={styles.profileImage} />
                <Text style={styles.profileName}>{prof.nombre}</Text>
                <Text style={styles.profileService}>{prof.profesion}</Text>
                <Text style={styles.profileCategory}>{prof.categoria}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>⭐ {prof.calificaciones}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Mensaje cuando no hay profesionales disponibles */}
          {selectedService && filteredProfiles.length === 0 && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                {getSelectedSubcategoriesArray().length > 0
                  ? `No hay profesionales disponibles para las categorías seleccionadas en ${selectedService.label}`
                  : `No hay profesionales disponibles para ${selectedService.label}`}
              </Text>
            </View>
          )}
        </View>
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
    marginTop: 13,
    marginLeft: "23.6%",
    fontSize: 15,
    color: Colors.serviceLabel,
  },
  selectedLabel: {
    marginTop: 34,
    fontSize: wp("4%"),
    fontWeight: "bold",
    color: Colors.whiteColor,
    textAlign: "center",
  },
  linkText: {
    color: Colors.orangeColor,
    fontWeight: "bold",
  },
  profilesContainer: {
    marginTop: 20,
    paddingHorizontal: wp("5%"),
  },
  profilesLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.whiteColor,
    marginBottom: 15,
    textAlign: "center",
  },
  selectedFiltersContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  selectedFiltersLabel: {
    fontSize: 14,
    color: Colors.whiteColor,
    marginBottom: 8,
    fontWeight: "bold",
  },
  filterTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 5,
  },
  filterTag: {
    backgroundColor: Colors.orangeColor,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 5,
  },
  filterTagText: {
    color: Colors.whiteColor,
    fontSize: 12,
    fontWeight: "bold",
  },
  profilesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 15,
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 15,
    width: wp("40%"),
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.whiteColor,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.whiteColor,
    textAlign: "center",
    marginBottom: 5,
  },
  profileService: {
    fontSize: 12,
    color: Colors.orangeColor,
    textAlign: "center",
  },
  noResultsContainer: {
    alignItems: "center",
    marginTop: 30,
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: Colors.whiteColor,
    textAlign: "center",
    fontStyle: "italic",
  },
  profileCategory: {
    fontSize: 11,
    color: Colors.whiteColor,
    textAlign: "center",
    opacity: 0.8,
    marginBottom: 5,
  },
  ratingContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  rating: {
    fontSize: 12,
    color: Colors.whiteColor,
    fontWeight: "bold",
  },
})

export default service
