import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { StatusBar } from "react-native";
import { useRouter } from "expo-router";
const logoIma = require("../../../assets/images/logo-service-app.png");
import BackButton from "../../../components/BackButton";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../../../components/CustomButton";

export default function Cancelation() {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a2f68" />
      <View style={styles.container}>
        {/* Botón de volver */}
        <BackButton />

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

        {/* Fila: logo + texto */}
        <View style={styles.row}>
          <View style={styles.logoContainer}>
            <Image source={logoIma} style={styles.logo} />
            <Text style={styles.Title}>PRUEBA DILO{"\n"}PREMIUM</Text>
          </View>
        </View>
        <View style={styles.containerContent}>
          <Text style={styles.text}>
            ¿Estás pensando en {"\n"}cancelar tu suscripción?
          </Text>
          <Text style={styles.textTwo}>
            Recorda que podés pausar{"\n"} hasta por 6 meses{"\n"} sin perder
            tus datos ni tus beneficios
          </Text>
          <Text style={styles.textTwo}>
            Si solo pausas, al volver{"\n"} te esperará una sorpresa{"\n"}{" "}
            especial
          </Text>
          <View style={styles.button}>
            <CustomButton
              text="Pausar suscripción"
              onPress={() => router.push("tabs/client/pauseSubscription")}
              backgroundColor="#198754"
              width="90%"
            />
          </View>
          <View style={styles.buttonTwo}>
            <CustomButton
              text="Cancelar suscripción"
              onPress={() => router.push("tabs/client/stopSubscription")}
              backgroundColor="#DC3545"
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
    top: 120,
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
    flexDirection: "row", // ← Fundamental
    alignItems: "center", // ← Alinea verticalmente
    justifyContent: "flex-start", // Espacio entre logo y texto
    alignSelf: "flex-start",
  },
  logo: {
    marginTop: -20,
    marginLeft: -90,
    width: 350,
    height: 350,
    resizeMode: "contain", // para que no se deforme
  },
  Title: {
    marginTop: 0,
    marginLeft: -90,
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  containerContent: {
    flexGrow: 1,
    marginTop: -133,
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 30,
  },
  text: {
    fontSize: 25,
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    width: 330,
  },
  textTwo: {
    marginTop: 15,
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
    color: "#000",
    textAlign: "center",
    width: 330,
  },
  button: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonTwo: {
    width: "100%",
    alignItems: "center",
  },
});
