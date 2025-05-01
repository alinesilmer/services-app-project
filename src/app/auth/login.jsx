import React, { useState } from 'react';
import {
  View, StyleSheet, StatusBar, Text, Pressable, KeyboardAvoidingView, Platform
} from 'react-native';
import { useRouter } from 'expo-router';

//Components
import BackButton from '../../components/BackButton';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Logo from '../../components/Logo';
import SlideUpCard from '../../components/SlideUpCard';

//Constants
import { Colors } from '../../constants/Colors';

//Hooks
import { useTogglePassword } from '../../hooks/useTogglePassword';
import { useValidation } from '../../hooks/useValidation';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { secureTextEntry, toggleVisibility, icon } = useTogglePassword();
  const [errors, setErrors] = useState({});

  const handleLogin = () => {
    if (username == 'usuario' && password == '123456') {
       router.push('tabs/home');
    }
    const validationErrors = useValidation({ username, password });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      router.push('tabs/home');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <BackButton />
        <Logo />
        <SlideUpCard
          title="Inicio"
          subtitle={"Por favor, ingrese su\nusuario para continuar"}
          style={styles.card}
        >
          <CustomInput
            label="Usuario"
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
            error={errors.username}
          />
          <CustomInput
            label="Contraseña"
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            isPassword
            icon={icon}
            onIconPress={toggleVisibility}
            error={errors.password}
          />
          <CustomButton text="Ingresar" onPress={handleLogin} />
          <View style={styles.linksContainer}>
            <Pressable onPress={() => router.push('auth/recoverypass')}>
              <Text style={styles.linkRecovery}>¿Olvidaste tu contraseña?</Text>
            </Pressable>
            <Pressable onPress={() => router.push('auth/register')}>
              <Text style={styles.linkRegister}>Haz click aquí {'\n'} para registrarte</Text>
            </Pressable>
            <Pressable onPress={() => router.push('tabs/home')}>
              <Text style={styles.linkNoRegister}>Continuar sin registrarme</Text>
            </Pressable>
          </View>
        </SlideUpCard>
      </View>
    </KeyboardAvoidingView>
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
    height: '73%',
  },
  linksContainer: {
    marginTop: 20,
    alignItems: 'center',
    gap: 10,
  },
  linkRecovery: { color: Colors.blueColor },
  linkRegister: {
    color: Colors.orangeColor,
    textAlign: 'center',
  },
  linkNoRegister: { color: Colors.dark },
});
