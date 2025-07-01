// “use client”
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { useRouter } from "expo-router";

import ProfilePic    from "../../../components/ProfilePic";
import DisplayField  from "../../../components/DisplayField";
import IconButton    from "../../../components/IconButton";
import SlideUpCard   from "../../../components/SlideUpCard";
import BackButton    from "../../../components/BackButton";
import CustomButton  from "../../../components/CustomButton";
import ModalWrapper  from "../../../components/ModalWrapper";
import BottomNavBar  from "../../../components/NavBar";

import { Colors }      from "../../../constants/Colors";
import { Metrics } from "../../../constants/Metrics";
import { usePremium }  from "../../../hooks/usePremium";
import { useProfile }  from "../../../hooks/useProfile";
import { getUserProfile, logoutUser } from "../../../utils/storage";

export default function ProfessionalProfileScreen() {
  const router = useRouter();
  const { premium, daysRemaining } = usePremium();
  const {
    data,
    formData,
    isModalVisible,
    openModal,
    closeModal,
    saveForm,
    updateFormData
  } = useProfile();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const d = await getUserProfile();
        setUserData(d);
      } catch (err) {
        console.error("Error loading user data:", err);
      }
    })();
  }, []);

  const isPremiumActive =
    premium.isPremiumProf && ["active", "trial"].includes(premium.premiumStatus);

  const getPremiumStatusText = () => {
    switch (premium.premiumStatus) {
      case "active":
        return premium.premiumType === "estandar"
          ? "Premium Estándar"
          : "Premium Plus";
      case "trial":
        return `Prueba (${daysRemaining} días restantes)`;
      case "paused":
        return "Premium Pausado";
      case "expired":
        return "Premium Expirado";
      case "cancelled":
        return "Premium Cancelado";
      default:
        return null;
    }
  };

  const getPremiumButtonText = () => {
    if (["inactive", "expired"].includes(premium.premiumStatus)) {
      return premium.premiumStatus === "expired"
        ? "Renovar Premium"
        : "Obtener Premium Profesional";
    }
    return "Gestionar Premium";
  };

  const handlePremiumAction = () => {
    if (["inactive", "expired"].includes(premium.premiumStatus)) {
      router.push("/auth/goPremium?type=professional");
    } else {
      router.push("/tabs/managePremium");
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/auth/login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={Colors.blueColor} />
      <BackButton />

      <View style={styles.container}>
        <SlideUpCard title="Mi Perfil Profesional" style={styles.card}>
          <IconButton
            name="edit"
            size={Metrics.iconSmall}
            color={Colors.textColor}
            style={styles.editButton}
            onPress={openModal}
          />

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <ProfilePic
              uri={
                userData?.avatar ||
                data.avatar ||
                "https://i.pinimg.com/736x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg"
              }
              size={Metrics.iconXLarge}
              style={styles.avatar}
            />

            <View style={styles.userProfWrapper}>
              <Text style={styles.name}>
                {console.log('DATOS: ', data)}
                {userData?.fullName || data.fullName || "Profesional"}
              </Text>
              {isPremiumActive && (
                <Text style={styles.premiumBadge}>{getPremiumStatusText()}</Text>
              )}
              </View>
            <Text style={styles.profession}>
              {userData?.profesion || data.profesion || "Profesional"}
            </Text>
            <View style={styles.information}>
            {[
              ["Email", userData?.email || data.email],
              ["Profesión", userData?.profesion || data.profesion],
              ["Descripción", userData?.descripcion || data.descripcion],
              ["Disponibilidad", userData?.availability || data.availability],
              ["Provincia", userData?.province || data.province],
              ["Ciudad", userData?.department || data.department],
              ["Dirección", userData?.address || data.address],
            ].map(([label, value]) => (
              <View key={label} style={styles.fieldWrapper}>
                <DisplayField label={label} value={value || "No especificado"} style={styles.fieldValue} />
              </View>
            ))}
            </View>

            {getPremiumStatusText() && (
              <View style={styles.premiumStatusCard}>
                <Text style={styles.premiumStatusTitle}>Estado Premium:</Text>
                <Text style={styles.premiumStatusText}>
                  {getPremiumStatusText()}
                </Text>
                {premium.premiumEndDate && (
                  <Text style={styles.expirationText}>
                    {["trial"].includes(premium.premiumStatus)
                      ? "Prueba termina: "
                      : "Renovación: "}
                    {new Date(premium.premiumEndDate).toLocaleDateString()}
                  </Text>
                )}
              </View>
            )}

            <View style={styles.buttonContainer}>
              <CustomButton
                text={getPremiumButtonText()}
                onPress={handlePremiumAction}
                style={[
                  styles.customButton,
                  {
                    backgroundColor:
                      ["inactive", "expired"].includes(premium.premiumStatus)
                        ? Colors.orangeColor
                        : Colors.blueColor,
                  },
                ]}
              />
            </View>

            <View style={styles.buttonContainer}>
              <CustomButton
                text="Cerrar Sesión"
                onPress={handleLogout}
                style={[styles.customButton, { backgroundColor: "#DC3545" }]}
              />
            </View>
          </ScrollView>
        </SlideUpCard>
      </View>

      <ModalWrapper
        visible={isModalVisible}
        title="Editar perfil profesional"
        onCancel={closeModal}
        onSubmit={saveForm}
        cancelLabel="Cancelar"
        submitLabel="Guardar"
      >
        <ScrollView contentContainerStyle={styles.modalScroll}>
          <View style={styles.editText}>
          {[
            ["Nombre completo", formData.fullName, "fullName"],
            ["Email", formData.email, "email"],
            ["Profesión", formData.profesion, "profesion"],
            ["Descripción", formData.descripcion, "descripcion"],
            ["Disponibilidad", formData.availability, "availability"],
            ["Provincia", formData.province, "province"],
            ["Ciudad", formData.department, "department"],
            ["Dirección", formData.address, "address"],
          ].map(([label, val, key]) => (
            <DisplayField
              key={key}
              label={label}
              value={val}
              editable
              onChangeText={(txt) => updateFormData(key, txt)}
            />
          ))}
          </View>
        </ScrollView>
      </ModalWrapper>

      <BottomNavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.blueColor,
    paddingTop: Metrics.safeArea
  },
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor, 
    alignItems: "center",
    justifyContent: "center",
  },
  information:{
    textAlign: "center"
  },
  card: {
    position: "absolute",
    bottom: 0,
    height: Metrics.screenM,
    alignItems: "stretch",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: Metrics.marginS,
  },
  avatar: {
    marginTop: Metrics.marginS,
    borderWidth: Metrics.marginXS,
    borderColor: Colors.whiteColor
  },
  userProfWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: Metrics.fontL,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: Metrics.marginS,
  },
  premiumBadge: {
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    color: Colors.orangeColor
  },
  profession: {
    fontSize: Metrics.fontM,
    color: Colors.grayColor,
    fontStyle: "italic",
    marginBottom: Metrics.marginS,
    marginTop: Metrics.marginS,
  },
  fieldWrapper: {
    width: Metrics.animationXL,
    marginBottom: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
  },
  premiumStatusCard: {
    backgroundColor: Colors.lightGray,
    padding: Metrics.marginS,
    borderRadius: Metrics.radiusS,
    width: Metrics.animationXL,
    alignItems: "center",
    marginVertical: Metrics.marginS,
    
  },
  premiumStatusTitle: {
    fontSize: Metrics.fontM,
    fontWeight: "bold",
    marginBottom: Metrics.marginS,
  },
  premiumStatusText: {
    fontSize: Metrics.fontS
  },
  expirationText: {
    fontSize: Metrics.fontXS,
    color: Colors.grayColor
  },
  buttonContainer: {
    width: Metrics.animationXL,
    alignItems: "center",
    marginVertical: Metrics.marginS,
  },
  customButton: {
  },
  editButton: {
    position: "absolute",
    top: Metrics.marginXL,
    right: Metrics.marginM,
  },
  modalScroll: {
    fontSize: Metrics.fontS,
    paddingBottom: Metrics.marginS,
    paddingHorizontal: Metrics.marginS,
  },
  editText:{
    justifyContent: "center",
    alignItems: "center",

  },
});
