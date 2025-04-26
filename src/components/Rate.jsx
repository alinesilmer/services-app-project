import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

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
          size={15}
          color="#FFD700" 
        />
      ))}

      {hasHalfStar && (
        <MaterialIcons
          name="star-half"
          size={15}
          color="#FFD700"
        />
      )}

      {Array.from({ length: emptyStars }).map((_, index) => (
        <MaterialIcons
          key={`empty-${index}`}
          name="star-border"
          size={15}
          color="#ccc" 
        />
      ))}

          <Text style={{ marginLeft: 6, fontSize: 14 }}>{rating.toFixed(1)}</Text>
          <Text style={{marginLeft: 4, fontSize: 12, color: 'gray'}}>({reviews} reseñas)</Text>
    </View>
  );
};

export default Rate;
