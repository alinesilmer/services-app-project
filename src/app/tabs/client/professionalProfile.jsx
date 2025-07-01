"use client";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { useState, useCallback } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { Metrics } from "../../../constants/Metrics";
import { Feather, MaterialIcons } from "@expo/vector-icons";
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

  const renderStars = (rating, size = Metrics.iconSmall) => {
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
            size={Metrics.iconSmall}
            color="#4CAF50"
            style={styles.verifiedIcon}
          />
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {renderStars(profile.calificaciones, Metrics.iconSmall)}
          </View>
          <Text style={styles.ratingText}>{profile.calificaciones}</Text>
        </View>

        <Text style={styles.description}>{profile.descripcion}</Text>

        <TouchableOpacity
        activeOpacity={0.7}
          style={styles.addCommentButton}
          onPress={handleAddComment}
        >
          <Feather name="plus" size={Metrics.iconSmall} color={Colors.text666} />
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
                  {renderStars(Number.parseFloat(opinion.puntaje), Metrics.iconSmall)}
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
    alignItems: "center",
    justifyContent: "center",
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: Metrics.marginS,
    marginTop: Metrics.marginS,
  },
  profileImage: {
    width: Metrics.iconMedium,
    height: Metrics.iconMedium,
    borderRadius: Metrics.radiusS,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.whiteColor,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    paddingTop: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Metrics.marginS,
  },
  profileName: {
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    color: Colors.textColor,
    marginRight: Metrics.marginS,
  },
  verifiedIcon: {
    marginLeft: Metrics.marginS,
  },
  ratingContainer: {
    alignItems: "center",
    marginBottom: Metrics.marginS,
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    paddingVertical: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
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
  ratingText: {
    fontSize: Metrics.fontS,
    color: Colors.textColor,
    fontWeight: "bold",
  },
  description: {
    fontSize: Metrics.fontS,
    color: Colors.textColor,
    textAlign: "center",
    lineHeight: Metrics.marginXS,
    marginBottom: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
  },
  addCommentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.disabledColor,
    paddingVertical: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    marginBottom: Metrics.marginS,
    alignSelf: "center",
  },
  addCommentText: {
    fontSize: Metrics.fontS,
    color: Colors.textColor,
    marginLeft: Metrics.marginS,
    fontWeight: "500",
  },
  opinionsContainer: {
    marginBottom: Metrics.marginS,
  },
  opinionsTitle: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    color: "#333",
    marginBottom: Metrics.marginS,
  },
  newBadge: {
    color: Colors.orangeColor,
    fontSize: Metrics.fontS,
  },
  opinionCard: {
    backgroundColor: "#e9e9e9",
    borderRadius: Metrics.radiusS,
    padding: Metrics.marginS,
    marginBottom: Metrics.marginS,
    position: "relative",
  },
  newOpinionCard: {
    backgroundColor: "#E8F5E8",
    borderLeftWidth: Metrics.marginXS,
    borderLeftColor: "#4CAF50",
  },
  newIndicator: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: Metrics.radiusS,
    backgroundColor: Colors.orangeColor,
  },
  opinionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Metrics.marginS,
  },
  opinionUserInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  opinionAvatar: {
    width: Metrics.iconLarge,
    height: Metrics.iconLarge,
    borderRadius: Metrics.radiusM,
    backgroundColor: Colors.blueColor,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Metrics.marginS,
  },
  opinionAvatarText: {
    color: Colors.whiteColor,
    fontSize: Metrics.fontS,
    fontWeight: "bold",
  },
  opinionUserName: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    color: "#",
  },
  newText: {
    color: Colors.orangeColor,
    fontSize: Metrics.fontS,
  },
  opinionStars: {
    flexDirection: "row",
  },
  opinionText: {
    fontSize: Metrics.fontS,
    color: "#333",
    marginLeft: Metrics.marginS,
    fontStyle: "italic",
  },
  noOpinionsContainer: {
    alignItems: "center",
    paddingVertical: Metrics.marginS,
  },
  noOpinionsText: {
    fontSize: Metrics.fontS,
    color: Colors.text666,
    marginBottom: Metrics.marginS,
  },
  noOpinionsSubtext: {
    fontSize: Metrics.fontS,
    color: "#999",
  },
});

export default ProfessionalProfile;
