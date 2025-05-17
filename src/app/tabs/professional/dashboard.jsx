import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ButtonGroup } from 'react-native-elements';

import ProfilePic from '../../../components/ProfilePic';
import DisplayField from '../../../components/DisplayField';
import IconButton from '../../../components/IconButton';
import SlideUpCard from '../../../components/SlideUpCard';
import BackButton from '../../../components/BackButton';
import CustomButton from '../../../components/CustomButton';
import { useProfile } from '../../../hooks/useProfessionalProfile';
import { Colors } from '../../../constants/Colors';
import BottomNavBar from '../../../components/NavBar';
import ModalWrapper from '../../../components/ModalWrapper';

export default function ProfileScreen() {
  const router = useRouter();
  const { data, form, isModalVisible, openModal, closeModal, saveForm, handleFormChange } = useProfile();
  const [selectedIndex, setSelectedIndex] = useState(null);

  /* TODO: Cambiar direccionamientos a pestañas reales:
  <CustomButton text="Ver Servicios" onPress={router.push('tabs/professional/services')} />
  <CustomButton text="Ver Calificaciones" onPress={router.push('tabs/professional/comments')} />*/

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContent}>
        <StatusBar style="light" backgroundColor={Colors.primary} />
        <BackButton style={styles.backButton} />
        <View style={styles.container}>
          <SlideUpCard title="Mi Perfil"  style={styles.card}>
            <IconButton
              name="edit"
              size={24}
              color={Colors.textColor}
              style={styles.editButton}
              onPress={openModal}
            />
            <IconButton
              name="message-circle"
              size={24}
              color={Colors.textColor}
              style={styles.chatButton}
              onPress={() => router.push('tabs/chat')}
            />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
              <ProfilePic
                uri="https://i.pravatar.cc/300"
                size={wp('30%')}
                style={styles.avatar}
              />

              <Text style={styles.name}>{data.fullName}</Text>

              <View style={styles.fieldWrapper}>
                <DisplayField label="Email" value={data.email} />
              </View>
              <View style={styles.fieldWrapper}>
                <DisplayField label="Provincia" value={data.province} />
              </View>
              <View style={styles.fieldWrapper}>
                <DisplayField label="Ciudad" value={data.city} />
              </View>
              <View style={styles.fieldWrapper}>
                <DisplayField label="Dirección" value={data.address} />
              </View>
              <View style={styles.fieldWrapper}>
                <DisplayField label="Disponibilidad" value={data.availability} />
              </View>
            </ScrollView>

            <ButtonGroup
              buttons={['Ver Servicios', 'Ver Calificaciones']}
              selectedIndex={selectedIndex}
              onPress={(index) => {
                setSelectedIndex(index);
                if (index === 0) {
                  console.log('Redirigir a servicios...');
                } else if (index === 1) {
                  console.log('Redirigir a calificaciones...');
                }
              }}
              containerStyle={styles.buttonGroupContainer}
              buttonStyle={styles.buttonGroupButton}
              textStyle={styles.buttonGroupText}
              selectedButtonStyle={styles.buttonGroupSelectedButton}
              selectedTextStyle={styles.buttonGroupSelectedText}
            />

            <CustomButton 
              text="Cerrar Sesión" 
              onPress={() => console.log('Cerrando sesión...')}
              style={styles.customBotton}
            />

          </SlideUpCard>
        </View>

        <ModalWrapper
        visible={isModalVisible}
        title="Editar perfil"
        onCancel={closeModal}
        onSubmit={saveForm}
        cancelLabel="Cancelar"
        submitLabel="Guardar"
        >
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <DisplayField
            label="Nombre completo"
            value={form.fullName}
            editable
            onChangeText={(text) => handleFormChange('fullName', text)}
          />
          <DisplayField
            label="Email"
            value={form.email}
            editable
            onChangeText={(text) => handleFormChange('email', text)}
          />
          <DisplayField
            label="Provincia"
            value={form.province}
            editable
            onChangeText={(text) => handleFormChange('province', text)}
          />
          <DisplayField
            label="Ciudad"
            value={form.city}
            editable
            onChangeText={(text) => handleFormChange('city', text)}
          />
          <DisplayField
            label="Dirección"
            value={form.address}
            editable
            onChangeText={(text) => handleFormChange('address', text)}
          />
        </ScrollView>
        </ModalWrapper>
      <BottomNavBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    paddingTop: hp('1%')
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
    marginTop: hp('16%'),
    marginBottom: hp('2%')
  },
  scrollContent: {
    alignItems: 'flex-start',
    paddingBottom: hp('6%'),
    paddingHorizontal: wp('2%'), 
    width: '100%',
    flexGrow: 1,
  },
  avatar: {
    marginTop: hp('2%'),
    borderWidth: 4,
    borderColor: 'white',
  },
  name: {
    marginTop: hp('1.5%'),
    marginBottom: hp('2%'),
    fontSize: wp('5.5%'),
    fontWeight: '700',
    color: 'black',
    textAlign: 'center'
  },
  fieldWrapper: {
    width: '100%',
    maxWidth: 400,
    marginBottom: hp('2%'),
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  editButton: {
    position: 'absolute',
    top: hp('3%'),
    right: wp('6%'),
    zIndex: 10
  },
  chatButton: {
    position: 'absolute',
    top: hp('3%'),
    left: wp('6%'),
    zIndex: 10
  },
  customBotton: {
    marginTop: hp('20%'),
    width: '100%'
  },
  buttonGroupContainer: {
    marginTop: hp('3%'),
    borderRadius: 10,
    borderColor: Colors.blueColor,
    borderWidth: 1,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    backgroundColor: Colors.whiteColor,
  },
  buttonGroupButton: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.orangeColor,
  },
  buttonGroupText: {
    color: Colors.orangeColor,
    fontWeight: '700',
  },
  buttonGroupSelectedButton: {
    backgroundColor: Colors.orangeColor,
  },
  buttonGroupSelectedText: {
    color: Colors.whiteColor,
    fontWeight: 'bold',
  },

});
