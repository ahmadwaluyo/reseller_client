import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, StyleSheet, Image, ImageBackground, AsyncStorage} from 'react-native';
import { Button } from 'native-base';
import Constant from 'expo-constants';
import { login } from '../store/actions';

const imagesHighlight = require('../assets/images/background.png');

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const dataLogin = useSelector((state) => state.dataLogin)

  // useEffect(() => {
  //   return navigation.addListener('focus', async () => {
  //     const token = await AsyncStorage.getItem("token");
  //     if (token) {
  //       const user = JSON.parse(token)
  //       console.log('ini token', user);
  //       if (user.data.roles == 'admin') {
  //         await navigation.navigate('RootAdmin', { request: 'BottomTabAdmin'});
  //       } else {
  //         await navigation.navigate('Root', { request: 'BottomTabNavigator'});
  //       }
  //     } else {
  //       await navigation.navigate('login', { request: 'LoginScreen' });
  //     }
  //   }) 
  // }, [navigation ,AsyncStorage])


  const handleSubmit = async() => {
    const data = {
      email,
      username,
      password
    }

    await dispatch(login(data));

    if (dataLogin) {
      if (username === 'admin') {
        navigation.navigate('RootAdmin', { request: 'BottomTabAdmin' });
      } else {
        navigation.navigate('Root', { request: 'BottomTabNavigator' });
      }
    }

    setEmail('');
    setUsername('');
    setPassword('');
  }

  return (
    <KeyboardAvoidingView style={styles.containerView}>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
        <ImageBackground source={imagesHighlight} style={styles.image}>
          <View style={styles.loginFormView}>
          <Image
            source={require('../assets/images/supplier.png')}
            style={styles.imageStyle}
          />
            <TextInput 
            placeholder="Email" 
            placeholderColor="#000000" 
            style={styles.loginFormTextInput} 
            onChangeText={setEmail}
            value={email}
            />
            <TextInput 
            placeholder="Username" 
            placeholderColor="#000000" 
            style={styles.loginFormTextInput} 
            onChangeText={setUsername}
            value={username}
            />
            <TextInput 
            placeholder="Password" 
            placeholderColor="#000000" 
            style={styles.loginFormTextInput} 
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            />
            <Button 
              iconLeft transparent info
              onPress={handleSubmit}
              style={styles.loginButton}
            >
            <Text style={{ color: '#fff', fontSize: 18}}>Login</Text>
            </Button>
            <View style={styles.footer}>
                <Text style={styles.logoText}>presented by ResellerApp</Text>
            </View>
          </View>
        </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
    containerView: {
        flex: 1,
      },
      loginScreenContainer: {
        flex: 1,
      },
      logoText: {
        fontSize: 18,
        fontWeight: "800",
        textAlign: 'center',
        fontFamily: 'sans-serif'
      },
      loginFormView: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Constant.statusBarHeight + 70,
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      loginFormTextInput: {
        width: 300,
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        color: '#000',
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 5,
      },
      loginButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 43,
      },
      footer: {
        height: 180,
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
      imageStyle: {
        width: 100,
        height: 100,
        marginBottom: 10,
        backgroundColor: '#eaeaea',
        borderRadius: 5
      },
      image: {
        flex: 0.9,
        resizeMode: "cover",
        justifyContent: "center",
        justifyContent: "flex-end",
      },
      horizontal: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        padding: 10
      },
});
