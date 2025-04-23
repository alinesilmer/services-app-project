import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ServiceItem from './ServiceItem';

const SERVICES = [
  { label: 'Plomería', icon: 'tool', useFeather: true },
  { label: 'Refacción', icon: 'home', useFeather: true },
  { label: 'Electricista', icon: 'zap', useFeather: true },
  { label: 'Carpintería', icon: 'hammer', useFeather: false },
  { label: 'Limpieza', icon: 'broom', useFeather: false },
  { label: 'Pintura', icon: 'paint-roller', useFeather: false },
  { label: 'Mudanza', icon: 'box', useFeather: true },
  { label: 'Técnico', icon: 'tools', useFeather: false },
];

const ServiceList = () => {
  return (
    <FlatList
      data={SERVICES}
      renderItem={({ item }) => (
        <ServiceItem
          label={item.label}
          icon={item.icon}
          useFeather={item.useFeather}
          onPress={() => console.log(`${item.label} pressed`)}
        />
      )}
      keyExtractor={(item) => item.label}
      numColumns={4}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});


export default ServiceList;