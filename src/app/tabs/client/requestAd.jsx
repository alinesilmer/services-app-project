import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  TextInput,
  StyleSheet,
  ScrollView
} from "react-native";
import { StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../../../components/CustomButton";
import { KeyboardAvoidingView } from "react-native";
import { Colors } from "../../../constants/Colors";
import { Fonts } from "../../../constants/Fonts";
import { getUserData, isPremiumUser } from "../../../utils/storage";
import AdsImage from "../../../components/AdsImage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"

export default function request() {
  const router = useRouter();
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    const loadPremiumStatus = async () => {
      try {
        getUserData()
        const premium = await isPremiumUser();
        console.log("Premium status:", premium);
        
        setPremium(premium);
      } catch (error) {
        console.error("Error loading premium status:", error);
      }
    };

    loadPremiumStatus();
  }, []);

  return (
    <>
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      ></KeyboardAvoidingView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerContent}>
          <View>
            <Text style={styles.title}>Crear Solicitud Personalizada</Text>
          </View>
          <View>
            <Text style={styles.description}>
              ¿No encontraste el servicio que necesitás? ¡No hay problema!
            </Text>
            <Text style={styles.description}>
              Acá podés crear un pedido personalizado explicando lo que
              necesitás.
            </Text>
          </View>
          <View style={styles.rectangle}>
            <TextInput
              style={styles.text}
              placeholder="Necesito urgentemente..."
            />
            <Feather
              name="x-circle"
              size={24}
              color="black"
              style={[
                styles.Icon,
                { position: "absolute", top: 20, right: 10 },
              ]}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              text="Tomar foto"
              onPress={() => router.push("tabs/client/photoGallery")}
              style={styles.customBotton}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              text="Confirmar solicitud personalizada"
              onPress={() => router.push("tabs/client/secondRequestAd")}
              backgroundColor="#198754"
              style={styles.customBotton}
            />
          </View>
          <View style={styles.imageContainer}>
            <AdsImage onPress isPremium={premium} />
          </View>
        </View>
      </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.blueColor,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  containerContent: {
    flexGrow: 1,
    marginTop: hp('30%'),
    width: wp('100%'),
    height: hp('100%'),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: 120,
  },
  title: {
    fontSize: 30,
    fontFamily: Fonts.montserrat,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  description: {
    marginTop: 10,
    fontFamily: Fonts.roboto,
    fontSize: 16,
    color: Colors.orangeColor,
    textAlign: "center",
    width: 330,
  },
  rectangle: {
    width: 310,
    height: 160,
    backgroundColor: Colors.inputGray,
    borderColor: Colors.blueColor,
    borderWidth: 3,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: hp('5%'),
    marginBottom: hp('5%'),
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
  },
  customBotton: {
    marginTop: hp('20%'),
    width: '100%'
  }
});
