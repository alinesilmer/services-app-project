import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import CustomButton from "../../../components/CustomButton";
const Ad2Ima = require("../../../assets/images/Ad2.png");
// Icons
import { Feather } from "@expo/vector-icons";

export default function SecondRequest() {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a2f68" />
      <View style={styles.containerRequest}>
        <View style={styles.containerContent}>
          <View>
            <Text style={styles.title}>SOLICITUDES</Text>
          </View>
          <View>
            <Image
              source={Ad2Ima}
              style={{ width: 360, height: 90, marginTop: -20 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather
              name="alert-circle"
              size={35}
              color="#e47755"
              fontWeight="bold"
            />
            <Text style={[styles.titleTwo, { marginLeft: 20 }]}>
              ¡SE NECESITA!
            </Text>
          </View>
          <View>
            <Text style={styles.titleThree}>
              Reparación de aire{"\n"}acondicionado
            </Text>
          </View>
          <View>
            <CustomButton
              text="Ver detalles de la solicitud"
              onPress={() => router.push("tabs/client/thirdRequestAd")}
              backgroundColor="#98969B"
              width="90%"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Feather
              name="alert-circle"
              size={35}
              color="#e47755"
              fontWeight="bold"
            />
            <Text style={[styles.titleTwo, { marginLeft: 20 }]}>
              ¡SE NECESITA!
            </Text>
          </View>
          <View>
            <Text style={styles.titleThree}>Maestro mayor de{"\n"}obra</Text>
          </View>
          <View>
            <CustomButton
              text="Ver detalles de la solicitud"
              onPress={() => router.push("tabs/client/thirdRequestAd")}
              backgroundColor="#98969B"
              width="90%"
            />
          </View>
          <View style={styles.button}>
            <CustomButton
              text="Agregar solicitud personalizada"
              onPress={() => router.push("tabs/client/requestAd")}
              backgroundColor="#198754"
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerRequest: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1a2f68",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  containerContent: {
    flexGrow: 1,
    marginTop: 80,
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
    borderTopLeftRadius: 120,
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
    marginBottom: 40,
  },
  titleTwo: {
    fontSize: 30,
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
    color: "#e47755",
    marginBottom: 10,
  },
  titleThree: {
    MarginTop: 10,
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
    color: "#black",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 8,
  },
});
