"use client"
import { useState, useEffect } from "react"
import { View, StyleSheet, StatusBar, Text, Pressable, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native"
import { useRouter } from "expo-router"
import useAppDispatch from '../../hooks/useAppDispatch'
import { loginSuccess } from '../../redux/slices/authSlice'
import BackButton from "../../components/BackButton"
import CustomButton from "../../components/CustomButton"
import CustomInput from "../../components/CustomInput"
import Logo from "../../components/Logo"
import SlideUpCard from "../../components/SlideUpCard"
import ModalCard from "../../components/ModalCard"
import AnimationFeedback from "../../components/AnimationFeedback"
import { Metrics } from '../../constants/Metrics';
import { Colors } from "../../constants/Colors"
import { useTogglePassword } from "../../hooks/useTogglePassword"
import { useValidation } from "../../hooks/useValidation"
import { saveUserLogin, getUserType, checkLoginCredentials, isUserLoggedIn, logoutUser } from "../../utils/storage"

export default function Login() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { secureTextEntry, toggleVisibility, icon } = useTogglePassword()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const validationErrors = useValidation({ email, password })
  const [showLoginError, setShowLoginError] = useState(false)
  const [loginErrorMessage, setLoginErrorMessage] = useState("")

  useEffect(() => {
    const checkLoginStatus = async () => {
      await logoutUser()
      const loggedIn = await isUserLoggedIn()
      if (loggedIn) {
        const userType = await getUserType()
        if (userType === "professional") {
          router.push("tabs/professional/home")
        } else {
          router.push("tabs/client/home")
        }
      }
    }
    checkLoginStatus()
  }, [])

  const handleLogin = async () => {
    setLoading(true)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      const loginResult = await checkLoginCredentials(email, password)
      if (loginResult.success && loginResult.user) {
        await saveUserLogin(loginResult.user)
        dispatch(loginSuccess(loginResult.user))
        const userType = loginResult.user.userType
        router.push(userType === "professional" ? "tabs/professional/home" : "tabs/client/home")
      } else {
        setLoginErrorMessage("Usuario o contraseña incorrectos")
        setShowLoginError(true)
      }
    } else {
      setLoginErrorMessage("Por favor complete todos los campos correctamente")
      setShowLoginError(true)
    }

    setLoading(false)
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          <BackButton />
          <Logo />
          <SlideUpCard title="Inicio" subtitle={"Por favor, ingrese su\ncorreo para continuar"} style={styles.card}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
              <CustomInput
                style={styles.inputs}
                label="Email"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                error={errors.email}
              />
              <CustomInput
                style={styles.inputs}
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

              <CustomButton text="Ingresar" onPress={handleLogin} disabled={loading} />
              <View style={styles.linksContainer}>
                <Pressable onPress={() => router.push("auth/recoverypass")}>
                  <Text style={styles.linkRecovery}>¿Olvidaste tu contraseña?</Text>
                </Pressable>
                <Pressable onPress={() => router.push("auth/register")}>
                <Text style={styles.linkRegister}>Haz click aquí {"\n"} para registrarte</Text>
                </Pressable>
                <Pressable onPress={() => router.push("tabs/client/home")}>
                  <Text style={styles.linkNoRegister}>Continuar sin registrarme</Text>
                </Pressable>
              </View>
            </ScrollView>
          </SlideUpCard>
        </View>
      </KeyboardAvoidingView>
      </SafeAreaView>
      <ModalCard visible={showLoginError} title="Error de inicio de sesión" onClose={() => setShowLoginError(false)}>
        <AnimationFeedback type="failure" />
        <Text style={{ textAlign: "center", marginTop: Metrics.marginS }}>{loginErrorMessage}</Text>
      </ModalCard>
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
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    bottom: 0,
    height: Metrics.screenM,
    alignItems: "stretch",
  },
  scrollContent: {
    flexGrow: 1,
    gap: Metrics.marginS,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: Metrics.marginL,
  },
  linksContainer: {
    marginTop: Metrics.marginS,
    alignItems: "center",
    gap: Metrics.marginS,
  },
  linkRecovery: { 
    color: Colors.blueColor,
    fontSize: Metrics.fontS,
  },
  linkRegister: { 
    color: Colors.orangeColor, 
    textAlign: "center",
    fontSize: Metrics.fontS,
  },
  linkNoRegister: { 
    color: Colors.dark,
    fontSize: Metrics.fontS,
  },
  inputs: {
    width: '90%',
    fontSize: Metrics.fontXS,
  }
})
