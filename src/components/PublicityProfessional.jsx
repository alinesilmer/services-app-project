// PublicityProfessional: carousel of images with prev/next controls using useCarousel hook.
// Props: uris - array of image URIs
//------------------------------------------------------------------//

import { View, Image, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
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
          <Feather name="chevron-left" size={Metrics.iconSmall} color={Colors.whiteColor} />
        </Pressable>

        <Pressable onPress={goNext} style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed
        ]}>
          <Feather name="chevron-right" size={Metrics.iconSmall} color={Colors.whiteColor} />
        </Pressable>
      </View>
    </View>
  );
};

export default PublicityProfessional;

const styles = StyleSheet.create({
  container: {
    width: Metrics.animationXL,
    height: Metrics.publicityHome,
    borderRadius: Metrics.radiusS,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: Metrics.marginM,
    position: 'relative',
  },
  image: {
    width: wp("100%"),
    height: Metrics.publicityHome
  },
  overlay: {
    position: 'absolute',
    width: Metrics.animationXL,
    height: Metrics.publicityHome,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.marginS,
  },
  button: {
    backgroundColor: Colors.inputGray,
    padding: Metrics.marginS,
    borderRadius: Metrics.radiusM,
  },
  buttonPressed: {
    backgroundColor: 'gray',
  },
});
