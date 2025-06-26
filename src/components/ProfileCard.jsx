import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import { Colors } from "../constants/Colors"
import { Metrics } from "../constants/Metrics"

const ProfileCard = ({ profile, onPress }) => {
  return (
    <TouchableOpacity style={styles.profileCard} activeOpacity={0.8} onPress={() => onPress(profile)}>
      <Image source={{ uri: profile.avatar }} style={styles.profileImage} />
      <Text style={styles.profileName}>{profile.nombre}</Text>
      <Text style={styles.profileService}>{profile.profesion}</Text>
      <Text style={styles.profileCategory}>{profile.categoria}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>★  <Text style={styles.profileCategory}>{profile.calificaciones}</Text></Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  profileCard: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: Metrics.radiusS,
    padding: Metrics.marginS,
    width: "45%",
    marginBottom: Metrics.marginXS,
  },
  profileImage: {
    width: Metrics.iconXLarge,
    height: Metrics.iconXLarge,
    borderRadius: Metrics.radiusS,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.whiteColor,
    marginBottom: Metrics.marginS,
  },
  profileName: {
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    color: Colors.whiteColor,
    textAlign: "center",
    marginBottom: Metrics.marginXS,
  },
  profileService: {
    fontSize: Metrics.fontS,
    color: Colors.orangeColor,
    textAlign: "center",
  },
  profileCategory: {
    fontSize: Metrics.fontXS,
    color: Colors.whiteColor,
    textAlign: "center",
    opacity: 0.8,
    marginBottom: Metrics.marginXS,
  },
  ratingContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: Metrics.radiusS,
    paddingHorizontal: Metrics.marginS,
    paddingVertical: Metrics.marginS,
  },
  rating: {
    fontSize: Metrics.fontXS,
    color: Colors.starColor,
    fontWeight: "bold",
  },
})

export default ProfileCard
