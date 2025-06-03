import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import CustomButton from "../../../components/CustomButton";
import SlideUpCard from "../../../components/SlideUpCard";
import AdsImage from "../../../components/AdsImage";
import { getUserData, isPremiumUser } from "../../../utils/storage";
import { Colors } from "../../../constants/Colors";
import { Fonts } from "../../../constants/Fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
        <ScrollView showsVerticalScrollIndicator={false}>
          <SlideUpCard
            title="Reparacion de aire acondicionado"
            style={styles.card}
          >
            <View>
              <Text style={styles.text}>Problema/s identificado/s.</Text>
              <View style={{ alignSelf: "flex-start", paddingHorizontal: 20 }}>
                <Text style={styles.list}>• No enfría, solo ventila</Text>
                <Text style={styles.list}>
                  • Botón de encendido, no funciona
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.text}>Detalles del aire acondicionado</Text>
            </View>
            <View style={{ alignSelf: "flex-start", paddingHorizontal: 20 }}>
              <Text style={styles.list}>• Marca: Hitachi</Text>
              <Text style={styles.list}>• tipo:ventana</Text>
              <Text style={styles.list}>• frigorías:3000</Text>
              <Text style={styles.list}>• solo frío</Text>
            </View>
            <View>
              <Image
                source={image}
                style={{
                  width: 170,
                  height: 170,
                  marginTop: -10,
                  alignItems: "center",
                }}
              />
            </View>
            <View style={styles.button}>
              <CustomButton
                text="Cancelar solicitud"
                onPress={() => router.push("tabs/client/secondRequestAd")}
                backgroundColor="#DC3545"
                width="100%"
              />
            </View>
            <View>
              <AdsImage onPress isPremium={premium} />
            </View>
          </SlideUpCard>
        </ScrollView>
      </View>
    </>
  );
}

export const styles = StyleSheet.create({
  containerRequest: {
    flex: 1,
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: Colors.blueColor,
  },
 card: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: hp("4%"),
    paddingHorizontal: wp("5%"),
    paddingBottom: hp("2%"),
    shadowColor: "black",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    marginTop: hp("10%"),
  },
   headerContainer: {
    alignItems: "center",
    marginBottom: hp ("2%"),
    marginTop: hp ("2%"),
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: Fonts.montserrat,
    fontWeight: "bold",
    textAlign: "center",
    width: "80%",
    paddingLeft: 40,
  },
  text: {
    fontSize: 18,
    fontFamily: Fonts.montserrat,
    marginTop: hp("1%"),
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    color: "#e47755",
    fontSize: 18,
    fontFamily: Fonts.montserrat,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#red",
    marginTop: -20,
    width: "90%",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
  },
});
