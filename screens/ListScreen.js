

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker, Form, Content, Card, CardItem, Text, Button, Icon, Left, Body, Right, Header, Item, Input, } from 'native-base';
import { List, ListItem } from 'native-base';
import ImageSlider from 'react-native-image-slider';
import { getAllProducts } from '../store/actions';
import { useFonts } from '@use-expo/font';


export default function ListScreen({ navigation }) {
  const loading = useSelector((state) => state.loading);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelect] = useState("key2");
  const allProducts = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  let [fontsLoaded] = useFonts({
    'Roboto': require('../assets/fonts/roboto.regular.ttf'),
    'Roboto-Medium': require('../assets/fonts/roboto.medium.ttf'),
  })

  const images = [
    'https://placeimg.com/640/640/nature',
    'https://placeimg.com/640/640/people',
    'https://placeimg.com/640/640/animals',
    'https://placeimg.com/640/640/beer',
  ];

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const onValueChange = (value) => {
    setSelect(value)
  }

  if (loading && !fontsLoaded) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Image
            source={require('../assets/images/supplier.png')}
            style={styles.imageStyle}
          />
          <Text style={[styles.imageStyle, { marginTop: 5, fontSize: 20, textAlign: 'center' }]}>Loading...</Text>
      </View>
    )
  } else if (allProducts) {

    console.log('ini all product', allProducts);
    return (
      <View style={styles.container}>
        <Modal
        isVisible={modalVisible}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        animationInTiming={700}
        animationOutTiming={1000}
        >
          <Card>
            <CardItem cardBody>
              <ImageSlider 
              images={images}
              customSlide={({ item, index }) => (
                // It's important to put style here because it's got offset inside
                  <Image
                  key={index}
                  source={{ uri: item }} 
                  style={styles.customImage} />
              )}
              />
              <Icon 
              onTouchEnd={toggleModal}
              active name="close" style={{ fontSize: 30, position: 'absolute', top: 0, right: 0, color: '#000' }} />
            </CardItem>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                <Text style={{ color: '#f4bd27', fontFamily: 'Roboto-Medium', fontSize: 18 }}>Barang original asli made in Jerman</Text>
              </View>
              <CardItem style={{ height: 150, alignItems: 'flex-start' }}>
              <Left style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <View style={{ flexDirection: 'row', width: 120}}>
                  <Text>Nama/Kode</Text>
                </View>
                <View style={{ flexDirection: 'row', width: 120}}>
                  <Text>Brand</Text>
                </View>
                <View style={{ flexDirection: 'row', width: 120}}>
                  <Text>Stok</Text>
                </View>
                <View style={{ flexDirection: 'row', width: 120}}>
                  <Text>Harga</Text>
                </View>
                <View style={{ flexDirection: 'row', width: 120}}>
                  <Text>Varian</Text>
                </View>
              </Left>
              <Right>
                <View style={{ flexDirection: 'row', width: 150}}>
                    <Text>: Q&Q</Text>
                  </View>
                  <View style={{ flexDirection: 'row', width: 150}}>
                    <Text>: Jam Tangan</Text>
                  </View>
                  <View style={{ flexDirection: 'row', width: 150}}>
                    <Text>: 4</Text>
                  </View>
                  <View style={{ flexDirection: 'row', width: 150}}>
                    <Body style={{ alignItems: 'flex-start', justifyContent: 'center'}}>
                        <Text style={{ fontWeight: 'bold'}}>: Rp 3.000.000</Text>
                    </Body>
                  </View>
                  <View style={{ flexDirection: 'row', width: 150}}>
                    <Text>: Merah, Kuning, Biru</Text>
                  </View>            
              </Right>
            </CardItem>
          </Card>
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
        <ScrollView>
        <FlatList
        keyExtractor={(item, index) => 'key'+index}
        data={allProducts}
        renderItem={({ item }) =>
            <Content>
            <List>
              <ListItem onTouchEnd={toggleModal}>
                <Left>
                  <Body style={{ width: 100 }}>
                      <Text>{item.brand}</Text>
                      <Text note style={{ width: 100 }}>{item.product_name}</Text>
                    </Body>
                </Left>
                <Left>
                  <Button transparent>
                    <Icon active name="cart" style={{ fontSize: 20, color: '#000', width: 100, paddingLeft: 10 }}>
                      <Text style={{ fontSize: 18 }}>  {item.stock}</Text>
                    </Icon>
                  </Button>
                </Left>
                <Body style={{ alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginLeft: -5 }}>{item.price}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            </List>
          </Content>
        }
        />
            
        </ScrollView>
      </View>
    );
  }
}

ListScreen.navigationOptions = {
  header: null,
};

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
  button: {
    alignItems: "center",
    backgroundColor: "#ececec",
  }
});