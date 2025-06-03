import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../../components/CustomButton";
import BackButton from "../../components/BackButton";
import SlideUpCard from "../../components/SlideUpCard"; 
import Logo from "../../components/Logo";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function PauseSubscription() {
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
      <Logo/>
      <StatusBar barStyle="light-content" backgroundColor="#1a2f68" />
      <BackButton onPress={() => router.back()} />
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.row}></View>
        <SlideUpCard title="Suscripción pausada" style={styles.card}>
  
          <Text style={styles.textTwo}>
            ¡Gracias por usar nuestro servicio! Recuerda que puedes reanudar
            {"\n"} tu suscripción{"\n"} en cualquier momento.
          </Text>
          <View style={styles.button}>
            <CustomButton
              text="Reanudar Suscripción"
              onPress={() => router.push("/tabs/cancelation")}
              backgroundColor="#198754"
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
    backgroundColor: "#1a2f68",
    paddingTop: 40,
    paddingHorizontal: 20,
    position: "relative",
    marginTop: 20,
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
      marginTop: hp("35%"),
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
      marginTop: 20,
      alignSelf: "flex-start",
    },
    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start", 
      alignSelf: "flex-start",
    },
    textTwo: {
      marginTop: -5,
      fontSize: 18,
      fontFamily: "Montserrat_400Regular",
      color: "#000",
      textAlign: "center",
      width: 330,
  },
    button: {
      marginTop: 40,
      width: "90%",
      alignItems: "center",
      marginBottom: 40,
  },
});
