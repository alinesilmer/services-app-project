import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const ServiceItem = ({ label, icon, useFeather = true, onPress }) => {
  const IconComponent = useFeather ? Feather : FontAwesome5;

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <IconComponent name={icon} size={24} color="#E67E22" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '23%',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 12,
    color: '#444',
  },
});

export default ServiceItem;
