"use client"

import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useLocalSearchParams } from "expo-router"

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
        <AntDesign name={expanded ? "up" : "down"} size={18} color="#333" />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.dropdownList}>
          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={true} nestedScrollEnabled={true}>
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
    width: "86%",
    marginHorizontal: 0,
    marginTop: 10,
    marginBottom: 10,
    zIndex: 10,
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownText: {
    fontSize: 18,
    color: "black",
  },
  dropdownList: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 4,
    elevation: 3,
    shadowColor: "#000",
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemText: {
    fontSize: 18,
    color: "#000",
  },
})

export default Dropdown
