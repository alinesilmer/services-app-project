// “use client”
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import ProfilePic    from "../../../components/ProfilePic";
import DisplayField  from "../../../components/DisplayField";
import IconButton    from "../../../components/IconButton";
import SlideUpCard   from "../../../components/SlideUpCard";
import BackButton    from "../../../components/BackButton";
import CustomButton  from "../../../components/CustomButton";
import ModalWrapper  from "../../../components/ModalWrapper";
import BottomNavBar  from "../../../components/NavBar";

import { Colors }      from "../../../constants/Colors";
import { usePremium }  from "../../../hooks/usePremium";
import { useProfile }  from "../../../hooks/useProfile";
import { getUserData, logoutUser } from "../../../utils/storage";

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
        const d = await getUserData();
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
    router.replace("/welcome");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={Colors.blueColor} />
      <BackButton style={styles.backButton} onPress={() => router.back()} />

      <View style={styles.container}>
        <SlideUpCard title="Mi Perfil Profesional" style={styles.card}>
          <IconButton
            name="edit"
            size={24}
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
                "https://randomuser.me/api/portraits/men/73.jpg"
              }
              size={wp("30%")}
              style={styles.avatar}
            />

            <View style={styles.userProfWrapper}>
              <Text style={styles.name}>
                {userData?.fullName || data.fullName || "Profesional"}
              </Text>
              {isPremiumActive && (
                <Text style={styles.premiumBadge}>{getPremiumStatusText()}</Text>
              )}
              </View>
            <Text style={styles.profession}>
              {userData?.profesion || data.profesion || "Profesional"}
            </Text>

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
    paddingTop: hp("1.5%")
  },
  container: {
    flex: 1,
    backgroundColor: Colors.blueColor, width: "100%"
  },
  backButton: {
    marginTop: hp("1%"),
    marginLeft: wp("5%")
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    marginTop: hp("15%"),
    padding: wp("4%"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: hp("2%")
  },
  avatar: {
    marginTop: hp("2%"),
    borderWidth: 4,
    borderColor: "white"
  },
  userProfWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: wp("5.5%"),
    fontWeight: "700",
    textAlign: "center",
    marginTop: hp("1%")
  },
  premiumBadge: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    color: Colors.orangeColor
  },
  profession: {
    fontSize: wp("4%"),
    color: Colors.grayColor,
    fontStyle: "italic",
    marginBottom: hp("5%"),
    marginTop: hp("1%")
  },
  fieldWrapper: {
    width: wp("90%"),
    marginBottom: hp("1.5%"),
    paddingHorizontal: hp("4%"),
  },
  premiumStatusCard: {
    backgroundColor: Colors.lightGray,
    padding: wp("4%"),
    borderRadius: wp("3%"),
    width: wp("90%"),
    alignItems: "center",
    marginVertical: hp("2%")
  },
  premiumStatusTitle: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    marginBottom: hp("0.5%")
  },
  premiumStatusText: {
    fontSize: wp("3.5%")
  },
  expirationText: {
    fontSize: wp("3.5%"),
    color: Colors.grayColor
  },
  buttonContainer: {
    width: wp("85%"),
    alignItems: "center",
    marginVertical: hp("1%")
  },
  customButton: {
    width: "100%"
  },
  editButton: {
    position: "absolute",
    top: hp("3%"),
    right: wp("6%")
  },
  modalScroll: {
    paddingBottom: 20,
    paddingHorizontal: wp("2%")
  },
});
