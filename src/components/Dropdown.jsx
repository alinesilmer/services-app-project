"use client"

import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useLocalSearchParams } from "expo-router"
import { Colors } from "../constants/Colors"
import { Metrics } from "../constants/Metrics"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

const SERVICES = [
  { label: "Plomería", icon: "tool", useFeather: true },
  { label: "Refacción", icon: "home", useFeather: true },
  { label: "Electricista", icon: "zap", useFeather: true },
  { label: "Carpintería", icon: "hammer", useFeather: false },
  { label: "Limpieza", icon: "broom", useFeather: false },
  { label: "Pintura", icon: "paint-roller", useFeather: false },
  { label: "Mudanza", icon: "box", useFeather: true },
  { label: "Técnico", icon: "tools", useFeather: false },
]

const Dropdown = ({ initialValue, onSelect }) => {
  const { label } = useLocalSearchParams()
  const [selected, setSelected] = useState(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (initialValue) {
      const found =
        typeof initialValue === "string" ? SERVICES.find((item) => item.label === initialValue) : initialValue
      if (found) setSelected(found)
    }
  }, [initialValue])

  const handleSelect = (item) => {
    setSelected(item)
    setExpanded(false)
    if (onSelect) onSelect(item)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdown} activeOpacity={0.8} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.dropdownText}>{selected ? selected.label : label}</Text>
        <AntDesign name={expanded ? "up" : "down"} size={Metrics.iconSmall} color={Colors.text333} />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.dropdownList}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={true} nestedScrollEnabled={true}>
            {SERVICES.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.item}
                activeOpacity={0.8}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: wp("85%"),
    marginHorizontal: 0,
    marginTop: Metrics.marginS,
    marginBottom: Metrics.marginS,
    zIndex: 10,
  },
  dropdown: {
    backgroundColor: Colors.light.background,
    borderRadius: Metrics.radiusS,
    padding: Metrics.marginS,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: Colors.textColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownText: {
    fontSize: Metrics.fontM,
    color: Colors.textColor,
  },
  dropdownList: {
    backgroundColor: Colors.whiteColor,
    borderRadius: Metrics.radiusS,
    marginTop: Metrics.marginS,
    elevation: 3,
    shadowColor: Colors.textColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxHeight: 200,
  },
  scrollContainer: {
    maxHeight: 200, 
  },
  item: {
    paddingVertical: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
    borderBottomWidth: Metrics.marginXS,
    borderBottomColor: "#f0f0f0",
  },
  itemText: {
    fontSize: Metrics.fontS,
    color: Colors.textColor,
  },
})

export default Dropdown
