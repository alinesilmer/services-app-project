
"use client";

import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import CheckBox from 'expo-checkbox';
import useAppDispatch from '../../hooks/useAppDispatch';
import Logo from '../../components/Logo';
import SlideUpCard from '../../components/SlideUpCard';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';
import ModalCard from '../../components/ModalCard';
import AnimationFeedback from '../../components/AnimationFeedback';
import DatePicker from '../../components/DatePicker';
import { useValidation } from '../../hooks/useValidation';
import useDatePicker from '../../hooks/useDatePicker';
import { registerUser } from '../../utils/storage';
import { Metrics } from '../../constants/Metrics';
import { Colors } from '../../constants/Colors';

export default function Register() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    birthdate: null,
    userType: 'cliente',
    acceptTerms: false,
  });
  const { date, show, openPicker, handleChange: handleDate } = useDatePicker();

  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(true);
  const [loading, setLoading] = useState(false);

  const validationErrors = useValidation(formData);

  const change = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const onRegister = async () => {
    setLoading(true);

    const errs = { ...validationErrors };
    if (!formData.acceptTerms) {
      errs.acceptTerms = 'Debes aceptar los términos y condiciones';
    }
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      const payload = {
        ...formData,
        birthdate: date?.toISOString() || null,
        createdAt: new Date().toISOString(),
      };
      const result = await registerUser(payload);
      setModalSuccess(result.success);
      setModalVisible(true);

      if (result.success) {
        setTimeout(() => router.replace('/auth/login'), 2000);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea} />
      <Logo />
      <BackButton />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'android' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 0}
      >
        <View style={styles.container}>
          <SlideUpCard
            title="Crear una Cuenta"
            subtitle="Por favor, ingrese sus datos para registrarse"
            style={styles.card}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.checkRow}>
                {['cliente', 'profesional'].map((opt) => (
                  <Pressable
                    key={opt}
                    onPress={() => change('userType', opt)}
                  >
                    <View style={styles.checkItem}>
                      <CheckBox
                        value={formData.userType === opt}
                        onValueChange={() => change('userType', opt)}
                        tintColors={{ true: Colors.orangeColor }}
                      />
                      <Text
                        style={[
                          styles.checkLabel,
                          formData.userType === opt &&
                            styles.checkLabelActive,
                        ]}
                      >
                        {opt[0].toUpperCase() + opt.slice(1)}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>

              {/* standard inputs */}
              <CustomInput
                style={styles.inputs}
                label="Usuario"
                placeholder="Usuario"
                value={formData.username}
                onChangeText={(t) => change('username', t)}
                error={errors.username}
              />
              <CustomInput
                style={styles.inputs}
                label="Correo electrónico"
                placeholder="sucorreo@gmail.com"
                value={formData.email}
                onChangeText={(t) => change('email', t)}
                keyboardType="email-address"
                error={errors.email}
              />
              <CustomInput
                style={styles.inputs}
                label="Contraseña"
                placeholder="********"
                value={formData.password}
                onChangeText={(t) => change('password', t)}
                secureTextEntry
                error={errors.password}
              />

              {/* date picker */}
              <DatePicker
                label="Fecha de Nacimiento"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                value={date}
                onPress={openPicker}
                show={show}
                maximumDate={new Date()}
                themeVariant="dark"
                onChange={(e, sel) => {
                  handleDate(e, sel)
                  change('birthdate', sel)
                }}
              />
              {errors.birthdate && (
                <Text style={styles.errorText}>{errors.birthdate}</Text>
              )}

              {/* terms checkbox */}
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={formData.acceptTerms}
                  onValueChange={(v) => change('acceptTerms', v)}
                  tintColors={{ true: Colors.orangeColor }}
                />
                <Text style={styles.checkboxText}>Acepto los </Text>
                <Pressable onPress={() => router.push('auth/terms')}>
                  <Text style={styles.link}>Términos y Condiciones</Text>
                </Pressable>
              </View>
              {errors.acceptTerms && (
                <Text style={styles.errorText}>{errors.acceptTerms}</Text>
              )}

              {/* register button */}
              <View style={styles.registerButtonContainer}>
                <CustomButton
                  text="Registrarme"
                  onPress={onRegister}
                  disabled={loading}
                />
              </View>

              <Text style={styles.simpleText}>
                ¿Ya estás registrado?
              </Text>
              <Pressable onPress={() => router.push('auth/login')}>
                <Text style={styles.link}>
                  Haz click aquí {'\n'} para Iniciar Sesión
                </Text>
              </Pressable>
            </ScrollView>
          </SlideUpCard>

          {/* feedback modal */}
          <ModalCard
            visible={modalVisible}
            title={modalSuccess ? 'Registro exitoso' : 'Error en el registro'}
            onClose={() => setModalVisible(false)}
          >
            <AnimationFeedback
              type={modalSuccess ? 'success' : 'failure'}
            />
            <Text style={{ textAlign: 'center', marginTop: 10 }}>
              {modalSuccess
                ? `¡Gracias por registrarte, ${formData.username}!`
                : Object.keys(errors).length
                ? 'Por favor corrige los errores.'
                : 'Usuario o correo ya registrados.'}
            </Text>
          </ModalCard>
        </View>
      </KeyboardAvoidingView>
      <SafeAreaView style={styles.safeAreaBottom} />
    </>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    height: Metrics.safeArea,
  },
  safeAreaBottom: {
    flex: 0,
    backgroundColor: Colors.whiteColor,
    height: Metrics.safeArea,
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
    height: Metrics.screenM,
    alignItems: 'stretch',
  },
  scrollContainer: {
    flexGrow: 1,
    gap: Metrics.marginM,
    justifyContent: 'space-between',
    paddingBottom: Metrics.marginL,
  },
  simpleText: {
    color: Colors.textColor,
    textAlign: 'center',
    fontSize: Metrics.fontS,
  },
  link: {
    color: Colors.orangeColor,
    textAlign: 'center',
    fontSize: Metrics.fontS,
  },
  checkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: Metrics.marginL,
    width: Metrics.animationXL,
    marginBottom: Metrics.marginS,
  },
  checkItem: { flexDirection: 'row', alignItems: 'center' },
  checkLabel: { marginLeft: Metrics.marginS, color: Colors.textColor },
  checkLabelActive: { color: Colors.orangeColor },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: Metrics.marginS,
    gap: Metrics.marginS,
  },
  checkboxText: { color: Colors.textColor, fontSize: Metrics.fontS },
  registerButtonContainer: { justifyContent: 'center', alignItems: 'center' },
  errorText: {
    color: Colors.errorColor,
    fontSize: Metrics.fontXS,
    marginBottom: Metrics.marginS,
  },
  inputs: {
    width: Metrics.animationXL,
    fontSize: Metrics.fontXS,
  },
})
