import { View, Text, StyleSheet } from "react-native"
import { Colors } from "../constants/Colors"
import { Metrics } from "../constants/Metrics"

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
    marginBottom: Metrics.marginS,
    alignItems: "center",
  },
  selectedFiltersLabel: {
    fontSize: Metrics.fontS,
    color: Colors.whiteColor,
    marginBottom: Metrics.marginS,
    fontWeight: "bold",
  },
  filterTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: Metrics.marginS,
  },
  filterTag: {
    backgroundColor: Colors.orangeColor,
    borderRadius: Metrics.radiusS,
    paddingHorizontal: Metrics.marginS,
    paddingVertical: Metrics.marginS,
    marginBottom: Metrics.marginS,
  },
  filterTagText: {
    color: Colors.whiteColor,
    fontSize: Metrics.fontXS,
    fontWeight: "bold",
  },
})

export default FilterTags
