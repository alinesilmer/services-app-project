import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const NavBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item}>
        <Feather name="home" size={20} color="#fff" />
        <Text style={styles.label}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Feather name="message-square" size={20} color="#fff" />
        <Text style={styles.label}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Feather name="calendar" size={20} color="#fff" />
        <Text style={styles.label}>Agenda</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Feather name="user" size={20} color="#fff" />
        <Text style={styles.label}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1D267D',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  item: {
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});

export default NavBar;