import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

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
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    width: "60%",
    alignSelf: "center",
  },
  title: {
    color: "#ccc",
    fontSize: wp("3.5%"),
    marginBottom: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  circle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: Colors.orangeColor,
  },
  label: {
    color: "white",
    fontSize: wp("3.5%"),
  },
});
