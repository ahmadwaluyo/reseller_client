

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker, Form, Content, Card, CardItem, Text, Button, Icon, Left, Body, Right, Header, Item, Input, Segment } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { List, ListItem } from 'native-base';
import ImageSlider from 'react-native-image-slider';
import { getAllProducts } from '../store/actions';
import { useFonts } from '@use-expo/font';


export default function ListScreen({ navigation }) {
  const [productModal, setProductModal] = useState({})
  const loading = useSelector((state) => state.loading);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelect] = useState(undefined);
  const [search, setSearch] = useState('');
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
                <View style={{ flexDirection: 'row', width: wp('50%')}}>
                    <Text>: {productModal.brand ? productModal.brand : "no brand"}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', width: wp('50%')}}>
                    <Text>: {productModal.product_name ? productModal.product_name : "no product name"}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', width: wp('50%')}}>
                    <Text>: {productModal.stock ? productModal.stock : "stock none"}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', width: wp('50%')}}>
                    <Body style={{ alignItems: 'flex-start', justifyContent: 'center'}}>
                        <Text style={{ fontWeight: 'bold'}}>: {productModal.price ? productModal.price : "Rp 0"}</Text>
                    </Body>
                  </View>
                  <View style={{ flexDirection: 'row', width: wp('50%')}}>
                    <Text>: Merah, Kuning, Biru</Text>
                  </View>            
              </Right>
            </CardItem>
          </Card>
        </Modal>

        <View style={{ flexDirection: 'row'}}>
          <Header style={{ backgroundColor: '#2CBC7B', width: wp('100%')}} searchBar rounded>
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

        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#2CBC7B'}}>
          <Segment style={{ marginVertical: 5, backgroundColor: '#2CBC7B' }}>
            <Button first>
              <Text>All</Text>
            </Button>
            <Button>
              <Text>Fashion Pria</Text>
            </Button>
            <Button last>
              <Text>Fashion Wanita</Text>
            </Button>
          </Segment>
        </View>

        <ScrollView>
        <FlatList
        keyExtractor={(item, index) => 'key'+index}
        data={allProducts}
        renderItem={({ item }) =>
            <Content>
            <List>
              <ListItem onTouchEnd={() => toggleModal(item)}>
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
    width: wp('50%'),
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