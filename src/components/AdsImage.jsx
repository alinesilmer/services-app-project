import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";

export default function AdsImage({ isPremium }) {
  const [ad, setAd] = useState(null);
  const router = useRouter();
  const pool = [
    require("../assets/ads/ads1.jpeg"),
    require("../assets/ads/ads2.jpeg"),
    // …add as many as you like
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
    <TouchableOpacity style={s.wrap} onPress={() => router.push("/auth/goPremium")}>
      <Image source={ad} style={s.img} resizeMode="cover" />
      <Text style={s.tag}>Anuncio</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  wrap: { width:"100%", height:80, marginVertical:20 },
  img:  { width:"100%", height:"100%" },
  tag:  {
    position:"absolute", bottom:5, left:5,
    backgroundColor:"rgba(0,0,0,0.6)", color:"white",
    paddingHorizontal:6, paddingVertical:2, borderRadius:4,
    fontSize:10,
  },
});
