"use client"

import { useState } from "react"
import { View, StyleSheet, StatusBar, Text, Pressable, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native"
import { useRouter } from "expo-router"
import CheckBox from "expo-checkbox"
import useAppDispatch from '../../hooks/useAppDispatch'
import { loginSuccess } from '../../redux/slices/authSlice'
import Logo from "../../components/Logo"
import SlideUpCard from "../../components/SlideUpCard"
import CustomInput from "../../components/CustomInput"
import CustomButton from "../../components/CustomButton"
import BackButton from "../../components/BackButton"
import ModalCard from "../../components/ModalCard"
import DatePicker from "../../components/DatePicker"
import AnimationFeedback from "../../components/AnimationFeedback"
import { useValidation } from "../../hooks/useValidation"
import useDatePicker from "../../hooks/useDatePicker"
import { Metrics } from "../../constants/Metrics"
import { Colors } from "../../constants/Colors"
import { registerUser } from "../../utils/storage"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

export default function Register() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    birthdate: null,
    userType: "cliente",
    acceptTerms: false,
  })

  const { date, show, openPicker, handleChange: handleDate } = useDatePicker()
  const [errors, setErrors] = useState({})
  const [modalVisible, setMV] = useState(false)
  const [modalSuccess, setSuccess] = useState(true)
  const [loading, setLoading] = useState(false)

  const validationErrors = useValidation(formData)

  const change = (name, value) => setFormData((p) => ({ ...p, [name]: value }))

  const onRegister = async () => {
    setLoading(true)

    if (!formData.acceptTerms) {
      validationErrors.acceptTerms = "Debes aceptar los términos y condiciones"
    }

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      const result = await registerUser({
        ...formData,
        birthdate: date ? date.toISOString() : null,
        createdAt: new Date().toISOString(),
      })

      setSuccess(result.success)
      setMV(true)

      if (result.success) {
        dispatch(loginSuccess(result.user))
        setTimeout(() => {
          setMV(false)
          router.push("auth/login")
        }, 2000)
      }
    } else {
      setSuccess(false)
      setMV(true)
    }

    setLoading(false)
  }

  const TermRoute = () => {
    router.push("auth/terms")
  }

  const LoginRoute = () => {
    router.push("auth/login")
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          <BackButton />
          <Logo />

          <SlideUpCard
            title={"Crear una Cuenta"}
            subtitle={"Por favor, ingrese sus\ndatos para registrarse"}
            style={styles.card}
          >
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
              <View style={styles.checkRow}>
                {["cliente", "profesional"].map((option) => (
                  <Pressable key={option} onPress={() => change("userType", option)}>
                    <View style={styles.checkItem}>
                      <CheckBox
                        value={formData.userType === option}
                        onValueChange={() => change("userType", option)}
                        tintColors={{ true: Colors.orangeColor }}
                      />
                      <Text style={[styles.checkLabel, formData.userType === option && styles.checkLabelActive]}>
                        {option[0].toUpperCase() + option.slice(1)}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>

              <CustomInput
                style={styles.inputs}
                label="Usuario"
                placeholder="Usuario"
                value={formData.username}
                onChangeText={(t) => change("username", t)}
                error={errors.username}
                required
              />
              <CustomInput
                style={styles.inputs}
                label="Correo electrónico"
                placeholder="sucorreo@gmail.com"
                value={formData.email}
                onChangeText={(t) => change("email", t)}
                keyboardType="email-address"
                error={errors.email}
                required
              />
              <CustomInput
                style={styles.inputs}
                label="Contraseña"
                placeholder="********"
                value={formData.password}
                onChangeText={(t) => change("password", t)}
                secureTextEntry
                error={errors.password}
                required
              />

              <DatePicker
                label="Fecha de Nacimiento"
                display={Platform.OS === "ios" ? "inline" : "default"}
                value={date}
                onPress={openPicker}
                show={show}
                maximumDate={new Date()}
                themeVariant="dark"
                onChange={(e, selected) => {
                  handleDate(e, selected)
                  change("birthdate", selected)
                }}
              />
              {errors.birthdate && <Text style={styles.errorText}>{errors.birthdate}</Text>}

              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={formData.acceptTerms}
                  onValueChange={(v) => change("acceptTerms", v)}
                  tintColors={{ true: Colors.orangeColor }}
                />
                <Text style={styles.checkboxText}>Acepto los </Text>
                <Pressable onPress={TermRoute}>
                  <Text style={styles.link}>Términos y Condiciones</Text>
                </Pressable>
              </View>

              {errors.acceptTerms && <Text style={styles.errorText}>{errors.acceptTerms}</Text>}

              <View style={styles.registerButtonContainer}>
                <CustomButton text="Registrarme" onPress={onRegister} disabled={loading} />
              </View>

              <Text style={styles.simpleText}>¿Ya estás registrado?</Text>
              <Pressable onPress={LoginRoute}>
                <Text style={styles.link}>Haz click aquí {"\n"} para Iniciar Sesión</Text>
              </Pressable>
            </ScrollView>
          </SlideUpCard>

          <ModalCard
            visible={modalVisible}
            onClose={() => setMV(false)}
            title={modalSuccess ? "Registro exitoso" : "Error en el registro"}
          >
            <AnimationFeedback type={modalSuccess ? "success" : "failure"} />
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              {modalSuccess
                ? `¡Gracias por registrarte, ${formData.username}!`
                : Object.keys(errors).length > 0
                ? "Por favor corrige los errores en el formulario."
                : `El nombre de usuario o correo ya están registrados.`}
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
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    bottom: 0,
    height: Metrics.screenM,
    alignItems: "stretch",
  },
  scrollContainer: {
    flexGrow: 1,
    gap: Metrics.marginM,
    justifyContent: "space-between",
    paddingBottom: Metrics.marginL,
  },
  simpleText: {
    color: Colors.textColor,
    textAlign: "center",
    fontSize: Metrics.fontS,
  },
  link: {
    color: Colors.orangeColor,
    textAlign: "center",
    fontSize: Metrics.fontS,
  },
  checkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: Metrics.marginL,
    width: wp("80%"),
    marginBottom: Metrics.marginS,
  },
  checkItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkLabel: {
    marginLeft: Metrics.marginS,
    color: Colors.textColor,
  },
  checkLabelActive: {
    color: Colors.orangeColor,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: Metrics.marginS,
    gap: Metrics.marginS,
  },
  checkboxText: {
    color: Colors.textColor,
    fontSize: Metrics.fontS,
  },
  registerButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: Colors.errorColor,
    fontSize: Metrics.fontXS,
    marginBottom: Metrics.marginS,
  },
  inputs: {
    width: wp('100%'),
    fontSize: Metrics.fontXS,
  }
})
