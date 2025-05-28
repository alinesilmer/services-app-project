import React from "react";
import { View, Text, Platform, TextInput, StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../../../components/CustomButton";
import { KeyboardAvoidingView } from "react-native";

export default function request() {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a2f68" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      ></KeyboardAvoidingView>
      <View style={styles.containerRequest}>
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
          <View>
            <CustomButton
              text="Adjuntar foto"
              onPress={() => router.push("tabs/client/secondRequest")}
              width="90%"
            />
          </View>
          <View>
            <CustomButton
              text="Confirmar solicitud personalizada"
              onPress={() => router.push("tabs/client/secondRequest")}
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
  containerRequest: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1a2f68",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: 30,
    fontFamily: "Montserrat_400Regular",
    fontWeight: "bold",
    marginTop:-10,
  },
  description: {
    marginTop: 10,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#B55A3E",
    textAlign: "center",
    width:330,
  },
  rectangle: {
    width: 310,
    height: 160,
    backgroundColor: "#f0f0f0",
    borderColor: "#1a2f68",
    borderWidth: 3,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    //tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    //tabIconSelected: tintColorDark,
  },
  containerContent: {
    flexGrow: 1,
    marginTop: 50,
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
    borderTopLeftRadius:120,
  },
   
});
