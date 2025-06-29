import {   CameraView, CameraType, useCameraPermissions, FlashMode, } from "expo-camera";
import { Camera as CameraClass } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, } from "react-native";
import * as MediaLibrary from "expo-media-library";
import ButtonCamera from "../../../components/ButtonCamera";
import { Metrics } from "@/src/constants/Metrics";
import { Colors } from "@/src/constants/Colors";
import { Feather } from "@expo/vector-icons";

interface Props {
}

const Camera: React.FC<Props> = () => {
  const [image, setImage] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);

  const cameraRef = useRef<CameraView | null>(null);
  const deleteImage = async () => {
    setImage(null);
  };

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await CameraClass.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.granted);
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      console.log(data.uri);
      setImage(data.uri);
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.requestPermissionsAsync();
        alert("Image saved successfully");
        setImage(null);
      } catch (error) {
        console.error("Error saving image:", error);
      }
      await MediaLibrary.saveToLibraryAsync(image);
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
    setFlash((current) => (current === "on" ? "off" : "on"));
  };

  const toggleFlash = () => {
    setFlash((current) => (current === "on" ? "off" : "on"));
  };

  if (!hasCameraPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
        flash={flash}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Feather name="refresh-cw" size={Metrics.iconSmall} color={Colors.whiteColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { position: "absolute", top: 2, left: 2 }]}
            onPress={toggleFlash}
          >
            <Feather
              name={flash === "on" ? "zap" : "zap-off"}
              size={Metrics.iconSmall}
              color={Colors.whiteColor}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Feather name="camera" size={Metrics.iconSmall} color={Colors.whiteColor} />
          </TouchableOpacity>
          {image && (
            <View style={styles.buttonContainerTwo}>
              <TouchableOpacity style={styles.button} onPress={saveImage}>
                <Feather name="check" size={Metrics.iconSmall} color={Colors.whiteColor} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={deleteImage}>
                <Feather name="trash-2" size={Metrics.iconSmall} color={Colors.whiteColor} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </CameraView>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: Metrics.marginM,
  },
  buttonContainerTwo: {
    position: "absolute",
    bottom: Metrics.marginM,
    right: Metrics.marginM,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    margin: Metrics.marginS,
  },
  image: {
    width: Metrics.marginXXL * 1.6,
    height: Metrics.marginXXL * 1.6,
    resizeMode: "contain",
    aspectRatio: 1,
  },
});

export default Camera;
