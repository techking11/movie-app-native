import { Dimensions, Image, Platform, TouchableOpacity } from 'react-native';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../theme';
import { HeartIcon } from 'react-native-heroicons/solid';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MoviceList from '../components/MoviceList';
import Loading from '../components/Loading';
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from '../api/moviedb';

let { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'my-3';
export default function PersonScreen() {
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovices, setPersonMovices] = useState([1, 2, 3, 4, 5]);
  const { params: person } = useRoute();
  const [loading, setLoading] = useState(true);
  const [personDtls, setPersonDtls] = useState({});
  useEffect(() => {
    getPersonDetails();
    getPersonMovies();
  }, [person]);
  const getPersonDetails = async () => {
    const data = await fetchPersonDetails(person?.id);
    data && setPersonDtls(data);
    setLoading(false);
  };
  const getPersonMovies = async () => {
    const data = await fetchPersonMovies(person?.id);
    data && data.cast && setPersonMovices(data.cast);
    setLoading(false);
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 2 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movice poster */}
      <SafeAreaView
        className={`z-20 w-full flex-row justify-between items-center px-4 ${topMargin}`}
      >
        <TouchableOpacity
          style={styles.background}
          className="rounded-xl p-1"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon
            size="35"
            color={isFavourite ? theme.background : 'white'}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {/* Personal Details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View className="flex-row justify-center">
            <View className="items-center rounded-full overflow-hidden h-64 w-64 border-2 border-neutral-500">
              <Image
                source={{
                  uri:
                    image342(personDtls?.profile_path) || fallbackPersonImage,
                }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {personDtls?.name}
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              {personDtls?.place_of_birth}
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6 flex-row justify-center items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {personDtls?.gender === 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {personDtls?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">
                {personDtls?.known_for_department}
              </Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {personDtls?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide leading-6">
              {personDtls?.biography || 'N/A'}
            </Text>
          </View>
          {/* movices */}
          <MoviceList title="Movies" data={personMovices} hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
}
