import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const SubcategorySelector = ({
  selectedService,
  subcategories,
  selectedSubcategories,
  toggleSubcategory,
}) => {
  if (!selectedService || !subcategories[selectedService.label]) return null;

  return (
    <View style={{ marginTop: 10 }}>
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
    marginTop: 10,
    marginLeft: "23.6%",
    fontSize: 13,
    color: Colors.serviceLabel,
  },
  containerCheck: {
    width: "70%",
    marginLeft: "13.6%",
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    marginBottom: 6,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginTop: 13,
    borderWidth: 2,
    borderColor: Colors.inputGray,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.blueColor,
    borderRadius: 4,
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: Colors.orangeColor,
    borderRadius: 2,
  },
  subcategoryText: {
    fontSize: wp("3.5%"),
    borderRadius:10,
    padding: 10,
    color: Colors.textColor,
    backgroundColor: Colors.whiteColor,
    width: wp("70%"),
    borderColor: Colors.inputGray,
    borderWidth: 1,
  },
});

export default SubcategorySelector