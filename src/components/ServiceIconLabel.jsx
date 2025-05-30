import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ServiceIconLabel({ label, icon, useFeather }) {
  const IconComponent = useFeather ? Feather : FontAwesome5;

  return (
    <View style={styles.selectedService}>
      <View style={styles.item}>
        <IconComponent name={icon} size={39} color={Colors.textColor} />
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
    paddingHorizontal: wp("5%"),
    marginTop: hp("2%"),
    gap: 10,
  },
  item: {
    width: 75,
    height: 75,
    borderColor: Colors.inputGray,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedLabel: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    color: Colors.whiteColor,
  },
  divider: {
    height: wp("1.4%"),
    backgroundColor: Colors.whiteColor,
    marginVertical: 4,
    width: wp("70%"),
    alignSelf: "center",
  },
});
