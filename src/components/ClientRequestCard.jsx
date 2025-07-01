import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Colors } from '../constants/Colors';
import { Metrics } from '../constants/Metrics';
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export const ClientRequestCard = ({ item }) => {

	const routeToMoreDetails = () => {
		router.push({
			pathname: '/tabs/professional/clientRequest',
			params: {
					title: item.title,
					problems: JSON.stringify(item.problems),
					details: JSON.stringify(item.details),
					images: JSON.stringify(item.images),
			}
		});
	}

	return(<>
		<View style={styles.requestCard}>
			<View style={styles.alertStyle}>
				<Feather name='alert-circle' size={Metrics.iconSmall} color={Colors.orangeColor}/>
				<Text style={styles.alertText}>¡SE NECESITA!</Text>
			</View>
			<Text style={styles.titleCard}>{item.title}</Text>
			<Pressable onPress={routeToMoreDetails} style={({ pressed }) => [
				styles.boton,
				pressed && styles.botonPresionado
			]}>
					<Text style={styles.texto}>Ver detalles</Text>
			</Pressable>
		</View>
	</>);
}

const styles = StyleSheet.create({
	requestCard: {
		margin: Metrics.marginXS,
		padding: Metrics.marginS,
		paddingHorizontal: Metrics.marginS,
		borderRadius: Metrics.radiusS,
		borderWidth: Metrics.marginXS,
		borderColor: '#888',
		alignItems: 'center',
		elevation: 5,
		backgroundColor: '#dedede'
	},
	alertStyle: {
		flex: 1,
		flexDirection: 'row',
		width: Metrics.animationL,
		justifyContent: 'space-evenly',
		marginVertical: Metrics.marginS,
	},
	alertText: {
		color: Colors.orangeColor,
		fontSize: Metrics.fontM,
		fontWeight: 'bold'
	},
	titleCard: {
		marginVertical: Metrics.marginS,
		fontSize: Metrics.fontS,
	},
	boton: {
		backgroundColor: '#aaa',
		paddingVertical: '4%',
		borderRadius: Metrics.radiusS,
		alignItems: 'center',
		width: Metrics.animationXL,
		zIndex: 1,
	},
	botonPresionado: {
		backgroundColor: Colors.orangeColor
	},
	texto: {
		color: Colors.textColor,
		fontSize: Metrics.fontS,
	}
});