import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import { Colors } from "../../../constants/Colors";
import { Fonts } from "../../../constants/Fonts";
import { getUserData, isPremiumUser } from "../../../utils/storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
                  />
                  <Feather
                    name="x-circle"
                    size={24}
                    color="black"
                    style={[
                      styles.Icon,
                      { position: "absolute", top: 20, right: 10 },
                    ]}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <CustomButton
                    text="Adjuntar foto"
                    onPress={() => router.push("tabs/client/secondRequestAd")}
                    width="90%"
                    style={styles.customBotton}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    text="Confirmar solicitud"
                    onPress={() => router.push("tabs/client/secondRequestAd")}
                    backgroundColor="#198754"
                    width="90%"
                    style={styles.customBotton}
                  />
                </View>

                <View style={styles.imageContainer}>
                  <AdsImage onPress isPremium={premium} />
                </View>
              </ScrollView>
            </SlideUpCard>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
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
    backgroundColor: Colors.whiteColor,
    width: wp("100%"),
    minHeight: hp("90%"),
    paddingBottom: hp("2%"),
    paddingTop: hp("4%"),
    paddingHorizontal: wp("5%"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    fontSize: wp("3%"),
    color: Colors.orangeColor,
    textAlign: "center",
    width: wp("80%"),
  },
  rectangle: {
    width: wp("90%"),
    height: hp("20%"),
    backgroundColor: Colors.inputGray,
    borderColor: Colors.blueColor,
    borderWidth: 3,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: hp("0.5%"),
    marginBottom: hp("0.5%"),
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
});
