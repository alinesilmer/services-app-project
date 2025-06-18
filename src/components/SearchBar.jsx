import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <Feather name="search" size={15} color="gray" style={styles.icon} />
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
    backgroundColor: 'white',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    elevation: 3,
    marginBottom: 10
  },
  icon: {
    marginLeft: 15,
    marginRight: 8
  },
  input: {
    flex: 1,
    color: "gray"
  },
});

export default SearchBar;
