import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import BackButton from '../../components/BackButton';
import SlideUpCard from '../../components/SlideUpCard';
import Logo from '../../components/Logo';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import ModalCard from '../../components/ModalCard'; 
import AnimationFeedback from '../../components/AnimationFeedback'; 
import { Colors } from '../../constants/Colors';
import { useValidation } from '../../hooks/useValidation'; 
import { useRouter } from 'expo-router';

export default function RecoveryPass() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState('email');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const router = useRouter();

    const handleSubmit = () => {
        const validationErrors = useValidation({ email });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log('Sending recovery email to:', email);
            setStep('code');
        }
    };

    const handleVerifyCode = () => {
        if (verificationCode === '123456') {
            setStep('password');
        } else {
            setErrors({ verificationCode: 'Código incorrecto' });
        }
    };

    TODO:{/*up to fix the loading animation*/}
    const handleChangePassword = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalVisible(true); 
    }, 1000);  
  };

    const closeModal = () => {
        setModalVisible(false);
        setTimeout(() => {
            router.push('auth/login');
        }, 3000); 
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <BackButton />
            <Logo />
            <SlideUpCard title={"Recuperar\nContraseña"} subtitle={"Sigue las instrucciones\npara recuperar tu contraseña"} style={styles.card}>
                {step === 'email' && (
                    <View style={styles.stepsContainer}>
                    <View style={styles.instructionContainer}>
                    <Text style={styles.infoText}>
                        Ingresa tu dirección de correo electrónico {'\n'}y te enviaremos un código para {'\n'}que puedas recuperar tu contraseña.
                    </Text>
                </View>
                <CustomInput
                    label="Correo Electrónico"
                    placeholder="sucuenta@gmail.com"
                    value={email}
                    onChangeText={setEmail}
                    error={errors.email}
                />
                <CustomButton text="Enviar Código" onPress={handleSubmit} />
                        </View>
        )}
                {step === 'code' && (
                    <View style={styles.stepsContainer}>
                 <View style={styles.instructionContainer}>
                            <Text style={styles.infoText}>
                                Ingresa el código de verificación {'\n'}que fue enviado a tu correo electrónico.
                            </Text>
                        </View>
                        <CustomInput
                            label="Código de Verificación"
                            placeholder="123456"
                            value={verificationCode}
                            onChangeText={setVerificationCode}
                            error={errors.verificationCode}
                        />
                        <CustomButton text="Recuperar Contraseña" onPress={handleVerifyCode} />
                        </View>
            )}
                {step === 'password' && (
                    <View style={styles.stepsContainer}>
                <View style={styles.instructionContainer}>
                            <Text style={styles.infoText}>
                                Ingrese su nueva contraseña.
                            </Text>
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
                        : '¡La contraseña ha sido cambiada exitosamente! Serás redirigido al Inicio en breve.'}
                </Text>
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
    stepsContainer: {
        display: 'flex',
        width: '100%',
        alignItems: 'center'
    },
    card: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '73%',
    },
  infoText: {
      fontSize: 16,
    marginVertical: 16,
      textAlign: 'center',
    },
    instructionContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: '93%',
        backgroundColor: "white",
        borderRadius: '%',
        shadowColor: Colors.inputGray,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: 40
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center'
    }
});
