"use client"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useRouter } from "expo-router"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"

import ProfilePic from "../../../components/ProfilePic"
import DisplayField from "../../../components/DisplayField"
import IconButton from "../../../components/IconButton"
import SlideUpCard from "../../../components/SlideUpCard"
import BackButton from "../../../components/BackButton"
import CustomButton from '../../../components/CustomButton';
import { useProfile } from "../../../hooks/useProfile"
import { Colors } from "../../../constants/Colors"
import BottomNavBar from "../../../components/NavBar"
import ModalWrapper from "../../../components/ModalWrapper"
import { getUserData, isPremiumUser, logoutUser } from "../../../utils/storage"

export default function ProfileScreen() {
  const router = useRouter()
  const { data, formData, isModalVisible, openModal, closeModal, saveForm, updateFormData } = useProfile()
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    getUserData()
    const loadPremiumStatus = async () => {
      try {
        const premiumStatus = await isPremiumUser()
        setIsPremium(premiumStatus)
      } catch (error) {
        console.error("Error loading premium status:", error)
      }
    }

    loadPremiumStatus()
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      <BackButton style={styles.backButton} />
        <View style={styles.container}>
          <View style={styles.mainContent}>
            <SlideUpCard title="Mi Perfil" style={styles.card}>
              <IconButton 
                name="edit" 
                size={24} 
                color={Colors.textColor} 
                style={styles.editButton} 
                onPress={openModal} 
              />
              <IconButton
                name="message-circle"
                size={24}
                color={Colors.textColor}
                style={styles.chatButton}
                onPress={() => router.push("../tabs/chat")}
              />

              <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <ProfilePic 
                uri="https://image.freepik.com/foto-gratis/hermosa-mujer-sobre-fondo-blanco_144627-2849.jpg" 
                size={wp("30%")} 
                style={styles.avatar} />

                <View style={styles.usernameView}>
                <Text style={styles.name}>
                  {data.fullName}
                  {isPremium && <Text style={styles.premiumBadge}> Premium</Text>}
                  </Text>
                  </View>

                <View style={styles.fieldWrapper}>
                  <DisplayField label="Email" value={data.email || "No especificado"} />
                </View>
                <View style={styles.fieldWrapper}>
                  <DisplayField label="Provincia" value={data.province || "No especificado"} />
                </View>
                <View style={styles.fieldWrapper}>
                  <DisplayField label="Ciudad" value={data.department || "No especificado"} />
                </View>
                <View style={styles.fieldWrapper}>
                  <DisplayField label="Dirección" value={data.address || "No especificado"} />
                </View>
              </ScrollView>

              <CustomButton 
                text="Cerrar Sesión" 
                onPress={() => {
                  console.log('Cerrando sesión...')
                  logoutUser()
                  router.replace('../welcome')
                }}
                style={styles.customBotton}
              />

            </SlideUpCard>
          </View>

        <ModalWrapper
          visible={isModalVisible}
          title="Editar perfil"
          onCancel={closeModal}
          onSubmit={saveForm}
          cancelLabel="Cancelar"
          submitLabel="Guardar"
        >
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <DisplayField
            label="Nombre completo"
            value={formData.fullName}
            editable
            onChangeText={(text) => updateFormData('fullName', text)}
          />
          <DisplayField
            label="Email"
            value={formData.email}
            editable
            onChangeText={(text) => updateFormData('email', text)}
          />
          <DisplayField
            label="Provincia"
            value={formData.province}
            editable
            onChangeText={(text) => updateFormData('province', text)}
          />
          <DisplayField
            label="Ciudad"
            value={formData.department}
            editable
            onChangeText={(text) => updateFormData('city', text)}
          />
          <DisplayField
            label="Dirección"
            value={formData.address}
            editable
            onChangeText={(text) => updateFormData('address', text)}
          />
        </ScrollView>
        </ModalWrapper>
      <BottomNavBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    paddingTop: hp("1.5%"),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor,
  },
  mainContent: {
    flex: 1,
    justifyContent: "flex-start",
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: hp("4%"),
    paddingHorizontal: wp("5%"),
    paddingBottom: hp("2%"),
    shadowColor: "black",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    marginTop: hp("15%"),
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: hp("6%"),
    paddingHorizontal: wp("2%"),
    width: "100%",
    flexGrow: 1,
  },
  avatar: {
    marginTop: hp("2%"),
    borderWidth: 4,
    borderColor: "white",
  },
  usernameView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  name: {
    marginTop: hp("1.5%"),
    marginBottom: hp("3%"),
    fontSize: wp("5.5%"),
    fontWeight: "700",
    color: "black",
    textAlign: "center",
  },
  premiumBadge: {
    fontSize: wp("4%"),
    color: Colors.orangeColor,
    fontWeight: "bold",
  },
  fieldWrapper: {
    width: "100%",
    maxWidth: 400,
    marginBottom: hp("2%"),
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  editButton: {
    position: "absolute",
    top: hp("3%"),
    right: wp("6%"),
    zIndex: 10,
  },
  chatButton: {
    position: "absolute",
    top: hp("3%"),
    left: wp("6%"),
    zIndex: 10,
  },
  customBotton: {
    marginTop: hp('20%'),
    width: '100%'
  },
})
