import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Logo from '../../components/Logo';
import SlideUpCard from '../../components/SlideUpCard';
import CustomInput from '../../components/CustomInput';
import { Colors } from '../../constants/Colors';
import BackButton from '../../components/BackButton';
import { useTogglePassword } from '../../hooks/useTogglePassword';
import CustomButton from '../../components/CustomButton';
import { useValidation } from '../../hooks/useValidation';


export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { secureTextEntry, toggleVisibility, icon } = useTogglePassword();
  const [errors, setErrors] = useState({});


  const handleLogin = () => {
  const validationErrors = useValidation({ username, password });
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    HomeRoute();
  }
};


  //Routes
  const HomeRoute = () => {
    router.push('tabs/home');
  };

  const RegisterRoute = () => {
    router.push('auth/register');
  };

   const RecoveryRoute = () => {
    router.push('auth/recoverypass');
  };

  return (
    <View style={styles.container}>
      <StatusBar />
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
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          isPassword={true}
          icon={icon}
          onIconPress={toggleVisibility}
          error={errors.password}
        />
        <CustomButton text="Ingresar" onPress={handleLogin} />
        <View style={styles.linksContainer}>
        <Pressable onPress={RegisterRoute}>
          <Text style={styles.linkRecovery}>¿Olvidaste tu contraseña?</Text>
        </Pressable>
         <Pressable onPress={RegisterRoute}>
            <Text style={styles.linkRegister}>Haz click aquí {'\n'} para registrarte</Text>
        </Pressable>
         <Pressable onPress={HomeRoute}>
          <Text style={styles.linkNoRegister}>Continuar sin registrarme</Text>
          </Pressable>
          </View>
      
      </SlideUpCard>
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
    height: '73%'
  },
  linksContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10

  },
  linkRecovery: {
    color: Colors.blueColor
  },
  linkRegister: {
    color: Colors.orangeColor,
    textAlign: 'center'
  },
  linkNoRegister: {
    color: Colors.dark
  }
});
