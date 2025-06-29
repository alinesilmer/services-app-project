import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";
import { Fonts } from "../../../constants/Fonts";
import { Metrics } from "../../../constants/Metrics";
import { getUserData, UsePremium } from "../../../utils/storage"; 
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

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
        const premium = await UsePremium();
        setPremium(premium);
      } catch (error) {}
    };
    loadPremiumStatus();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <BackButton />
          <Logo />
          <SlideUpCard title="Solicitudes" style={styles.card}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.needsContainer}>
                <Feather
                  name="alert-circle"
                  size={Metrics.iconMedium}
                  color={Colors.orangeColor}
                  fontWeight="bold"
                />
                <Text
                  style={[styles.titleTwo, { marginLeft: Metrics.marginS }]}
                >
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
                />
              </View>

              <View style={styles.needsContainer}>
                <Feather
                  name="alert-circle"
                  size={Metrics.iconMedium}
                  color={Colors.orangeColor}
                  fontWeight="bold"
                />
                <Text
                  style={[styles.titleTwo, { marginLeft: Metrics.marginS }]}
                >
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
                />
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  text="Agregar solicitud"
                  onPress={() => router.push("tabs/client/requestAd")}
                  backgroundColor="#e47755"
                />
              </View>

              <View style={styles.imageContainer}>
                <AdsImage onPress isPremium={premium} />
              </View>
            </ScrollView>
          </SlideUpCard>
        </View>
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
    height: Metrics.screenM,
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: Metrics.marginS,
    marginTop: Metrics.marginS,
  },
  needsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Metrics.marginS,
  },
  title: {
    marginTop: Metrics.marginS,
    fontSize: Metrics.fontL,
    fontFamily: Fonts.montserrat,
    fontWeight: "bold",
    marginBottom: Metrics.marginM,
    textAlign: "center",
  },
  titleTwo: {
    fontSize: Metrics.fontM,
    fontFamily: Fonts.montserrat,
    fontWeight: "bold",
    color: Colors.orangeColor,
    marginBottom: Metrics.marginS,
  },
  titleThree: {
    MarginTop: Metrics.marginS,
    fontSize: Metrics.fontS,
    fontFamily: Fonts.montserrat,
    color: Colors.textColor,
    textAlign: "center",
  },
  buttonContainer: {
    width: wp("90%"),
    marginTop: Metrics.marginXS,
    marginBottom: Metrics.marginXS,
    alignItems: "center",
  },
  imageContainer: {
    width: wp("90%"),
  },
});
