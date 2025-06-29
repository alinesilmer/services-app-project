import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { Metrics } from "../constants/Metrics";
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

export default function FilterSelector({ selectedFilter, setSelectedFilter }) {
  const radioOptions = [
    { key: "valorados", label: "Mejores valorados" },
    { key: "solicitados", label: "Más solicitados" },
    { key: "cercanos", label: "Más cercanos" },
  ];

  return (
    <View style={styles.container}>
      {radioOptions.map((option) => (
        <TouchableOpacity
        activeOpacity={0.6}
          key={option.key}
          style={styles.option}
          onPress={() => setSelectedFilter(option.key)}
        >
          <View style={styles.circle}>
            {selectedFilter === option.key && <View style={styles.dot} />}
          </View>
          <Text style={styles.label}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.marginS,
    paddingVertical: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    width: wp("60%"),
    alignSelf: "center",
  },
  title: {
    color: "#ccc",
    fontSize: Metrics.fontS,
    marginBottom: Metrics.marginS,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Metrics.marginS,
  },
  circle: {
    height: 18,
    width: 18,
    borderRadius: Metrics.radiusS,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.whiteColor,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Metrics.marginS,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: Metrics.radiusS,
    backgroundColor: Colors.orangeColor,
  },
  label: {
    color: Colors.whiteColor,
    fontSize: wp("3.5%"),
  },
});
