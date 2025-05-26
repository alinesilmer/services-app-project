import { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const AdsImage = ({ onPress, style }) => {
  const [currentAd, setCurrentAd] = useState(null);
  const router = useRouter();
  const handleGoPremium = () => {
    router.push("/tabs/goPremium");
  };

  const adsImages = [
    require("../assets/ads/ads1.jpeg"),
    require("../assets/ads/ads2.jpeg"),
    require("../assets/ads/ads3.jpeg"),
    require("../assets/ads/ads4.jpeg"),
    require("../assets/ads/ads5.jpeg"),
  ];

  const getRandomAd = () => {
    const randomIndex = Math.floor(Math.random() * adsImages.length);
    return adsImages[randomIndex];
  };

  useEffect(() => {
    setCurrentAd(getRandomAd());
  }, []);

  const changeAd = () => {
    setCurrentAd(getRandomAd());
  };

  if (!currentAd) {
    return null;
  }

  const AdContent = (
    <View style={[styles.container, style]}>
      <Image source={currentAd} style={styles.image} resizeMode="cover" />
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={handleGoPremium} activeOpacity={0.9}>
        {AdContent}
      </TouchableOpacity>
    );
  }

  return AdContent;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    height: 70,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default AdsImage;
