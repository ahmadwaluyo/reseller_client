

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Image, StyleSheet, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker, Form, Content, Card, CardItem, Text, Button, Icon, Left, Body, Right, Header, Item, Input } from 'native-base';
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import { getAllUser } from '../../store/actions';

import { useFonts } from '@use-expo/font';


export default function DataProduct({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelect] = useState("key2");
  const allUsers = useSelector((state) => state.allUsers);
  const dataLogin = useSelector((state) => state.dataLogin);
  const dispatch = useDispatch();
//   const [data, setData] = useState([])

  let [fontsLoaded] = useFonts({
    'Roboto': require('../../assets/fonts/roboto.regular.ttf'),
    'Roboto-Medium': require('../../assets/fonts/roboto.medium.ttf'),
  })

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const onValueChange = (value) => {
    setSelect(value)
  }

  // let data = [];
  // if (allUsers) {
  //   data = allUsers;
  // }
  // let tableHead = ['Username', 'Phone', 'Email', 'Business', 'Address', 'Created', 'Option'];
  // let tableData = [];

  // if (data && allUsers) {
  //   data.map(el => {
  //     tableData.push([])
  //   })
  //   tableData[0].push(data[0].username, data[0].phone_number, data[0].email, data[0].business, data[0].address, new Date(data[0].createdAt).toLocaleDateString(), data[0].updatedAt);
  //   tableData[1].push(data[1].username, data[1].phone_number, data[1].email, data[1].business, data[1].address, new Date(data[1].createdAt).toLocaleDateString(), data[1].updatedAt);
  //   console.log('ini test data', tableData);
  // }  

  const alertDelete = (index) => {
    // Alert.alert(`This is row ${index + 1}`);
    Alert.alert(
      "ResellerApp",
      "Anda yakin akan menghapus data mitra?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => navigation.navigate('login', { request: 'LoginScreen'}) }
      ],
      { cancelable: false },
    )
  }

  const alertEdit = (index) => {
    Alert.alert(`This is edit row ${index + 1}`);
  }

  const element = (data, index) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: 100}}>
    <TouchableOpacity onPress={() => alertDelete(index)}>
      <View style={[styles.btn]}>
        <Text style={[styles.btnText, { backgroundColor: '#dd4b69'}]}><Icon name="trash" style={{ fontSize: 22}} /></Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => alertEdit(index)}>
    <View style={styles.btn}>
      <Text style={styles.btnText}><Icon type="AntDesign" name="edit" style={{ fontSize: 22}} /></Text>
    </View>
    </TouchableOpacity>
    </View>
  );

    // if (data){
    // console.log('ini all yang dirubah jadi allUsers', data);

    // <FlatList
    //     keyExtractor={(item, index) => 'key'+index}
    //     data={data}
    //     keyExtractor={(item, index) => 'key'+index}
    //     renderItem={({ item }) =>
    //         tableHead = item
    //     }
    //     />

    return (
      <View style={styles.container}>

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
        <View style={{ width: 350, height: 30, justifyContent: 'flex-end', alignItems: 'center'}}>
          <Text style={{ fontWeight: 'bold'}}>DATA PRODUCT</Text>
        </View>
        <ScrollView horizontal={true}>
            {/* <View style={styles.containerTable}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row data={tableHead} style={styles.head} textStyle={styles.textBold}/>
                {
                  tableData.map((rowData, index) => (
                    <TableWrapper key={index} style={styles.row}>
                      {
                        rowData.map((cellData, cellIndex) => (
                          <Cell key={cellIndex} data={cellIndex === rowData.length-1 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                        ))
                      }
                    </TableWrapper>
                  ))
                }
                </Table>
            </View> */}
        </ScrollView>
                
      </View>
    );
    // } else {
    //     return (
    //         <View style={[styles.container, styles.horizontal]}>
    //           <Image
    //               source={require('../../assets/images/supplier.png')}
    //               style={styles.imageStyle}
    //             />
    //             <Text style={[styles.imageStyle, { marginTop: 5, fontSize: 20, textAlign: 'center' }]}>Loading...</Text>
    //         </View>
    //       )
    // }
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
  containerTable: { flex: 1, padding: 5, paddingTop: 20, backgroundColor: '#fff', borderColor: '#000' },
  head: { height: 40, backgroundColor: '#f1f8ff', backgroundColor: '#E7E6E1' },
  text: { width: 100, textAlign: 'center' },
  textBold: { width: 100, fontWeight: 'bold', textAlign: 'center' },
  btn: { width: 35, height: 22, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff', fontSize: 18 },
  row: { flexDirection: 'row' },
});