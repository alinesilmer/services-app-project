"use client"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Alert } from "react-native"
import { Feather } from "@expo/vector-icons"
import { Colors } from "../constants/Colors"
import { Metrics } from "../constants/Metrics"
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

  useEffect(() => {
    if (appointment?.professionalId) {
      const timeSlots = generateTimeSlots(appointment.professionalId)
      setAvailableTimes(timeSlots)
    }
  }, [appointment?.professionalId])

  useEffect(() => {
    if (visible && appointment && availableTimes.length > 0) {

      const appointmentDate = new Date(appointment.date)
      setSelectedDate(appointmentDate)

      const currentTimeSlot = availableTimes.find((slot) => slot.time === appointment.time)
      if (currentTimeSlot) {
        setSelectedTimes([currentTimeSlot.id])
      }
      setHasChanges(false)
    }
  }, [visible, appointment?.id, availableTimes])

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
          <View style={styles.header}>
            <Text style={styles.title}>Modificar Turno</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={handleClose}>
              <Feather name="x" size={Metrics.iconSmall} color={Colors.text666} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.professionalInfo}>
              <Text style={styles.professionalInfoText}>
                Profesional: <Text style={styles.professionalName}>{appointment.professionalName}</Text>
              </Text>
              <Text style={styles.professionalInfoText}>
                Servicio: <Text style={styles.professionText}>{appointment.profession}</Text>
              </Text>
            </View>

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

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Nuevo Horario</Text>
              <View style={styles.currentInfo}>
                <Text style={styles.currentLabel}>Horario actual:</Text>
                <Text style={styles.currentValue}>{appointment.time}h</Text>
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
                      <Text style={styles.timeSlotTime}>{timeSlot.time}</Text>
                    </View>
                    <View style={[styles.checkbox, selectedTimes.includes(timeSlot.id) && styles.checkboxSelected]}>
                      {selectedTimes.includes(timeSlot.id) && <Feather name="check" size={16} color={Colors.light.background} />}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {hasChanges && (
              <View style={styles.changesIndicator}>
                <Feather name="info" size={Metrics.iconSmall} color="#fff" />
                <Text style={styles.changesText}>Tienes cambios sin guardar</Text>
              </View>
            )}

            <View style={styles.bottomSpacer} />
          </ScrollView>

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

          <Modal visible={showSuccessAnimation} transparent={true} animationType="fade">
            <View style={styles.animationOverlay}>
              <View style={styles.animationContainer}>
                <AnimationFeedback type="success" />
                <Text style={styles.successTitle}>¡Turno Modificado!</Text>
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
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Metrics.radiusM,
    borderTopRightRadius: Metrics.radiusM,
    height: Metrics.screenS,
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Metrics.marginS,
    borderBottomWidth: Metrics.marginXS,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    marginTop: Metrics.marginM,
    marginLeft: Metrics.marginS,
    fontSize: Metrics.fontL,
    fontWeight: "bold",
    color: Colors.orangeColor,
  },
  content: {
    flex: 1,
    paddingHorizontal: Metrics.marginS,
  },
  professionalInfo: {
    backgroundColor: "#f8f9fa",
    borderRadius: Metrics.radiusS,
    padding: Metrics.marginS,
    marginVertical: Metrics.marginS,
  },
  professionalInfoText: {
    fontSize: Metrics.fontS,
    color: Colors.text666,
    marginBottom: Metrics.marginS,
  },
  professionalName: {
    fontWeight: "bold",
    color: Colors.blueColor,
  },
  professionText: {
    fontWeight: "bold",
    color: Colors.text333,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    color: Colors.text333,
    marginBottom: Metrics.marginS,
  },
  currentInfo: {
    backgroundColor: "#e9ecef",
    borderRadius: Metrics.radiusS,
    padding: Metrics.marginS,
    marginBottom: Metrics.marginS,
  },
  currentLabel: {
    fontSize: Metrics.fontS,
    color: Colors.text666,
    marginBottom: Metrics.marginXS,
  },
  currentValue: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    color: Colors.text333,
  },
  timeSelection: {
    backgroundColor: "#f8f9fa",
    borderRadius: Metrics.radiusS,
    padding: Metrics.marginS,
  },
  timeSlotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Metrics.marginXS,
    borderBottomWidth: Metrics.marginXS,
    borderBottomColor: "#e9ecef",
  },
  timeSlotContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  timeSlotLabel: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    color: Colors.orangeColor,
    marginRight: Metrics.marginS,
    width: 30,
  },
  timeSlotTime: {
    fontSize: Metrics.fontS,
    color: Colors.text333,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: Metrics.radiusS,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.orangeColor,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: Colors.orangeColor,
  },
  changesIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.orangeColor,
    borderRadius: Metrics.radiusS,
    padding: Metrics.marginS,
    marginVertical: Metrics.marginS,
  },
  changesText: {
    fontSize: Metrics.fontS,
    color: "#fff",
    marginLeft: Metrics.marginS,
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
    backgroundColor: Colors.whiteColor,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.textColor,
    borderRadius: Metrics.radiusS,
    paddingVertical: Metrics.marginS,
    alignItems: "center",
  },
  cancelButtonText: {
    color: Colors.whiteColor,
    fontSize: Metrics.fontS,
    fontWeight: "bold",
  },
  saveButton: {
    flex: 1,
    backgroundColor: Colors.orangeColor,
    borderRadius: Metrics.radiusS,
    paddingVertical: Metrics.marginS,
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#e9ecef",
  },
  saveButtonText: {
    color: Colors.whiteColor,
    fontSize: Metrics.fontS,
    fontWeight: "bold",
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
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
  },
  successTitle: {
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    color: Colors.text333,
    marginTop: Metrics.marginS,
    textAlign: "center",
  },
})

export default ModifyAppointmentModal
