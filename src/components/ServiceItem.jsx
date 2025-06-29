// ServiceItem: icon button with label, gives feedback on press and navigates to route.
// Props: label, icon, useFeather, route
//------------------------------------------------------------------//

import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';
import { useRouter } from 'expo-router';

const ServiceItem = ({ label, icon, useFeather = true, route = '/tabs/client/services' }) => {
  const IconComponent = useFeather ? Feather : FontAwesome5;
  const router = useRouter();
  const [pressed, setPressed] = useState(false);

const handlePress = () => {
  setPressed(true);
  setTimeout(() => setPressed(false), 200);
  router.push({
    pathname: route,
    params: { label, icon, useFeather }
  });
};

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[
          styles.item,
          pressed && styles.itemPressed
        ]}
        activeOpacity={0.6}
        onPress={handlePress}
      >
        <IconComponent name={icon} size={Metrics.iconSmall} color={Colors.blueColor} />
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    margin: Metrics.marginS,
  },
  item: {
    width: Metrics.marginXXL * 1.6,
    height: Metrics.marginXXL * 1.6,
    borderColor: Colors.inputGray,
    borderWidth: Metrics.marginXS,
    backgroundColor: "#d3d3d3",
    borderRadius: Metrics.radiusS,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.marginS,
  },
  itemPressed: {
    backgroundColor: "gray", 
    borderColor: Colors.blueColor,
  },
  label: {
    marginTop: Metrics.marginS,
    textAlign: 'center',
    fontSize: Metrics.fontXS,
    color: Colors.textColor,
  },
});

export default ServiceItem;