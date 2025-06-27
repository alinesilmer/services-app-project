import React, { useEffect, useState } from 'react';
import { Image, Text, View, StyleSheet, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Metrics } from '../../constants/Metrics';
const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const router = useRouter();
  const [canNavigate, setCanNavigate] = useState(false);

  const floatingIcons = [
    { 
      icon: <MaterialIcons name="handyman" size={Metrics.iconLarge} color={Colors.whiteColor} />, 
      delay: 400 
    },
    { 
      icon: <MaterialIcons name="settings" size={Metrics.iconLarge} color={Colors.whiteColor} />, 
      delay: 600 
    },
    { 
      icon: <MaterialIcons name="dry-cleaning" size={Metrics.iconLarge} color={Colors.whiteColor} />, 
      delay: 800 
    },
    { 
      icon: <MaterialIcons name="content-cut" size={Metrics.iconLarge} color={Colors.whiteColor} />, 
      delay: 1000 
    },
    { 
      icon: <MaterialIcons name="local-florist" size={Metrics.iconLarge} color={Colors.whiteColor} />, 
      delay: 1200 
    },
    { 
      icon: <MaterialIcons name="imagesearch-roller" size={Metrics.iconLarge} color={Colors.whiteColor} />, 
      delay: 1400 
    },
    { 
      icon: <MaterialIcons name="local-dining" size={Metrics.iconLarge} color={Colors.whiteColor} />, 
      delay: 1600 
    },
    { 
      icon: <MaterialIcons name="plumbing" size={Metrics.iconLarge} color={Colors.whiteColor} />, 
      delay: 1800 
    },
    { 
      icon: <MaterialIcons name="electrical-services" size={Metrics.iconLarge} color={Colors.whiteColor} />, 
      delay: 2000 
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanNavigate(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!canNavigate) return;

    const timer = setTimeout(() => {
      try {
        router.replace('/tabs/welcome');
      } catch (error) {
        console.log('Error navegando:', error);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [canNavigate, router]);

  
  const centerX = width / 2;
  const centerY = height / 2 - height * 0.08;
  const radius = Math.min(width, height) * 0.35;

  const getCircularPosition = (index, total) => {
    const angle = (index * 2 * Math.PI) / total;
    const x = centerX + radius * Math.cos(angle) - 20;
    const y = centerY + radius * Math.sin(angle) - 20;
    return { left: x, top: y };
  };

  return (
    <View style={styles.container}>
      {/* Contenedor principal centrado */}
      <View style={styles.contentContainer}>
        {/* Iconos flotantes en círculo */}
        {floatingIcons.map((item, index) => (
          <MotiView
            key={index}
            from={{
              opacity: 0,
              scale: 0,
              rotate: '180deg',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: '0deg',
            }}
            transition={{
              type: 'spring',
              delay: item.delay,
              duration: 800,
              damping: 15,
              stiffness: 100,
            }}
            style={[
              styles.floatingIcon, 
              getCircularPosition(index, floatingIcons.length)
            ]}
          >
            {item.icon}
          </MotiView>
        ))}

        {/* Ícono central */}
        <MotiView
          from={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            type: 'spring',
            delay: 100,
            duration: 1000,
            damping: 12,
            stiffness: 80,
          }}
          style={[styles.centerIconContainer, { top: centerY - width * 0.25 }]}
        >
          <Image 
            source={require('../../assets/images/icon.png')}
            style={styles.centerIcon}
            resizeMode="contain"
          />
        </MotiView>

        {/* Texto debajo del círculo */}
        <MotiView
          from={{
            opacity: 0,
            translateY: 50,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          transition={{
            type: 'timing',
            delay: 2200,
            duration: 800,
          }}
          style={[
            styles.textContainer,
            { top: centerY + radius + 50 }
          ]}
        >
          <Text style={styles.mainTitle}>Dilo</Text>
          <Text style={styles.subtitle}>Pedilo. Hecho.</Text>
        </MotiView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  floatingIcon: {
    position: 'absolute',
    zIndex: 1,
  },
  centerIconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: width / 2 - width * 0.25,
  },
  centerIcon: {
    width: width * 0.5,
    height: width * 0.5,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: width,
    left: 0,
  },
  mainTitle: {
    fontSize: Metrics.fontXL,
    fontWeight: 'bold',
    color: Colors.whiteColor,
    marginBottom: Metrics.marginS,
  },
  subtitle: {
    fontSize: Metrics.fontL,
    color: Colors.whiteColor,
    opacity: 0.9,
  },
});

export default SplashScreen;