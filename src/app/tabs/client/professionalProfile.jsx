"use client";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useState, useCallback } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { Colors } from "../../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import profiles from "../../../data/mockProfiles";
import opinions from "../../../data/mockOpinions";
import BackButton from "../../../components/BackButton"

const ProfessionalProfile = () => {
  const params = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const [currentOpinions, setCurrentOpinions] = useState([]);

  const profile = profiles.find(
    (p) => p.id === Number.parseInt(params.profileId)
  );

  const loadOpinions = useCallback(() => {
    const profileOpinions = opinions.filter(
      (op) => op.idProfesional === Number.parseInt(params.profileId)
    );
    setCurrentOpinions(profileOpinions);
  }, [params.profileId]);

  useFocusEffect(
    useCallback(() => {
      loadOpinions();
    }, [loadOpinions])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadOpinions();
    setTimeout(() => setRefreshing(false), 1000);
  }, [loadOpinions]);

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Perfil no encontrado</Text>
      </View>
    );
  }

  const renderStars = (rating, size = wp("4%")) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <MaterialIcons
            key={i}
            name="star"
            size={size}
            color={Colors.orangeColor}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <MaterialIcons
            key={i}
            name="star-half"
            size={size}
            color={Colors.orangeColor}
          />
        );
      } else {
        stars.push(
          <MaterialIcons
            key={i}
            name="star-border"
            size={size}
            color="#E0E0E0"
          />
        );
      }
    }
    return stars;
  };


  const handleAddComment = () => {
    router.push({
      pathname: "/tabs/client/addComment",
      params: {
        profileId: profile.id,
        professionalName: profile.nombre,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: profile.avatar }} style={styles.profileImage} />
      </View>

      <BackButton/>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.nameContainer}>
          <Text style={styles.profileName}>{profile.nombre}</Text>
          <MaterialIcons
            name="verified"
            size={24}
            color="#4CAF50"
            style={styles.verifiedIcon}
          />
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {renderStars(profile.calificaciones, wp("6%"))}
          </View>
          <Text style={styles.ratingText}>{profile.calificaciones}</Text>
        </View>

        <Text style={styles.description}>{profile.descripcion}</Text>

        <TouchableOpacity
        activeOpacity={0.7}
          style={styles.addCommentButton}
          onPress={handleAddComment}
        >
          <MaterialIcons name="add-comment" size={20} color="#666" />
          <Text style={styles.addCommentText}>Agregar comentario</Text>
        </TouchableOpacity>

        <View style={styles.opinionsContainer}>
          <Text style={styles.opinionsTitle}>
            Comentarios ({currentOpinions.length})
            {currentOpinions.some((op) => op.isNew) && (
              <Text style={styles.newBadge}> • Nuevo</Text>
            )}
          </Text>

          {currentOpinions.map((opinion) => (
            <View
              key={opinion.id}
              style={[
                styles.opinionCard,
                opinion.isNew && styles.newOpinionCard,
              ]}
            >
              {opinion.isNew && <View style={styles.newIndicator} />}
              <View style={styles.opinionHeader}>
                <View style={styles.opinionUserInfo}>
                  <View style={styles.opinionAvatar}>
                    <Text style={styles.opinionAvatarText}>
                      {opinion.nombre.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.opinionUserName}>
                    {opinion.nombre}
                    {opinion.isNew && (
                      <Text style={styles.newText}> (Nuevo)</Text>
                    )}
                  </Text>
                </View>
                <View style={styles.opinionStars}>
                  {renderStars(Number.parseFloat(opinion.puntaje), wp("3.5%"))}
                </View>
              </View>
              <Text style={styles.opinionText}>{opinion.opinion}</Text>
            </View>
          ))}

          {currentOpinions.length === 0 && (
            <View style={styles.noOpinionsContainer}>
              <Text style={styles.noOpinionsText}>
                Aún no hay comentarios para este profesional
              </Text>
              <Text style={styles.noOpinionsSubtext}>
                ¡Sé el primero en dejar una reseña!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: hp("2%"),
    marginTop: hp("6%"),
  },
  profileImage: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: wp("16%"),
    borderWidth: 4,
    borderColor: "white",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: hp("1%"),
    paddingHorizontal: wp("2%"),
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("1%"),
  },
  profileName: {
    fontSize: wp("9%"),
    fontWeight: "bold",
    color: "#000",
    marginRight: 8,
  },
  verifiedIcon: {
    marginLeft: 5,
  },
  ratingContainer: {
    alignItems: "center",
    marginBottom: hp("3%"),
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    paddingVertical: hp("0.2%"),
    borderRadius: 10,
    marginBottom: hp("1%"),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ratingText: {
    fontSize: wp("4%"),
    color: "#000",
    fontWeight: "600",
  },
  description: {
    fontSize: wp("4%"),
    color: "#000",
    textAlign: "center",
    lineHeight: wp("5.5%"),
    marginBottom: hp("3%"),
    paddingHorizontal: wp("2%"),
  },
  addCommentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: hp("3%"),
    alignSelf: "center",
  },
  addCommentText: {
    fontSize: wp("3.5%"),
    color: "#000",
    marginLeft: 8,
    fontWeight: "500",
  },
  opinionsContainer: {
    marginBottom: hp("3%"),
  },
  opinionsTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  newBadge: {
    color: "#4CAF50",
    fontSize: wp("3.5%"),
  },
  opinionCard: {
    backgroundColor: "#e9e9e9",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    position: "relative",
  },
  newOpinionCard: {
    backgroundColor: "#E8F5E8",
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  newIndicator: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
  },
  opinionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
  },
  opinionUserInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  opinionAvatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: Colors.blueColor,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  opinionAvatarText: {
    color: "white",
    fontSize: wp("5%"),
    fontWeight: "bold",
  },
  opinionUserName: {
    fontSize: wp("3.5%"),
    fontWeight: "600",
    color: "#",
  },
  newText: {
    color: "#4CAF50",
    fontSize: wp("3%"),
  },
  opinionStars: {
    flexDirection: "row",
  },
  opinionText: {
    fontSize: wp("3%"),
    color: "#333",
    lineHeight: wp("5%"),
    marginLeft: wp("14%"),
    fontStyle: "italic",
  },
  noOpinionsContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  noOpinionsText: {
    fontSize: wp("4%"),
    color: "#666",
    marginBottom: 5,
  },
  noOpinionsSubtext: {
    fontSize: wp("3.5%"),
    color: "#999",
  },
});

export default ProfessionalProfile;
