import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { Metrics } from "../constants/Metrics";

export default function ServiceIconLabel({ label, icon, useFeather }) {
  const IconComponent = useFeather ? Feather : FontAwesome5;

  return (
    <View style={styles.selectedService}>
      <View style={styles.item}>
        <IconComponent name={icon} size={Metrics.iconMedium} color={Colors.textColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.selectedLabel}>
          CATEGORÍA: <Text style={{ fontStyle: "italic" }}>{label}</Text>
        </Text>
        <View style={styles.divider} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedService: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Metrics.marginM,
    marginTop: Metrics.marginM,
    gap: Metrics.marginM,
  },
  item: {
    width: Metrics.iconXLarge,
    height: Metrics.iconXLarge,
    borderColor: Colors.inputGray,
    borderWidth: Metrics.marginXS,
    backgroundColor: Colors.whiteColor,
    borderRadius: Metrics.radiusS,
    padding: Metrics.marginXS,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedLabel: {
    fontSize: Metrics.fontL,
    fontWeight: "bold",
    color: Colors.whiteColor,
  },
  divider: {
    height: Metrics.marginXS,
    backgroundColor: Colors.whiteColor,
    marginVertical: Metrics.marginS,
    width: Metrics.publicityHome * 1.2,
    alignSelf: "flex-start",
  },
});
