"use client"

import React, { useState, useEffect, useCallback } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Modal,
} from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { Colors } from "../../../constants/Colors"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"

import AdsImage from "../../../components/AdsImage"
import DatePickerAppointment from "../../../components/DatePickerAppointment"
import AnimationFeedback from "../../../components/AnimationFeedback"
import useDatePickerAppointment from "../../../hooks/useDatePickerAppointment"
import mockAppointments from "../../../data/mockAppointments"
import { generateTimeSlots } from "../../../utils/timeSlotGenerator"
import BackButton from "../../../components/BackButton"
import { usePremium } from "../../../hooks/usePremium"

const Appointment = () => {
  const params = useLocalSearchParams()
  const { premium } = usePremium()
  const [showTimeSelection, setShowTimeSelection] = useState(false)
  const [selectedTimes, setSelectedTimes] = useState([])
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [availableTimes, setAvailableTimes] = useState([])

  const {
    date: selectedDate,
    show: showDatePicker,
    openPicker,
    handleChange,
    validateFutureDate,
    getMinimumDate,
  } = useDatePickerAppointment()

  // derive a boolean: active or trial premium only
  const hasPremium =
    (premium.isPremium || premium.isPremiumProf) &&
    ["active", "trial"].includes(premium.premiumStatus)

  useEffect(() => {
    if (params.professionalId) {
      setAvailableTimes(generateTimeSlots(params.professionalId))
    }
  }, [params.professionalId])

  const formatDate = (date) => {
    if (!date) return "Seleccionar fecha"
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
    ]
    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  const handleBack = () => {
    if (showTimeSelection) setShowTimeSelection(false)
    else router.back()
  }

  const handleDateConfirm = () => {
    if (!selectedDate || !validateFutureDate(selectedDate)) return
    setShowTimeSelection(true)
  }

  const toggleTimeSelection = (id) => {
    setSelectedTimes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleConfirmAppointment = () => {
    selectedTimes.forEach((timeId) => {
      const slot = availableTimes.find((t) => t.id === timeId)
      mockAppointments.unshift({
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        professionalName: params.professionalName,
        profession: params.profession,
        date: selectedDate,
        time: slot.time,
        timeLabel: slot.label,
        availability: params.availability,
        professionalId: params.professionalId,
        location: "En local",
        estado: "CONFIRMADO",
        createdAt: new Date().toISOString(),
        isNew: true,
      })
    })

    setShowSuccessAnimation(true)
    setTimeout(() => {
      setShowSuccessAnimation(false)
      router.push("/tabs/client/myAppointments")
    }, 1400)
  }

  // render the time‐selection step
  if (showTimeSelection) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.header}>
          <BackButton onPress={handleBack} />
        </View>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>
            Selecciona horarios disponibles para tu turno
          </Text>
          <View style={styles.selectedDateContainer}>
            <Text style={styles.selectedDateLabel}>Fecha seleccionada</Text>
            <View style={styles.dateInputStyle}>
              <Text style={styles.dateInputText}>
                {selectedDate?.toLocaleDateString("es-ES") ?? "--/--/----"}
              </Text>
              <Feather name="calendar" size={20} color="#666" />
            </View>
          </View>

          <View style={styles.timeSelectionContainer}>
            {availableTimes.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                style={styles.timeSlotContainer}
                activeOpacity={0.7}
                onPress={() => toggleTimeSelection(slot.id)}
              >
                <View style={styles.timeSlotContent}>
                  <Text style={styles.timeSlotLabel}>{slot.label}</Text>
                  <Text style={styles.timeSlotTime}>{slot.time}</Text>
                </View>
                <View
                  style={[
                    styles.checkbox,
                    selectedTimes.includes(slot.id) && styles.checkboxSelected,
                  ]}
                >
                  {selectedTimes.includes(slot.id) && (
                    <Feather name="check" size={16} color="white" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.adContainer}>
            <AdsImage onPress style={styles.ad} isPremium={hasPremium} />
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
            >
              <Text style={styles.backText}>Volver atrás</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                !selectedTimes.length && styles.confirmDisabled,
              ]}
              disabled={!selectedTimes.length}
              onPress={handleConfirmAppointment}
            >
              <Text
                style={[
                  styles.confirmText,
                  !selectedTimes.length && styles.confirmTextDisabled,
                ]}
              >
                Confirmar TURNO
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal visible={showSuccessAnimation} transparent animationType="fade">
          <View style={styles.animationOverlay}>
            <View style={styles.animationContainer}>
              <AnimationFeedback type="success" />
              <Text style={styles.successTitle}>¡Éxito!</Text>
              <Text style={styles.successMessage}>
                {`Se ${selectedTimes.length > 1 ? "han" : "ha"} confirmado ${selectedTimes.length} turno${selectedTimes.length > 1 ? "s" : ""}`}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  // render the date‐picker step
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <BackButton onPress={handleBack} />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          Selecciona la fecha para tu turno
        </Text>
        <View style={styles.datePickerContainer}>
          <DatePickerAppointment
            label="Elegir fecha"
            value={selectedDate}
            onChange={handleChange}
            show={showDatePicker}
            onPress={openPicker}
            minimumDate={getMinimumDate()}
          />
        </View>

        <View style={styles.adContainer}>
          <AdsImage onPress isPremium={hasPremium} />
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backText}>Volver atrás</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleDateConfirm}
          >
            <Text style={styles.confirmText}>Confirmar fecha</Text>
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
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3cd",
    borderRadius: 10,
    padding: 15,
    marginBottom: hp("2%"),
    borderLeftWidth: 4,
    borderLeftColor: "#ff9800",
  },
  infoText: {
    fontSize: wp("3.8%"),
    color: "#856404",
    marginLeft: 10,
    fontWeight: "500",
    flex: 1,
  },
  adContainer: {
    marginVertical: hp("2%"),
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
  confirmButtonDisabled: {
    backgroundColor: "#e9ecef",
    elevation: 1,
    shadowOpacity: 0.1,
  },
  confirmButtonTextDisabled: {
    color: "#6c757d",
  },
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
    actionButton: {
    alignItems: "center",
    gap: 15,
    marginBottom: 30,
  },
})

export default Appointment
