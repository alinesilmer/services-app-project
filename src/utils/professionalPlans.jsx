import { Feather } from '@expo/vector-icons';

export const professionalPlans = {
	headers: ['', 'ESTANDAR', 'PLUS'],
	rows: [
		{
			label: 'Precio',
			values: ['2 US$/mes', '5 US$/mes']
		},
		{
			label: 'Días de Publicidad',
			values: ['4 días\npor mes', '4 días\npor semana']
		},
		{
			label: 'Elección de Días',
			values: [<Feather name="x-square" size={20}/>, <Feather name="check-square" size={20}/>]
		},
		{
			label: 'Cancelación Gratuita',
			values: [<Feather name="check-square" size={20}/>, <Feather name="check-square" size={20}/>]
		}
	]
};