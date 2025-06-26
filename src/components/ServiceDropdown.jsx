import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Dropdown from "./Dropdown";
import { Colors } from "../constants/Colors";
import { Metrics } from "../constants/Metrics";
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

export default function ServiceDropdown({ onSelect }) {
  return (
    <View style={styles.container}>
      
      <Dropdown onSelect={onSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp("90%"),
    marginLeft: Metrics.marginL,
    alignItems: "center",
  },
  label: {
    marginTop: Metrics.marginM,
    textAlign: "left",
    fontSize: Metrics.fontS,
    color: Colors.serviceLabel,
  },
});
