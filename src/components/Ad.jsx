import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Video } from 'expo-av';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { useAdTimer } from '../hooks/useAdTimer';

const Ad = ({ visible, onClose, source, type = 'image' }) => {
  const { canClose, timer } = useAdTimer(visible);
  const navigation = useNavigation();

  const handleGoPremium = () => {
    navigation.navigate('Membership'); 
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.adContainer}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose} 
            disabled={!canClose}
          >
            {canClose ? (
              <Feather name="x" size={32} color="white" />
            ) : (
              <LottieView
                source={require('../assets/animations/loading-ad.json')} 
                autoPlay
                loop
                style={styles.lottie}
              />
            )}
          </TouchableOpacity>

          {type === 'image' ? (
            <Image source={source} style={styles.media} resizeMode="cover" />
          ) : (
              <Video
                source={source}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                useNativeControls
                style={styles.media}
              />
          )}

          <Pressable onPress={handleGoPremium} style={styles.premiumLink}>
            <Text style={styles.premiumText}>¿Cansado de anuncios? {"\n"}¡Haz click aquí!</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default Ad;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  adContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: 'black',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  lottie: {
    width: 32,
    height: 32,
  },
  media: {
    width: '100%',
    height: '100%',
  },
  premiumLink: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  premiumText: {
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
    opacity: 0.8,
    textAlign: 'center'
  },
});
