import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

//Components
import BackButton from '../../components/BackButton';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Logo from '../../components/Logo';
import ModalCard from '../../components/ModalCard';
import SlideUpCard from '../../components/SlideUpCard';
import AnimationFeedback from '../../components/AnimationFeedback';
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

//Constants
import { Colors } from '../../constants/Colors';
import { Metrics } from '../../constants/Metrics';

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
      <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <BackButton />
          <Logo />
          <SlideUpCard
            title={"Recuperar Contraseña"}
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
    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    height: Metrics.safeArea
  },
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
    height: Metrics.screenS,
    alignItems: 'stretch',
  },
  stepsContainer: {
    width: wp('100%'),
    alignItems: 'center',
  },
  instructionWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9e9e9',
    borderWidth: Metrics.marginXS,
    borderColor: 'gray',
    height: Metrics.screenS * 0.15,
    width: wp('90%'),
    borderRadius: Metrics.radiusS,
    marginBottom: Metrics.marginL,
  },
  infoText: {
    fontSize: Metrics.fontXS,
    textAlign: 'center',
  },
  modalText: {
    fontSize: Metrics.fontS,
    textAlign: 'center',
  },
})
