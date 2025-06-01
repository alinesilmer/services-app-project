import { View, Text, StyleSheet } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { Colors } from "../constants/Colors"
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
    marginTop: 20,
    paddingHorizontal: wp("5%"),
  },
  profilesLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.whiteColor,
    marginBottom: 15,
    textAlign: "center",
  },
  profilesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 15,
  },
  noResultsContainer: {
    alignItems: "center",
    marginTop: 30,
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: Colors.whiteColor,
    textAlign: "center",
    fontStyle: "italic",
  },
})

export default ProfileGrid
