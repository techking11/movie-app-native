import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MoviceScreen from '../screens/MoviceScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Movice"
          options={{ headerShown: false }}
          component={MoviceScreen}
        />
        <Stack.Screen
          name="Person"
          options={{ headerShown: false }}
          component={PersonScreen}
        />
        <Stack.Screen
          name="Search"
          options={{ headerShown: false }}
          component={SearchScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
