import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const ServiceItem = ({ label, icon, useFeather = true, onPress }) => {
  const IconComponent = useFeather ? Feather : FontAwesome5;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.item} onPress={onPress}>
        <IconComponent name={icon} size={29} color={Colors.blueColor} />
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    margin: 8,
  },
  item: {
    width: 80,
    height: 80,
    borderStyle: "solid",
    borderColor: Colors.inputGray,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  label: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textColor,
  },
});

export default ServiceItem;
