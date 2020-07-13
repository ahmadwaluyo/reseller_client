import * as React from 'react';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View, ImageBackground, Alert, AsyncStorage } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Constant from 'expo-constants';
import LogoutIcon from '../components/LogoutIcon';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions';

export default function ProfileScreen({ navigation }) {
  const dataLogin = useSelector(state => state.dataLogin);
  // let token;

  // useEffect(async () => {
  //   token = await AsyncStorage.getItem("token");
  //   if (token) {
  //     console.log('token ini njing', token);
  //   }
  // }, [AsyncStorage])

  const handleLogout = () => {
    Alert.alert(
      "ResellerApp",

      "Anda yakin akan keluar?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => clearAsyncStorage()}
      ],
      { cancelable: false },
    )
  }

  const clearAsyncStorage = async () => {
    AsyncStorage.clear().then(() => {
      console.log('Cleared')
      navigation.navigate('login', { request: 'LoginScreen'})
    })
  }

  if (dataLogin) {
    return (
      <View style={styles.container}>
        <View style={[{backgroundColor: "#ffffff"}]}>
            <ImageBackground source={require('../assets/images/background.png')} style={[{height: 150 }]}>
              <LinearGradient
                start={[1.2, 2]}
                colors={['transparent','transparent','#2CBC7B',]}
                style={[styles.bar_,{height: 150, }]}>
                <LinearGradient style={[{ position: "absolute", top: 5, right: 5, padding: 10, borderRadius: 10}]} 
                onTouchEnd={handleLogout}
                colors={['#dd3b36', '#992622', '#992622', '#dd3b36']}
                >
                  <LogoutIcon 
                  name="logout"
                  />
                </LinearGradient>
                <View style={[{marginHorizontal: 20,marginVertical: 20 ,flexDirection: "row"}]}>
                  <View>
                    <View style={[{marginBottom: 5}]}>
                      <Text  style={[{fontSize: 30, color: "#ffffff"}]}>{dataLogin ? dataLogin.data.username : token.data.username}</Text>
                    </View>
                    <View style={[{}]}>
                      <Text style={[{fontSize: 18, color: "#ffffff"}]}>{dataLogin ? dataLogin.data.roles : token.data.roles}</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <OptionButton
            icon="phone"
            label="Nomer Telpon"
          />
          <View style={[{ marginLeft: 5}]}>
            <Text style={styles.contact}>{dataLogin ? dataLogin.data.phone_number : token.data.phone_number}</Text>
          </View>

          <OptionButton
            icon="mail"
            label="Email"
          />
          <View style={[{ marginLeft: 5}]}>
            <Text style={styles.contact}>{dataLogin ? dataLogin.data.email : token.data.email}</Text>
          </View>
    
          <OptionButton
            icon="home"
            label="Alamat"
          />
          <View style={[{ marginLeft: 5}]}>
            <Text style={styles.contact}>{dataLogin ? dataLogin.data.address : token.data.address}</Text>
          </View>
    
          <OptionButton
            icon="shoppingcart"
            label="Jenis Usaha"
            isLastOption
          />
          <View style={[{ marginLeft: 5}]}>
            <Text style={styles.contact}>{dataLogin ? dataLogin.data.business : token.data.business}</Text>
          </View>
  
          <View style={styles.footer}>
            <Text>Copyright 2020 Ⓒ ResellerApp</Text>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <Text>Loading...</Text>
    )
  }
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <AntDesign name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  bar_:{
    paddingTop: Constant.statusBarHeight + 15
  },
  footer: {
    height: 60,
    paddingVertical: 10,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  contact: {
    fontSize: 14, 
    color: "#000", 
    marginHorizontal: 40, 
    backgroundColor: '#eaeaea',
    paddingVertical: 10,
    paddingHorizontal: 10
  }
});
