// DatePicker: shows a label and formatted date (or placeholder), and opens a native date picker.
// Manages its own date state and visibility using an internal hook.
//------------------------------------------------------------------//

import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

// Internal hook to manage date value and picker visibility
const useDatePicker = (initialValue = null) => {
  const [date, setDate] = useState(initialValue);
  const [show, setShow] = useState(false);

  const openPicker = () => setShow(true);
  const closePicker = () => setShow(false);

  const handleChange = (_, selected) => {
    closePicker();
    if (selected) setDate(selected);
  };

  return { date, show, openPicker, handleChange };
};


const DatePicker = ({ label, value, onChange, show, onPress }) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>{label}</Text>

    <Pressable style={styles.input} onPress={onPress}>
      <Text style={styles.inputText}>
        {value ? value.toLocaleDateString() : 'DD/MM/AAAA'}
      </Text>
    </Pressable>

    {show && (
      <DateTimePicker
        mode="date"
        display={Platform.OS === 'ios' ? 'inline' : 'default'}
        value={value ?? new Date()}
        onChange={onChange}
        maximumDate={new Date()}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  wrapper: { 
    marginBottom: Metrics.marginS, 
    width: wp("100%"),
  },
  label  : { 
    fontSize: Metrics.fontS,
    marginBottom: Metrics.marginXS, 
    color: Colors.textColor 
  },
  input  : {
    width: Metrics.animationXL,
    padding: Metrics.marginM,
    borderRadius: Metrics.radiusS,
    backgroundColor: Colors.inputGray
  },
  inputText: {
    fontSize: Metrics.fontXS,
    color: Colors.textColor,
    backgroundColor: Colors.inputGray
   },
});

export default DatePicker;
