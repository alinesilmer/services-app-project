
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CustomFlatList = ({ data, renderItem, keyExtractor, style }) => {
  return (
    <View  style={styles.wrapper}>
    <FlatList
      style={styles.chat}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      />
      </View>
  );
};

export default CustomFlatList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chat: {
    width: wp('95%'),
  },
});