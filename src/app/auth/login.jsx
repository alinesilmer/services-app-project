"use client"
import { useState, useEffect } from "react"
import { View, StyleSheet, StatusBar, Text, Pressable, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          <BackButton />
          <Logo />
          <SlideUpCard title="Inicio" subtitle={"Por favor, ingrese su\ncorreo para continuar"} style={styles.card}>
            <CustomInput
              label="Email"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
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
          </SlideUpCard>
        </View>
      </KeyboardAvoidingView>
      <SafeAreaView style={{ height: hp("1%"), backgroundColor: Colors.whiteColor }} />
      <ModalCard visible={showLoginError} title="Error de inicio de sesión" onClose={() => setShowLoginError(false)}>
        <AnimationFeedback type="failure" />
        <Text style={{ textAlign: "center", marginTop: 10 }}>{loginErrorMessage}</Text>
      </ModalCard>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    bottom: 0,
    width: wp("100%"),
    height: hp("72%"),
  },
  linksContainer: {
    marginTop: hp("2%"),
    alignItems: "center",
    gap: hp("1.2%"),
  },
  linkRecovery: { color: Colors.blueColor },
  linkRegister: { color: Colors.orangeColor, textAlign: "center" },
  linkNoRegister: { color: Colors.dark },
})
