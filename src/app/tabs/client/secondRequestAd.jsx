import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import CustomButton from "../../../components/CustomButton";
import SlideUpCard from "../../../components/SlideUpCard";
import { Feather } from "@expo/vector-icons";
import AdsImage from "../../../components/AdsImage";
import { Colors } from "../../../constants/Colors";
import { Fonts } from "../../../constants/Fonts";
import { getUserData, isPremiumUser } from "../../../utils/storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function SecondRequest() {
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
          <SlideUpCard title="Solicitudes" style={styles.card}>
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
                Reparación de aire acondicionado
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
              <Text style={styles.titleThree}>Maestro mayor de obra</Text>
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
                width="100%"
              />
            </View>
             <View style={styles.imageContainer}>
              <AdsImage onPress isPremium={premium} />
            </View>
          </SlideUpCard>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerRequest: {
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: Colors.blueColor,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
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
    marginTop: 20,
    fontSize: 30,
    fontFamily: Fonts.montserrat,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  titleTwo: {
    fontSize: 20,
    fontFamily: Fonts.montserrat,
    fontWeight: "bold",
    color: "#e47755",
    marginBottom: 10,
  },
  titleThree: {
    MarginTop: 10,
    fontSize: 16,
    fontFamily: Fonts.montserrat,
    fontWeight: "bold",
    color: Colors.textColor,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 8,
  },
  imageContainer: {
    width: "100%",
  },
});
