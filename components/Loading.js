import { Dimensions, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');
export default function Loading() {
  return (
    <View
      style={{ height, width }}
      className="absolute flex-row justify-center items-center"
    >
      <Progress.CircleSnail thickness={5} size={75} color={theme.background} />
    </View>
  );
}
