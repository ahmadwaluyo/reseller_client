import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/ProfileScreen';
import ProductScreen from '../screens/ProductScreen';
import DataMitra from '../screens/admin/DataMitra';
import DataProduct from '../screens/admin/DataProduct';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabAdmin({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  const dataProfile = route.params.token;

  navigation.setOptions({ headerTitle: getHeaderTitle(route), dataProfile: route });

  console.log('ini route', route);
  return (
    <BottomTab.Navigator 
    initialRouteName={INITIAL_ROUTE_NAME}
    tabBarOptions={{
      activeBackgroundColor: '#000',
      inactiveBackgroundColor: '#2CBC7B',
      labelStyle: {
        color: '#fff'
      }
    }}
    >
      <BottomTab.Screen
        name="Home"
        component={DataMitra}
        options={{
          title: 'Mitra',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="team" />,
        }}
      />
      <BottomTab.Screen
        name="Product"
        component={DataProduct}
        options={{
          title: 'Product',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="setting" />,
        }}
      />
      <BottomTab.Screen
        name="Display"
        component={ProductScreen}
        options={{
          title: 'Display',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="isv" />,
        }}
      />
      <BottomTab.Screen
        name="ProfileAdmin"
        component={ProfileScreen}
        options={{
          title: 'Admin',
          data: dataProfile,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="user" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Dashboard';
    case 'Product':
      return 'Product';
    case 'Display':
      return 'Display page';
    case 'ProfileAdmin':
      return 'ProfileAdmin to learn more';
  }
}
