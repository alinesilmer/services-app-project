// DatePicker: shows a label and formatted date (or placeholder), and opens a native date picker.
// Manages its own date state and visibility using an internal hook.
//------------------------------------------------------------------//

import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../constants/Colors';

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
  wrapper: { marginBottom: 20 },
  label  : { fontWeight: 'bold', marginBottom: 6, color: Colors.textColor },
  input  : {
    padding: 18,
    borderRadius: 6,
    backgroundColor: Colors.inputGray
  },
  inputText: {
    color: Colors.textColor,
    backgroundColor: Colors.inputGray
   },
});

export default DatePicker;
