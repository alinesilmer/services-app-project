"use client"
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, ScrollView } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { Colors } from "../../../constants/Colors"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { AntDesign } from "@expo/vector-icons"
import AdsImage from "../../../components/AdsImage"
import DatePicker from "../../../components/DatePicker"
import useDatePicker from "../../../hooks/useDatePicker"

const Appointment = () => {
  const params = useLocalSearchParams()

  // Usar el hook personalizado para manejar la fecha
  const { date: selectedDate, show: showDatePicker, openPicker, handleChange } = useDatePicker(new Date())

  const formatDate = (date) => {
    if (!date) return "Seleccionar fecha"

    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ]

    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  const handleBack = () => {
    router.back()
  }

  const handleGoBack = () => {
    router.back()
  }

  const handleConfirmDate = () => {
    if (!selectedDate) {
      alert("Por favor selecciona una fecha")
      return
    }

    console.log("Fecha confirmada:", selectedDate)
    // Aquí puedes agregar la lógica para confirmar la cita
    // Por ejemplo, navegar a una pantalla de confirmación
    router.back()
  }

  const handleAdClick = () => {
    console.log("Anuncio en appointment clickeado!")
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f8f9fa" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Título */}
        <Text style={styles.title}>Por favor, seleccionar la fecha para el turno</Text>

        {/* Información del profesional */}
        <View style={styles.professionalInfo}>
          <Text style={styles.professionalInfoText}>
            Cita con: <Text style={styles.professionalName}>{params.professionalName}</Text>
          </Text>
          <Text style={styles.professionalInfoText}>
            Servicio: <Text style={styles.professionText}>{params.profession}</Text>
          </Text>
          <Text style={styles.professionalInfoText}>
            Disponibilidad: <Text style={styles.availabilityText}>{params.availability}</Text>
          </Text>
        </View>

        {/* Selector de fecha usando el DatePicker personalizado */}
        <View style={styles.datePickerContainer}>
          <Text style={styles.datePickerLabel}>Fecha seleccionada:</Text>
          <View style={styles.selectedDateDisplay}>
            <Text style={styles.selectedDateText}>{formatDate(selectedDate)}</Text>
          </View>

          <DatePicker
            label="Seleccionar nueva fecha"
            value={selectedDate}
            onChange={handleChange}
            show={showDatePicker}
            onPress={openPicker}
          />
        </View>

        {/* Anuncio */}
        <View style={styles.adContainer}>
          <AdsImage onPress={handleAdClick} />
        </View>

        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.backActionButton} onPress={handleGoBack}>
            <Text style={styles.backButtonText}>Volver atrás</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDate}>
            <Text style={styles.confirmButtonText}>Confirmar fecha</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
    paddingHorizontal: wp("5%"),
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: wp("5%"),
  },
  title: {
    fontSize: wp("4.5%"),
    color: "#d63384",
    textAlign: "center",
    marginVertical: hp("3%"),
    fontWeight: "500",
  },
  professionalInfo: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginBottom: hp("3%"),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  professionalInfoText: {
    fontSize: wp("3.8%"),
    color: "#666",
    marginBottom: 8,
  },
  professionalName: {
    fontWeight: "bold",
    color: Colors.blueColor,
  },
  professionText: {
    fontWeight: "600",
    color: "#333",
  },
  availabilityText: {
    fontWeight: "500",
    color: "#28a745",
  },
  datePickerContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginBottom: hp("3%"),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  datePickerLabel: {
    fontSize: wp("4%"),
    color: "#666",
    marginBottom: 15,
    fontWeight: "600",
  },
  selectedDateDisplay: {
    backgroundColor: "#e9ecef",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  selectedDateText: {
    fontSize: wp("4%"),
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
  },
  adContainer: {
    marginVertical: hp("2%"),
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("4%"),
    marginBottom: hp("3%"),
    gap: 15,
  },
  backActionButton: {
    flex: 1,
    backgroundColor: "#dc3545",
    borderRadius: 25,
    paddingVertical: hp("2%"),
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButtonText: {
    color: "white",
    fontSize: wp("4%"),
    fontWeight: "600",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#28a745",
    borderRadius: 25,
    paddingVertical: hp("2%"),
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  confirmButtonText: {
    color: "white",
    fontSize: wp("4%"),
    fontWeight: "600",
  },
})

export default Appointment
