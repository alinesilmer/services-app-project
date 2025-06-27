import * as React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { Metrics } from "../constants/Metrics";

export default function ButtonCamera({ title, onPress, icon, color }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Feather name="icon" size={Metrics.iconMedium} color={Colors.white} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: Metrics.buttonHeight,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: Colors.white,
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    marginLeft: Metrics.marginS,
  },
});
