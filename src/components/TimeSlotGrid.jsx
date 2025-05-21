import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Días reales de la semana (7)
const dias = ['L', 'M', 'X', 'J', 'V'];
const horarios = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

export default function ScheduleMatrix({ onSelect }) {
  const [selectedCell, setSelectedCell] = useState(null);

  const getColor = (status, selected) => {
    if (selected) return Colors.orangeColor;
    if (status === 'ocupado') return '#f0b1b1';
    if (status === 'pedido') return '#fbd5a5';
    return '#e0e0e0';
  };

  const getTextColor = (status, selected) => {
    if (selected) return '#fff';
    if (status === 'ocupado') return '#a40000';
    if (status === 'pedido') return '#e47755';
    return '#000';
  };

  const handlePress = (cell) => {
    setSelectedCell(cell.id);
    onSelect && onSelect(cell);
  };

  return (
    <View style={styles.table}>
      {/* Encabezado con los días */}
      <View style={styles.headerRow}>
        {dias.map((dia, index) => (
          <View style={styles.headerCell} key={index}>
            <Text style={styles.headerText}>{dia}</Text>
          </View>
        ))}
      </View>

      {/* Celdas de turnos */}
      {horarios.map((hora, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {dias.map((dia, colIndex) => {
            const cell = {
              id: `${dia}-${hora}`,
              dia,
              hora,
              status: 'disponible' // cambiar según backend
            };
            const isSelected = selectedCell === cell.id;

            return (
              <TouchableOpacity
                key={colIndex}
                style={[
                  styles.cell,
                  { backgroundColor: getColor(cell.status, isSelected) }
                ]}
                onPress={() => handlePress(cell)}
              >
                <Text style={{ color: getTextColor(cell.status, isSelected), fontWeight: 'bold', fontSize: wp('3.3%') }}>
                  {cell.hora}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    marginTop: hp('2%'),
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
    paddingHorizontal: wp('2%'),
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: wp('3.8%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('0.8%'),
    paddingHorizontal: wp('2%'),
  },
  cell: {
    flex: 1,
    marginHorizontal: wp('0.3%'),
    height: hp('5.5%'),
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
