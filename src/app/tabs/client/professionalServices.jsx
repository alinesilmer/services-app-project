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
      "https://https://media.istockphoto.com/id/1049775258/es/foto/sonriendo-a-apuesto-electricista-reparaci%C3%B3n-caja-el%C3%A9ctrica-con-alicates-en-corredor-y-mirando.jpg?s=612x612&w=0&k=20&c=z9-BkHlmyIyleDNSrZj3nx65WizQy8YeYluaPdyRV5k=.me/api/portraits/men/1.jpg",
      "https://img.freepik.com/foto-gratis/manitas-sitio-construccion-proceso-perforacion-pared-perforador_169016-12114.jpg?semt=ais_items_boosted&w=740/api/portraits/women/1.jpg",
      "https://img.freepik.com/fotos-premium/carpinteria-carpinteria-fabricacion-muebles-carpintero-profesional-cortando-madera-carpinteria-concepto-industrial_310913-414.jpg/2.jpg",
      "https://wallpapers.com/images/hd/service-plumber-plumbing-system-maintenance-x0tn63qvfcup31a7.jpg",
      "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2020/02/programador-1869619.jpg?tf=3840x",
      "https://i.pinimg.com/564x/17/de/74/17de74b9a0064dc323112e37413b243b.jpg",
      "https://i.pinimg.com/736x/5e/58/33/5e5833be1e13accc4999107c93b8b660.jpg",
      "https://i.pinimg.com/564x/ca/01/61/ca01610b13c82ac39876fba08fb3abb6.jpg",
      "https://blog.discmakers.com/wp-content/uploads/2023/09/MusicCareerSuccess_Pt2_Feature.jpg",
      "https://t3.ftcdn.net/jpg/03/32/90/02/360_F_332900228_GuKd5nAhZDXXQo9V7FroTvGucFruIXLP.jpg",
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
                <Feather name="chevron-right" size={Metrics.iconSmall} color={Colors.disabledColor} />
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
                    <Feather name="x" size={Metrics.iconSmall} color={Colors.text666} />
                  </TouchableOpacity>
                </View>

                  <View style={styles.modalPriceContainer}>
                    <Text style={styles.modalPrice}>{selectedService.price}</Text>
                    <Text style={styles.modalPriceNote}>*Precio estimado</Text>
                  </View>

                  <ScrollView showsVerticalScrollIndicator={false}>

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
    fontWeight: "bold",
    color: Colors.text666,
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
    shadowColor: "Colors.textColor",
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
    fontWeight: "bold",
    color: "#333",
    marginBottom: Metrics.marginS,
  },
  servicePrice: {
    fontSize: Metrics.fontS,
    color: Colors.text666,
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
    color: Colors.text666,
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
    color: Colors.text666,
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
    marginHorizontal: Metrics.marginM,
  },
  modalPrice: {
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    color: Colors.blueColor,
  },
  modalPriceNote: {
    fontSize: Metrics.fontS,
    color: Colors.text666,
    marginTop: Metrics.marginS
  },
  modalDescriptionContainer: {
    padding: Metrics.marginS
  },
  modalDescription: {
    marginTop: Metrics.marginS,
    fontSize: Metrics.fontS,
    color: Colors.text666,
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
    width: "48%",
    aspectRatio: 1,
    marginBottom: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    elevation: 2,
    shadowColor: "Colors.textColor",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
    fontWeight: "bold",
  },
  messageButton: {
    backgroundColor: "Colors.textColor",
    paddingVertical: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    elevation: 3,
    shadowColor: "Colors.textColor",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: Metrics.radiusS,
  },
  appointmentButton: {
    backgroundColor: "Colors.textColor",
    paddingVertical: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    elevation: 3,
    shadowColor: "Colors.textColor",
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
    fontWeight: "bold",
    textAlign: "center",
  },
})

export default ProfessionalServices
