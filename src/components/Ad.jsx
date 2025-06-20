// “use client”
import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { Video } from "expo-av";
import LottieView from "lottie-react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAdTimer } from "../hooks/useAdTimer";

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
              <Feather name="x" size={32} color="white" />
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
  overlay:       { flex:1, backgroundColor:"rgba(0,0,0,0.7)", justifyContent:"center", alignItems:"center" },
  adContainer:   { width:"90%", height:"80%", backgroundColor:"black", borderRadius:20, overflow:"hidden" },
  closeButton:   { position:"absolute", top:20, right:20, zIndex:2, padding:10, backgroundColor:"rgba(0,0,0,0.5)", borderRadius:20 },
  lottie:        { width:50, height:50 },
  media:         { width:"100%", height:"100%" },
  premiumLink:   { position:"absolute", bottom:20, alignSelf:"center" },
  premiumText:   { color:"white", textAlign:"center", textDecorationLine:"underline" },
});
