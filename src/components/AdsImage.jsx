import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { Metrics } from "../constants/Metrics";
import { Colors } from "../constants/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

export default function AdsImage({ isPremium }) {
  const [ad, setAd] = useState(null);
  const router = useRouter();
  const pool = [
    require("../assets/ads/ads1.jpeg"),
    require("../assets/ads/ads2.jpeg"),
    require("../assets/ads/ads3.jpeg"),
    require("../assets/ads/ads4.jpeg"),
    require("../assets/ads/ads5.jpeg"),
    require("../assets/ads/ads6.png"),
    require("../assets/ads/ads7.png"),
    require("../assets/ads/ads8.png"),
  ];

  useEffect(() => {
    if (!isPremium) {
      setAd(pool[Math.floor(Math.random() * pool.length)]);
    } else {
      setAd(null);
    }
  }, [isPremium]);

  if (!ad) return null;
  return (
    <TouchableOpacity style={s.wrap} onPress={() => router.push("/auth/goPremium")} activeOpacity={0.8}>
      <Image source={ad} style={s.img} resizeMode="cover" />
      <Text style={s.tag}>Anuncio</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  wrap: { 
    width: Metrics.animationXL * 1.2,
    height: Metrics.publicityArea, 
    marginVertical: Metrics.marginS 
  },
  img: {
    width: Metrics.animationXL * 1.2,
    height: Metrics.publicityArea, 
  },
  tag: {
    position:"absolute", 
    bottom:5, 
    left:5,
    backgroundColor:"rgba(0,0,0,0.6)", 
    color: Colors.whiteColor,
    paddingHorizontal: Metrics.marginXS,
    paddingVertical: Metrics.marginXS,
    borderRadius: Metrics.radiusS,
    fontSize: Metrics.fontXS,
  },
});
