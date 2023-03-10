import * as React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  Pressable,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Image} from 'expo-image';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const arr = [
  {
    id: 0,
    color: 'lightcoral',
    url: 'https://assets.website-files.com/5e3dcab63f5462821f6fc673/60cbdc7a2a3de57c29e0fb92_Alva.png',
    name: 'Alva',
  },
  {
    id: 1,
    color: 'lightseagreen',
    url: 'https://assets.website-files.com/5e3dcab63f5462821f6fc673/60cbdc83ef191b2729acbafd_Sofi.png',
    name: 'Sofi',
  },
  {
    id: 2,
    color: 'steelblue',
    url: 'https://assets.website-files.com/5e3dcab63f5462821f6fc673/60cbdb42c46546ed92cdb257_Marian%20recortada.png',
    name: 'Marian',
  },
  {
    id: 3,
    color: 'khaki',
    url: 'https://assets.website-files.com/5e3dcab63f5462821f6fc673/60cbdb41c46546b5c2cdb249_Lali%20copia.jpg',
    name: 'Lali',
  },
];

type RootStack = {
  Screen1: undefined;
  Screen2: {
    i: number;
    uri: string;
  };
};

const Stack = createNativeStackNavigator<RootStack>();

type Screen1Props = NativeStackScreenProps<RootStack, 'Screen1'>;
type Screen2Props = NativeStackScreenProps<RootStack, 'Screen2'>;

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

function Screen1({navigation}: Screen1Props) {
  const {width} = useWindowDimensions();
  return (
    <SafeAreaView style={styles.safeArea}>
      {arr.map(i => (
        <Pressable
          key={i.id}
          onPress={() =>
            navigation.navigate('Screen2', {
              i: i.id,
              uri: i.url,
            })
          }>
          <Animated.View
            style={[
              styles.itemList,
              {
                width: (width * 0.8) / 2,
              },
            ]}
            sharedTransitionTag={`sharedTag-${i.id}`}>
            <AnimatedImage
              style={styles.fullWH}
              placeholder={blurhash}
              source={i.url}
              contentFit="cover"
              sharedTransitionTag={`imageTag-${i.id}`}
            />
          </Animated.View>
        </Pressable>
      ))}
    </SafeAreaView>
  );
}

function Screen2({navigation, route}: Screen2Props) {
  const i = route?.params?.i;
  const uri = route?.params?.uri;
  return (
    <ScrollView style={styles.flex}>
      <Animated.View style={styles.item} sharedTransitionTag={`sharedTag-${i}`}>
        <Animated.Image
          sharedTransitionTag={`imageTag-${i}`}
          source={{uri}}
          style={styles.fullWH}
          resizeMode="cover"
        />
      </Animated.View>

      <Button title="Pop()" onPress={() => navigation.pop()} />
    </ScrollView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Screen1" component={Screen1} />
          <Stack.Screen name="Screen2" component={Screen2} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 20,
    gap: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fullWH: {width: '100%', height: '100%'},
  flex: {flex: 1},
  itemList: {
    height: 150,
  },
  item: {
    width: '100%',
    height: 500,
    alignSelf: 'center',
  },
});
