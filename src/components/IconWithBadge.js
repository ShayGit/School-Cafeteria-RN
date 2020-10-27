const { View } = require("react-native");

import React, { useContext } from 'react';

import { AntDesign } from "@expo/vector-icons";
import {Context as CartContext} from '../context/CartContext'
import {TextBold} from 'components/CustomText'

const IconWithBadge = ({ name, color, size }) => {

    const {state:{numOfProducts}} = useContext(CartContext);

    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <AntDesign name={name} size={size} color={color} />
        {numOfProducts > 0 && (
          <View 
            style={{
              // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              left: -5,
              top: -2,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 13,
              height: 13,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextBold style={{ color: 'white', fontSize: 10}}>
              {numOfProducts}
            </TextBold>
          </View>
        )}
      </View>
    );
  }

  export default IconWithBadge;