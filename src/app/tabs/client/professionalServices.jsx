"use client"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
  Modal,
  Image,
} from "react-native"
import { useState, useEffect } from "react"
import { useLocalSearchParams, router } from "expo-router"
import { Colors } from "../../../constants/Colors"
import { Metrics } from "../../../constants/Metrics"
import {  Feather } from "@expo/vector-icons"
import AdsImage from "../../../components/AdsImage"
import BackButton from "../../../components/BackButton"
import CustomButton from "../../../components/CustomButton"

import mockProfiles from "../../../data/mockProfiles"
import mockServices from "../../../data/mockServices"
import { usePremium } from "../../../hooks/usePremium"


const ProfessionalServices = () => {
  const params = useLocalSearchParams()
  const [selectedService, setSelectedService] = useState(null)
  const [showServiceModal, setShowServiceModal] = useState(false)

    const { premium } = usePremium()
  
      const userIsPremium =
        (premium.isPremium || premium.isPremiumProf) &&
        ["active", "trial"].includes(premium.premiumStatus)

  const professional = mockProfiles.find((profile) => profile.id === Number.parseInt(params.professionalId))

  if (!professional) {
    return (
      <View style={styles.container}>
        <Text>Profesional no encontrado</Text>
      </View>
    )
  }

  const professionalServices = mockServices.filter(
    (service) => service.idProfesional === Number.parseInt(params.professionalId),
  )

  const generateServicePhotos = (serviceName) => {
    const basePhotos = [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/1.jpg",
      "https://randomuser.me/api/portraits/men/2.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
      "https://randomuser.me/api/portraits/men/3.jpg",
      "https://randomuser.me/api/portraits/women/3.jpg",
      "https://randomuser.me/api/portraits/men/4.jpg",
      "https://randomuser.me/api/portraits/women/4.jpg",
      "https://randomuser.me/api/portraits/men/5.jpg",
      "https://randomuser.me/api/portraits/women/5.jpg",
    ]

    const numPhotos = Math.floor(Math.random() * 3) + 4
    const selectedPhotos = []
    const usedIndices = new Set()

    while (selectedPhotos.length < numPhotos && selectedPhotos.length < basePhotos.length) {
      const randomIndex = Math.floor(Math.random() * basePhotos.length)
      if (!usedIndices.has(randomIndex)) {
        selectedPhotos.push(basePhotos[randomIndex])
        usedIndices.add(randomIndex)
      }
    }

    return selectedPhotos
  }


  const getServicePrice = (serviceName) => {
    const service = mockServices.find(
      (s) => s.servicio === serviceName && s.idProfesional === Number.parseInt(params.professionalId),
    )

    if (service) {
      return service.precio === 0 ? "Gratis" : `Desde $${service.precio.toLocaleString()}`
    }

    return "Consultar precio"
  }

  const handleServicePress = (service) => {
    const serviceData = {
      name: service,
      price: getServicePrice(service),
      photos: generateServicePhotos(service),
      description: `Servicio profesional de ${service.toLowerCase()}. Utilizamos técnicas modernas y productos de alta calidad para garantizar los mejores resultados.`,
    }
    setSelectedService(serviceData)
    setShowServiceModal(true)
  }


  const handleSendMessage = () => {
    router.push({
      pathname: "/tabs/chat",
      params: {
        professionalId: professional.id,
        professionalName: professional.nombre,
        professionalAvatar: professional.avatar,
        profession: professional.profesion,
      },
    })
  }

  const handleRequestAppointment = () => {
    router.push({
      pathname: "/tabs/client/appointment",
      params: {
        professionalId: professional.id,
        professionalName: professional.nombre,
        profession: professional.profesion,
        availability: professional.disponibilidad,
      },
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.blueColor} barStyle="light-content" />

      <View style={styles.header}>
        <BackButton/>
        <Text style={styles.headerTitle}>Servicios</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.servicesHeader}>
          <Text style={styles.servicesSubtitle}>PRECIOS ESTIMADOS</Text>
          <Text style={styles.priceNote}>(*) Los precios pueden variar según el tipo de servicio.</Text>
        </View>
        <View style={styles.servicesContainer}>
          {professionalServices.map((serviceObj, index) => (
            <TouchableOpacity
              key={index}
              style={styles.serviceItem}
              onPress={() => handleServicePress(serviceObj.servicio)}
              activeOpacity={0.7}
            >
              <View style={styles.serviceContent}>
                <View style={styles.serviceIcon}>
                  <Feather name="image" size={Metrics.iconSmall} color={Colors.blueColor} />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{serviceObj.servicio}</Text>
                  <Text style={styles.servicePrice}>{getServicePrice(serviceObj.servicio)}</Text>
                </View>
                <Feather name="chevron-right" size={Metrics.iconSmall} color="#ccc" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.professionalInfo}>
          <Text style={styles.professionalName}>{professional.nombre}</Text>
          <Text style={styles.professionalCategory}>{professional.categoria}</Text>
          <View style={styles.ratingContainer}>
            <Text style={{color: Colors.orangeColor, fontSize: Metrics.fontS, marginBottom: Metrics.marginS}}>★</Text>
            <Text style={styles.rating}>{professional.calificaciones}</Text>
            <Text style={styles.location}>• {professional.ubicacion}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <CustomButton text="Enviar Mensaje" onPress={handleSendMessage} 
          />
          <CustomButton text="Solicitar turno" onPress={handleRequestAppointment} 
          />
        </View>

        <AdsImage onPress isPremium={userIsPremium} />
      </ScrollView>

      <Modal visible={showServiceModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedService && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedService.name}</Text>
                  <TouchableOpacity onPress={() => setShowServiceModal(false)}>
                    <Feather name="x" size={Metrics.iconSmall} color="#666" />
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.modalPriceContainer}>
                    <Text style={styles.modalPrice}>{selectedService.price}</Text>
                    <Text style={styles.modalPriceNote}>*Precio estimado</Text>
                  </View>

                  <View style={styles.modalDescriptionContainer}>
                    <Text style={styles.modalDescription}>{selectedService.description}</Text>
                  </View>

                  <View style={styles.photoGallery}>
                    <Text style={styles.galleryTitle}>Galería de trabajos</Text>
                    <View style={styles.photosGrid}>
                      {selectedService.photos.map((photo, index) => (
                        <View key={index} style={styles.photoContainer}>
                          <Image source={{ uri: photo }} style={styles.photo} />
                        </View>
                      ))}
                    </View>
                  </View>
                  <View style={{ alignItems:"center"}}>
                  <CustomButton 
                  text={"Solicitar turno para este servicio"}
                      onPress={() => {
                      setShowServiceModal(false)
                      handleRequestAppointment()
                    }}
                  />
                  </View>

                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Metrics.marginS,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
    paddingBottom: Metrics.marginS,
  },
  headerTitle: {
    color: Colors.whiteColor,
    fontSize: Metrics.fontM,
    fontWeight: "bold",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: Metrics.mar,
  },
  servicesHeader: {
    alignItems: "center",
    marginBottom: Metrics.marginS,
  },
  servicesSubtitle: {
    fontSize: Metrics.fontM,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginTop: Metrics.marginS,
  },
  priceNote: {
    fontSize: Metrics.fontS,
    color: "#ff6b6b",
    textAlign: "center",
    marginTop: Metrics.marginS,
    fontStyle: "italic",
  },
  servicesContainer: {
    marginBottom: Metrics.marginS,
  },
  serviceItem: {
    backgroundColor: "#f8f9fa",
    borderRadius: Metrics.radiusS,
    marginBottom: Metrics.marginS,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: Metrics.radiusS,
  },
  serviceContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: Metrics.marginS,
  },
  serviceIcon: {
    width: Metrics.iconLarge,
    height: Metrics.iconLarge,
    borderRadius: Metrics.radiusS,
    backgroundColor: "#e3f2fd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: Metrics.marginS,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: Metrics.fontM,
    fontWeight: "600",
    color: "#333",
    marginBottom: Metrics.marginS,
  },
  servicePrice: {
    fontSize: Metrics.fontS,
    color: "#666",
  },
  professionalInfo: {
    backgroundColor: "#f8f9fa",
    borderRadius: Metrics.radiusS,
    padding: Metrics.marginS,
    marginBottom: Metrics.marginS,
    alignItems: "center",
  },
  professionalName: {
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    color: "#333",
    marginBottom: Metrics.marginS,
  },
  professionalCategory: {
    fontSize: Metrics.fontS,
    color: "#666",
    marginBottom: Metrics.marginS,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize:Metrics.fontS,
    color: "#333",
    marginLeft: Metrics.marginS,
  },
  location: {
    fontSize:Metrics.fontS,
    color: "#666",
    marginLeft: Metrics.marginS,
  },
  actionButtons: {
    alignItems: "center",
    gap: Metrics.marginS,
    marginBottom: Metrics.marginS,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: Metrics.ionXXL,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Metrics.marginS,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  modalPriceContainer: {
    alignItems: "center",
    paddingVertical: Metrics.marginS,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginHorizontal: Metrics.marginS,
  },
  modalPrice: {
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    color: Colors.blueColor,
  },
  modalPriceNote: {
    fontSize: Metrics.fontS,
    color: "#666",
    marginTop: Metrics.marginS
  },
  modalDescriptionContainer: {
    padding: Metrics.marginS
  },
  modalDescription: {
    fontSize: Metrics.fontS,
    color: "#666",
    lineHeight: Metrics.marginXS,
    textAlign: "center",
  },
  photoGallery: {
    paddingHorizontal: Metrics.marginS,
    marginBottom: Metrics.marginS,
  },
  galleryTitle: {
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    color: "#333",
    marginBottom: Metrics.marginS,
    textAlign: "center",
  },
  photosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  photoContainer: {
    width: Metrics.publicityArea, 
    marginBottom: Metrics.marginS
  },
  photo: {
    width: Metrics.screenS,
    height: Metrics.screenS,
    borderRadius: Metrics.radiusS,
    backgroundColor: "#f0f0f0",
  },
  modalAppointmentButton: {
    backgroundColor: Colors.blueColor,
    borderRadius: Metrics.radiusS,
    paddingVertical: Metrics.marginS,
    marginHorizontal: Metrics.marginS,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Metrics.marginS,
  },
  modalAppointmentButtonText: {
    color: Colors.whiteColor,
    fontSize: Metrics.fontS,
    fontWeight: "600",
  },
  messageButton: {
    backgroundColor: "#000",
    paddingVertical: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: Metrics.radiusS,
  },
  appointmentButton: {
    backgroundColor: "#000",
    paddingVertical: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: Metrics.radiusS,
  },
  buttonText: {
    color: Colors.whiteColor,
    fontSize: Metrics.fontS,
    fontWeight: "600",
    textAlign: "center",
  },
})

export default ProfessionalServices
