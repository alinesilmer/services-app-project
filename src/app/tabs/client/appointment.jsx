import { View, Text, StyleSheet } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { Colors } from "../../../constants/Colors"

const Appointment = () => {
  const params = useLocalSearchParams()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitar Turno</Text>
      <Text style={styles.subtitle}>
        Profesional: {params.professionalName} - {params.profession}
      </Text>
      <Text style={styles.info}>Disponibilidad: {params.availability}</Text>
      <Text style={styles.placeholder}>Pantalla de solicitud de turno - En desarrollo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.blueColor,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666",
  },
  info: {
    fontSize: 14,
    marginBottom: 20,
    color: "#888",
  },
  placeholder: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
})

export default Appointment
