import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { Metrics } from "../constants/Metrics";
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

const SubcategorySelector = ({
  selectedService,
  subcategories,
  selectedSubcategories,
  toggleSubcategory,
}) => {
  if (!selectedService || !subcategories[selectedService.label]) return null;

  return (
    <View style={{ marginTop: Metrics.marginS }}>
      {subcategories[selectedService.label].map((sub, index) => (
        <TouchableOpacity
        activeOpacity={0.85}
          key={index}
          style={[styles.checkboxContainer, styles.containerCheck]}
          onPress={() => toggleSubcategory(sub)}
        >
          <View style={styles.checkbox}>
            {selectedSubcategories[sub] && <View style={styles.checked} />}
          </View>
          <View>
            <Text style={styles.subcategoryText}>{sub}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginTop: Metrics.marginS,
    marginLeft: Metrics.marginS,
    fontSize: Metrics.fontS,
    color: Colors.serviceLabel,
  },
  containerCheck: {
    width: wp("70%"),
    marginLeft: Metrics.marginXXL,
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    marginBottom: Metrics.marginS,
  },
  checkbox: {
    width: Metrics.iconXSmall,
    height: Metrics.iconXSmall,
    marginTop: Metrics.marginS,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.inputGray,
    marginRight: Metrics.marginS,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.blueColor,
    borderRadius: Metrics.radiusS
  },
  checked: {
    width: Metrics.iconXSmall * 0.4,
    height: Metrics.iconXSmall * 0.4,
    backgroundColor: Colors.orangeColor,
    borderRadius: Metrics.marginXS,
  },
  subcategoryText: {
    fontSize: Metrics.fontXS,
    borderRadius: Metrics.radiusS,
    padding: Metrics.marginS,
    color: Colors.textColor,
    backgroundColor: Colors.whiteColor,
    width: wp("70%"),
    borderColor: Colors.inputGray,
    borderWidth: Metrics.marginXS,
  },
});

export default SubcategorySelector