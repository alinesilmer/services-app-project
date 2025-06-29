import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import { getUserData, isPremiumUser } from "../../../utils/storage";
import { Colors } from "../../../constants/Colors";
import { Fonts } from "../../../constants/Fonts";
import { Metrics } from "../../../constants/Metrics";
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

import AdsImage from "../../../components/AdsImage";
import { usePremium } from "../../../hooks/usePremium"
import Logo from "../../../components/Logo";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import SlideUpCard from "../../../components/SlideUpCard";

const image = require("../../../assets/images/aireVentana.png");

export default function ThirdRequest() {
  const router = useRouter();
    const { premium } = usePremium()
  
      const userIsPremium =
        (premium.isPremium || premium.isPremiumProf) &&
        ["active", "trial"].includes(premium.premiumStatus)

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.containerRequest}>
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
                  style={styles.customBotton}
                />
              </View>

              <View>
                <AdsImage onPress isPremium={userIsPremium} />
              </View>
            </ScrollView>
          </SlideUpCard>
        </View>
      </SafeAreaView>
    </>
  );
}

export const styles = StyleSheet.create({
  containerRequest: {
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
    marginTop: Metrics.marginS,
    fontSize: Metrics.fontM,
    fontFamily: Fonts.montserrat,
    fontWeight: "bold",
    textAlign: "center",
    width: wp("80%"),
  },
  textTitle: {
    marginTop: Metrics.marginS,
    fontSize: Metrics.fontM,
    fontFamily: Fonts.montserrat,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.orangeColor,
  },
  text: {
    alignSelf: "flex-start",
    paddingHorizontal: Metrics.marginM,
  },
  list: {
    color: Colors.textColor,
    fontSize: Metrics.fontS,
    fontFamily: Fonts.montserrat,
    marginTop: Metrics.marginS,
  },
  buttonContainer: {
    width: wp("90%"),
    marginTop: Metrics.marginXS,
    marginBottom: Metrics.marginXS,
    alignItems: "center",
  },
  customBotton: {
  },
  imageContainer: {
    width: wp("90%"),
  },
  image: {
    width: Metrics.screenS * 0.3,
		height: Metrics.screenS * 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
});
