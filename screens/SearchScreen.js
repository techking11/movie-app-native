import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Dimensions, Text, TextInput, View } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../components/Loading';
import {
  fallbackMoviePoster,
  fetchSearchMovies,
  image185,
} from '../api/moviedb';

const { width, height } = Dimensions.get('window');
export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  useEffect(() => {
    getSearchMovies();
  }, [search]);
  const getSearchMovies = async () => {
    const data = await fetchSearchMovies(search);
    data && data.results && setResults(data.results);
    setLoading(false);
  };
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          placeholder="Search movies"
          placeholderTextColor="lightgray"
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
          value={search}
          onChangeText={(val) => setSearch(val)}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon color="white" size="25" />
        </TouchableOpacity>
      </View>
      {/* result */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results &&
              results.map((item, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push('Movice', item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      source={{
                        uri: image185(item.poster_path) || fallbackMoviePoster,
                      }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-300 ml-1 text-center">
                      {item?.title?.length > 20
                        ? item?.title?.slice(0, 20) + '...'
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center items-center">
          <Image
            source={require('../assets/images/mivie_time.png')}
            className="w-72 h-72"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
