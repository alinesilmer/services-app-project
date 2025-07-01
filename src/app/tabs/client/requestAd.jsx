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
import { Metrics } from "../../../constants/Metrics";
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
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'android' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 0}
      >
        <View style={styles.container}>
          <BackButton />
          <Logo />
            <SlideUpCard title="Solicitud personalizada" style={styles.card}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.description}>
                    ¿No encontraste el servicio que necesitás? {"\n"} ¡No hay problema!
                  </Text>
                  <Text style={styles.description}>
                    Acá podés crear un pedido explicando lo que necesitás.
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
                      <Feather name="x" size={Metrics.iconSmall} color={Colors.textColor} />
                    </TouchableOpacity>
                  </View>
                )}

                <View style={styles.buttonContainer}>
                  <CustomButton
                    text={selectedImage ? "Cambiar foto" : "Adjuntar foto"}
                    onPress={() => setShowImageModal(true)}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <CustomButton
                    text="Confirmar solicitud"
                    onPress={handleConfirmRequest}
                    backgroundColor={Colors.orangeColor}
                  />
                </View>

                <View style={styles.imageContainer}>
                  <AdsImage isPremium={hasPremium} />
                </View>
              </ScrollView>
            </SlideUpCard>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

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
                <Feather name="x" size={Metrics.iconSmall} color={Colors.text666} />
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
                    <Feather name="camera" size={Metrics.iconSmall} color={Colors.blueColor} />
                  </View>
                  <View style={styles.optionText}>
                    <Text style={styles.optionTitle}>Tomar foto</Text>
                    <Text style={styles.optionDescription}>
                      Usar la cámara del dispositivo
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={Metrics.iconSmall} color={Colors.disabledColor} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={openGallery}
                activeOpacity={0.8}
              >
                <View style={styles.optionContent}>
                  <View style={styles.optionIcon}>
                    <Feather name="image" size={Metrics.iconSmall} color={Colors.blueColor} />
                  </View>
                  <View style={styles.optionText}>
                    <Text style={styles.optionTitle}>
                      Seleccionar de galería
                    </Text>
                    <Text style={styles.optionDescription}>
                      Elegir una foto existente
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={Metrics.iconSmall} color={Colors.disabledColor} />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtonContainer}>
              <CustomButton
                text="Cancelar"
                onPress={() => setShowImageModal(false)}
                width={Metrics.animationXL}
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
  mainContent: {
    flex: 1,
    justifyContent: 'center'
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
    marginBottom: Metrics.marginS,
    marginTop: Metrics.marginS,
  },
  title: {
    fontFamily: Fonts.roboto,
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    textAlign: "center",
  },
  descriptionContainer: {
    alignItems: "center",
    marginBottom: Metrics.marginS,
  },
  description: {
    fontFamily: Fonts.roboto,
    fontSize: Metrics.fontS,
    color: Colors.orangeColor,
    textAlign: "center",
    width: Metrics.animationXL,
  },
  rectangle: {
    width: Metrics.animationXL,
    height: Metrics.animationL,
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.blueColor,
    borderWidth: Metrics.marginXS,
    borderRadius: Metrics.radiusS,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: Metrics.marginS,
    marginBottom: Metrics.marginS,
    marginLeft: Metrics.marginS,
  },
  text: {
    textAlignVertical: "top",
    width: Metrics.animationXL,
    height: Metrics.animationL,
    padding: Metrics.marginS,
    fontSize: Metrics.fontS,
  },
  selectedImageContainer: {
    alignItems: "center",
    marginVertical: Metrics.marginS,
    position: "relative",
  },
  selectedImage: {
    width: Metrics.animationXL,
    height: Metrics.animationL,
    borderRadius: Metrics.radiusS,
    resizeMode: "cover",
  },
  removeImageButton: {
    position: "absolute",
    top: Metrics.marginS,
    right: Metrics.marginM,
    borderRadius: Metrics.radiusS,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: Metrics.animationXL,
    marginTop: Metrics.marginS,
    marginBottom: Metrics.marginS,
    alignItems: "center",
  },
  imageContainer: {
    width: Metrics.animationXL,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Metrics.radiusM,
    borderTopRightRadius: Metrics.radiusM,
    paddingBottom: Metrics.marginXL,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Metrics.marginM,
    borderBottomWidth: 1,
    borderBottomColor: Colors.whiteColor,
  },
  modalTitle: {
    fontSize: Metrics.marginS,
    fontWeight: "bold",
    color: Colors.whiteColor,
  },
  modalBody: {
    padding: Metrics.marginM,
  },
  modalSubtitle: {
    fontSize: Metrics.fontS,
    color: Colors.textColor,
    marginBottom: Metrics.marginM,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: Colors.dark.tint,
    borderRadius: Metrics.radiusS,
    marginBottom: Metrics.marginM,
    elevation: 2,
    shadowColor: Colors.textColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: Metrics.marginM,
  },
  optionIcon: {
    width: Metrics.iconLarge,
    height: Metrics.iconLarge,
    borderRadius: Metrics.radiusM,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Metrics.marginM,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: Metrics.fontS,
    fontWeight: "bold",
    color: Colors.textColor,
    marginBottom: Metrics.marginXS,
  },
  optionDescription: {
    fontSize: Metrics.fontS,
    color: Colors.text666,
  },
  modalButtonContainer: {
    alignItems: "center",
    marginTop: Metrics.marginS,
  },
});
