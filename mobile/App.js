/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, useColorScheme, View, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/home/Home';
import DetailScreen from './screens/details/Detail';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  Provider as PaperProvider,
  Snackbar,
  ActivityIndicator,
  Colors as PaperColor,
} from 'react-native-paper';
import AppStore from './screens/appStore';
import I18nStore from './I18n/I18nStore';
import DeviceInfo from 'react-native-device-info';

const Stack = createStackNavigator();

const PortraitRoot = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Details' component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabletLandscapeRoot = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{width: '40%'}}>
        <HomeScreen />
      </View>
      <View style={{width: 2, backgroundColor: 'lightgray'}}/>
      <View style={{width: '60%'}}>
        <DetailScreen />
      </View>
    </View>
  );
};

const AppRoot = () => {
  const {
    showError,
    setShowError,
    errorMsg,
    busy,
    landscape,
    setLandscape,
    setDirty,
  } = AppStore.useAppContext();

  Dimensions.addEventListener('change', ({window: {width, height}}) => {
    if (DeviceInfo.isTablet()) setLandscape(width > height);
    else setLandscape(false);
    setDirty(true);
  });

  return (
    <PaperProvider>
      {landscape ? <TabletLandscapeRoot /> : <PortraitRoot />}
      <Snackbar
        visible={showError}
        onDismiss={() => setShowError(false)}
        action={{
          label: 'Dismiss',
          onPress: () => setShowError(false),
        }}>
        {errorMsg}
      </Snackbar>
      <ActivityIndicator
        style={{position: 'absolute', top: '50%', left: '45%'}}
        animating={busy}
        color={PaperColor.blue800}
        size='large'
      />
    </PaperProvider>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <AppStore.AppContextProvider>
      <I18nStore.I18nProvider>
        <AppRoot />
      </I18nStore.I18nProvider>
    </AppStore.AppContextProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
