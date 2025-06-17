"use client";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useLocalSearchParams, } from "expo-router";
import { Colors } from "../../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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
          console.log("Perfil cargado:", profile);
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
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <ProfilePic uri={userProfile?.avatar} size='140'/>
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
            size={24}
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
              <View style={{ width: '100%', position: 'relative' }}>
                <CustomInput
                  placeholder="Describe tus servicios..."
                  value={description}
                  onChangeText={setDescription}
                  error=""
                  isPassword={false}
                  style={{
                    minHeight: hp("12%"),
                    paddingTop: hp("1%"),
                    paddingBottom: hp("1%"),
                    textAlignVertical: "top",
                  }}
                />
                
                {description.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setDescription("")}
                    style={{
                      position: "absolute",
                      top: hp("1.5%"),
                      right: hp("2%"),
                      zIndex: 10,
                    }}
                  >
                    <Feather name="x" size={20} color="#555" style={{marginRight: wp('3%')}}/>
                  </TouchableOpacity>
                )}
              </View>

              <TouchableOpacity
                style={[
                  styles.addCommentButton,
                  {
                    backgroundColor: Colors.blueColor,
                    marginTop: hp("1%"),
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
                <Feather name="check" size={20} color="#fff" />
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
                <Feather name="edit" size={20} color="#009" />
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
      <NavBar />
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
  descriptionContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  description: {
    fontSize: wp("4%"),
    color: "#000",
    width: '70%',
    textAlign: "center",
    lineHeight: wp("5.5%"),
    marginBottom: hp("3%"),
    paddingHorizontal: wp("2%"),
    color: '#aaa'
  },
  addCommentButton: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: hp("4%"),
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
  editingContainer: {
    alignItems: "center",
    marginBottom: hp("3%"),
    marginLeft: wp('6%'),
  }
});