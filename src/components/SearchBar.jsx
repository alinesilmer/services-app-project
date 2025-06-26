import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Metrics } from '../constants/Metrics';
import { Colors } from '../constants/Colors';

const SearchBar = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <Feather name="search" size={Metrics.iconSmall} color="gray" style={styles.icon} />
      <TextInput
        placeholder={placeholder || "Buscar servicios..."}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Metrics.marginS,
    alignItems: 'center',
    borderRadius: Metrics.radiusS,
    height: Metrics.searchBarArea,
    elevation: 3,
    marginBottom: Metrics.marginS
  },
  icon: {
    marginLeft: Metrics.marginM,
    marginRight: Metrics.marginM
  },
  input: {
    flex: 1,
    color: "gray"
  },
});

export default SearchBar;
