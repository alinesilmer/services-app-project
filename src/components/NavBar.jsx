import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

const NavBar = ({ navigation }) => {
  const [pressedIcon, setPressedIcon] = useState(null);

  const renderItem = (icon, label) => {
    const isPressed = pressedIcon === icon;

    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.7}
        onPressIn={() => setPressedIcon(icon)}
        onPressOut={() => setPressedIcon(null)}
      >
        <Feather name={icon} size={28} color={isPressed ? Colors.orangeColor : 'white'} />
        <Text style={[styles.label, { color: isPressed ? Colors.orangeColor : 'white' }]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderItem('home', 'Inicio')}
      {renderItem('message-square', 'Chat')}
      {renderItem('calendar', 'Agenda')}
      {renderItem('user', 'Perfil')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '12%',
    flexDirection: 'row',
    backgroundColor: Colors.blueColor,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  item: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default NavBar;
