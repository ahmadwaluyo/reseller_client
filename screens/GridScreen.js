import * as React from 'react';
import { useState, useEffect } from 'react';
import { Image, StyleSheet, View, FlatList } from 'react-native';
import { Picker, Form, Container, Content, Card, CardItem, Text, Button, Icon, Left, Body, Right, Header, Item, Input } from 'native-base';
import { getAllProducts } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Grid } from 'react-native-easy-grid';
import Modal from 'react-native-modal';
import { useFonts } from '@use-expo/font';
import ImageSlider from 'react-native-image-slider';


export default function GridScreen () {
    const loading = useSelector((state) => state.loading);
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelect] = useState("key2");
    const allProducts = useSelector((state) => state.allProducts);
    const dispatch = useDispatch();

    const toggleModal = () => {
        setModalVisible(!modalVisible);
      };
    
      const onValueChange = (value) => {
        setSelect(value)
      }
      
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
      } else if (allProducts){
          return (
              <Container>
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
                    <Content style={{ marginBottom: 5 }}>
                        <Grid style={{ flexWrap: 'wrap'}}>
                            <FlatList
                            keyExtractor={(item, index) => 'key'+index}
                            data={allProducts}
                            renderItem={({ item }) => 
                                <Col style={{ width: 180 }}>
                                    <Card 
                                    onTouchEnd={toggleModal}>
                                        <CardItem style={{ alignItems: 'center', justifyContent: 'center'}}>
                                        <Left>
                                            <Body style={{ height: 25}}>
                                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{item.brand}</Text>
                                            <Text style={{ fontSize: 12 }} note>{item.product_name}</Text>
                                            </Body>
                                        </Left>
                                        </CardItem>
                                        <CardItem cardBody>
                                        <Image source={{uri: `${item.images[0]}`}} style={{height: 110, width: null, flex: 1}}/>
                                        </CardItem>
                                        <CardItem style={{ alignItems: 'center', justifyContent: 'center'}}>
                                        <Left>
                                            <Button transparent>
                                            <Icon active name="cart" style={{ fontSize: 18, color: '#000' }}>
                                                <Text style={{ fontSize: 15 }}>  {item.stock}</Text>
                                            </Icon>
                                            </Button>
                                        </Left>
                                        <Body style={{ alignItems: 'center', justifyContent: 'center'}}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginLeft: -10, marginRight: -15 }}>{item.price}</Text>
                                        </Body>
                                        <Right>
                                            <Icon active name="paper-plane" style={{ fontSize: 20, color: '#2CBC7B' }} />
                                        </Right>
                                        </CardItem>
                                    </Card>
                                </Col>
                            }/>
                        </Grid>
                    </Content>
              </Container>
          );
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
  });