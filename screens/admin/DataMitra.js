

import * as React from 'react';
import Constant from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Image, StyleSheet, View, FlatList, Alert, TouchableOpacity, AsyncStorage, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker, Form, Content, Card, CardItem, Text, Button, Icon, Left, Body, Right, Header, Item, Input } from 'native-base';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import Modal from 'react-native-modal';
import { getAllUser, createReseller, editReseller, deleteReseller } from '../../store/actions';

export default function DataMitra({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [business, setBusiness] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelect] = useState("key2");
  const loading = useSelector((state) => state.loading);
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  let data;
  let token;

  const onValueChange = (value) => {
    setSelect(value)
  }

  useEffect(() => {
    return navigation.addListener("focus", async () => {
      token = await AsyncStorage.getItem("token");
      token = JSON.parse(token);
      if (token) {
        await dispatch(getAllUser(token.token))
      }
    })
  }, [dispatch, navigation, AsyncStorage])

  useEffect(() => {
    if (token) {
      dispatch(getAllUser(token.token))
    }
  }, [dispatch])

  const handleSubmit = async () => {
    const dataSubmit = {
      email,
      username,
      password,
      address,
      phone_number,
      business
    }

    let token = await AsyncStorage.getItem("token");
    token = JSON.parse(token);

    if (token) {
      await dispatch(createReseller({
        data : dataSubmit,
        token: token.token
      }))
      Alert.alert(
        "ResellerApp",
        "Successfully create user",
        [
          { text: "OK", onPress: () => navigation.addListener("focus")}
        ]
      )
      setEmail('');
      setUsername('');
      setPassword('');
      setAddress('');
      setPhoneNumber('');
      setBusiness('');
    } else {
      return (
        <Text>Loading...</Text>
      )
    }
  }

  const handleEdit = (index) => {
    alertEdit(index)
  }

  const handleDelete = async (data) => {
    let token = await AsyncStorage.getItem("token");
    token = JSON.parse(token);
    if (token) {
      let success = await dispatch(deleteReseller({
        id : data.id,
        token : token.token
      }));
      success ? Alert.alert(`Success delete reseller id : ${data.id}`) : "";
    }
  }

  let tableHead = ['Username', 'Phone', 'Email', 'Business', 'Address', 'Created', 'Option'];
  let tableData = [];

  if (allUsers) {
    data = allUsers;
    if (data.length > 0) {
      data.map(el => {
        tableData.push([])
      })
      for(let i=0; i < data.length; i++) {
        tableData[i].push(data[i].username, data[i].phone_number, data[i].email, data[i].business, data[i].address, new Date(data[i].createdAt).toLocaleDateString(), data[i].updatedAt);
      }
    }
  } else {
    return (
      <View style={[styles.container, styles.horizontal]}>
      <Image
          source={require('../../assets/images/supplier.png')}
          style={[styles.imageStyle, { backgroundColor: '#fff'}]}
        />
        <Text style={[styles.imageStyle, { marginTop: 5, fontSize: 20, textAlign: 'center', backgroundColor: '#fff' }]}>Loading...</Text>
      </View>
    )
  }

  const alertDelete = (data) => {
    console.log(data, 'ini data delete');
    Alert.alert(
      "ResellerApp",
      "Anda yakin akan menghapus data mitra?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => handleDelete(data) }
      ],
      { cancelable: false },
    )
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const alertEdit = (index) => {
    Alert.alert(`This is edit row ${index + 1}`);
  }

  const element = (data, index) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: 100}}>
    <TouchableOpacity onPress={() => alertDelete(data)}>
      <View style={[styles.btn]}>
        <Text style={[styles.btnText, { backgroundColor: '#dd4b69'}]}><Icon name="trash" style={{ fontSize: 22}} /></Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleEdit(data)}>
    <View style={styles.btn}>
      <Text style={styles.btnText}><Icon type="AntDesign" name="edit" style={{ fontSize: 22}} /></Text>
    </View>
    </TouchableOpacity>
    </View>
  );

    if (data){
      console.log('ini data baru', data);

    <FlatList
        keyExtractor={(item, index) => 'key'+index}
        data={data}
        keyExtractor={(item, index) => 'key'+index}
        renderItem={({ item }) =>
            tableHead = item
        }
        />

    return (
      <View style={styles.container}>
        <Modal
        isVisible={modalVisible}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        animationInTiming={600}
        animationOutTiming={800}
        >
          <View style={styles.loginFormView}>
            <Text style={[styles.btnText, { fontSize: 20, padding: 10}]}>Form Add Reseller</Text>
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
              <TextInput 
              placeholder="Address" 
              placeholderColor="#000000" 
              style={styles.loginFormTextInput} 
              onChangeText={setAddress}
              value={address}
              />
              <TextInput 
              placeholder="Phone Number" 
              placeholderColor="#000000" 
              style={styles.loginFormTextInput} 
              onChangeText={setPhoneNumber}
              value={phone_number}
              />
              <TextInput 
              placeholder="Business" 
              placeholderColor="#000000" 
              style={styles.loginFormTextInput} 
              onChangeText={setBusiness}
              value={business}
              />
              <Button 
                iconLeft transparent info
                onPress={handleSubmit}
                style={styles.loginButton}
              >
                 <Text style={{ color: '#fff', fontSize: 18}}>ADD</Text>
              </Button>
            <Icon 
              onTouchEnd={toggleModal}
              active name="close" style={{ fontSize: 30, position: 'absolute', top: 5, right: 5, color: '#ff0000' }} />
          </View>

        </Modal>

        <View style={{ flexDirection: 'row'}}>
        <Header style={{ backgroundColor: '#2CBC7B', width: 60}}>
            <Content>
              <Form>
                <Picker
                  renderHeader={backAction =>
                    <Header style={{ backgroundColor: "#f44242" }}>
                      <Left>
                        <Button transparent onPress={backAction}>
                          <Icon name="arrow-back" style={{ color: "#fff" }} />
                        </Button>
                      </Left>
                      <Body style={{ flex: 3 }}>
                        <Title style={{ color: "#fff" }}>Your Header</Title>
                      </Body>
                      <Right />
                    </Header>}
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  selectedValue={selected}
                  onValueChange={() => onValueChange.bind(selected)}
                >
                  <Picker.Item label="Wallet" value="key0" />
                  <Picker.Item label="ATM Card" value="key1" />
                  <Picker.Item label="Debit Card" value="key2" />
                  <Picker.Item label="Credit Card" value="key3" />
                  <Picker.Item label="Net Banking" value="key4" />
                </Picker>
              </Form>
            </Content>
          </Header>

          <Header searchBar style={{ backgroundColor: '#2CBC7B', width: 300}} rounded>
          <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search" />
              <Icon name="ios-cart" />
          </Item>
          <Button transparent>
              <Text>Search</Text>
          </Button>
          </Header>
          
        </View>
        <View style={{ width: 350, height: 50, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ fontWeight: 'bold', fontSize: 26 }}>DATA MITRA</Text>
        </View>
        <View style={{ alignItems: 'flex-start', flexDirection: 'row', height: 25 }}>
          <Icon type="AntDesign" name="pluscircle" style={{ color: '#2CBC7B', fontSize: 24, marginHorizontal: 10 }} onPress={toggleModal} />
          <Text note>Add Reseller</Text>
        </View>
        <ScrollView>
        <ScrollView horizontal={true}>
            <View style={styles.containerTable}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row data={tableHead} style={styles.head} textStyle={styles.textBold}/>
                {
                  tableData.map((rowData, index) => (
                    <TableWrapper key={index} style={styles.row}>
                      {
                        rowData.map((cellData, cellIndex) => (
                          <Cell key={cellIndex} data={cellIndex === rowData.length-1 ? element(allUsers[index], index) : cellData} textStyle={styles.text}/>
                        ))
                      }
                    </TableWrapper>
                  ))
                }
                </Table>
            </View>
        </ScrollView>
        </ScrollView>
                
      </View>
    );
    } else {
        return (
            <View style={[styles.container, styles.horizontal]}>
              <Image
                  source={require('../../assets/images/supplier.png')}
                  style={styles.imageStyle}
                />
                <Text style={[styles.imageStyle, { marginTop: 5, fontSize: 20, textAlign: 'center' }]}>Loading...</Text>
            </View>
          )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  horizontal: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
    padding: 10
  },
  imageStyle: {
    width: 150,
    height: 150,
    marginTop: 120,
    marginBottom: 10,
    borderRadius: 5
  },
  customImage: {
    width: 320,
    height: 270,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginFormView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constant.statusBarHeight + 20,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  loginFormTextInput: {
    width: 300,
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    color: '#000000',
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
  containerTable: { flex: 1, padding: 5, paddingTop: 20, backgroundColor: '#fff', borderColor: '#000' },
  head: { height: 40, backgroundColor: '#f1f8ff', backgroundColor: '#E7E6E1' },
  text: { width: 100, textAlign: 'center' },
  textBold: { width: 100, fontWeight: 'bold', textAlign: 'center' },
  btn: { width: 35, height: 22, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff', fontSize: 18 },
  row: { flexDirection: 'row' },
});