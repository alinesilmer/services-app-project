import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import { getUserData, isPremiumUser } from "../../../utils/storage";
import { Colors } from "../../../constants/Colors";
import { Fonts } from "../../../constants/Fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import AdsImage from "../../../components/AdsImage";
import Logo from "../../../components/Logo";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import SlideUpCard from "../../../components/SlideUpCard";

const image = require("../../../assets/images/aireVentana.png");

export default function ThirdRequest() {
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
      <View style={styles.containerRequest}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeArea}>
          <BackButton />
          <Logo />
          <SlideUpCard
            title="Reparacion de aire acondicionado"
            style={styles.card}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <Text style={styles.textTitle}>Problema/s identificado/s.</Text>
                <View style={styles.text}>
                  <Text style={styles.list}>• No enfría, solo ventila</Text>
                  <Text style={styles.list}>
                    • Botón de encendido, no funciona
                  </Text>
                </View>
              </View>

              <View>
                <Text style={styles.textTitle}>
                  Detalles del aire acondicionado
                </Text>
              </View>
              <View style={styles.text}>
                <Text style={styles.list}>• Marca: Hitachi</Text>
                <Text style={styles.list}>• Tipo:ventana</Text>
                <Text style={styles.list}>• Frigorías:3000</Text>
                <Text style={styles.list}>• Solo frío</Text>
              </View>

              <View>
                <Image source={image} style={styles.image} />
              </View>

              <View style={styles.buttonContainer}>
                <CustomButton
                  text="Cancelar solicitud"
                  onPress={() => router.push("tabs/client/secondRequestAd")}
                  backgroundColor="#DC3545"
                  style={styles.customBotton}
                />
              </View>

              <View>
                <AdsImage onPress isPremium={premium} />
              </View>
            </ScrollView>
          </SlideUpCard>
        </SafeAreaView>
      </View>
    </>
  );
}

export const styles = StyleSheet.create({
  containerRequest: {
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
    height: hp("90%"),
    paddingTop: hp("4%"),
    paddingHorizontal: wp("5%"),
    paddingBottom: hp("2%"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: hp("2%"),
    marginTop: hp("2%"),
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: Fonts.montserrat,
    fontWeight: "bold",
    textAlign: "center",
    width: wp("80%"),
    paddingLeft: 40,
  },
  textTitle: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: Fonts.montserrat,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.orangeColor,
  },
  text: {
    alignSelf: "flex-start",
    paddingHorizontal: 20,
  },
  list: {
    color: Colors.textColor,
    fontSize: 18,
    fontFamily: Fonts.montserrat,
    marginTop: 10,
  },
  buttonContainer: {
    width: wp("90%"),
    marginTop: hp("0.5%"),
    marginBottom: hp("0.5%"),
    alignItems: "center",
  },
  customBotton: {
    width: wp("90%"),
  },
  imageContainer: {
    width: wp("90%"),
  },
  image: {
    width: 170,
    height: 170,
    alignItems: "center",
    justifyContent: "center",
  },
});
