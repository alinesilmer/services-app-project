// “use client”
import React from "react";
import { Modal, View, TouchableOpacity, Image, Pressable, StyleSheet, Text, } from "react-native";
import { Video } from "expo-av";
import LottieView from "lottie-react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAdTimer } from "../hooks/useAdTimer";
import { Metrics } from "../constants/Metrics";
import { Colors } from "../constants/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

export default function Ad({ visible, onClose, source, type = "image" }) {
  const { canClose, timer } = useAdTimer(visible);
  const router = useRouter();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.adContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            disabled={!canClose}
          >
            {canClose ? (
              <Feather name="x" size={Metrics.iconSmall} color={Colors.whiteColor} />
            ) : (
              <LottieView
                source={require("../assets/animations/loading-ad.json")}
                autoPlay
                loop
                style={styles.lottie}
              />
            )}
          </TouchableOpacity>

          {type === "image" ? (
            <Image source={source} style={styles.media} resizeMode="cover" />
          ) : (
            <Video
              source={source}
              shouldPlay={visible}
              isLooping
              resizeMode="cover"
              style={styles.media}
            />
          )}

          <Pressable
            onPress={() => {
              onClose();
              router.push("/auth/goPremium");
            }}
            style={styles.premiumLink}
          >
            <Text style={styles.premiumText}>
              ¿Cansado de anuncios? {"\n"}¡Obtén Premium aquí!
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay:       { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.7)", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  adContainer:   { 
    width: wp("90%"), 
    height: Metrics.screenM, 
    backgroundColor: "black", 
    borderRadius: Metrics.radiusS, 
    overflow: "hidden" 
  },
  closeButton:   { 
    position: "absolute", 
    top: Metrics.marginS, 
    right: Metrics.marginM,
    zIndex: 2, 
    padding: Metrics.marginS,
    backgroundColor:"rgba(0,0,0,0.5)", 
    borderRadius: Metrics.radiusS
  },
  lottie: { 
    width: 50, 
    height:50 
  },
  media: { 
    width: wp("100%"), 
    height: Metrics.screenS
  },
  premiumLink: { 
    position:"absolute", 
    bottom: Metrics.marginM, 
    alignSelf:"center" 
  },
  premiumText: { 
    color:"white", 
    fontSize:Metrics.fontXS,
    textAlign:"center", 
    textDecorationLine:"underline" 
  },
});
