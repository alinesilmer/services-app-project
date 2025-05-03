import React, { useState } from 'react';
import {
  View, StyleSheet, StatusBar, Text, Pressable, KeyboardAvoidingView, Platform, SafeAreaView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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

// Login screen, includes input Username and Password. Links de recovery, register and continue w/o register
// Default user "username", password: "123456"
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
    <>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
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
      <SafeAreaView style={{height: hp('1%'), backgroundColor: Colors.whiteColor}} />
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
    height: hp('71%'),
  },
  linksContainer: {
    marginTop: hp('2%'),
    alignItems: 'center',
    gap: hp('1.2%'),
  },
  linkRecovery: { color: Colors.blueColor },
  linkRegister: {
    color: Colors.orangeColor,
    textAlign: 'center',
  },
  linkNoRegister: { color: Colors.dark },
});
