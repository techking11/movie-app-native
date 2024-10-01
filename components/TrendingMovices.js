import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { fallbackMoviePoster, image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');
export default function TrendingMovices({ data }) {
  const navigation = useNavigation();
  function handleClick(item) {
    navigation.navigate('Movice', item);
  }

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-4">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MoviceCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  );
}

const MoviceCard = function ({ item, handleClick }) {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) || fallbackMoviePoster }}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
