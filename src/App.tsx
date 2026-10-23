import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { colors } from './ui/theme';
import {
  NavigationProvider,
  useNavigation,
} from './navigation/NavigationContext';
import { HomeScreen } from './screens/HomeScreen';
import { ShowScreen } from './screens/ShowScreen';
import { PlayerScreen } from './screens/PlayerScreen';
import { RecapScreen } from './screens/RecapScreen';
import { AskScreen } from './screens/AskScreen';

const RootNavigator = () => {
  const { currentScreen } = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      {currentScreen === 'Home' && <HomeScreen />}
      {currentScreen === 'Show' && <ShowScreen />}
      {currentScreen === 'Player' && <PlayerScreen />}
      {currentScreen === 'Recap' && <RecapScreen />}
      {currentScreen === 'Ask' && <AskScreen />}
    </View>
  );
};

export const App = () => {
  return (
    <NavigationProvider>
      <RootNavigator />
    </NavigationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
