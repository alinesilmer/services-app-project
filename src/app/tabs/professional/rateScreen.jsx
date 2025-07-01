"use client";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useLocalSearchParams, } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { Metrics } from "../../../constants/Metrics";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import opinions from "../../../data/mockOpinions";
import BackButton from "../../../components/BackButton";
import ProfilePic from '../../../components/ProfilePic';
import { getUserProfile, saveUserProfile } from "../../../utils/storage";
import Rate from '../../../components/Rate';
import CustomInput from '../../../components/CustomInput';
import NavBar from "../../../components/NavBar";

export default function ProfessionalRate() {
  const [userProfile, setUserProfile] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [currentOpinions, setCurrentOpinions] = useState([]);
  const [editingDescription, setEditingDescription] = useState(false);
  const [description, setDescription] = useState("Pulse el ícono del lápiz para agregar una Descripción sobre usted!!");

  const { rating, reviews } = useLocalSearchParams();
  const parsedRating = Number(rating);
  const parsedReviews = Number(reviews);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        if (profile) {
          setUserProfile(profile);
          setDescription(profile.descripcion || '');
        }
      } catch (error) {
        console.log("Error al obtener el perfil:", error);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (userProfile && userProfile.id) {
      const profileOpinions = opinions.filter(
        (op) => op.idProfesional === Number(userProfile.id)
      );
      setCurrentOpinions(profileOpinions);
    }
  }, [userProfile]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (userProfile && userProfile.id) {
      const profileOpinions = opinions.filter(
        (op) => op.idProfesional === Number(userProfile.id)
      );
      setCurrentOpinions(profileOpinions);
    }
    setTimeout(() => setRefreshing(false), 1000);
  }, [userProfile]);

  const renderStars = (rating, size = Metrics.iconXSmall) => {
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

  const handleSaveDescription = async () => {
    const updatedProfile = {...userProfile, descripcion: description};

    await saveUserProfile(updatedProfile);

    setUserProfile(updatedProfile);
    setEditingDescription(false);
  };

  if (!userProfile) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 50, color: "#fff" }}>
          Cargando perfil...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileImageContainer}>
        <ProfilePic uri={userProfile?.avatar} size='120'/>
      </View>

      <BackButton />
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.nameContainer}>
          <Text style={styles.profileName}>{userProfile.fullName.toUpperCase()}</Text>
          <MaterialIcons
            name="verified"
            size={Metrics.iconSmall}
            color="#4CAF50"
            style={styles.verifiedIcon}
          />
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            <Rate
              rating={Number.isFinite(parsedRating) ? parsedRating : undefined}
              reviews={Number.isFinite(parsedReviews) ? parsedReviews : undefined}
            />
          </View>
        </View>

        <View style={ styles.editingContainer}>
          {editingDescription ? (
            <>
              <View style={{ width: "100%", position: 'relative' }}>
                <CustomInput
                  placeholder="Describe tus servicios..."
                  value={description}
                  onChangeText={setDescription}
                  error=""
                  isPassword={false}
                  style={{
                    width: '88%',
                    padding: Metrics.marginS,
                    textAlignVertical: "top",
                  }}
                />
                
                {description.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setDescription("")}
                    style={{
                      position: "absolute",
                      top: Metrics.marginS,
                      right: Metrics.marginS,
                      zIndex: 10,
                    }}
                  >
                    <Feather name="x" size={Metrics.iconSmall} color="#555" style={{marginRight: Metrics.marginS}}/>
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                style={[
                  styles.addCommentButton,
                  {
                    backgroundColor: Colors.blueColor,
                    margin: Metrics.marginS,
                  },
                ]}
                onPress={() => {
                  if (description.trim() === "") {
                    // Si está vacío, salir del modo edición sin guardar
                    setDescription(userProfile?.descripcion || "");
                    setEditingDescription(false);
                  } else {
                    handleSaveDescription();
                  }
                }}
              >
                <Feather name="check" size={Metrics.iconXSmall} color="#fff" />
                <Text style={[styles.addCommentText, { color: "#fff" }]}>
                  Guardar descripción
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>
                {description.length > 0
                  ? description
                  : "Pulse el lápiz para agregar una descripción sobre usted."}
              </Text>
              <TouchableOpacity
                style={styles.addCommentButton}
                onPress={() => setEditingDescription(true)}
              >
                <Feather name="edit" size={Metrics.iconXSmall} color="#009" />
              </TouchableOpacity>
            </View>
          )}
        </View>


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
                  {renderStars(Number.parseFloat(opinion.puntaje), Metrics.marginM)}
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
      <NavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: Metrics.marginM,
    marginTop: Metrics.marginXXL,
  },
  profileImage: {
    width: Metrics.marginS,
    height: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.whiteColor,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    paddingTop: Metrics.marginXL,
    paddingHorizontal: Metrics.marginM,
    borderTopLeftRadius: Metrics.radiusM,
    borderTopRightRadius: Metrics.radiusM,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Metrics.marginS,
  },
  profileName: {
    fontSize: Metrics.fontS,
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
    borderRadius: Metrics.radiusS,
    marginBottom: Metrics.marginS,
    elevation: 3,
    shadowColor: Colors.textColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ratingText: {
    fontSize: Metrics.fontS,
    color: Colors.textColor,
    fontWeight: "bold",
  },
  descriptionContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  description: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: Metrics.fontXS,
    width: "70%",
    margin: Metrics.marginS,
    color: '#aaa',
  },
  addCommentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingVertical: Metrics.marginS,
    paddingHorizontal: Metrics.marginL,
    borderRadius: Metrics.radiusS,
    marginBottom: Metrics.marginS,
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
    color: Colors.text333,
    marginBottom: Metrics.marginS,
  },
  newBadge: {
    color: "#4CAF50",
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
    backgroundColor: "#4CAF50",
  },
  opinionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Metrics.marginXS,
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
    color: Colors.light.background,
    fontSize: Metrics.fontS,
    fontWeight: "bold",
  },
  opinionUserName: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    color: "#",
  },
  newText: {
    color: "#4CAF50",
    fontSize: Metrics.fontS,
  },
  opinionStars: {
    flexDirection: "row",
  },
  opinionText: {
    fontSize: Metrics.fontS,
    color: Colors.text333,
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
    fontSize: Metrics.fontXS,
    color: "#999",
  },
  editingContainer: {
    alignItems: "center",
    marginBottom: Metrics.marginXL,
    marginLeft: Metrics.marginS,
    height: Metrics.publicityArea,
  }
});