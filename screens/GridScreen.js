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
    const [productModal, setProductModal] = useState({})
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
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALsAAAC7CAMAAAAKTh9YAAAAG1BMVEX////r6+vv7+/8/Pz09PTp6enw8PD39/f5+flmhR6pAAAC/UlEQVR4nO2b63KEIAxGKyDw/k/cdWdEvBCSTkNw5jt/a/UsBggBf34AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxPoU2yVvrESS30LhkrdjA98y/9lO2fWaYb0wo75nqM7Z85Lov0Vr1CjdiZoyaIHAP1rJn2NG+4axtzySJ+5KtdU/we+rGVL1VFDLLXL1V0lM3TFMDn09ZFicbqHGn/84jX8M351orhOq3f46jXkSWtjIHN2TskcY2lwFNH+QBMot8UlNXn7KkA7kM3fFGNn9KUU3SJJnuX9BseK0xZkezu2qM7DWKSZpuT11UM3upuzxb0At42eoofhOtKIqzGdzr3PCTc77H3d0Kj75b7ZvDvVFz5K1obd2bc6PnzMmm7tTswmh6S3c6FeynFIbuvSy2K2/nflb/rscv6+ievJl73U1zqR24UAt1hnor9yqRuowpsVKiB3or9+O59wEli+8x1P2ImKe4oP9q7V4e+1hJWIPsJkPdi1trBiphQzW8jbvvXVPWFdQ4aeJezNqtWt4MMdSYuIf+JYyfZ+O+RzOVbzGuMXHfH0oluvu7IQLe1J2aNh3/NiPdGVqsHwh3uD+b9a8wcX9hX2WNkZF/m6Hu+7xDJVp7DWG2uYmRExSx2XKCsuBrB820uVh5anvC72bJZu6lINbYgD0WTvOtPY4ti8eoWUtQkcOo0Xr1qEQ+yB3qdFXSyL3aK4q3sAm8e5jVZ6qyWFpq+7UuydOFMbOaXlWO9NVxoFNRr1OQNHM/n5bNKUQXLwfHe9VYuzpw96hv96i2Yf29I98/ZW6570HKMw5r2e6Vtbc+ODt9xnuU8fn5rG0+a/fPQH838MytbXP3T9uftpl8Yh93msB90w8pZ5+z7NDqHO5/48Xumt+xvPjMlfpZN81DhtpnDFVPpuoGje63FLoNr3wgWDHiV/XvnpzWQex1wNc394X0a9S1wmbQh3K8dFZmPu5TG7+to/+L63ocAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKblF8y1IM9CgQwqAAAAAElFTkSuQmCC',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALsAAAC7CAMAAAAKTh9YAAAAG1BMVEX////r6+vv7+/8/Pz09PTp6enw8PD39/f5+flmhR6pAAAC/UlEQVR4nO2b63KEIAxGKyDw/k/cdWdEvBCSTkNw5jt/a/UsBggBf34AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxPoU2yVvrESS30LhkrdjA98y/9lO2fWaYb0wo75nqM7Z85Lov0Vr1CjdiZoyaIHAP1rJn2NG+4axtzySJ+5KtdU/we+rGVL1VFDLLXL1V0lM3TFMDn09ZFicbqHGn/84jX8M351orhOq3f46jXkSWtjIHN2TskcY2lwFNH+QBMot8UlNXn7KkA7kM3fFGNn9KUU3SJJnuX9BseK0xZkezu2qM7DWKSZpuT11UM3upuzxb0At42eoofhOtKIqzGdzr3PCTc77H3d0Kj75b7ZvDvVFz5K1obd2bc6PnzMmm7tTswmh6S3c6FeynFIbuvSy2K2/nflb/rscv6+ievJl73U1zqR24UAt1hnor9yqRuowpsVKiB3or9+O59wEli+8x1P2ImKe4oP9q7V4e+1hJWIPsJkPdi1trBiphQzW8jbvvXVPWFdQ4aeJezNqtWt4MMdSYuIf+JYyfZ+O+RzOVbzGuMXHfH0oluvu7IQLe1J2aNh3/NiPdGVqsHwh3uD+b9a8wcX9hX2WNkZF/m6Hu+7xDJVp7DWG2uYmRExSx2XKCsuBrB820uVh5anvC72bJZu6lINbYgD0WTvOtPY4ti8eoWUtQkcOo0Xr1qEQ+yB3qdFXSyL3aK4q3sAm8e5jVZ6qyWFpq+7UuydOFMbOaXlWO9NVxoFNRr1OQNHM/n5bNKUQXLwfHe9VYuzpw96hv96i2Yf29I98/ZW6570HKMw5r2e6Vtbc+ODt9xnuU8fn5rG0+a/fPQH838MytbXP3T9uftpl8Yh93msB90w8pZ5+z7NDqHO5/48Xumt+xvPjMlfpZN81DhtpnDFVPpuoGje63FLoNr3wgWDHiV/XvnpzWQex1wNc394X0a9S1wmbQh3K8dFZmPu5TG7+to/+L63ocAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKblF8y1IM9CgQwqAAAAAElFTkSuQmCC',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALsAAAC7CAMAAAAKTh9YAAAAG1BMVEX////r6+vv7+/8/Pz09PTp6enw8PD39/f5+flmhR6pAAAC/UlEQVR4nO2b63KEIAxGKyDw/k/cdWdEvBCSTkNw5jt/a/UsBggBf34AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxPoU2yVvrESS30LhkrdjA98y/9lO2fWaYb0wo75nqM7Z85Lov0Vr1CjdiZoyaIHAP1rJn2NG+4axtzySJ+5KtdU/we+rGVL1VFDLLXL1V0lM3TFMDn09ZFicbqHGn/84jX8M351orhOq3f46jXkSWtjIHN2TskcY2lwFNH+QBMot8UlNXn7KkA7kM3fFGNn9KUU3SJJnuX9BseK0xZkezu2qM7DWKSZpuT11UM3upuzxb0At42eoofhOtKIqzGdzr3PCTc77H3d0Kj75b7ZvDvVFz5K1obd2bc6PnzMmm7tTswmh6S3c6FeynFIbuvSy2K2/nflb/rscv6+ievJl73U1zqR24UAt1hnor9yqRuowpsVKiB3or9+O59wEli+8x1P2ImKe4oP9q7V4e+1hJWIPsJkPdi1trBiphQzW8jbvvXVPWFdQ4aeJezNqtWt4MMdSYuIf+JYyfZ+O+RzOVbzGuMXHfH0oluvu7IQLe1J2aNh3/NiPdGVqsHwh3uD+b9a8wcX9hX2WNkZF/m6Hu+7xDJVp7DWG2uYmRExSx2XKCsuBrB820uVh5anvC72bJZu6lINbYgD0WTvOtPY4ti8eoWUtQkcOo0Xr1qEQ+yB3qdFXSyL3aK4q3sAm8e5jVZ6qyWFpq+7UuydOFMbOaXlWO9NVxoFNRr1OQNHM/n5bNKUQXLwfHe9VYuzpw96hv96i2Yf29I98/ZW6570HKMw5r2e6Vtbc+ODt9xnuU8fn5rG0+a/fPQH838MytbXP3T9uftpl8Yh93msB90w8pZ5+z7NDqHO5/48Xumt+xvPjMlfpZN81DhtpnDFVPpuoGje63FLoNr3wgWDHiV/XvnpzWQex1wNc394X0a9S1wmbQh3K8dFZmPu5TG7+to/+L63ocAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKblF8y1IM9CgQwqAAAAAElFTkSuQmCC',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALsAAAC7CAMAAAAKTh9YAAAAG1BMVEX////r6+vv7+/8/Pz09PTp6enw8PD39/f5+flmhR6pAAAC/UlEQVR4nO2b63KEIAxGKyDw/k/cdWdEvBCSTkNw5jt/a/UsBggBf34AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxPoU2yVvrESS30LhkrdjA98y/9lO2fWaYb0wo75nqM7Z85Lov0Vr1CjdiZoyaIHAP1rJn2NG+4axtzySJ+5KtdU/we+rGVL1VFDLLXL1V0lM3TFMDn09ZFicbqHGn/84jX8M351orhOq3f46jXkSWtjIHN2TskcY2lwFNH+QBMot8UlNXn7KkA7kM3fFGNn9KUU3SJJnuX9BseK0xZkezu2qM7DWKSZpuT11UM3upuzxb0At42eoofhOtKIqzGdzr3PCTc77H3d0Kj75b7ZvDvVFz5K1obd2bc6PnzMmm7tTswmh6S3c6FeynFIbuvSy2K2/nflb/rscv6+ievJl73U1zqR24UAt1hnor9yqRuowpsVKiB3or9+O59wEli+8x1P2ImKe4oP9q7V4e+1hJWIPsJkPdi1trBiphQzW8jbvvXVPWFdQ4aeJezNqtWt4MMdSYuIf+JYyfZ+O+RzOVbzGuMXHfH0oluvu7IQLe1J2aNh3/NiPdGVqsHwh3uD+b9a8wcX9hX2WNkZF/m6Hu+7xDJVp7DWG2uYmRExSx2XKCsuBrB820uVh5anvC72bJZu6lINbYgD0WTvOtPY4ti8eoWUtQkcOo0Xr1qEQ+yB3qdFXSyL3aK4q3sAm8e5jVZ6qyWFpq+7UuydOFMbOaXlWO9NVxoFNRr1OQNHM/n5bNKUQXLwfHe9VYuzpw96hv96i2Yf29I98/ZW6570HKMw5r2e6Vtbc+ODt9xnuU8fn5rG0+a/fPQH838MytbXP3T9uftpl8Yh93msB90w8pZ5+z7NDqHO5/48Xumt+xvPjMlfpZN81DhtpnDFVPpuoGje63FLoNr3wgWDHiV/XvnpzWQex1wNc394X0a9S1wmbQh3K8dFZmPu5TG7+to/+L63ocAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKblF8y1IM9CgQwqAAAAAElFTkSuQmCC',
      ];

      const imagesProductModal = productModal.images;

      const toggleModal = (item) => {
        console.log('masuk toggle', item);
        setProductModal(item);
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
                        images={ productModal.images ? imagesProductModal : images }
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
                            <Text style={{ color: '#f4bd27', textAlign: "center", fontFamily: 'Roboto-Medium', fontSize: 18 }}>{productModal.descriptions ? productModal.descriptions : "descriptions none"}</Text>
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
                                <Text>: {productModal.brand ? productModal.brand : "no brand"}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: 150}}>
                                <Text>: {productModal.product_name ? productModal.product_name : "no product name"}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: 150}}>
                                <Text>: {productModal.stock ? productModal.stock : "stock none"}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: 150}}>
                                <Body style={{ alignItems: 'flex-start', justifyContent: 'center'}}>
                                    <Text style={{ fontWeight: 'bold'}}>: {productModal.price ? productModal.price : "Rp 0"}</Text>
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
                        <Grid>
                            <FlatList
                            keyExtractor={(item, index) => 'key'+index}
                            data={allProducts}
                            style={{ flexDirection : "row", flexWrap : "wrap" }}
                            numColumns={2}
                            renderItem={({ item }) => 
                                <Col style={{ width: 180 }}>
                                    <Card 
                                    onTouchEnd={() => toggleModal(item)}
                                    style={{ flexWrap: "wrap"}}
                                    >
                                        <CardItem style={{ alignItems: 'center', justifyContent: 'center'}}>
                                        <Left>
                                            <Body style={{ height: 25}}>
                                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{item.brand}</Text>
                                            <Text style={{ fontSize: 12 }} note>{item.product_name}</Text>
                                            </Body>
                                        </Left>
                                        </CardItem>
                                        <CardItem cardBody>
                                        <Image source={{uri: `${item.images[0]}`}} style={{height: 110, width: 110, flex: 1}}/>
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
                                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginLeft: -10 }}>{item.price}</Text>
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
      backgroundColor: '#fff',
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