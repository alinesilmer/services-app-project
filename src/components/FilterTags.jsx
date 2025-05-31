import { View, Text, StyleSheet } from "react-native"
import { Colors } from "../constants/Colors"

const FilterTags = ({ selectedSubcategories }) => {
  if (selectedSubcategories.length === 0) return null

  return (
    <View style={styles.selectedFiltersContainer}>
      <Text style={styles.selectedFiltersLabel}>Filtros activos:</Text>
      <View style={styles.filterTagsContainer}>
        {selectedSubcategories.map((subcategory) => (
          <View key={subcategory} style={styles.filterTag}>
            <Text style={styles.filterTagText}>{subcategory}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  selectedFiltersContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  selectedFiltersLabel: {
    fontSize: 14,
    color: Colors.whiteColor,
    marginBottom: 8,
    fontWeight: "bold",
  },
  filterTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 5,
  },
  filterTag: {
    backgroundColor: Colors.orangeColor,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 5,
  },
  filterTagText: {
    color: Colors.whiteColor,
    fontSize: 12,
    fontWeight: "bold",
  },
})

export default FilterTags
