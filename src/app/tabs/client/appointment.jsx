"use client"
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, ScrollView, Modal } from "react-native"
import { useState } from "react"
import { useLocalSearchParams, router } from "expo-router"
import { Colors } from "../../../constants/Colors"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { AntDesign, MaterialIcons } from "@expo/vector-icons"
import AdsImage from "../../../components/AdsImage"
import DatePickerAppointment from "../../../components/DatePickerAppointment"
import AnimationFeedback from "../../../components/AnimationFeedback"
import useDatePickerAppointment from "../../../hooks/useDatePickerAppointment"
import mockAppointments from "../../../data/mockAppointments"

const Appointment = () => {
  const params = useLocalSearchParams()
  const [showTimeSelection, setShowTimeSelection] = useState(false)
  const [selectedTimes, setSelectedTimes] = useState([])
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)

  // Usar el hook específico para turnos (solo fechas futuras)
  const {
    date: selectedDate,
    show: showDatePicker,
    openPicker,
    handleChange,
    validateFutureDate,
    getMinimumDate,
  } = useDatePickerAppointment()

  // Horarios disponibles
  const availableTimes = [
    { id: "A", time: "12:00", label: "A" },
    { id: "B", time: "15:00", label: "B" },
    { id: "C", time: "16:00", label: "C" },
    { id: "D", time: "19:00", label: "D" },
  ]

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
    if (showTimeSelection) {
      setShowTimeSelection(false)
    } else {
      router.back()
    }
  }

  const handleDateConfirm = () => {
    if (!selectedDate) {
      console.log("Por favor selecciona una fecha")
      return
    }

    if (!validateFutureDate(selectedDate)) {
      console.log("Por favor selecciona una fecha futura")
      return
    }

    setShowTimeSelection(true)
  }

  const toggleTimeSelection = (timeId) => {
    setSelectedTimes((prev) => {
      if (prev.includes(timeId)) {
        return prev.filter((id) => id !== timeId)
      } else {
        return [...prev, timeId]
      }
    })
  }

  const handleConfirmAppointment = () => {
    if (selectedTimes.length === 0) {
      console.log("Por favor selecciona al menos un horario")
      return
    }

    // Agregar nuevas citas al array local
    selectedTimes.forEach((timeId) => {
      const timeSlot = availableTimes.find((t) => t.id === timeId)
      const newAppointment = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        professionalName: params.professionalName,
        profession: params.profession,
        date: selectedDate,
        time: timeSlot.time,
        timeLabel: timeSlot.label,
        availability: params.availability,
        professionalId: params.professionalId,
        location: "En local",
        estado: "CONFIRMADO",
        createdAt: new Date().toISOString(),
        isNew: true,
      }

      mockAppointments.unshift(newAppointment)
    })

    // Mostrar animación de éxito
setShowSuccessAnimation(true)

// Ocultar animación después de 1100ms
setTimeout(() => {
  setShowSuccessAnimation(false)
}, 1100)

// Redirigir después de 1400ms
setTimeout(() => {
  router.push("/tabs/myAppointments")
}, 1400)
  }

  const handleAdClick = () => {
    console.log("Anuncio en appointment clickeado!")
  }

  if (showTimeSelection) {
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
          <Text style={styles.title}>
            Por favor, seleccionar horarios entre las opciones{"\n"}disponibles para el turno
          </Text>

          {/* Fecha seleccionada */}
          <View style={styles.selectedDateContainer}>
            <Text style={styles.selectedDateLabel}>Fecha seleccionada</Text>
            <View style={styles.dateInputStyle}>
              <Text style={styles.dateInputText}>{selectedDate?.toLocaleDateString("es-ES") || "mm/dd/yyyy"}</Text>
              <MaterialIcons name="calendar-today" size={20} color="#666" />
            </View>
          </View>

          {/* Selección de horarios */}
          <View style={styles.timeSelectionContainer}>
            <Text style={styles.timeSelectionLabel}>Seleccionar horarios de disponibilidad</Text>

            {availableTimes.map((timeSlot) => (
              <TouchableOpacity
                key={timeSlot.id}
                style={styles.timeSlotContainer}
                onPress={() => toggleTimeSelection(timeSlot.id)}
              >
                <View style={styles.timeSlotContent}>
                  <Text style={styles.timeSlotLabel}>{timeSlot.label}</Text>
                  <Text style={styles.timeSlotTime}>{timeSlot.time}</Text>
                </View>
                <View style={[styles.checkbox, selectedTimes.includes(timeSlot.id) && styles.checkboxSelected]}>
                  {selectedTimes.includes(timeSlot.id) && <MaterialIcons name="check" size={16} color="white" />}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Anuncio */}
          <View style={styles.adContainer}>
            <AdsImage onPress={handleAdClick} />
          </View>

          {/* Botones de acción */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.backActionButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>Volver atrás</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmAppointment}>
              <Text style={styles.confirmButtonText}>Confirmar TURNO</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Modal con animación de éxito */}
        <Modal visible={showSuccessAnimation} transparent={true} animationType="fade">
          <View style={styles.animationOverlay}>
            <View style={styles.animationContainer}>
              <AnimationFeedback type="success" />
              <Text style={styles.successTitle}>¡Éxito!</Text>
              <Text style={styles.successMessage}>
                Se {selectedTimes.length > 1 ? "han" : "ha"} confirmado {selectedTimes.length} turno
                {selectedTimes.length > 1 ? "s" : ""}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    )
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

        {/* Selector de fecha usando el DatePickerAppointment */}
        <View style={styles.datePickerContainer}>
          <Text style={styles.datePickerLabel}>Fecha seleccionada:</Text>
          <View style={styles.selectedDateDisplay}>
            <Text style={styles.selectedDateText}>{formatDate(selectedDate)}</Text>
          </View>

          <DatePickerAppointment
            label="Seleccionar nueva fecha"
            value={selectedDate}
            onChange={handleChange}
            show={showDatePicker}
            onPress={openPicker}
            minimumDate={getMinimumDate()}
          />
        </View>

        {/* Anuncio */}
        <View style={styles.adContainer}>
          <AdsImage onPress={handleAdClick} />
        </View>

        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.backActionButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Volver atrás</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.confirmButton} onPress={handleDateConfirm}>
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
    lineHeight: wp("6%"),
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
  // Estilos para selección de horarios
  selectedDateContainer: {
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
  selectedDateLabel: {
    fontSize: wp("4%"),
    color: "#666",
    marginBottom: 15,
    fontWeight: "600",
  },
  dateInputStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  dateInputText: {
    fontSize: wp("4%"),
    color: "#333",
  },
  timeSelectionContainer: {
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
  timeSelectionLabel: {
    fontSize: wp("4%"),
    color: "#666",
    marginBottom: 20,
    fontWeight: "600",
  },
  timeSlotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  timeSlotContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  timeSlotLabel: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    color: "#8e44ad",
    marginRight: 15,
    width: 30,
  },
  timeSlotTime: {
    fontSize: wp("4%"),
    color: "#333",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#8e44ad",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: "#8e44ad",
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
  // Estilos para la animación
  animationOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  animationContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    minWidth: wp("70%"),
  },
  successTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    textAlign: "center",
  },
  successMessage: {
    fontSize: wp("4%"),
    color: "#666",
    marginTop: 10,
    textAlign: "center",
    lineHeight: wp("5.5%"),
  },
})

export default Appointment
