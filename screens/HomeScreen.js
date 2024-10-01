// import from packages
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
//import from files
import { styles } from '../theme';
import TrendingMovices from '../components/TrendingMovices';
import MoviceList from '../components/MoviceList';
import Loading from '../components/Loading';
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../api/moviedb';
// platform
const ios = Platform.OS == 'ios';
export default function HomeScreen() {
  // states and hooks
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);
  // get trending movies
  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    data && data.results && setTrending(data.results);
    setLoading(false);
  };
  // get upcoming movies
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    data && data.results && setUpcoming(data.results);
    setLoading(false);
  };
  // get top rated movies
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    data && data.results && setTopRated(data.results);
    setLoading(false);
  };
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth="2" color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovices
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth="2" color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 2 }}
        >
          {/* Trending movice carousel */}
          <TrendingMovices data={trending} />
          {/* Upcoming movice now  */}
          <MoviceList title="Upcoming" data={upcoming} />
          {/* top rated movice row */}
          <MoviceList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
}
