import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";
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

export default function SecondRequest() {
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
          <BackButton />
          <Logo />
          <SlideUpCard title="Solicitudes" style={styles.card}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.needsContainer}>
                <Feather
                  name="alert-circle"
                  size={35}
                  color={Colors.orangeColor}
                  fontWeight="bold"
                />
                <Text style={[styles.titleTwo, { marginLeft: 20 }]}>
                  ¡SE NECESITA!
                </Text>
              </View>
              <View>
                <Text style={styles.titleThree}>
                  Reparación de aire acondicionado
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  text="Ver detalles de la solicitud"
                  onPress={() => router.push("tabs/client/thirdRequestAd")}
                  backgroundColor={Colors.inputGray}
                  width="90%"
                />
              </View>

              <View style={styles.needsContainer}>
                <Feather
                  name="alert-circle"
                  size={35}
                  color={Colors.orangeColor}
                  fontWeight="bold"
                />
                <Text style={[styles.titleTwo, { marginLeft: 20 }]}>
                  ¡SE NECESITA!
                </Text>
              </View>
              <View>
                <Text style={styles.titleThree}>Maestro mayor de obra</Text>
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  text="Ver detalles de la solicitud"
                  onPress={() => router.push("tabs/client/thirdRequestAd")}
                  backgroundColor={Colors.inputGray}
                  width="90%"
                />
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  text="Agregar solicitud personalizada"
                  onPress={() => router.push("tabs/client/requestAd")}
                  backgroundColor="#e47755"
                  width="90%"
                />
              </View>

              <View style={styles.imageContainer}>
                <AdsImage onPress isPremium={premium} />
              </View>
            </ScrollView>
          </SlideUpCard>
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
    width: wp("100%"),
    height: hp("72%"),
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: hp("2%"),
    marginTop: hp("2%"),
  },
  needsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontFamily: Fonts.montserrat,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  titleTwo: {
    fontSize: 20,
    fontFamily: Fonts.montserrat,
    fontWeight: "bold",
    color: Colors.orangeColor,
    marginBottom: 10,
  },
  titleThree: {
    MarginTop: 10,
    fontSize: 18,
    fontFamily: Fonts.montserrat,
    color: Colors.textColor,
    textAlign: "center",
  },
  buttonContainer: {
    width: wp("90%"),
    marginTop: hp("1%"),
    marginBottom: hp("1%"),
    alignItems: "center",
  },
  imageContainer: {
    width: wp("90%"),
  },
});
