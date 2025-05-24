import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Dropdown from "./Dropdown";
import { Colors } from "../constants/Colors";

export default function ServiceDropdown({ onSelect }) {
  return (
    <View style={styles.container}>
      
      <Dropdown onSelect={onSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "70%",
    marginLeft: "23.6%",
    alignItems: "flex-start",
  },
  label: {
    marginTop: 20,
    textAlign: "left",
    fontSize: 13,
    color: Colors.serviceLabel,
  },
});
