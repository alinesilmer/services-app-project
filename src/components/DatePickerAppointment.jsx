
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Feather } from "@expo/vector-icons"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

const DatePickerAppointment = ({ label = "Seleccionar fecha", value, onChange, show, onPress, minimumDate, style }) => {
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

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity activeOpacity={0.7} style={styles.dateButton} onPress={onPress}>
        <View style={styles.dateButtonContent}>
          <View style={styles.dateInfo}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.dateText}>{value ? formatDate(value) : "Seleccionar fecha"}</Text>
          </View>
          <Feather name="calendar" size={24} color="#1a2f68" />
        </View>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
          minimumDate={minimumDate}
          locale="es-ES"
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  dateButton: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    padding: 15,
  },
  dateButtonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateInfo: {
    flex: 1,
  },
  label: {
    fontSize: wp("3.5%"),
    color: "#666",
    marginBottom: 5,
    fontWeight: "500",
  },
  dateText: {
    fontSize: wp("4%"),
    color: "#333",
    fontWeight: "600",
  },
})

export default DatePickerAppointment
