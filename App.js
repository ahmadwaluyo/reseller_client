import * as React from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store'

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import BottomTabAdmin from './navigation/BottomTabAdmin';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import Profile from './screens/ProfileScreen';
import Login from './screens/LoginScreen';

//admin

// import FormAddMitra from './screens/admin/FormAddMitra';

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  
  Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
  })
  

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              <Stack.Screen name="login" component={Login} options={{headerShown: false}}/>
              <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}}/>
              <Stack.Screen name="RootAdmin" component={BottomTabAdmin} options={{headerShown: false}}/>

              <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
              {/* <Stack.Screen name="Form Add Mitra" component={FormAddMitra} options={{headerShown: false}}/> */}

            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
