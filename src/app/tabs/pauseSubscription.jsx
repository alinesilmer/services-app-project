import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "../../components/CustomButton";
import BackButton from "../../components/BackButton";
import SlideUpCard from "../../components/SlideUpCard";
import Logo from "../../components/Logo";
import { Colors } from "../../constants/Colors";  
import { Fonts } from "../../constants/Fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function PauseSubscription() {
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
       
        <StatusBar barStyle="light-content" backgroundColor="#1a2f68" />
        <SafeAreaView style={styles.safeArea}>
        <BackButton onPress={() => router.back()} />
        <Logo />
        <SlideUpCard title="Suscripción pausada" subtitle="¡Gracias por usar nuestro servicio!. Recuerda que puedes reanudar
               tu suscripción en cualquier momento." style={styles.card}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.row}></View>
            <View style={styles.buttonContainer}>
              <CustomButton
                text="Reanudar Suscripción"
                onPress={() => router.push("/tabs/cancelation")}
                width="90%"
              />
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
    height: hp("60%"),
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: hp("2%"),
    marginTop: hp("2%"),
  },
  title: {
    marginBottom: 40,
  },
  subtitle: {
    marginTop: 40,
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
  buttonContainer: {
    width: wp("90%"),
    alignItems: "center",
    marginTop: hp("1%"),
    marginBottom: hp("1%"),
  },
});
