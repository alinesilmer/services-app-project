"use client";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Colors } from "../../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { SlideInDown } from "react-native-reanimated";
import NavBar from "../../../components/NavBar";
import BackButton from "../../../components/BackButton";

const ProfileDetail = () => {
  const params = useLocalSearchParams();

  // Función para renderizar las estrellas
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Text key={i} style={styles.starFilled}>
            ★
          </Text>
        );
      } else {
        stars.push(
          <Text key={i} style={styles.starEmpty}>
            ★
          </Text>
        );
      }
    }
    return stars;
  };

  // Funciones de navegación
  const handleRatingsPress = () => {
    router.push({
      pathname: "/tabs/client/professionalProfile",
      params: {
        profileId: params.profileId,
        professionalName: params.nombre,
      },
    });
  };

  const handleCommentsPress = () => {
    router.push({
      pathname: "/tabs/client/professionalProfile",
      params: {
        profileId: params.profileId,
        professionalName: params.nombre,
      },
    });
  };

  const handleServicesPress = () => {
    router.push({
      pathname: "/tabs/client/professional-services",
      params: {
        professionalId: params.profileId,
        professionalName: params.nombre,
        profession: params.profesion,
      },
    });
  };

  const handleGalleryPress = () => {
    router.push({
      pathname: "/tabs/client/gallery",
      params: {
        professionalId: params.profileId,
        professionalName: params.nombre,
      },
    });
  };

  const handleMessagePress = () => {
    router.push({
      pathname: "/tabs/chat",
      params: {
        professionalId: params.profileId,
        professionalName: params.nombre,
        professionalAvatar: params.avatar,
        profession: params.profesion,
      },
    });
  };

  const handleAppointmentPress = () => {
    router.push({
      pathname: "/tabs/client/appointment",
      params: {
        professionalId: params.profileId,
        professionalName: params.nombre,
        profession: params.profesion,
        availability: params.disponibilidad,
      },
    });
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
      <BackButton/>
        <Text style={styles.headerText}>{params.profesion?.toUpperCase()}</Text>
      </View>

      <View style={styles.profileImageContainer}>
        <Image source={{ uri: params.avatar }} style={styles.profileImage} />
      </View>
      <Text style={styles.profileName}>{params.nombre?.toUpperCase()}</Text>

      <Animated.View
        entering={SlideInDown.duration(700)}
        style={styles.whiteContainer}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={handleRatingsPress}>
            <View style={styles.ratingSection}>
              <View style={styles.starsContainer}>
                {renderStars(Number.parseFloat(params.calificaciones))}
              </View>
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
              <Text style={styles.reviewText}>
                "{params.nombre} entendió exactamente lo que quería.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.allCommentsButton}
            onPress={handleCommentsPress}
          >
            <Text style={styles.allCommentsText}>
              Ver todos los comentarios +
            </Text>
          </TouchableOpacity>

          <View style={styles.squareButtonsContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.squareButton}
              onPress={handleServicesPress}
            >
              <Text style={styles.squareButtonIcon}>🔧</Text>
              <Text style={styles.squareButtonText}>Servicios</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mainButtonsContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.messageButton}
              onPress={handleMessagePress}
            >
              <Text style={styles.buttonText}>Enviar mensaje</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.appointmentButton}
              onPress={handleAppointmentPress}
            >
              <Text style={styles.buttonText}>Solicitar turno</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: Colors.blueColor,
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("5%"),
    paddingTop: hp("2%"),
    height: hp("15%"),
  },
  headerText: {
    color: Colors.whiteColor,
    fontSize: wp("6%"),
    fontWeight: "bold",
    letterSpacing: 1,
  },
  profileImageContainer: {
    position: "absolute",
    top: hp("12%"),
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  profileImage: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("17.5%"),
    borderWidth: 1,
    borderColor: Colors.whiteColor,
    backgroundColor: Colors.blueColor,
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: hp("3%"),
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingTop: hp("1.2%"),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp("5%"),
    paddingVertical: wp("2%"),
  },
  profileName: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: Colors.whiteColor,
    textAlign: "center",
    letterSpacing: 1,
    marginTop: hp("4%"),
  },
  ratingSection: {
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    paddingVertical: hp("0.2%"),
    borderRadius: 40,
    marginBottom: hp("2%"),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: hp("1%"),
  },
  starFilled: {
    fontSize: wp("6%"),
    color: Colors.orangeColor,
  },
  starFilledComment: {
    fontSize: wp("4"),
    color: Colors.orangeColor,
  },
  starEmpty: {
    fontSize: wp("6%"),
    color: "#777",
  },
  ratingText: {
    fontSize: wp("2.4"),
    color: "#666",
  },
  infoSection: {
    marginBottom: hp("%"),
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },
  infoIcon: {
    fontSize: wp("4%"),
    marginRight: wp("2%"),
    color: Colors.orangeColor,
  },
  infoLabel: {
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#333",
    marginRight: wp("2%"),
  },
  infoValue: {
    fontSize: wp("3.2%"),
    color: "#666",
    flex: 1,
  },
  reviewSection: {
    marginBottom: hp("1%"),
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("0.5%"),
  },
  reviewerName: {
    fontSize: wp("3%"),
    fontWeight: "bold",
    color: "#333",
    marginRight: wp("2%"),
  },
  reviewStars: {
    flexDirection: "row",
  },
  reviewText: {
    fontSize: wp("3%"),
    color: "#666",
    fontStyle: "italic",
    lineHeight: wp("5%"),
  },
  allCommentsButton: {
    alignItems: "center",
    marginBottom: hp("3%"),
  },
  allCommentsText: {
    fontSize: wp("4%"),
    color: Colors.blueColor,
    fontWeight: "600",
  },
  squareButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: wp("5%"),
    marginBottom: hp("2%"),
  },
  squareButton: {
    backgroundColor: "#fff",
    width: wp("25%"),
    height: wp("25%"),
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    borderWidth: 1,
    borderColor: "black",
  },
  squareButtonIcon: {
    fontSize: wp("6%"),
    marginBottom: hp("0.5%"),
  },
  squareButtonText: {
    fontSize: wp("3%"),
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  mainButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  messageButton: {
    backgroundColor: "#000",
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("8%"),
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  appointmentButton: {
    backgroundColor: "#000",
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("8%"),
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: Colors.whiteColor,
    fontSize: wp("4%"),
    fontWeight: "600",
  },
});

export default ProfileDetail;
