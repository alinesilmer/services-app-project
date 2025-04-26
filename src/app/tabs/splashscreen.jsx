import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { MotiImage } from 'moti';
import { useRouter } from 'expo-router';
import {
  Feather,
  FontAwesome5,       
} from '@expo/vector-icons';

const { width } = Dimensions.get('window');


const serviceIcons = [
  'hammer', 'broom', 'paint-roller', 'tools',
  'box-open', 'user-cog', 'toolbox', 'bolt',
  'home', 'wrench', 'truck', 'hands-helping',
];

const isFeather = icon => ['hammer', 'tool', 'home', 'truck', 'box'].includes(icon);

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace('/tabs'), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
       <StatusBar barStyle="light-content" />
      <View style={styles.iconRow}>
        {serviceIcons.slice(0, 6).map(icon => (
          <View key={icon} style={styles.iconContainer}>
            {isFeather(icon) ? (
              <Feather name={icon} size={40} color="black" />
            ) : (
              <FontAwesome5 name={icon} size={40} color="black" />
            )}
          </View>
        ))}
      </View>

      <MotiImage
        source={require('../../assets/images/logo-service-app.png')}
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 1200 }}
        style={styles.logo}
      />

      <View style={styles.iconRow}>
        {serviceIcons.slice(6).map(icon => (
          <View key={icon} style={styles.iconContainer}>
            {isFeather(icon) ? (
              <Feather name={icon} size={40} color="black" />
            ) : (
              <FontAwesome5 name={icon} size={40} color="black" />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container  : { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  logo       : { width: width * 0.5, height: width * 0.5, resizeMode: 'contain', marginVertical: 40 },
  iconRow    : { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  iconContainer: { margin: 6 },
});
