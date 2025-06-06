// NavBar: bottom navigation bar with icons for different routes, highlights on press.
// Uses Pressable and Feather icons; routes via useRouter.
//------------------------------------------------------------------//

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { getUserProfile } from '../utils/storage';

const NavBar = () => {
  const [pressedIcon, setPressedIcon] = useState(null);
  const [userType, setUserType] = useState(null);
  const router = useRouter(); 

  useEffect(() => {
    const fetchUserType = async () => {
      const profile = await getUserProfile();
      setUserType(profile?.userType || 'client');
    };
    fetchUserType();
  }, []);

  const renderItem = (icon, label, onPress) => {
    const isPressed = pressedIcon === icon;

    const TouchableComponent = onPress ? Pressable : TouchableOpacity;

    return (
      <TouchableComponent
        style={styles.item}
        activeOpacity={0.7}
        onPressIn={() => setPressedIcon(icon)}
        onPressOut={() => setPressedIcon(null)}
        onPress={onPress} 
      >
        <Feather name={icon} size={23} color={isPressed ? Colors.orangeColor : 'white'} />
        <Text style={[styles.label, { color: isPressed ? Colors.orangeColor : 'white' }]}>{label}</Text>
      </TouchableComponent>
    );
  };

  const basePath = userType === 'professional' ? 'professional' : 'client';
  // TODO: Cambiar estas lineas cuando esten listas la ruta del home de profesionales
  //{renderItem('home', 'Inicio', () => router.push(`tabs/${basePath}/home`))}

  return (
    <View style={styles.container}>
      {renderItem('home', 'Inicio', () => router.push(`tabs/client/home`))}
      {renderItem('message-square', 'Chat', () => router.push(`tabs/chat`))}
      {renderItem('calendar', 'Agenda', () => router.push(`tabs/${basePath}/myAppointments`))}
      {renderItem('user', 'Perfil', () => router.push(`tabs/${basePath}/dashboard`))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: hp(10),
    flexDirection: 'row',
    backgroundColor: Colors.blueColor,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
  },
  item: {
    alignItems: 'center',
  },
  label: {
    fontSize: hp(2),
    marginTop: hp(0.5),
  },
});

export default NavBar;
