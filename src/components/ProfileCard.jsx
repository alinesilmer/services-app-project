import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { Colors } from "../constants/Colors"

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
    borderRadius: 15,
    padding: 15,
    width: wp("40%"),
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 0.5,
    borderColor: Colors.whiteColor,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.whiteColor,
    textAlign: "center",
    marginBottom: 5,
  },
  profileService: {
    fontSize: 12,
    color: Colors.orangeColor,
    textAlign: "center",
  },
  profileCategory: {
    fontSize: 11,
    color: Colors.whiteColor,
    textAlign: "center",
    opacity: 0.8,
    marginBottom: 5,
  },
  ratingContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  rating: {
    fontSize: 12,
    color: Colors.starColor,
    fontWeight: "bold",
  },
})

export default ProfileCard
