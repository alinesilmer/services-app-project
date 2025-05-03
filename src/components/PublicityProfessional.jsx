// PublicityProfessional: carousel of images with prev/next controls using useCarousel hook.
// Props: uris - array of image URIs
//------------------------------------------------------------------//

import { View, Image, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import useCarousel from '../hooks/useCarrousel'; 

const PublicityProfessional = ({ uris = [] }) => {
  const { currentIndex, goNext, goPrevious } = useCarousel(uris.length);

  if (uris.length === 0) return null; 

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: uris[currentIndex] }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Pressable onPress={goPrevious} style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed
        ]}>
          <Feather name="chevron-left" size={24} color="white" />
        </Pressable>

        <Pressable onPress={goNext} style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed
        ]}>
          <Feather name="chevron-right" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default PublicityProfessional;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 40,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Colors.inputGray,
    padding: 4,
    borderRadius: 50,
  },
  buttonPressed: {
    backgroundColor: 'gray',
  },
});
