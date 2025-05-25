import { View, Text, StyleSheet } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { Colors } from "../../../constants/Colors"

const Ratings = () => {
  const params = useLocalSearchParams()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calificaciones</Text>
      <Text style={styles.subtitle}>Profesional: {params.professionalName}</Text>
      <Text style={styles.placeholder}>Pantalla de calificaciones - En desarrollo</Text>
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
    marginBottom: 20,
    color: "#666",
  },
  placeholder: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
})

export default Ratings
