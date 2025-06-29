import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Platform } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Feather } from "@expo/vector-icons"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"

interface Props {
  onImageSelected?: (imageUri: string) => void
  onClose?: () => void
}

const Camera: React.FC<Props> = ({ onImageSelected, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const requestPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync()
      const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (cameraStatus !== "granted" || mediaStatus !== "granted") {
        Alert.alert("Permisos requeridos", "Necesitamos permisos de cámara y galería para continuar.", [{ text: "OK" }])
        return false
      }
    }
    return true
  }

  const openCamera = async () => {
    const hasPermissions = await requestPermissions()
    if (!hasPermissions) return

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      })

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri
        setSelectedImage(imageUri)
        onImageSelected?.(imageUri)
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo abrir la cámara")
    }
  }

  const openGallery = async () => {
    const hasPermissions = await requestPermissions()
    if (!hasPermissions) return

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      })

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri
        setSelectedImage(imageUri)
        onImageSelected?.(imageUri)
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo abrir la galería")
    }
  }

  const showImagePickerOptions = () => {
    Alert.alert(
      "Seleccionar imagen",
      "Elige una opción",
      [
        {
          text: "Cámara",
          onPress: openCamera,
        },
        {
          text: "Galería",
          onPress: openGallery,
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ],
      { cancelable: true },
    )
  }

  const removeImage = () => {
    setSelectedImage(null)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Capturar Imagen</Text>
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={24} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {selectedImage ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          <View style={styles.imageActions}>
            <TouchableOpacity style={styles.actionButton} onPress={showImagePickerOptions}>
              <Feather name="edit-2" size={20} color="white" />
              <Text style={styles.actionButtonText}>Cambiar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={removeImage}>
              <Feather name="trash-2" size={20} color="white" />
              <Text style={styles.actionButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <Feather name="image" size={80} color="#ccc" />
          <Text style={styles.placeholderText}>No hay imagen seleccionada</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
              <Feather name="camera" size={24} color="white" />
              <Text style={styles.buttonText}>Abrir Cámara</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.galleryButton} onPress={openGallery}>
              <Feather name="image" size={24} color="white" />
              <Text style={styles.buttonText}>Abrir Galería</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.optionsButton} onPress={showImagePickerOptions}>
            <Text style={styles.optionsButtonText}>Mostrar opciones</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  imageContainer: {
    flex: 1,
    padding: 20,
  },
  selectedImage: {
    width: "100%",
    height: hp("50%"),
    borderRadius: 15,
    resizeMode: "cover",
    marginBottom: 20,
  },
  imageActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#007bff",
    borderRadius: 25,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  actionButtonText: {
    color: "white",
    fontSize: wp("4%"),
    fontWeight: "600",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  placeholderText: {
    fontSize: wp("4%"),
    color: "#666",
    marginTop: 20,
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
    marginBottom: 30,
  },
  cameraButton: {
    backgroundColor: "#28a745",
    borderRadius: 25,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  galleryButton: {
    backgroundColor: "#6f42c1",
    borderRadius: 25,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    color: "white",
    fontSize: wp("4%"),
    fontWeight: "600",
  },
  optionsButton: {
    borderWidth: 2,
    borderColor: "#007bff",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  optionsButtonText: {
    color: "#007bff",
    fontSize: wp("4%"),
    fontWeight: "600",
  },
})

export default Camera

