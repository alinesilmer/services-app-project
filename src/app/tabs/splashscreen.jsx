import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { MotiImage } from 'moti';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';  

const { width } = Dimensions.get('window');
const serviceIcons = [
  'hammer', 'broom', 'paint-roller', 'tools', 'box', 'user-cog', 
  'tool', 'zap', 'home', 'wrench', 'truck', 'hands-helping',
];

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log("SplashScreen is rendering...");
    const timeout = setTimeout(() => {
      console.log("Navigating to home...");
      router.replace('/');
    }, 2000); 
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        {serviceIcons.slice(0, 6).map((icon, i) => (
          <View key={i} style={styles.iconContainer}>
            <Feather
              name={icon}
              size={40}  
              color="black"  
              style={styles.icon}
            />
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
        {serviceIcons.slice(6).map((icon, i) => (
          <View key={i} style={styles.iconContainer}>
            <Feather
              name={icon}
              size={40}  
              color="black"  
              style={styles.icon}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    marginVertical: 40,
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 6,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  iconContainer: {
    marginHorizontal: 6,
  },
});
