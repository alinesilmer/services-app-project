import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import ProfilePic from '../../../components/ProfilePic';
import DisplayField from '../../../components/DisplayField';
import IconButton from '../../../components/IconButton';
import SlideUpCard from '../../../components/SlideUpCard';
import BackButton from '../../../components/BackButton';
import { useProfile } from '../../../hooks/useProfile';
import { Colors } from '../../../constants/Colors';
import BottomNavBar from '../../../components/NavBar';
import ModalWrapper from '../../../components/ModalWrapper';

export default function ProfileScreen() {
  const router = useRouter();
  const {
    data, isModalVisible, openModal, closeModal, saveForm
  } = useProfile();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      <BackButton style={styles.backButton} />
      <View style={styles.container}>

        <View style={styles.mainContent}>
          <SlideUpCard title="Mi Perfil" style={styles.card}>
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
                uri="https://randomuser.me/api/portraits/men/32.jpg"
                size={wp('25%')}
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
                <DisplayField label="Departamento" value={data.department} />
              </View>
              <View style={styles.fieldWrapper}>
                <DisplayField label="Dirección" value={data.address} />
              </View>
            </ScrollView>
          </SlideUpCard>
        </View>

        <View style={styles.navWrapper}>
        <BottomNavBar />
        </View>
      </View>

      <ModalWrapper
        visible={isModalVisible}
        title="Editar perfil"
        onCancel={closeModal}
        onSubmit={saveForm}
        cancelLabel="Cancelar"
        submitLabel="Guardar"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    paddingTop: hp('1.5%')
  },
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: hp('4%'),
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
    marginTop: hp('15%'), 
  },
  scrollContent: {
    alignItems: 'flex-start', 
  paddingBottom: hp('6%'),
  paddingHorizontal: wp('2%'), 
  width: '100%',
  flexGrow: 1
  },
  avatar: {
    marginTop: hp('2%'),
    borderWidth: 4,
    borderColor: 'white',
  },
  name: {
    marginTop: hp('1.5%'),
    marginBottom: hp('3%'),
    fontSize: wp('5.5%'),
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
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
    zIndex: 10,
  },
  chatButton: {
    position: 'absolute',
    top: hp('3%'),
    left: wp('6%'),
    zIndex: 10,
  }
});
