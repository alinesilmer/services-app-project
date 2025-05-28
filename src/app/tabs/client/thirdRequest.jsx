import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import CustomButton from "../../../components/CustomButton";
const image = require("../../../assets/images/aireVentana.png");
export default function ThirdRequest() {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a2f68" />
      <View style={styles.containerRequest}>
        <View style={styles.containerContent}>
          <View>
            <Text style={styles.title}>REPARACION DE AIRE{"\n"}ACONDICIONADO</Text>
          </View>
          <View>
            <Text style={styles.text}>Problema/s identificado/s.</Text>
            <View style={{ alignSelf: "flex-start", paddingHorizontal: 20 }}>
              <Text style={styles.list}>• No enfría, solo ventila</Text>
              <Text style={styles.list}>• Botón de encendido, no funciona</Text>
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
                height:170,
                marginTop: -20,
              }}
            />
          </View>
          <View style={styles.button}>
            <CustomButton
              text="Cancelar solicitud"
              onPress={() => router.push("tabs/client/secondRequest")}
              backgroundColor="#DC3545"
              width="80%"
            />
          </View>
        </View>
      </View>
    </>
  );
}

export const styles = StyleSheet.create({
  containerRequest: {
    flex: 1,
    backgroundColor: "#1a2f68",
  },
  containerContent: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    borderTopLeftRadius: 120,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "flex-start",
    marginTop: 80, // 🔹 Esto baja el contenedor blanco
  },
  title: {
    marginTop: 10,
    fontSize: 25,
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
    textAlign:"justify",
    width: "80%",
    paddingLeft: 40,
  },
  text: {
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
    marginTop: 10,
    fontWeight: "bold",
  },
  list: {
    color: "#e47755",
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
    marginTop: 10,
  },
  button: {
    backgroundColor:"#red",
    marginTop: -30,
    width: "90%",
    alignItems: "center",
  },
});

