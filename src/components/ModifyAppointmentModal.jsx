"use client"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Alert } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { Colors } from "../constants/Colors"
import DatePickerAppointment from "./DatePickerAppointment"
import AnimationFeedback from "./AnimationFeedback"
import { generateTimeSlots } from "../utils/timeSlotGenerator"

const ModifyAppointmentModal = ({ visible, appointment, onClose, onSave }) => {

  const [selectedDate, setSelectedDate] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedTimes, setSelectedTimes] = useState([])
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [availableTimes, setAvailableTimes] = useState([])

  // Generar horarios dinámicamente basándose en el profesional del appointment
  useEffect(() => {
    if (appointment?.professionalId) {
      const timeSlots = generateTimeSlots(appointment.professionalId)
      setAvailableTimes(timeSlots)
    }
  }, [appointment?.professionalId])

  // Inicializar valores cuando se abre el modal
  useEffect(() => {
    if (visible && appointment && availableTimes.length > 0) {

      // Inicializar la fecha con la fecha actual del turno
      const appointmentDate = new Date(appointment.date)
      setSelectedDate(appointmentDate)

      // Encontrar el horario actual
      const currentTimeSlot = availableTimes.find((slot) => slot.time === appointment.time)
      if (currentTimeSlot) {
        setSelectedTimes([currentTimeSlot.id])
      }
      setHasChanges(false)
    }
  }, [visible, appointment?.id, availableTimes])

  // Detectar cambios
  useEffect(() => {
    if (appointment && selectedDate && availableTimes.length > 0) {
      const originalDate = new Date(appointment.date).toDateString()
      const newDate = selectedDate.toDateString()
      const originalTime = availableTimes.find((slot) => slot.time === appointment.time)?.id
      const newTime = selectedTimes[0]

      const dateChanged = originalDate !== newDate
      const timeChanged = originalTime !== newTime

      setHasChanges(dateChanged || timeChanged)
    }
  }, [selectedDate, selectedTimes, appointment?.id, availableTimes])

  const validateFutureDate = (selectedDate) => {
    const today = new Date()
    today.setHours(23, 59, 59, 999)

    const selected = new Date(selectedDate)
    selected.setHours(0, 0, 0, 0)

    return selected > today
  }

  const getMinimumDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
  }

  const handleDateChange = (event, newDate) => {
    setShowDatePicker(false)
    if (newDate) {
      setSelectedDate(newDate)
    }
  }

  const openDatePicker = () => {
    setShowDatePicker(true)
  }

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

  const toggleTimeSelection = (timeId) => {
    setSelectedTimes([timeId])
  }

  const handleSave = () => {
    if (!selectedDate) {
      Alert.alert("Error", "Por favor selecciona una fecha")
      return
    }

    if (!validateFutureDate(selectedDate)) {
      Alert.alert("Error", "Por favor selecciona una fecha futura")
      return
    }

    if (selectedTimes.length === 0) {
      Alert.alert("Error", "Por favor selecciona un horario")
      return
    }

    if (!hasChanges) {
      Alert.alert("Sin cambios", "No has realizado ningún cambio")
      return
    }

    setShowSuccessAnimation(true)

    setTimeout(() => {
      const timeSlot = availableTimes.find((t) => t.id === selectedTimes[0])
      const updatedAppointment = {
        ...appointment,
        date: selectedDate,
        time: timeSlot.time,
        timeLabel: timeSlot.label,
      }

      onSave(updatedAppointment)
      setShowSuccessAnimation(false)
      onClose()
    }, 1400)
  }

  const handleClose = () => {
    if (hasChanges) {
      Alert.alert("Descartar cambios", "¿Estás seguro que deseas descartar los cambios?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Descartar", style: "destructive", onPress: onClose },
      ])
    } else {
      onClose()
    }
  }

  if (!appointment) return null

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Modificar Turno</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={handleClose}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Información del profesional */}
            <View style={styles.professionalInfo}>
              <Text style={styles.professionalInfoText}>
                Profesional: <Text style={styles.professionalName}>{appointment.professionalName}</Text>
              </Text>
              <Text style={styles.professionalInfoText}>
                Servicio: <Text style={styles.professionText}>{appointment.profession}</Text>
              </Text>
            </View>

            {/* Selector de fecha */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Nueva Fecha</Text>
              <View style={styles.currentInfo}>
                <Text style={styles.currentLabel}>Fecha actual:</Text>
                <Text style={styles.currentValue}>{formatDate(new Date(appointment.date))}</Text>
              </View>

              <DatePickerAppointment
                label="Seleccionar nueva fecha"
                value={selectedDate}
                onChange={handleDateChange}
                show={showDatePicker}
                onPress={openDatePicker}
                minimumDate={getMinimumDate()}
              />
            </View>

            {/* Selector de horario */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Nuevo Horario</Text>
              <View style={styles.currentInfo}>
                <Text style={styles.currentLabel}>Horario actual:</Text>
                <Text style={styles.currentValue}>{appointment.time} h</Text>
              </View>

              <View style={styles.timeSelection}>
                {availableTimes.map((timeSlot) => (
                  <TouchableOpacity
                  activeOpacity={0.7}
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
            </View>

            {/* Indicador de cambios */}
            {hasChanges && (
              <View style={styles.changesIndicator}>
                <MaterialIcons name="info" size={20} color="#ff9800" />
                <Text style={styles.changesText}>Tienes cambios sin guardar</Text>
              </View>
            )}

            {/* Espacio adicional para evitar que el contenido se oculte detrás de los botones */}
            <View style={styles.bottomSpacer} />
          </ScrollView>

          {/* Botones de acción */}
          <View style={styles.actions}>
            <TouchableOpacity activeOpacity={0.7} style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
            activeOpacity={0.7}
              style={[styles.saveButton, !hasChanges && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={!hasChanges}
            >
              <Text style={[styles.saveButtonText, !hasChanges && styles.saveButtonTextDisabled]}>Guardar Cambios</Text>
            </TouchableOpacity>
          </View>

          {/* Modal con animación de éxito */}
          <Modal visible={showSuccessAnimation} transparent={true} animationType="fade">
            <View style={styles.animationOverlay}>
              <View style={styles.animationContainer}>
                <AnimationFeedback type="success" />
                <Text style={styles.successTitle}>¡Turno Modificado!</Text>
                <Text style={styles.successMessage}>Los cambios se han guardado exitosamente</Text>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: hp("85%"),
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: wp("5.5%"),
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  professionalInfo: {
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    padding: 15,
    marginVertical: 15,
  },
  professionalInfoText: {
    fontSize: wp("3.8%"),
    color: "#666",
    marginBottom: 5,
  },
  professionalName: {
    fontWeight: "bold",
    color: Colors.blueColor,
  },
  professionText: {
    fontWeight: "600",
    color: "#333",
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  currentInfo: {
    backgroundColor: "#e9ecef",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  currentLabel: {
    fontSize: wp("3.5%"),
    color: "#666",
    marginBottom: 3,
  },
  currentValue: {
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#333",
  },
  timeSelection: {
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    padding: 15,
  },
  timeSlotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
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
  changesIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3cd",
    borderRadius: 10,
    padding: 12,
    marginVertical: 15,
  },
  changesText: {
    fontSize: wp("3.8%"),
    color: "#856404",
    marginLeft: 8,
    fontWeight: "500",
  },
  bottomSpacer: {
    height: 100,
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 30,
    gap: 15,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#6c757d",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: wp("4%"),
    fontWeight: "600",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#28a745",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#e9ecef",
  },
  saveButtonText: {
    color: "white",
    fontSize: wp("4%"),
    fontWeight: "600",
  },
  saveButtonTextDisabled: {
    color: "#6c757d",
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

export default ModifyAppointmentModal
