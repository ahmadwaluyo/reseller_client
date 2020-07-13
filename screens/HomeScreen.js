import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, View, Dimensions } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-banner-carousel';
 
const width = Dimensions.get('window').width

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
        <Container>
          <Header style={{ backgroundColor: '#2CBC7B', justifyContent: 'center', alignItems: 'center' }}> 
            <Text style={{ fontSize: 25, color: '#fff' }}>Information Page</Text>
          </Header>
          <ScrollView>
          <Content>
              <CardItem>
                <Left>
                  <Body>
                    <Text>April 15, 2016</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <Image source={{uri: 'https://placeimg.com/640/640/beer'}} style={{height: 180, width: 320, flex: 1}}/>
                  <Card style={{ width: 320, paddingVertical: 30, backgroundColor: '#222222' }}>
                    <Text style={{ textAlign: 'center', color: '#fff'}}>
                      information text here
                    </Text>
                  </Card>
                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent textStyle={{color: '#87838B'}}>
                    <Text>admin</Text>
                  </Button>
                </Left>
              </CardItem>
          </Content>
          </ScrollView>
        </Container>
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