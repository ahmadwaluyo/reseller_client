import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, View, Dimensions } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-banner-carousel';
 
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 180;

export default function HomeScreen({ navigation, route }) {
  // const loading = useSelector((state) => state.loading);
  const [loading, setLoading] = useState(true)

  setTimeout(() => {
    setLoading(false)
  }, 2000)

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Image
            source={require('../assets/images/supplier.png')}
            style={[styles.imageStyle, { backgroundColor: '#fff'}]}
          />
          <Text style={[styles.imageStyle, { marginTop: 5, fontSize: 20, textAlign: 'center', backgroundColor: '#fff' }]}>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Container>
          <Header style={{ backgroundColor: '#2CBC7B', justifyContent: 'center', alignItems: 'center' }}> 
            <Text style={{ fontSize: 25, color: '#fff' }}>Information Page</Text>
          </Header>
          <Content>
            <Card style={{flex: 0}}>
              <CardItem>
                <Left>
                  <Thumbnail source={require('../assets/images/supplier.png')} />
                  <Body>
                    <Text>ResellerApp</Text>
                    <Text note>April 15, 2016</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <Image source={{uri: 'https://placeimg.com/640/640/beer'}} style={{height: 200, width: 320, flex: 1}}/>
                  <Text>
                    information text here
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent textStyle={{color: '#87838B'}}>
                    <Icon name="contact" />
                    <Text>admin</Text>
                  </Button>
                </Left>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
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
    width: 100,
    height: 100,
    marginBottom: 10,
    backgroundColor: '#eaeaea',
    borderRadius: 5
  },
});