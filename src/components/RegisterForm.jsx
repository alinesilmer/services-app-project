// RegisterForm: reusable form with inputs for username, email, password, birthdate, user type, and terms acceptance.
// Manages its own form state and triggers onSubmit callback.
//------------------------------------------------------------------//

import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';
import CustomInput from './CustomInput';
import DatePicker from './DatePicker';
import CustomButton from './CustomButton';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    birthdate: null,
    userType: 'cliente',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});

  const change = (name, value) => setFormData(prev => ({ ...prev, [name]: value }));

  const handleSubmit = () => {
    // Basic validation
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Usuario requerido';
    if (!formData.email) newErrors.email = 'Email requerido';
    if (!formData.password) newErrors.password = 'Contraseña requerida';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'Debes aceptar términos';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.checkRow}>
        {['cliente','profesional'].map(opt => (
          <Pressable key={opt} onPress={() => change('userType', opt)} style={styles.checkItem}>
            <CheckBox value={formData.userType === opt} onValueChange={() => change('userType', opt)} tintColors={{ true: Colors.orangeColor }} />
            <Text style={[styles.checkLabel, formData.userType===opt && styles.checkLabelActive]}>
              {opt.charAt(0).toUpperCase()+opt.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <CustomInput
        label="Usuario"
        placeholder="Ingrese usuario"
        value={formData.username}
        onChangeText={t => change('username',t)}
        error={errors.username}
      />
      <CustomInput
        label="Correo"
        placeholder="you@mail.com"
        value={formData.email}
        onChangeText={t => change('email',t)}
        keyboardType="email-address"
        error={errors.email}
      />
      <CustomInput
        label="Contraseña"
        placeholder="********"
        value={formData.password}
        onChangeText={t => change('password',t)}
        secureTextEntry
        error={errors.password}
      />

      <DatePicker
        label="Fecha de Nacimiento"
        value={formData.birthdate}
        onPress={formData.openPicker}
        show={formData.show}
        onChange={(e, sel) => change('birthdate',sel)}
      />

      <View style={styles.termsRow}>
        <CheckBox value={formData.acceptTerms} onValueChange={v=>change('acceptTerms',v)} tintColors={{ true: Colors.orangeColor }} />
        <Text style={styles.termsText}>Acepto los </Text>
        <Pressable><Text style={styles.link}>Términos y Condiciones</Text></Pressable>
      </View>
      {errors.acceptTerms && <Text style={styles.errorText}>{errors.acceptTerms}</Text>}

      <CustomButton label="Registrarme" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
  },
  checkRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Metrics.marginS,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkLabel: {
    marginLeft: Metrics.marginS,
    color: Colors.textColor
  },
  checkLabelActive: {
    color: Colors.orangeColor
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Metrics.marginS,
  },
  termsText: {
    color: Colors.textColor,
    marginLeft: Metrics.marginS,
  },
  link: {
    color: Colors.orangeColor
  },
  errorText: {
    color: Colors.errorColor,
    fontSize: Metrics.fontS,
    marginBottom: Metrics.marginS,
  }
});

export default RegisterForm;