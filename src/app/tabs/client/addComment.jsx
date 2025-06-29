"use client";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Platform,
ScrollView, Image, } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { Metrics } from "../../../constants/Metrics";
import { Feather } from "@expo/vector-icons";
import opinions from "../../../data/mockOpinions";
import AnimationFeedback from "../../../components/AnimationFeedback";

const AddComment = () => {
  const params = useLocalSearchParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationType, setAnimationType] = useState("loadingComment");

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
      }, 1100);
      return;
    }

    if (rating === 0) {
      setAnimationType("failure");
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 1100);
      return;
    }

    setIsSubmitting(true);
    setAnimationType("loadingComment");
    setShowAnimation(true);
    try {
      const newComment = {
        id: Date.now(),
        nombre: currentUser.name,
        puntaje: rating.toString(),
        opinion: comment.trim(),
        idProfesional: Number.parseInt(params.profileId),
        isNew: true,
      };

      opinions.unshift(newComment);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setAnimationType("success");

      setTimeout(() => {
        setShowAnimation(false);
        setTimeout(() => {
          router.back();
        }, 500);
      }, 1000);
    } catch (error) {
      setAnimationType("failure");
      setTimeout(() => {
        setShowAnimation(false);
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };


  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
        activeOpacity={0.6}
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


  const maxWords = 100;

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

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Por favor, agregar un comentario:
          </Text>
          <View style={styles.textInputContainer}>
            <Feather
              name="search"
              size={Metrics.iconSmall}
              color="#999"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="El trabajo realizado sobre mi..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={6}
              value={comment}
              onChangeText={setComment}
              maxLength={maxWords}
              editable={!isSubmitting}
            />
          </View>
          <Text style={styles.wordCount}>150 caracteres</Text>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Puntuación:</Text>
          <View style={styles.starsContainer}>{renderStars()}</View>
        </View>

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
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: Metrics.marginS,
    paddingTop: Metrics.marginS,
  },
  header: {
    marginBottom: Metrics.marginS,
  },
  headerContent: {
    paddingTop: Metrics.marginS,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: Metrics.fontM,
    color: "#AE6355",
    flex: 1,
    marginRight: Metrics.marginS,
    fontStyle: "italic",
  },
  userAvatar: {
    width: Metrics.iconXLarge,
    height: Metrics.iconXLarge,
    borderRadius: Metrics.radiusS,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.textColor,
  },
  inputContainer: {
    marginBottom: Metrics.marginS,
  },
  inputLabel: {
    fontSize: Metrics.fontS,
    color: Colors.blueColor,
    marginBottom: Metrics.marginS,
    fontWeight: "600",
  },
  textInputContainer: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.blueColor,
    paddingHorizontal: Metrics.marginS,
    paddingVertical: Metrics.marginS,
    minHeight: "20%",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: Metrics.radiusS,
  },
  searchIcon: {
    position: "absolute",
    top: Metrics.marginXS,
    left: Metrics.marginXS,
  },
  textInput: {
    fontSize: Metrics.fontS,
    color: "#333",
    textAlignVertical: "top",
    paddingLeft: Metrics.marginS,
    paddingTop: Metrics.marginS,
    flex: 1,
  },
  wordCount: {
    textAlign: "right",
    fontSize: Metrics.fontXS,
    color: "#666",
    marginTop: Metrics.marginS,
  },
  ratingContainer: {
    marginBottom: Metrics.marginS,
  },
  ratingLabel: {
    fontSize: Metrics.fontS,
    color: Colors.blueColor,
    marginBottom: Metrics.marginS,
    fontWeight: "600",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.inputGray,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  starButton: {
    marginHorizontal: Metrics.marginS,
  },
  starText: {
    fontSize: Metrics.fontS,
    paddingBottom: Metrics.marginS,
  },
  submitButton: {
    backgroundColor: "#000",
    borderRadius: Metrics.radiusS,
    paddingVertical: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
    alignItems: "center",
    marginBottom: Metrics.marginS,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: Metrics.radiusS,
  },
  submitButtonDisabled: {
    backgroundColor: Colors.orangeColor,
  },
  submitButtonText: {
    color: Colors.whiteColor,
    fontSize: wp("4.2%"),
    fontWeight: "600",
  },
  professionalInfo: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    padding: 15,
    marginBottom: hp("3%"),
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: Metrics.radiusS
  },
  professionalInfoText: {
    fontSize: Metrics.fontS,
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
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: Metrics.radiusS
  },
  animationText: {
    marginTop: Metrics.marginS,
    fontSize: Metrics.fontS,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});

export default AddComment;
