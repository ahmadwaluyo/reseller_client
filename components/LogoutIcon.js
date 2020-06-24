import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';

import Colors from '../constants/Colors';

export default function LogoutIcon(props) {
  return (
    <AntDesign
      name={props.name}
      size={25}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
