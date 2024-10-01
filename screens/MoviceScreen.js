import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MoviceList from '../components/MoviceList';
import Loading from '../components/Loading';
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovie,
  image500,
} from '../api/moviedb';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-3';
export default function MoviceScreen() {
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovices, setSimilarMovices] = useState([]);
  const { params: item } = useRoute();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  useEffect(() => {
    getMoviceDetails();
    getMovieCredits();
    getSimilarMovies();
  }, [item]);
  const getMoviceDetails = async () => {
    const data = await fetchMovieDetails(item?.id);
    data && setMovie(data);
    setLoading(false);
  };
  const getMovieCredits = async () => {
    const data = await fetchMovieCredits(item?.id);
    data && data.cast && setCast(data.cast);
    setLoading(false);
  };
  const getSimilarMovies = async () => {
    const data = await fetchSimilarMovie(item?.id);
    data && data.results && setSimilarMovices(data.results);
    setLoading(false);
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 2 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movice poster */}
      <View className="w-full">
        <SafeAreaView
          className={`absolute z-20 w-full flex-row justify-between items-center px-4 ${topMargin}`}
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
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>
      {/* movice details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-2xl font-bold tracking-wider">
          {movie?.title}
        </Text>
        {/* status, release, runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          {movie?.status} | {movie?.release_date?.split('-')[0]} |{' '}
          {movie?.runtime} min
        </Text>
        {/* generes */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let showLine = index + 1 != movie?.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre?.name} {showLine ? ' | ' : null}
              </Text>
            );
          })}
        </View>
        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wider text-center leading-6">
          {movie.overview}
        </Text>
      </View>
      {/* cast */}
      <Cast cast={cast} />
      {/* Similar movices */}
      <MoviceList
        title="Similar Movies"
        hideSeeAll={true}
        data={similarMovices}
      />
    </ScrollView>
  );
}
