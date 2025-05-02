import React, { useState } from 'react';
import {
  View, Text, StyleSheet, StatusBar, SafeAreaView, KeyboardAvoidingView, Platform
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';

//Components
import BackButton from '../../components/BackButton';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Logo from '../../components/Logo';
import ModalCard from '../../components/ModalCard';
import SlideUpCard from '../../components/SlideUpCard';
import AnimationFeedback from '../../components/AnimationFeedback';

//Constants
import { Colors } from '../../constants/Colors';

//Hooks
import { useValidation } from '../../hooks/useValidation';

// Screen for Password Recovery
export default function RecoveryPass() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('email');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    const validationErrors = useValidation({ email });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) setStep('code');
  };

  const handleVerifyCode = () => {
    if (verificationCode === '123456') setStep('password');
    else setErrors({ verificationCode: 'Código incorrecto' });
  };

  const handleChangePassword = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalVisible(true);
    }, 1500);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => router.push('auth/login'), 1000);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <BackButton />
          <Logo />
          <SlideUpCard
            title={"Recuperar\nContraseña"}
            subtitle={"Sigue las instrucciones\npara recuperar tu contraseña"}
            style={styles.card}
          >
            {step === 'email' && (
              <View style={styles.stepsContainer}>
                <View style={styles.instructionWrapper}>
                  <Text style={styles.infoText}>
                    Ingresa tu correo electrónico para recibir un código.
                  </Text>
                </View>
                <CustomInput
                  label="Correo Electrónico"
                  placeholder="ejemplo@gmail.com"
                  value={email}
                  onChangeText={setEmail}
                  error={errors.email}
                />
                <CustomButton text="Enviar Código" onPress={handleSubmit} />
              </View>
            )}
            {step === 'code' && (
              <View style={styles.stepsContainer}>
                <View style={styles.instructionWrapper}>
                  <Text style={styles.infoText}>
                    Ingresa el código enviado a tu correo.
                  </Text>
                </View>
                <CustomInput
                  label="Código de Verificación"
                  placeholder="123456"
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  error={errors.verificationCode}
                />
                <CustomButton text="Verificar Código" onPress={handleVerifyCode} />
              </View>
            )}
            {step === 'password' && (
              <View style={styles.stepsContainer}>
                <View style={styles.instructionWrapper}>
                  <Text style={styles.infoText}>Ingrese su nueva contraseña.</Text>
                </View>
                <CustomInput
                  label="Nueva Contraseña"
                  placeholder="********"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                />
                <CustomButton text="Cambiar Contraseña" onPress={handleChangePassword} />
              </View>
            )}
          </SlideUpCard>

          <ModalCard visible={modalVisible} onClose={closeModal} title="Cambio de Contraseña">
            <AnimationFeedback type={loading ? 'loading' : 'success'} />
            <Text style={styles.modalText}>
              {loading
                ? 'Cambiando contraseña...'
                : '¡Contraseña cambiada exitosamente! Haz click en "Cerrar" y serás redirigido al Inicio.'}
            </Text>
          </ModalCard>
        </View>
      </KeyboardAvoidingView>
      <SafeAreaView style={{backgroundColor: Colors.whiteColor }} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('68%'),
  },
  stepsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  instructionWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9e9e9',
    borderWidth: wp('0.2%'),
    borderColor: 'gray',
    height: hp('10%'),
    width: wp('90%'),
    borderRadius: wp('5%'),
    marginBottom: hp('3%'),
  },
  infoText: {
    fontSize: hp('2%'),
    marginVertical: hp('1%'),
    textAlign: 'center',
  },
  modalText: {
    fontSize: hp('2.2%'),
    textAlign: 'center',
    marginTop: hp('2%'),
  },
});
