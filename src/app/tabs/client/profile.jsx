'use client';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import ProfilePic from '../../../components/ProfilePic';
import DisplayField from '../../../components/DisplayField';
import IconButton from '../../../components/IconButton';
import SlideUpCard from '../../../components/SlideUpCard';
import BackButton from '../../../components/BackButton';
import CustomButton from '../../../components/CustomButton';
import ModalWrapper from '../../../components/ModalWrapper';
import BottomNavBar from '../../../components/NavBar';

import { Colors } from '../../../constants/Colors';
import { Metrics } from '../../../constants/Metrics';
import { usePremium } from '../../../hooks/usePremium';
import { useProfile } from '../../../hooks/useProfile';
import { logoutUser } from '../../../utils/storage';
import { logout } from '../../../redux/slices/authSlice';
import { resetPremiumState } from '../../../redux/slices/premiumSlice';

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { premium, daysRemaining } = usePremium();
  const { data: profile, formData, isModalVisible, openModal, closeModal, saveForm, updateFormData } = useProfile();
  const authUser = useSelector(state => state.auth.user);
  const userType = authUser?.userType; 
  const isValidUser = !!authUser;

  const isPremiumActive =
    userType === 'cliente' &&
    premium.isPremium &&
    ['active', 'trial'].includes(premium.premiumStatus);

  const getPremiumStatusText = () => {
    if (!isValidUser) return 'Regístrate para obtener Premium';
    switch (premium.premiumStatus) {
      case 'trial':
        return `Prueba (${daysRemaining} días restantes)`;
      case 'active':
        return 'Premium Activo';
      case 'paused':
        return 'Premium Pausado';
      case 'expired':
        return 'Premium Expirado';
      case 'cancelled':
        return 'Premium Cancelado';
      default:
        return 'Estado Premium desconocido';
    }
  };

  const getPremiumButtonText = () => {
    if (!isValidUser) return 'Ir a registro';
    if (['inactive', 'expired'].includes(premium.premiumStatus)) {
      return premium.premiumStatus === 'expired' ? 'Renovar Premium' : 'Obtener Premium';
    }
    return 'Gestionar Premium';
  };

  const handlePremiumAction = () => {
    if (!isValidUser) {
      router.push('/auth/register');
    } else if (['inactive', 'expired'].includes(premium.premiumStatus)) {
      router.push('/auth/goPremium');
    } else {
      router.push('/tabs/managePremium');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      dispatch(resetPremiumState());
      router.replace('/auth/login');
    } catch (e) {
      console.error('Error al cerrar sesión', e);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea} />
      <StatusBar style="light" backgroundColor={Colors.blueColor} />
      <View style={styles.container}>
        <BackButton />

        <SlideUpCard title="Mi Perfil" style={styles.card}>
          <IconButton
            name="edit"
            size={Metrics.iconSmall}
            color={Colors.textColor}
            style={styles.editButton}
            onPress={openModal}
          />

          <ScrollView contentContainerStyle={styles.scrollView}>
            <ProfilePic
              uri={profile.avatar || 'https://i.pinimg.com/736x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg'}
              size={Metrics.iconXXLarge}
              style={styles.avatar}
            />

            <Text style={styles.name}>
              {profile.fullName || 'Usuario'} {"\n"}
              {isPremiumActive && (<Text style={styles.premiumBadge}> {getPremiumStatusText()}</Text>)}
            </Text>

            {userType === 'cliente' && premium.premiumStatus === 'trial' && (
              <Text style={styles.trialInfo}>¡Actualiza antes de que termine la prueba!</Text>
            )}

            {[['Email', profile.email], ['Provincia', profile.province], ['Ciudad', profile.department], ['Dirección', profile.address]].map(([label, value]) => (
              <DisplayField key={label} label={label} value={value || 'No especificado'} />
            ))}

            {userType === 'cliente' && (<View style={styles.premiumStatusCard}><Text style={styles.premiumStatusText}>{getPremiumStatusText()}</Text></View>)}

            <View style={styles.buttonsWrapper}>
              {!isValidUser ? (
                <CustomButton
                  text="Registrarse"
                  onPress={() => router.push('/auth/register')}
                  style={[styles.button, { backgroundColor: Colors.orangeColor }]}
                />
              ) : userType === 'cliente' ? (
                <>
                  <CustomButton text={getPremiumButtonText()} onPress={handlePremiumAction} style={[styles.button, { backgroundColor: ['inactive','expired'].includes(premium.premiumStatus) ? Colors.orangeColor : Colors.blueColor }]} />
                  <CustomButton text="Cerrar Sesión" onPress={handleLogout} style={[styles.button, { backgroundColor: '#DC3545' }]} />
                </>
              ) : (
                <>
                  <CustomButton text="Mis Servicios" onPress={() => router.push('/tabs/professional/services')} style={[styles.button, { backgroundColor: Colors.blueColor }]} />
                  <CustomButton text="Cerrar Sesión" onPress={handleLogout} style={[styles.button, { backgroundColor: '#DC3545' }]} />
                </>
              )}
            </View>
          </ScrollView>
        </SlideUpCard>
      </View>

      <ModalWrapper visible={isModalVisible} title="Editar Perfil" onCancel={closeModal} onSubmit={saveForm}>
        <ScrollView contentContainerStyle={styles.modalScroll}>
          {[['Nombre completo', formData.fullName, 'fullName'], ['Email', formData.email, 'email'], ['Provincia', formData.province, 'province'], ['Ciudad', formData.department, 'department'], ['Dirección', formData.address, 'address']].map(([label, val, key]) => (
            <DisplayField key={key} label={label} value={val} editable onChangeText={(text) => updateFormData(key, text)} />
          ))}
        </ScrollView>
      </ModalWrapper>

      <View>
        <BottomNavBar />
        <SafeAreaView style={styles.safeAreaBottom} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    paddingTop: Metrics.marginS,
  },
  safeAreaBottom: {
    backgroundColor: Colors.blueColor,
  },
  card: {
    position: 'absolute',
    bottom: 0,
    height: Metrics.screenL,
    alignItems: 'stretch',
  },
  scrollView: {
    alignItems: 'center',
    paddingBottom: Metrics.marginM,
    flexGrow: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: Metrics.marginM,
    flexGrow: 1,
  },
  avatar: {
    marginTop: Metrics.marginS,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.whiteColor,
    marginBottom: Metrics.marginS,
  },
  name: {
    fontSize: Metrics.fontL,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Metrics.marginS,
    marginBottom: Metrics.marginM,
  },
  premiumBadge: {
    fontSize: Metrics.fontS,
    color: Colors.orangeColor,
  },
  trialInfo: {
    fontSize: Metrics.fontS,
    color: Colors.orangeColor,
    marginBottom: Metrics.marginS,
  },
  fieldWrapper: {
    width: wp("100%"),
    marginVertical: Metrics.marginS,
  },
  premiumStatusCard: {
    padding: Metrics.marginM,
    marginVertical: Metrics.marginS,
  },
  premiumStatusText: {
    fontSize: Metrics.fontM,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    marginTop: Metrics.marginS,
  },
  buttonsWrapper: {
    width: wp("90%"),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Metrics.marginXS,
  },
  editButton: {
    position: 'absolute',
    top: Metrics.marginL,
    right: Metrics.marginL,
  },
  modalScroll: {
    paddingBottom: Metrics.marginS,
  },
});
