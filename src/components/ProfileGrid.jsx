import { View, Text, StyleSheet } from "react-native"
import { Colors } from "../constants/Colors"
import { Metrics } from "../constants/Metrics"
import ProfileCard from "./ProfileCard"

const ProfileGrid = ({ profiles, onProfilePress, selectedService, selectedSubcategories }) => {
  return (
    <View style={styles.profilesContainer}>
      <Text style={styles.profilesLabel}>Profesionales disponibles: {profiles.length}</Text>

      <View style={styles.profilesGrid}>
        {profiles.map((prof) => (
          <ProfileCard key={prof.id} profile={prof} onPress={onProfilePress} />
        ))}
      </View>

      {/* Mensaje cuando no hay profesionales disponibles */}
      {selectedService && profiles.length === 0 && (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>
            {selectedSubcategories.length > 0
              ? `No hay profesionales disponibles para las categorías seleccionadas en ${selectedService.label}`
              : `No hay profesionales disponibles para ${selectedService.label}`}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  profilesContainer: {
    marginTop: Metrics.marginM,
    paddingHorizontal: Metrics.marginM,
  },
  profilesLabel: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    color: Colors.whiteColor,
    marginBottom: Metrics.marginM,
    textAlign: "center",
  },
  profilesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: Metrics.marginS,
  },
  noResultsContainer: {
    alignItems: "center",
    marginTop: Metrics.marginM,
    padding: Metrics.marginS,
  },
  noResultsText: {
    fontSize: Metrics.fontS,
    color: Colors.whiteColor,
    textAlign: "center",
    fontStyle: "italic",
  },
})

export default ProfileGrid
