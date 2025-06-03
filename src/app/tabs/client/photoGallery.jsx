import React from "react";
import { View, Text, Image, Platform, StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { KeyboardAvoidingView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
const image = require("../../../assets/images/photo.png");

export default function PhotoGallery() {
  const router = useRouter();
  return (
    <>
    <View style={styles.containerContent}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      ></KeyboardAvoidingView>
      
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
    width: wp('100%'),
    height: hp('100%'),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: 120,
  },
  });
