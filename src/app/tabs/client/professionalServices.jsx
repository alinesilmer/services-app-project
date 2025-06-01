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
  Dimensions,
} from "react-native"
import { useState } from "react"
import { useLocalSearchParams, router } from "expo-router"
import { Colors } from "../../../constants/Colors"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import {  Feather } from "@expo/vector-icons"
import AdsImage from "../../../components/AdsImage"
import BackButton from "../../../components/BackButton"

import mockProfiles from "../../../data/mockProfiles"
import mockServices from "../../../data/mockServices"

const { width } = Dimensions.get("window")

const ProfessionalServices = () => {
  const params = useLocalSearchParams()
  const [selectedService, setSelectedService] = useState(null)
  const [showServiceModal, setShowServiceModal] = useState(false)

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

  const isPremiumUser = false

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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
                  <Feather name="image" size={20} color={Colors.blueColor} />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{serviceObj.servicio}</Text>
                  <Text style={styles.servicePrice}>{getServicePrice(serviceObj.servicio)}</Text>
                </View>
                <Feather name="chevron-right" size={24} color="#ccc" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.professionalInfo}>
          <Text style={styles.professionalName}>{professional.nombre}</Text>
          <Text style={styles.professionalCategory}>{professional.categoria}</Text>
          <View style={styles.ratingContainer}>
            <Text style={{color: Colors.orangeColor, fontSize: 20, marginBottom: 6}}>★</Text>
            <Text style={styles.rating}>{professional.calificaciones}</Text>
            <Text style={styles.location}>• {professional.ubicacion}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.messageButton} onPress={handleSendMessage}>
            <Text style={styles.buttonText}>Enviar mensaje</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.appointmentButton} onPress={handleRequestAppointment}>
            <Text style={styles.buttonText}>Solicitar turno</Text>
          </TouchableOpacity>
        </View>

        <AdsImage onPress isPremium={isPremiumUser} />
      </ScrollView>

      <Modal visible={showServiceModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedService && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedService.name}</Text>
                  <TouchableOpacity onPress={() => setShowServiceModal(false)}>
                    <Feather name="x" size={24} color="#666" />
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

                  <TouchableOpacity
                    style={styles.modalAppointmentButton}
                    onPress={() => {
                      setShowServiceModal(false)
                      handleRequestAppointment()
                    }}
                  >
                    <Feather name="calendar" size={20} color="white" />
                    <Text style={styles.modalAppointmentButtonText}>Solicitar turno para este servicio</Text>
                  </TouchableOpacity>
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
    paddingBottom: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: wp("5%"),
    fontWeight: "bold",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: wp("5%"),
  },
  servicesHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  servicesSubtitle: {
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  priceNote: {
    fontSize: wp("3%"),
    color: "#ff6b6b",
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
  },
  servicesContainer: {
    marginBottom: 30,
  },
  serviceItem: {
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  serviceContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e3f2fd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#333",
    marginBottom: 3,
  },
  servicePrice: {
    fontSize: wp("3.5%"),
    color: "#666",
  },
  professionalInfo: {
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  professionalName: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  professionalCategory: {
    fontSize: wp("4%"),
    color: "#666",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: wp("3.5%"),
    color: "#333",
    marginLeft: 5,
  },
  location: {
    fontSize: wp("3.5%"),
    color: "#666",
    marginLeft: 5,
  },
  actionButtons: {
    gap: 15,
    marginBottom: 30,
  },
  // Estilos del modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: hp("85%"),
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: wp("5.5%"),
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  modalPriceContainer: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginHorizontal: 20,
  },
  modalPrice: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    color: Colors.blueColor,
  },
  modalPriceNote: {
    fontSize: wp("3%"),
    color: "#666",
    marginTop: 5,
  },
  modalDescriptionContainer: {
    padding: 20,
  },
  modalDescription: {
    fontSize: wp("4%"),
    color: "#666",
    lineHeight: wp("5.5%"),
    textAlign: "center",
  },
  photoGallery: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  galleryTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  photosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  photoContainer: {
    width: (width - 60) / 2 - 5, 
    marginBottom: 10,
  },
  photo: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  modalAppointmentButton: {
    backgroundColor: Colors.blueColor,
    borderRadius: 25,
    paddingVertical: 15,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  modalAppointmentButtonText: {
    color: "white",
    fontSize: wp("4%"),
    fontWeight: "600",
  },
  messageButton: {
    backgroundColor: "#000",
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("8%"),
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  appointmentButton: {
    backgroundColor: "#000",
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("8%"),
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: Colors.whiteColor,
    fontSize: wp("4%"),
    fontWeight: "600",
    textAlign: "center",
  },
})

export default ProfessionalServices
