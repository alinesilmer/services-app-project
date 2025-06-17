// NavBar: bottom navigation bar with icons for different routes, highlights on press.
// Uses Pressable and Feather icons; routes via useRouter.
//------------------------------------------------------------------//

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { getUserProfile, isUserLoggedIn } from '../utils/storage';

const NavBar = () => {
  const [pressedIcon, setPressedIcon] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const logged = await isUserLoggedIn();
      setIsLoggedIn(logged);

      const profile = await getUserProfile();
      setUserType(profile?.userType || null); 
    };
    fetchData();
  }, []);

  const handleProtectedRoute = (route) => {
    if (!isLoggedIn) {
      router.push('/auth/login'); 
    } else {
      router.push(route);
    }
  };

const renderItem = (icon, label, route, isHome = false) => {
  const isPressed = pressedIcon === icon;

  return (
    <Pressable
      style={styles.item}
      onPressIn={() => setPressedIcon(icon)}
      onPressOut={() => setPressedIcon(null)}
      onPress={() => {
        if (isHome) {
          router.push(`tabs/client/home`);
        } else if (route === 'chat') {
          handleProtectedRoute(`tabs/chat`);
        } else {
          const basePath = userType === 'professional' ? 'professional' : 'client';
          handleProtectedRoute(`tabs/${basePath}/${route}`);
        }
      }}
    >
      <Feather name={icon} size={23} color={isPressed ? Colors.orangeColor : 'white'} />
      <Text style={[styles.label, { color: isPressed ? Colors.orangeColor : 'white' }]}>{label}</Text>
    </Pressable>
  );
};


  return (
    <View style={styles.container}>
      {renderItem('home', 'Inicio', 'home')}
      {renderItem('message-square', 'Chat', 'chat')}
      {renderItem('calendar', 'Agenda', 'myAppointments')}
      {renderItem('user', 'Perfil', 'dashboard')}
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
