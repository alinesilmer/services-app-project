// ServiceItem: icon button with label, gives feedback on press and navigates to route.
// Props: label, icon, useFeather, route
//------------------------------------------------------------------//

import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useRouter } from 'expo-router';

const ServiceItem = ({ label, icon, useFeather = true, route = '/' }) => {
  const IconComponent = useFeather ? Feather : FontAwesome5;
  const router = useRouter();
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 200);
    router.push(route); //Replace with real routes
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[
          styles.item,
          pressed && styles.itemPressed
        ]}
        activeOpacity={0.8}
      >
        <IconComponent name={icon} size={29} color={Colors.blueColor} />
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    margin: 8,
  },
  item: {
    width: 80,
    height: 80,
    borderStyle: "solid",
    borderColor: Colors.inputGray,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  itemPressed: {
    backgroundColor: "gray", 
    borderColor: Colors.blueColor,
  },
  label: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textColor,
  },
});

export default ServiceItem;
