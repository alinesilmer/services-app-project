// screens/Register.jsx
import React, { useState } from 'react';
import {
  View, StyleSheet, StatusBar, Text, Pressable, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import CheckBox from 'expo-checkbox';

import Logo          from '../../components/Logo';
import SlideUpCard   from '../../components/SlideUpCard';
import CustomInput   from '../../components/CustomInput';
import CustomButton  from '../../components/CustomButton';
import BackButton    from '../../components/BackButton';
import ModalCard     from '../../components/ModalCard';
import DatePicker    from '../../components/DatePicker';

import { useValidation } from '../../hooks/useValidation';
import useDatePicker     from '../../hooks/useDatePicker';
import { Colors }        from '../../constants/Colors';

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username   : '',
    email      : '',
    password   : '',
    birthdate  : null,
    userType   : 'cliente',
    acceptTerms: false,
  });

  const { date, show, openPicker, handleChange: handleDate } = useDatePicker();
  const [errors, setErrors]   = useState({});
  const [modalVisible, setMV] = useState(false);

  const change = (name, value) => setFormData(p => ({ ...p, [name]: value }));

  const onRegister = () => {
    const validationErrors = useValidation(formData);
    if (!formData.acceptTerms) {
      validationErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) setMV(true);
  };

   // Routes
  const TermRoute = () => {
    router.push('auth/terms');
    };

  const LoginRoute = () => {
    router.push('auth/login');
  };
    
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <BackButton />
      <Logo />

      <SlideUpCard
        title={'Crear una\nCuenta'}
        subtitle={'Por favor, ingrese sus\ndatos para registrarse'}
        style={styles.card}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
         
          <View style={styles.checkRow}>
            {['cliente', 'profesional'].map(option => (
              <Pressable key={option} onPress={() => change('userType', option)}>
                <View style={styles.checkItem}>
                  <CheckBox
                    value={formData.userType === option}
                    onValueChange={() => change('userType', option)}
                    tintColors={{ true: Colors.orangeColor }}
                  />
                  <Text
                    style={[
                      styles.checkLabel,
                      formData.userType === option && styles.checkLabelActive,
                    ]}
                  >
                    {option[0].toUpperCase() + option.slice(1)}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          
          <CustomInput
            label="Usuario"
            placeholder="Usuario"
            value={formData.username}
            onChangeText={t => change('username', t)}
            error={errors.username}
            required
          />
          <CustomInput
            label="Correo electrónico"
            placeholder="sucorreo@gmail.com"
            value={formData.email}
            onChangeText={t => change('email', t)}
            keyboardType="email-address"
            error={errors.email}
            required
          />
          <CustomInput
            label="Contraseña"
            placeholder="********"
            value={formData.password}
            onChangeText={t => change('password', t)}
            secureTextEntry
            error={errors.password}
            required
          />

         
          <DatePicker
            label="Fecha de Nacimiento"
            value={date}
            onPress={openPicker}
            show={show}
            onChange={(e, selected) => {
              handleDate(e, selected);
              change('birthdate', selected);
            }}
          />

          
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={formData.acceptTerms}
              onValueChange={v => change('acceptTerms', v)}
              tintColors={{ true: Colors.orangeColor }}
            />
            <Text style={styles.checkboxText}>Acepto los </Text>
            <Pressable onPress={(TermRoute)}>
              <Text style={styles.link}>Términos y Condiciones</Text>
            </Pressable>
          </View>
          {errors.acceptTerms && (
            <Text style={styles.errorText}>{errors.acceptTerms}</Text>
          )}

         
          <CustomButton text="Registrarme" onPress={onRegister} />

         
          <Text style={styles.simpleText}>¿Ya estás registrado?</Text>
           <Pressable onPress={(LoginRoute)}>
            <Text style={styles.link}>
              Haz click aquí {'\n'} para Iniciar Sesión
            </Text>
          </Pressable>
        </ScrollView>
      </SlideUpCard>

      <ModalCard
        visible={modalVisible}
        onClose={() => setMV(false)}
        title="Registro exitoso"
      >
        <Text>¡Gracias por registrarte, {formData.username}!</Text>
      </ModalCard>
    </View>
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
    width: '100%',
    height: '80%',
  },
    scrollContainer: {
        paddingBottom: 40
    },
  simpleText: {
    marginTop: 20,
    color: Colors.textColor,
      textAlign: 'center',
    marginBottom: 5
  },
    link: {
        color: Colors.orangeColor,
        textAlign: 'center'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16, marginBottom: 10
    },
  checkRow: {
      flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
    checkItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkLabel: {
        marginLeft: 12,
        color: Colors.textColor
    },
    checkLabelActive: {
        color: Colors.orangeColor
    },
  checkboxContainer: {
      flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
    checkboxText: {
        color: Colors.textColor
    },
    errorText: {
        color: 'red',
        fontSize: 13,
        marginBottom: 10
    },
});
