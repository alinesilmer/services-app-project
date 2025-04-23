import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ProfilePic = ({ uri, size = 60 }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <Image source={{ uri }} style={styles.image} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#ddd',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ProfilePic;