import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ApptModal from '../../../components/ApptModal';

import SlideUpCard from '../../../components/SlideUpCard';
import BackButton from '../../../components/BackButton';
import { Colors } from '../../../constants/Colors';
import BottomNavBar from '../../../components/NavBar';
import ScheduleMatrix from '../../../components/ScheduleMatrix';

const initialApptData = {
  Lunes: {
    '10:00': { status: 'OCUPADO', clientDetails: 'Lucía Fernández', apptDetails: 'Cortes de cabello' },
    '12:00': { status: 'PENDIENTE', clientDetails: 'Juan Pérez', apptDetails: 'Coloración completa' },
    '13:00': { status: 'OCUPADO', clientDetails: 'Sofía Ramírez', apptDetails: 'Tratamiento capilar' },
  },
  Martes: {
    '10:00': { status: 'OCUPADO', clientDetails: 'Carlos Méndez', apptDetails: 'Barbería y Afeitado' },
    '11:00': { status: 'OCUPADO', clientDetails: 'Florencia Díaz', apptDetails: 'Alisados' },
    '12:00': { status: 'OCUPADO', clientDetails: 'Martín López', apptDetails: 'Barbería y Afeitado' },
    '13:00': { status: 'OCUPADO', clientDetails: 'Valentina Torres', apptDetails: 'Peinados para eventos' },
    '14:00': { status: 'OCUPADO', clientDetails: 'Romina Ríos', apptDetails: 'Extensiones de cabello' },
  },
  Miercoles: {
    '11:00': { status: 'OCUPADO', clientDetails: 'Emilia Castro', apptDetails: 'Cortes de cabello' },
    '12:00': { status: 'PENDIENTE', clientDetails: 'Nicolás Vera', apptDetails: 'Tratamiento capilar'  },
    '13:00': { status: 'PENDIENTE', clientDetails: 'Agustina Paredes', apptDetails: 'Mechas/Balayage' },
    '14:00': { status: 'PENDIENTE', clientDetails: 'Gonzalo Morales', apptDetails: 'Coloración completa'  },
  },
  Jueves: {
    '09:00': { status: 'OCUPADO', clientDetails: 'Marina Ortiz', apptDetails: 'Mechas/Balayage'  },
    '11:00': { status: 'PENDIENTE', clientDetails: 'Julián Rivas', apptDetails: 'Barbería y Afeitado' },
    '12:00': { status: 'PENDIENTE', clientDetails: 'Ana Beltrán', apptDetails: 'Peinados para eventos'  },
    '13:00': { status: 'PENDIENTE', clientDetails: 'Federico Luna', apptDetails: 'Barbería y Afeitado' },
  },
};

export default function ScheduleScreen() {
  const [apptData, setApptData] = useState(initialApptData);
  const [selectedAppt, setSelectedAppt] = useState(null);

  const handleSlotSelect = ({ day, hour }) => {
  const apptInfo = apptData?.[day]?.[hour];
    if (!apptInfo) return;

    setSelectedAppt({
      ...apptInfo,
      day,
      hour,
      id: `${day}-${hour}`,
    });
  };

  const handleAccept = () => {
    if (!selectedAppt) return;
    const { day, hour } = selectedAppt;
    setApptData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [hour]: {
          ...prev[day][hour],
          status: 'OCUPADO',
        },
      },
    }));
    setSelectedAppt(null);
  };

  const handleCancel = () => {
    if (!selectedAppt) return;
    const { day, hour } = selectedAppt;
    setApptData((prev) => {
      const updatedDay = { ...prev[day] };
      delete updatedDay[hour];
      return {
        ...prev,
        [day]: updatedDay,
      };
    });
    setSelectedAppt(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContent}>
        <StatusBar style="light" backgroundColor={Colors.primary} />
        <BackButton style={styles.backButton} />
        <View style={styles.container}>
          <SlideUpCard title="Agenda" subtitle="<<<  06/04/25  -  13/04/25  >>>" style={styles.card}>
            <ScheduleMatrix 
              apptData={apptData}
              onSlotSelect={handleSlotSelect} 
              selectedAppt={selectedAppt}
            />

            <ApptModal
              visible={!!selectedAppt}
              onClose={() => setSelectedAppt(null)}
              appt={selectedAppt}
              onAccept={handleAccept}
              onCancel={handleCancel}
            />
          </SlideUpCard>
        </View>
      <BottomNavBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    paddingTop: hp('2%')
  },
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor
  },
  mainContent: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  card: {
    flex: 1,
    width: wp('100%'),
    backgroundColor: 'white',
    paddingTop: hp('2%'),
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('2%'),
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    marginTop: hp('18%'),
    marginBottom: hp('2%'),
    borderColor: 'blue',
  },
  scrollContent: {
    paddingBottom: hp('6%'),
    paddingHorizontal: wp('2%'), 
    width: '100%',
    flexGrow: 1,
  }
});
