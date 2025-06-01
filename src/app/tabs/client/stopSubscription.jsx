import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { StatusBar } from "react-native";
import { useRouter } from "expo-router";
const logoIma = require("../../../assets/images/logo-service-app.png");
import { Feather } from "@expo/vector-icons";
import CustomButton from "../../../components/CustomButton";
import BackButton from "../../../components/BackButton";

export default function PauseSubscription() {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a2f68" />
      <View style={styles.container}>
        <BackButton onPress={() => router.back()} />

        {/* Estrellas arriba a la derecha */}
        <View style={styles.starsTriangle}>
          <Feather
            name="star"
            style={styles.topStar}
            size={45}
            color={"#fffde8"}
          />
          <Feather
            name="star"
            style={styles.leftStar}
            size={45}
            color={"#fffde8"}
          />
          <Feather
            name="star"
            style={styles.rightStar}
            size={45}
            color={"#fffde8"}
          />
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={logoIma} style={styles.logo} />
          <Text style={styles.Title}>PRUEBA DILO{"\n"}PREMIUM</Text>
        </View>
        <View style={styles.containerContent}>
          <Text style={styles.text}>SUSCRIPCIÓN CANCELADA</Text>
          <Text style={styles.textTwo}>¡Sentimos que decidas irte!{"\n"}</Text>
          <Text style={styles.textTwo}>Tu suscripción ha sido cancelada.</Text>
          <Text style={styles.textTwo}>
            Si hay algo que podamos mejorar,{"\n"} estamos para escucharte.
            {"\n"}¡Tu opinión es importante!
          </Text>
          <View style={styles.button}>
            <CustomButton
              text="Reanudar Suscripción"
              onPress={() => router.push("/tabs/client/cancelation")}
              backgroundColor="#198754"
              width="90%"
            />
          </View>
        </View>
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
    marginTop: -40,
  },
  starsTriangle: {
    position: "absolute",
    top: 130,
    right: 70,
    width: 80,
    height: 80,
  },
  topStar: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: -10 }],
  },

  leftStar: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },

  rightStar: {
    position: "absolute",
    bottom: 0,
    right: -30,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 15,
    marginTop: 40,
    alignSelf: "flex-start",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  logo: {
    marginTop: 30,
    marginLeft: -90,
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
  Title: {
    marginTop: 40,
    marginLeft: -90,
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  containerContent: {
    flexGrow: 1,
    marginTop: -133,
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 30,
  },
  text: {
    fontSize: 22,
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    width: 330,
  },
  textTwo: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
    color: "#000",
    textAlign: "center",
    width: 330,
  },
  button: {
    marginTop: 70,
    width: "90%",
    alignItems: "center",
  },
});
