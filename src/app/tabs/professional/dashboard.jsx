  import React, { useState, useEffect } from 'react';
  import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
  import { StatusBar } from 'expo-status-bar';
  import { useRouter } from 'expo-router';
  import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
  import { ButtonGroup } from 'react-native-elements';

  import ProfilePic from '../../../components/ProfilePic';
  import DisplayField from '../../../components/DisplayField';
  import IconButton from '../../../components/IconButton';
  import SlideUpCard from '../../../components/SlideUpCard';
  import BackButton from '../../../components/BackButton';
  import CustomButton from '../../../components/CustomButton';
  import { useProfile } from '../../../hooks/useProfessionalProfile';
  import { getUserProfile, saveUserProfile } from "../../../utils/storage";
  import { Colors } from '../../../constants/Colors';
  import BottomNavBar from '../../../components/NavBar';
  import ModalWrapper from '../../../components/ModalWrapper';
  import { getUserData, isPremiumProf, logoutUser } from "../../../utils/storage"

  export default function ProfileScreen() {
    const router = useRouter();
    const { data, formData, isModalVisible, openModal, closeModal, saveForm, updateFormData } = useProfile();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isPremium, setIsPremium] = useState(false)
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const profile = await getUserProfile();
          if (profile) {
            setUserProfile(profile);
            console.log("Perfil cargado:", profile);
          }
        } catch (error) {
          console.log("Error al obtener el perfil:", error);
        }
      };
      fetchUserProfile();
    }, []);

    useEffect(() => {
      getUserData()
      const loadPremiumStatus = async () => {
        try {
          const premiumStatus = await isPremiumProf()
          setIsPremium(premiumStatus)
        } catch (error) {
          console.error("Error loading premium status:", error)
        }
      }

      loadPremiumStatus()
    }, [])

    /* TODO: Cambiar direccionamientos a pestañas reales:
    <CustomButton text="Ver Servicios" onPress={router.push('tabs/professional/services')} />
    <CustomButton text="Ver Calificaciones" onPress={router.push('tabs/professional/comments')} />*/

    if (!userProfile) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="light" backgroundColor={Colors.primary} />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Cargando perfil...</Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" backgroundColor={Colors.primary} />
        <BackButton style={styles.backButton} />
          <View style={styles.container}>
            <View style={styles.mainContent}>
            <SlideUpCard title="Mi Perfil"  style={styles.card}>
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
                onPress={() => router.push('../chat')}
              />

              <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <ProfilePic
                  uri={ userProfile?.avatar }
                  size={wp('30%')}
                  style={styles.avatar}
                />
                
                <Text style={styles.name}>
                  {userProfile.fullName}
                  {isPremium && <Text style={styles.premiumBadge}> Premium</Text>}
                  </Text>

                <View style={styles.fieldWrapper}>
                  <DisplayField label="Email" value={userProfile.email || "No especificado"} />
                </View>
                <View style={styles.fieldWrapper}>
                  <DisplayField label="Provincia" value={useProfile.province || "No especificado"} />
                </View>
                <View style={styles.fieldWrapper}>
                  <DisplayField label="Ciudad" value={userProfile.department || "No especificado"} />
                </View>
                <View style={styles.fieldWrapper}>
                  <DisplayField label="Dirección" value={userProfile.address || "No especificado"} />
                </View>
                <View style={styles.fieldWrapper}>
                  <DisplayField label="Disponibilidad" value={userProfile.availability || "No especificado"} />
                </View>
              </ScrollView>

              <ButtonGroup
                buttons={['Ver Servicios', 'Ver Calificaciones']}
                selectedIndex={selectedIndex}
                onPress={(index) => {
                  setSelectedIndex(index);
                  if (index === 0) {
                    <CustomButton text="Ver Servicios" onPress={router.push('tabs/professional/services')} />
                  } else if (index === 1) {
                    console.log('Redirigir a calificaciones...');
                  }
                }}
                containerStyle={styles.buttonGroupContainer}
                buttonStyle={styles.buttonGroupButton}
                textStyle={styles.buttonGroupText}
                selectedButtonStyle={styles.buttonGroupSelectedButton}
                selectedTextStyle={styles.buttonGroupSelectedText}
              />

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
                onChangeText={(text) => {
                  updateFormData('fullName', text)
                  setUserProfile((prev) => ({ ...prev, fullName: text }));
                  saveUserProfile({ ...userProfile, fullName: text });
                }}
              />
              <DisplayField
                label="Email"
                value={formData.email}
                editable
                onChangeText={(text) => {
                  updateFormData('email', text)
                  setUserProfile((prev) => ({ ...prev, email: text }));
                  saveUserProfile({ ...userProfile, email: text });
                }}
              />
              <DisplayField
                label="Provincia"
                value={formData.province}
                editable
                onChangeText={(text) => {
                  updateFormData('province', text)
                  setUserProfile((prev) => ({ ...prev, province: text }));
                  saveUserProfile({ ...userProfile, province: text });
                }}
              />
              <DisplayField
                label="Ciudad"
                value={formData.department}
                editable
                onChangeText={(text) => {
                  updateFormData('department', text)
                  setUserProfile((prev) => ({ ...prev, department: text }));
                  saveUserProfile({ ...userProfile, department: text });
                }}
              />
              <DisplayField
                label="Dirección"
                value={formData.address}
                editable
                onChangeText={(text) => {
                  updateFormData('address', text)
                  setUserProfile((prev) => ({ ...prev, address: text }));
                  saveUserProfile({ ...userProfile, address: text });
                }}
              />
              <DisplayField
                label="Disponibilidad"
                value={formData.availability}
                editable
                onChangeText={(text) => {
                  updateFormData('availability', text)
                  setUserProfile((prev) => ({ ...prev, availability: text }));
                  saveUserProfile({ ...userProfile, availability: text });
                }}
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
      paddingTop: hp('1%')
    },
    container: {
      flex: 1,
      backgroundColor: Colors.blueColor
    },
    mainContent: {
      flex: 1,
      justifyContent: 'flex-start'
    },
    card: {
      flex: 1,
      width: wp('100%'),
      backgroundColor: 'white',
      paddingTop: hp('2%'),
      paddingHorizontal: wp('5%'),
      paddingBottom: hp('2%'),
      shadowColor: 'black',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 10,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'center',
      marginTop: hp('16%'),
      marginBottom: hp('1%')
    },
    scrollContent: {
      alignItems: 'flex-start',
      paddingBottom: hp('6%'),
      paddingHorizontal: wp('2%'), 
      width: '100%',
      flexGrow: 1,
    },
    avatar: {
      marginTop: hp('2%'),
      borderWidth: 4,
      borderColor: 'white',
    },
    name: {
      marginTop: hp('1.5%'),
      marginBottom: hp('2%'),
      fontSize: wp('5.5%'),
      fontWeight: '700',
      color: 'black',
      textAlign: 'center'
    },
    premiumBadge: {
      fontSize: wp("4%"),
      color: Colors.orangeColor,
      fontWeight: "bold",
    },
    fieldWrapper: {
      width: '100%',
      maxWidth: 400,
      marginBottom: hp('2%'),
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'column'
    },
    editButton: {
      position: 'absolute',
      top: hp('3%'),
      right: wp('6%'),
      zIndex: 10
    },
    chatButton: {
      position: 'absolute',
      top: hp('3%'),
      left: wp('6%'),
      zIndex: 10
    },
    customBotton: {
      marginTop: hp('20%'),
      width: '100%'
    },
    buttonGroupContainer: {
      marginTop: hp('3%'),
      borderRadius: 10,
      borderColor: Colors.blueColor,
      borderWidth: 1,
      width: '100%',
      maxWidth: 400,
      alignSelf: 'center',
      backgroundColor: Colors.whiteColor,
    },
    buttonGroupButton: {
      backgroundColor: Colors.whiteColor,
      borderColor: Colors.orangeColor,
    },
    buttonGroupText: {
      color: Colors.orangeColor,
      fontWeight: '700',
    },
    buttonGroupSelectedButton: {
      backgroundColor: Colors.orangeColor,
    },
    buttonGroupSelectedText: {
      color: Colors.whiteColor,
      fontWeight: 'bold',
    },

  });
