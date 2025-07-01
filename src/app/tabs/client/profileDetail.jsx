"use client"
import { View, Text, StyleSheet, StatusBar, Platform, Image, ScrollView, TouchableOpacity } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { Colors } from "../../../constants/Colors"
import { Metrics } from "../../../constants/Metrics"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import NavBar from "../../../components/NavBar"
import BackButton from "../../../components/BackButton"
import SlideUpCard from "../../../components/SlideUpCard"

const ProfileDetail = () => {
  const params = useLocalSearchParams()

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Text key={i} style={styles.starFilled}>
            ★
          </Text>,
        )
      } else {
        stars.push(
          <Text key={i} style={styles.starEmpty}>
            ★
          </Text>,
        )
      }
    }
    return stars
  }

  const handleRatingsPress = () => {
    router.push({
      pathname: "/tabs/client/professionalProfile",
      params: {
        profileId: params.profileId,
        professionalName: params.nombre,
      },
    })
  }

  const handleServicesPress = () => {
    router.push({
      pathname: "/tabs/client/professionalServices",
      params: {
        professionalId: params.profileId,
        professionalName: params.nombre,
        profession: params.profesion,
      },
    })
  }

  const handleMessagePress = () => {
    router.push({
      pathname: "/tabs/chat",
      params: {
        professionalId: params.profileId,
        professionalName: params.nombre,
        professionalAvatar: params.avatar,
        profession: params.profesion,
      },
    })
  }

  const handleAppointmentPress = () => {
    router.push({
      pathname: "/tabs/client/appointment",
      params: {
        professionalId: params.profileId,
        professionalName: params.nombre,
        profession: params.profesion,
        availability: params.disponibilidad,
      },
    })
  }

  return (
    <View style={styles.safeArea}>
      <BackButton/>
      <View style={styles.header}>
        <Text style={styles.headerText}>{params.profesion?.toUpperCase()}</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <Image source={{ uri: params.avatar }} style={styles.profileImage} />
      </View>
      <Text style={styles.profileName}>{params.nombre?.toUpperCase()}</Text>

      <SlideUpCard showHeader={false}  style={styles.customCard}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={handleRatingsPress}>
            <View style={styles.ratingSection}>
              <View style={styles.starsContainer}>{renderStars(Number.parseFloat(params.calificaciones))}</View>
              <Text style={styles.ratingText}>(Basado en 95 opiniones)</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>📍</Text>
              <Text style={styles.infoLabel}>Ubicación:</Text>
              <Text style={styles.infoValue}>{params.ubicacion}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>★</Text>
              <Text style={styles.infoLabel}>Calificación promedio:</Text>
              <Text style={styles.infoValue}>{params.calificaciones}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoIcon}>🕒</Text>
              <Text style={styles.infoLabel}>Disponibilidad:</Text>
              <Text style={styles.infoValue}>{params.disponibilidad}</Text>
            </View>
          </View>

          <View style={styles.ratingSection}>
            <View style={styles.reviewSection}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>María López:</Text>
                <View style={styles.reviewStars}>
                  <Text style={styles.starFilledComment}>★★★★</Text>
                </View>
              </View>
              <Text style={styles.reviewText}>"{params.nombre} entendió exactamente lo que quería.</Text>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.5} style={styles.allCommentsButton} onPress={handleRatingsPress}>
            <Text style={styles.allCommentsText}>Ver todos los comentarios +</Text>
          </TouchableOpacity>

          <View style={styles.squareButtonsContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.squareButton} onPress={handleServicesPress}>
              <Text style={styles.squareButtonIcon}>🔧</Text>
              <Text style={styles.squareButtonText}>Servicios</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mainButtonsContainer}>
            <TouchableOpacity activeOpacity={0.7} style={styles.messageButton} onPress={handleMessagePress}>
              <Text style={styles.buttonText}>Enviar mensaje</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.appointmentButton} onPress={handleAppointmentPress}>
              <Text style={styles.buttonText}>Solicitar turno</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SlideUpCard>
      <NavBar />
    </View>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: Colors.blueColor,
    paddingVertical: Metrics.marginXXL,
    paddingHorizontal: Metrics.marginL,
    paddingTop: Metrics.marginS,
    height: Metrics.navBarArea,
  },
  headerText: {
    color: Colors.whiteColor,
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  profileImageContainer: {
    position: "absolute",
    top: Metrics.marginXXL,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  profileImage: {
    width: Metrics.iconXXXLarge,
    height: Metrics.iconXXXLarge,
    borderRadius: Metrics.radiusL,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.whiteColor,
    backgroundColor: Colors.blueColor,
  },
  customCard: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
    paddingTop: Metrics.marginS,
  },
  scrollContent: {
    paddingHorizontal: Metrics.marginS,
    paddingVertical: Metrics.marginS,
  },
  profileName: {
    fontSize: Metrics.fontL,
    fontWeight: "bold",
    color: Colors.whiteColor,
    textAlign: "center",
    letterSpacing: 1,
    marginTop: Metrics.marginXXL,
    marginBottom: Metrics.marginS,
  },
  ratingSection: {
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    paddingVertical: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    marginBottom: Metrics.marginS,
    elevation: 3,
    shadowColor: Colors.textColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: Metrics.radiusS
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: Metrics.marginS,
  },
  starFilled: {
    fontSize: Metrics.fontL,
    color: Colors.orangeColor,
  },
  starFilledComment: {
    fontSize: Metrics.fontS,
    color: Colors.orangeColor,
  },
  starEmpty: {
    fontSize: Metrics.fontL,
    color: "#777",
  },
  ratingText: {
    fontSize: Metrics.fontS,
    color: Colors.text666,
  },
  infoSection: {
    marginBottom: Metrics.marginS,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Metrics.marginS,
  },
  infoIcon: {
    fontSize: Metrics.fontS,
    marginRight: Metrics.marginS,
    color: Colors.orangeColor,
  },
  infoLabel: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    color: "#333",
    marginRight: Metrics.marginS,
  },
  infoValue: {
    fontSize: Metrics.fontS,
    color: Colors.text666,
    flex: 1,
  },
  reviewSection: {
    marginBottom: Metrics.marginS,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Metrics.marginS,
  },
  reviewerName: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    color: "#333",
    marginRight: Metrics.marginS,
  },
  reviewStars: {
    flexDirection: "row",
  },
  reviewText: {
    fontSize: Metrics.fontS,
    color: Colors.text666,
    fontStyle: "italic",
  },
  allCommentsButton: {
    alignItems: "center",
    marginBottom: Metrics.marginS,
  },
  allCommentsText: {
    fontSize: Metrics.fontM,
    color: Colors.blueColor,
    fontWeight: "bold",
  },
  squareButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: Metrics.marginM,
    marginBottom: Metrics.marginM,
  },
  squareButton: {
    backgroundColor: "#fff",
    width: Metrics.iconXXXLarge,
    height: Metrics.iconXXXLarge,
    borderRadius: Metrics.radiusS,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.textColor,
  },
  squareButtonIcon: {
    fontSize: Metrics.iconSmall,
    marginBottom: Metrics.marginS,
  },
  squareButtonText: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    textAlign: "center",
  },
  mainButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  messageButton: {
    backgroundColor: Colors.textColor,
    paddingVertical: Metrics.marginM,
    paddingHorizontal: Metrics.marginM,
    borderRadius: Metrics.radiusS,
    elevation: 3,
    shadowColor: Colors.textColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: Metrics.radiusS,
    justifyContent: "space-between",
  },
  appointmentButton: {
    backgroundColor: Colors.textColor,
    paddingVertical: Metrics.marginM,
    paddingHorizontal: Metrics.marginM,
    borderRadius: Metrics.radiusS,
    elevation: 3,
    shadowColor: Colors.textColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: Metrics.radiusS,
    justifyContent: "space-between",
  },
  buttonText: {
    color: Colors.whiteColor,
    fontSize: Metrics.fontS,
    fontWeight: "bold",
  },
})

export default ProfileDetail
