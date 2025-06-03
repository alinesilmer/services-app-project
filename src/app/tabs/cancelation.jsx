import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "react-native";
import { useRouter } from "expo-router";
import Logo from "../../components/Logo";
import BackButton from "../../components/BackButton";
import SlideUpCard from "../../components/SlideUpCard";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts"; 
import CustomButton from "../../components/CustomButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Cancelation() {
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        <Logo />
        <StatusBar barStyle="light-content" backgroundColor="#1a2f68" />
        <BackButton />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.row}></View>
          <SlideUpCard title="¿Estás pensando en cancelar tu suscripción?" style={styles.card}>
          <Text style={styles.textTwo}>
              Recorda que podés pausar{"\n"} hasta por 6 meses{"\n"} sin perder
              tus datos ni tus beneficios
            </Text>
            <Text style={styles.textTwo}>
              Si solo pausas, al volver{"\n"} te esperará una sorpresa{"\n"}{" "}
              especial
            </Text>
            <View style={styles.buttonContainer}>
              <CustomButton
                text="Pausar suscripción"
                onPress={() => router.push("tabs/pauseSubscription")}
                backgroundColor="#198754"
                width="90%"
              />
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton
                text="Cancelar suscripción"
                onPress={() => router.push("tabs/stopSubscription")}
                backgroundColor="#DC3545"
                width="90%"
              />
            </View>
          </SlideUpCard>
        </ScrollView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: Colors.blueColor,
    paddingTop: 40,
    paddingHorizontal: 20,
    position: "relative",
    marginTop: -40,
  },
    card: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: hp("-2%"),
    paddingHorizontal: wp("5%"),
    paddingBottom: hp("-2%"),
    shadowColor: "black",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    marginTop: hp("25%"),
  },
   headerContainer: {
    alignItems: "center",
    marginBottom: hp ("-4%"),
    marginTop: hp ("-4%"),
  },
   title: {
    fontFamily: Fonts.roboto,
    fontSize: wp("5%"), 
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 15,
    marginTop: 70,
    alignSelf: "flex-start",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", 
    alignSelf: "flex-start",
  },
  textTwo: {
    marginTop: 15,
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: "#000",
    textAlign: "center",
    width: 330,
  },
  buttonContainer: {
    width: wp("90%"),
    alignItems: "center",
    marginTop: hp("1%"),
    marginBottom: hp("2%"),
  },
});
