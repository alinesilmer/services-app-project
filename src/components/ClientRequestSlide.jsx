import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
import SlideUpCard from './SlideUpCard';
import CustomButton from './CustomButton';
import { router } from 'expo-router';
import { getUserProfile } from '../utils/storage';
import { useEffect, useState } from 'react';
import { Metrics } from '../constants/Metrics';
import { Colors } from '../constants/Colors';

export default ClientRequesSlide = ({ title, problems = [], details = [], images = [] }) => {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await getUserProfile();
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
            <Text style={{ textAlign: "center", marginTop: Metrics.marginS, color: "#fff" }}>
            Cargando perfil...
            </Text>
        </View>
        );
    }

    const handleSendMessage = () => {
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
                            <Text style={{ marginLeft: Metrics.marginS }}>No hay imágenes disponibles.</Text>
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
        marginTop: Metrics.topSpace,
		height: Metrics.screenL,
		alignItems: "stretch",
		paddingHorizontal: Metrics.marginM,
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
		padding: Metrics.marginM,
		marginVertical: Metrics.marginS,
		borderRadius: Metrics.radiusS,
	},
	boxTitle: {
		fontWeight: "bold",
		fontSize: Metrics.fontM,
	},
	img: {
		width: Metrics.screenS * 0.3,
		height: Metrics.screenS * 0.3,
		borderColor: Colors.textColor,
		borderWidth: Metrics.marginXS,
		borderRadius: Metrics.radiusS,
		margin: Metrics.marginS,
	},
	imageScroll: {
		flex: 1,
		flexDirection: 'row',
		padding: Metrics.marginS,
		marginTop: Metrics.marginS,
	}
});