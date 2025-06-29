"use client"
import React, { useState, useEffect, useCallback } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Platform, Modal, } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Feather } from "@expo/vector-icons"
import { Colors } from "../../../constants/Colors"
import { Metrics } from "../../../constants/Metrics"

import AdsImage from "../../../components/AdsImage"
import DatePickerAppointment from "../../../components/DatePickerAppointment"
import AnimationFeedback from "../../../components/AnimationFeedback"
import useDatePickerAppointment from "../../../hooks/useDatePickerAppointment"
import mockAppointments from "../../../data/mockAppointments"
import { generateTimeSlots } from "../../../utils/timeSlotGenerator"
import BackButton from "../../../components/BackButton"
import CustomButton from "../../../components/CustomButton"
import { usePremium } from "../../../hooks/usePremium"

const Appointment = () => {
  const params = useLocalSearchParams()
  const router = useRouter()
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

  const isConfirmButtonEnabled = selectedTimes.length > 0

  // render the time‐selection step
  if (showTimeSelection) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.header}>
          <BackButton onPress={handleBack} />
        </View>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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
          <View style={styles.actionButton}>
            <CustomButton text={"Volver atrás"} onPress={handleBack}/>
          </View>
          <View style={styles.actionButton}>
            <CustomButton
            text="Confirmar TURNO"
            onPress={handleConfirmAppointment}
            disabled={!isConfirmButtonEnabled}
            backgroundColor={Colors.orangeColor}/>
            
            </View>
        </ScrollView>

        <Modal visible={showSuccessAnimation} transparent animationType="fade">
          <View style={styles.animationOverlay}>
            <View style={styles.animationContainer}>
              <AnimationFeedback type="success" />
              <Text style={styles.successTitle}>¡Éxito!</Text>
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
      <ScrollView contentContainerStyleyle={styles.content} showsVerticalScrollIndicator={false}>
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

        <View style={styles.actionButton}>
          <CustomButton text={"Volver atrás"} onPress={handleBack}/>
          </View>
          <View style={styles.actionButton}>
          <CustomButton text={"Confirmar fecha"} onPress={handleDateConfirm} backgroundColor={Colors.orangeColor}/>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
    paddingHorizontal: Metrics.marginS,
    paddingBottom: Metrics.marginL,
  },
  content: {
    flex: 1,
    paddingHorizontal: Metrics.marginS,
  },
  title: {
    fontSize: Metrics.fontM,
    color: Colors.blueColor,
    textAlign: "center",
    marginVertical: Metrics.marginL,
    fontWeight: "500",
    lineHeight: Metrics.marginXS,
  },
  selectedDateContainer: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 15,
    padding: 20,
    marginBottom: Metrics.marginS,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: Metrics.radiusS
  },
  selectedDateLabel: {
    fontSize: Metrics.fontS,
    color: "#666",
    marginBottom: Metrics.marginS,
    fontWeight: "600",
  },
  dateInputStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: Metrics.radiusS,
    padding: Metrics.marginS,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.errorColor
  },
  dateInputText: {
    fontSize: Metrics.fontS,
    color: "#333",
  },
  timeSelectionContainer: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 15,
    padding: 20,
    marginBottom: Metrics.marginS,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: Metrics.radiusS
  },
  timeSlotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Metrics.marginS,
    borderBottomWidth: Metrics.marginXS,
    borderBottomColor: "#f0f0f0",
  },
  timeSlotContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  timeSlotTime: {
    fontSize: Metrics.fontS,
    color: "#333",
  },
  checkbox: {
    width: Metrics.iconMedium,
    height: Metrics.iconMedium,
    borderRadius: Metrics.radiusS,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.orangeColor,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: Colors.orangeColor,
  },
  adContainer: {
    marginVertical: Metrics.marginS,
  },
  animationOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  animationContainer: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    minWidth: Metrics.animationXL,
  },
  successTitle: {
    fontSize: Metrics.radiusS,
    fontWeight: "bold",
    color: "#333",
    marginTop: Metrics.marginS,
    textAlign: "center",
  },
  successMessage: {
    fontSize: Metrics.radiusS,
    color: "#666",
    marginTop: Metrics.marginS,
    textAlign: "center",
    lineHeight: Metrics.marginXS,
  },
    actionButton: {
    alignItems: "center",
    gap: Metrics.marginS,
    marginBottom: Metrics.marginS,
  },
})

export default Appointment
