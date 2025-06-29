import { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../../constants/Colors";
import { Fonts } from "../../../constants/Fonts";
import { getUserData, UsePremium } from "../../../utils/storage";
import { Metrics } from "../../../constants/Metrics";
import {
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import AdsImage from "../../../components/AdsImage";
import Logo from "../../../components/Logo";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import { usePremium } from "../../../hooks/usePremium"
import SlideUpCard from "../../../components/SlideUpCard";

export default function request() {
  const router = useRouter();
  const { premium } = usePremium()
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [requestText, setRequestText] = useState("");

  const hasPremium =
    (premium.isPremium || premium.isPremiumProf) &&
    ["active", "trial"].includes(premium.premiumStatus)

  const requestPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== "granted" || mediaStatus !== "granted") {
        Alert.alert(
          "Permisos requeridos",
          "Necesitamos permisos de cámara y galería para continuar.",
          [{ text: "OK" }]
        );
        return false;
      }
    }
    return true;
  };

  const openCamera = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        setShowImageModal(false);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo abrir la cámara");
    }
  };

  const openGallery = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        setShowImageModal(false);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo abrir la galería");
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const handleConfirmRequest = () => {
    if (!requestText.trim()) {
      Alert.alert("Campo requerido", "Por favor describe lo que necesitas");
      return;
    }

    router.push({
      pathname: "tabs/client/secondRequestAd",
      params: {
        requestText: requestText,
        imageUri: selectedImage || "",
      },
    });
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <BackButton />
            <Logo />
            <SlideUpCard title="Solicitud personalizada" style={styles.card}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.description}>
                    ¿No encontraste el servicio que necesitás? ¡No hay problema!
                  </Text>
                  <Text style={styles.description}>
                    Acá podés crear un pedido personalizado explicando lo que
                    necesitás.
                  </Text>
                </View>

                <View style={styles.rectangle}>
                  <TextInput
                    style={styles.text}
                    placeholder="Necesito urgentemente..."
                    multiline
                    numberOfLines={6}
                    value={requestText}
                    onChangeText={setRequestText}
                  />
                </View>

                {selectedImage && (
                  <View style={styles.selectedImageContainer}>
                    <Image
                      source={{ uri: selectedImage }}
                      style={styles.selectedImage}
                    />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={removeImage}
                    >
                      <Feather name="x" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                )}

                <View style={styles.buttonContainer}>
                  <CustomButton
                    text={selectedImage ? "Cambiar foto" : "Adjuntar foto"}
                    onPress={() => setShowImageModal(true)}
                    width="90%"
                    style={styles.customBotton}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <CustomButton
                    text="Confirmar solicitud"
                    onPress={handleConfirmRequest}
                    backgroundColor="#e47755"
                    width="90%"
                    style={styles.customBotton}
                  />
                </View>

                <View style={styles.imageContainer}>
                  <AdsImage isPremium={hasPremium} />
                </View>
              </ScrollView>
            </SlideUpCard>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>

      <Modal
        visible={showImageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowImageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Seleccionar imagen</Text>
              <TouchableOpacity
                onPress={() => setShowImageModal(false)}
                activeOpacity={0.8}
              >
                <Feather name="x" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.modalSubtitle}>Elige una opción:</Text>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={openCamera}
                activeOpacity={0.8}
              >
                <View style={styles.optionContent}>
                  <View style={styles.optionIcon}>
                    <Feather name="camera" size={24} color="#28a745" />
                  </View>
                  <View style={styles.optionText}>
                    <Text style={styles.optionTitle}>Tomar foto</Text>
                    <Text style={styles.optionDescription}>
                      Usar la cámara del dispositivo
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={20} color="#ccc" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={openGallery}
                activeOpacity={0.8}
              >
                <View style={styles.optionContent}>
                  <View style={styles.optionIcon}>
                    <Feather name="image" size={24} color="#6f42c1" />
                  </View>
                  <View style={styles.optionText}>
                    <Text style={styles.optionTitle}>
                      Seleccionar de galería
                    </Text>
                    <Text style={styles.optionDescription}>
                      Elegir una foto existente
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={20} color="#ccc" />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtonContainer}>
              <CustomButton
                text="Cancelar"
                onPress={() => setShowImageModal(false)}
                width="90%"
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
  },
  card: {
    position: "absolute",
    bottom: 0,
    height: Metrics.screenM,
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: hp("2%"),
    marginTop: hp("2%"),
  },
  title: {
    fontFamily: Fonts.roboto,
    fontSize: wp("4,5%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  descriptionContainer: {
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  description: {
    fontFamily: Fonts.roboto,
    fontSize: wp("5%"),
    color: Colors.orangeColor,
    textAlign: "center",
    width: wp("80%"),
  },
  rectangle: {
    width: wp("80%"),
    height: hp("20%"),
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.blueColor,
    borderWidth: 3,
    borderRadius: 6,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: hp("0.5%"),
    marginBottom: hp("0.5%"),
    marginLeft: wp("5%"),
  },
  text: {
    textAlignVertical: "top",
    width: wp("80%"),
    height: hp("20%"),
    padding: 10,
    fontSize: wp("4%"),
  },
  selectedImageContainer: {
    alignItems: "center",
    marginVertical: hp("2%"),
    position: "relative",
  },
  selectedImage: {
    width: wp("80%"),
    height: hp("25%"),
    borderRadius: 10,
    resizeMode: "cover",
  },
  removeImageButton: {
    position: "absolute",
    top: 10,
    right: wp("12%"),
    backgroundColor: "rgba(220, 53, 69, 0.8)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: wp("90%"),
    marginTop: hp("1%"),
    marginBottom: hp("1%"),
    alignItems: "center",
  },
  customBotton: {
    width: wp("90%"),
  },
  imageContainer: {
    width: wp("90%"),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: "#333",
  },
  modalBody: {
    padding: 20,
  },
  modalSubtitle: {
    fontSize: wp("4%"),
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "600",
    color: "#333",
    marginBottom: 3,
  },
  optionDescription: {
    fontSize: wp("3.5%"),
    color: "#666",
  },
  cancelButton: {
    marginHorizontal: 20,
    backgroundColor: "#6c757d",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: wp("4%"),
    fontWeight: "600",
  },
  modalButtonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
});
