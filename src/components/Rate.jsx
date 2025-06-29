import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Metrics } from '../constants/Metrics';

const Rate = ({ rating = 4.8, reviews = 20}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {Array.from({ length: fullStars }).map((_, index) => (
        <MaterialIcons
          key={`full-${index}`}
          name="star"
          size={Metrics.iconXSmall}
          color="#FFD700" 
        />
      ))}

      {hasHalfStar && (
        <MaterialIcons
          name="star-half"
          size={Metrics.iconXSmall}
          color="#FFD700"
        />
      )}

      {Array.from({ length: emptyStars }).map((_, index) => (
        <MaterialIcons
          key={`empty-${index}`}
          name="star-border"
          size={Metrics.iconXSmall}
          color="#ccc" 
        />
      ))}

          <Text style={{ marginLeft: Metrics.marginXS, fontSize: Metrics.fontS }}>{rating.toFixed(1)}</Text>
          <Text style={{marginLeft: Metrics.marginXS, fontSize: Metrics.fontXS, color: 'gray'}}>({reviews} reseñas)</Text>
    </View>
  );
};

export default Rate;
