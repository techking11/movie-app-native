import { useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity } from 'react-native';
import { ScrollView, Text, View } from 'react-native';
import { fallbackPersonImage, image185 } from '../api/moviedb';

export default function Cast({ cast }) {
  const navigation = useNavigation();
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast.length > 0 ? (
          cast.map((person, index) => (
            <TouchableOpacity
              className="mr-4 items-center"
              key={index}
              onPress={() => navigation.push('Person', person)}
            >
              <Image
                source={{
                  uri: image185(person?.profile_path) || fallbackPersonImage,
                }}
                className="rounded-2xl h-24 w-20"
              />
              <Text className="text-white text-xs mt-1">
                {person?.character?.length > 10
                  ? person?.character?.slice(0, 10) + '...'
                  : person?.character}
              </Text>
              <Text className="text-neutral-400 text-xs mt-1">
                {person?.original_name?.length > 10
                  ? person?.original_name?.slice(0, 10) + '...'
                  : person?.original_name}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text className="ml-1 text-neutral-400">N/A</Text>
        )}
      </ScrollView>
    </View>
  );
}
