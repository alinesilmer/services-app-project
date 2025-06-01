import React from "react";
import { View, Text, Image, Platform, StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView } from "react-native";
const image = require("../../../assets/images/photo.png");
export default function PhotoGallery() {
  const router = useRouter();
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a2f68" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      ></KeyboardAvoidingView>
      <View style={styles.containerContent}>
        <View>
         <Image source={image} style={{ width: 355, height: 750, marginTop:-65 }} />
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  containerContent: {
    flexGrow: 1,
    marginTop: 50,
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
    borderTopLeftRadius: 120,
  },
  });
