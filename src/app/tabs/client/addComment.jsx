"use client";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Colors } from "../../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import opinions from "../../../data/mockOpinions";
import AnimationFeedback from "../../../components/AnimationFeedback";

const AddComment = () => {
  const params = useLocalSearchParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationType, setAnimationType] = useState("loadingComment");

  // Simular usuario actual (en una app real vendría del contexto de autenticación)
  const currentUser = {
    name: "Usuario Actual",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) {
      setAnimationType("failure");
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 1200);
      return;
    }

    if (rating === 0) {
      // Mostrar animación de error
      setAnimationType("failure");
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 1200);
      return;
    }

    setIsSubmitting(true);
    setAnimationType("loadingComment");
    setShowAnimation(true);
    try {
      // Simular envío del comentario
      const newComment = {
        id: Date.now(), // ID temporal
        nombre: currentUser.name,
        puntaje: rating.toString(),
        opinion: comment.trim(),
        idProfesional: Number.parseInt(params.profileId),
        isNew: true,
      };

      opinions.unshift(newComment);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mostrar animación de éxito
      setAnimationType("success");

      // Después de 2 segundos, ocultar animación y navegar
      setTimeout(() => {
        setShowAnimation(false);
        setTimeout(() => {
          router.back();
        }, 500);
      }, 1100);
    } catch (error) {
      setAnimationType("failure");
      setTimeout(() => {
        setShowAnimation(false);
      }, 1100);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          style={styles.starButton}
        >
          <Text
            style={[
              styles.starText,
              { color: i <= rating ? Colors.orangeColor : "#000" },
            ]}
          >
            {i <= rating ? "★" : "☆"}
          </Text>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const wordCount = comment
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const maxWords = 400;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerText}></Text>
            <Image
              source={{ uri: currentUser.avatar }}
              style={styles.userAvatar}
            />
          </View>
        </View>

        {/* Comentario Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Por favor, agregar un comentario:
          </Text>
          <View style={styles.textInputContainer}>
            <MaterialIcons
              name="search"
              size={20}
              color="#999"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="El trabajo realizado sobre mi ........."
              placeholderTextColor="#999"
              multiline
              numberOfLines={6}
              value={comment}
              onChangeText={setComment}
              maxLength={maxWords * 10}
              editable={!isSubmitting}
            />
          </View>
          <Text style={styles.wordCount}>{wordCount} palabras</Text>
        </View>

        {/* Puntuación */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Puntuación:</Text>
          <View style={styles.starsContainer}>{renderStars()}</View>
        </View>

        {/* Botón Enviar */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Enviando..." : "Enviar comentario"}
          </Text>
        </TouchableOpacity>

        {/* Información del profesional */}
        <View style={styles.professionalInfo}>
          <Text style={styles.professionalInfoText}>
            Comentario para:{" "}
            <Text style={styles.professionalName}>
              {params.professionalName}
            </Text>
          </Text>
        </View>
      </ScrollView>
      <Modal visible={showAnimation} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.animationContainer}>
            <AnimationFeedback type={animationType} />
            {animationType === "loadingComment" && (
              <Text style={styles.animationText}>Enviando comentario...</Text>
            )}
            {animationType === "success" && (
              <Text style={styles.animationText}>¡Comentario enviado!</Text>
            )}
            {animationType === "failure" && (
              <Text style={styles.animationText}>
                Error: Completa todos los campos
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: wp("3%"),
    paddingTop: hp("2%"),
  },
  header: {
    marginBottom: hp("1%"),
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerContent: {
    paddingTop: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: wp("4.2%"),
    color: "#AE6355",
    flex: 1,
    marginRight: 15,
    fontStyle: "italic",
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "black",
  },
  inputContainer: {
    marginBottom: hp("3%"),
  },
  inputLabel: {
    fontSize: wp("4%"),
    color: Colors.blueColor,
    marginBottom: 10,
    fontWeight: "600",
  },
  textInputContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.blueColor,
    paddingHorizontal: 15,
    paddingVertical: 15,
    minHeight: hp("20%"),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  textInput: {
    fontSize: wp("3.8%"),
    color: "#333",
    textAlignVertical: "top",
    paddingLeft: 30,
    paddingTop: 0,
    flex: 1,
  },
  wordCount: {
    textAlign: "right",
    fontSize: wp("3%"),
    color: "#666",
    marginTop: 5,
  },
  ratingContainer: {
    marginBottom: hp("3%"),
  },
  ratingLabel: {
    fontSize: wp("%"),
    color: Colors.blueColor,
    marginBottom: 15,
    fontWeight: "600",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 100,
    paddingVertical: 2,
    paddingHorizontal: 15,
  },
  starButton: {
    marginHorizontal: 8,
  },
  starText: {
    fontSize: wp("10%"),
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("8%"),
    alignItems: "center",
    marginBottom: hp("3%"),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonDisabled: {
    backgroundColor: "#A5D6A7",
  },
  submitButtonText: {
    color: "white",
    fontSize: wp("4.2%"),
    fontWeight: "600",
  },
  professionalInfo: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: hp("3%"),
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  professionalInfoText: {
    fontSize: wp("3.5%"),
    color: "#444",
    textAlign: "center",
  },
  professionalName: {
    fontWeight: "bold",
    color: Colors.blueColor,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  animationContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  animationText: {
    marginTop: 15,
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});

export default AddComment;
