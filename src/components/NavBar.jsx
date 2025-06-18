// NavBar: bottom navigation bar with icons for different routes, highlights on press.
// Uses Pressable and Feather icons; routes via useRouter.
//------------------------------------------------------------------//

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { Colors } from '../constants/Colors';
import { getUserProfile, isUserLoggedIn } from '../utils/storage';

const NavBar = () => {
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [activatedNavBarOption, setActivatedNavBarOption] = useState('home');
  const mainRoutes = ['home', 'chat', 'myAppointments', 'dashboard'];
  const pathname = usePathname();

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

  const getActiveNavOption = () => {
    const found = mainRoutes.find(route => pathname.includes(route));
    return found || activatedNavBarOption;
  }

  const renderItem = (icon, label, route, isHome = false) => {
    const activeRoute = getActiveNavOption();
    
    const isActive = route === activeRoute;
    const iconColor = isActive ? Colors.orangeColor : 'white';
    
    return (
      <Pressable
      style={styles.item}
      onPress={() => {
          setActivatedNavBarOption(route);
          if (route === 'chat') {
            handleProtectedRoute(`tabs/chat`);
          } else {
            const basePath = userType === 'professional' ? 'professional' : 'client';
            handleProtectedRoute(`tabs/${basePath}/${route}`);
          }
        }}
      >
        <Feather name={icon} size={23} color={iconColor} />
        <Text style={[styles.label, { color: iconColor }]}>{label}</Text>
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
    display: "flex",
    width: "100%",
    height: hp(8),
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
