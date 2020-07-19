import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, StyleSheet, Image, ImageBackground, AsyncStorage, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'native-base';
import Constant from 'expo-constants';
import { login, setErrorLogin, setSuccessLogin } from '../store/actions';

const imagesHighlight = require('../assets/images/background.png');
const width = Dimensions.get('window').width

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading)
  const errorLogin = useSelector((state) => state.errorLogin)
  const successLogin = useSelector((state) => state.successLogin)

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


  const handleSubmit = () => {
    const data = {
      email,
      username,
      password
    }

    dispatch(login(data));
  }

  if (successLogin) {
    if (username === 'admin') {
      navigation.navigate('RootAdmin', { request: 'BottomTabAdmin' });
    } else {
      navigation.navigate('Root', { request: 'BottomTabNavigator' });
    }

    setEmail('');
    setUsername('');
    setPassword('');
    dispatch(setSuccessLogin(false));
  }

  if (errorLogin) {
    setTimeout(() => {
      dispatch(setErrorLogin(''))
    }, 5000)
  }



  return (
    <KeyboardAvoidingView style={styles.containerView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={imagesHighlight} style={styles.image}>
        <View style={[styles.loginScreenContainer, styles.shadow]}>
          <ScrollView>
            <View style={styles.loginFormView}>
              <Image
                source={require('../assets/images/supplier.png')}
                style={styles.imageStyle}
              />
              {errorLogin ? <Text style={styles.errorText}>{errorLogin}</Text> : <Text style={styles.errorText}></Text>}
              <TextInput 
              placeholder="Email" 
              placeholderColor="#000000" 
              style={styles.loginFormTextInput} 
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
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
              key
              />
              <Button 
                iconLeft transparent info
                onPress={handleSubmit}
                style={styles.loginButton}
              >
                {
                  loading
                  ? <ActivityIndicator
                      size='small'
                      color='#fff'
                    />
                  : <Text style={{ color: '#fff', fontSize: 18}}>Login</Text>
                }
              </Button>
              <View style={styles.footer}>
                  <Text style={styles.logoText}>presented by ResellerApp</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
    containerView: {
        flex: 1,
      },
      errorText: {
        color: 'red',
        fontWeight: 'bold'
      },
      loginScreenContainer: {
        flex: 1,
      },
      logoText: {
        fontSize: 18,
        fontWeight: "800",
        textAlign: 'center',
        fontFamily: 'Roboto',
        color: '#fff'
      },
      loginFormView: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Constant.statusBarHeight + 75,
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
        justifyContent: 'center',
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
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      },
      shadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 3,
      }
});
