import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const days = ['L', 'M', 'X', 'J', 'V'];
const horarios = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

const dayMap = {
  L: 'Lunes',
  M: 'Martes',
  X: 'Miercoles',
  J: 'Jueves',
  V: 'Viernes'
};

export default function ScheduleMatrix({ apptData, onSlotSelect, selectedAppt }) {
  const getColor = (status, selected) => {
    if (selected) return Colors.orangeColor;
    if (status === 'OCUPADO') return '#f0b1b1';
    if (status === 'PENDIENTE') return '#fbd5a5';
    return '#e0e0e0';
  };

  const getTextColor = (status, selected) => {
    if (selected) return '#fff';
    if (status === 'OCUPADO') return '#a40000';
    if (status === 'PENDIENTE') return '#e47755';
    return '#000';
  };

  const handlePress = (cell) => {
    if (cell.status === 'DISPONIBLE') return;
    onSlotSelect && onSlotSelect(cell);
  };

  return (
    apptData?.length === 0 ? (
      <Text>No hay turnos disponibles</Text>
    ) : (
      <View style={styles.table}>
        {/* Encabezado */}
        <View style={styles.headerRow}>
          {days.map((day, index) => (
            <View style={styles.headerCell} key={index}>
              <Text style={styles.headerText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Celdas */}
        {horarios.map((hour, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {days.map((day, colIndex) => {
              const realDay = dayMap[day];
              const slot = apptData?.[realDay]?.[hour];
              const status = slot?.status || 'DISPONIBLE';
              const cell = {
                id: `${day}-${hour}`,
                day: realDay,
                hour,
                status,
                clientDetails: slot?.clientDetails || null,
                apptDetails: slot?.apptDetails || null
              };
              const isSelected = selectedAppt?.id === cell.id;

              return (
                <TouchableOpacity
                  key={colIndex}
                  style={[
                    styles.cell,
                    { backgroundColor: getColor(status, isSelected) }
                  ]}
                  onPress={() => handlePress(cell)}
                >
                  <Text style={{ color: getTextColor(status, isSelected), fontWeight: 'bold', fontSize: wp('3.3%') }}>
                    {hour}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  table: {
    marginTop: hp('2%'),
    width: '100%',
    minHeight: hp('40%'),
    borderColor: 'red',
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
