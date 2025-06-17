import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import SlideUpCard from './SlideUpCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from './CustomButton';
import { router } from 'expo-router';
import { getUserProfile } from '../utils/storage';
import { useEffect, useState } from 'react';

export default ClientRequesSlide = ({ title, problems = [], details = [], images = [] }) => {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await getUserProfile();
                console.log('Perfil cargado: ', profile);
                if (profile) {
                    setUserProfile(profile);
                }
            } catch (error) {
                console.log('Error al cargar el perfil: ', error);
            }
        };
        fetchUserProfile();
    }, []);

    if (!userProfile) {
        return (
        <View style={styles.container}>
            <Text style={{ textAlign: "center", marginTop: 50, color: "#fff" }}>
            Cargando perfil...
            </Text>
        </View>
        );
    }

    const handleSendMessage = () => { console.log('USERPROFILE:', userProfile);
      router.push({
        pathname: "/tabs/chat",
        params: {
          professionalId: userProfile.id,
          professionalName: userProfile.fullName,
          professionalAvatar: userProfile.avatar,
          profession: userProfile.profesion,
        },
      })
    }

    return(<>
        <SlideUpCard title={title} style={styles.slideUpCard}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.problemDescriptionContainer, styles.box]}>
                    <Text style={styles.boxTitle}>Problema/s identificado/s:</Text>
                    {problems.length > 0 ? (
                        problems.map((problem, index) => (
                            <Text key={index} style={styles.problemText}>• {problem}</Text>
                        ))
                    ) : (
                        <Text style={styles.problemText}>• No se especificaron problemas.</Text>
                    )}
                </View>
                
                <View style={[styles.problemDetailsContainer, styles.box]}>
                    <Text style={styles.boxTitle}>Detalle/s:</Text>
                    {details.length > 0 ? (
                        details.map((detail, index) => (
                            <Text key={index} style={styles.detailText}>
                                • {detail}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.detailText}>No se especificaron detalles.</Text>
                    )}
                </View>
                <View style={[styles.problemPhotoContainer, styles.box]}>
                    <Text style={styles.boxTitle}>Imagen/es:</Text>
                    <ScrollView
                        horizontal
                        style={styles.imageScroll}
                        showsHorizontalScrollIndicator={false}
                    >
                        {images.length > 0 ? (
                            images.map((imgUri, index) => (
                            <Image
                                key={index}
                                source={{ uri: imgUri }}
                                style={styles.img}
                            />
                            ))
                        ) : (
                            <Text style={{ marginLeft: 10 }}>No hay imágenes disponibles.</Text>
                        )}
                    </ScrollView>
                </View>
                <CustomButton text='Enviar Mensaje' onPress={handleSendMessage}/>
            </ScrollView>
        </SlideUpCard>
    </>);
}

const styles = StyleSheet.create({
    slideUpCard: {
        flex: 1,
        marginTop: hp('15%'),
        borderTopRightRadius: 0,
        borderTopLeftRadius: wp('40%'),
        paddingHorizontal: wp('5%'),
    },
    problemDescriptionContainer: {
    },
    problemDetailsContainer: {
    },
    problemPhotoContainer: {
    },
    box: {
        backgroundColor: '#dcdcdc',
        flex: 1,
        padding: wp('4%'),
        marginVertical: hp('0.5%'),
        borderRadius: wp('2.5%'),
    },
    boxTitle: {
        fontWeight: 900,
        fontSize: wp('4%'),
    },
    img: {
        width: 200,
        height: 200,
        borderColor: '#000',
        borderWidth: 3,
        borderStyle: 'solid',
        borderRadius: wp('2.5%'),
        margin: wp('1%'),
    },
    imageScroll: {
        flex: 1,
        flexDirection: 'row',
        padding: wp('1%'),
        marginTop: hp('1%'),
    }
});