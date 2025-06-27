import React, { useEffect, useState } from "react";
import { View, Text, Platform, TextInput, StyleSheet, ScrollView, SafeAreaView, } from "react-native";
import { StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import { Colors } from "../../../constants/Colors";
import { Fonts } from "../../../constants/Fonts";
import { Metrics } from "../../../constants/Metrics";
import { getUserData, isPremiumUser } from "../../../utils/storage";
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

import AdsImage from "../../../components/AdsImage";
import Logo from "../../../components/Logo";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import SlideUpCard from "../../../components/SlideUpCard";

export default function request() {
  const router = useRouter();
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    const loadPremiumStatus = async () => {
      try {
        getUserData();
        const premium = await isPremiumUser();
        setPremium(premium);
      } catch (error) {
        console.error("Error loading premium status:", error);
      }
    };

    loadPremiumStatus();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                  />
                  <Feather
                    name="x-circle"
                    size={Metrics.iconSmall}
                    color={Colors.textColor}
                    style={[
                      styles.Icon,
                      { position: "absolute", top: Metrics.marginXS, right: Metrics.marginXS },
                    ]}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <CustomButton
                    text="Adjuntar foto"
                    onPress={() => router.push("tabs/client/camera")}
                    style={styles.customBotton}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    text="Confirmar solicitud"
                    onPress={() => router.push("tabs/client/secondRequestAd")}
                    backgroundColor="#e47755"
                    style={styles.customBotton}
                  />
                </View>

                <View style={styles.imageContainer}>
                  <AdsImage onPress isPremium={premium} />
                </View>
              </ScrollView>
            </SlideUpCard>
          </View>  
          </KeyboardAvoidingView>
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
  },
  card: {
    position: "absolute",
    bottom: 0,
    width: wp("100%"),
    height: Metrics.screenM,
    alignItems: "stretch",
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
    fontSize: Metrics.fontXS,
    color: Colors.orangeColor,
    textAlign: "center",
    width: "90%",
  },
  rectangle: {
    width: wp("90%"),
    height: Metrics.publicityArea,
    backgroundColor: Colors.inputGray,
    borderColor: Colors.blueColor,
    borderWidth: Metrics.marginXS,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: Metrics.marginS,
    marginBottom: Metrics.marginS,
    marginLeft: Metrics.marginS,
  },
  buttonContainer: {
    width: wp("100%"),
    marginTop: Metrics.marginXS,
    marginBottom: Metrics.marginXS,
    alignItems: "center",
  },
  customBotton: {
    width: wp("90%"),
  },
  imageContainer: {
    width: wp("100%"),
  },
});
