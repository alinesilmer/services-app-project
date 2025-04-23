import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LongCard = ({ title, subtitle, content }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    elevation: 3
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 5
  },
  content: {
    fontSize: 16
  }
});

export default LongCard;