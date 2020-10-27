const { Overlay } = require("react-native-elements");

import { StackActions, useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

import CustomButton from 'components/CustomButton'
import { Icon } from 'react-native-elements'
import React from "react";
import {TextRegular} from 'components/CustomText'

const AddProductOverlay = ({ isVisible, setVisible }) => {
  const navigation = useNavigation();

  return (
    <Overlay
      isVisible={isVisible}
      animationType="fade"
      width="auto"
      height="auto"
    >
      <View style={styles.overlayContainer}>
       <Icon 
  color='darkblue' containerStyle={{alignSelf:'center'}} type="material"  size={50} name='add-shopping-cart'/>
       <TextRegular
            style={{
              textAlign: "center",
              color: "#ef6136",
              fontSize: 20,
            }}
          >
           המוצר נוסף בהצלחה!
          </TextRegular>
         <View style={styles.addToCarContainer}>
            <CustomButton
              style={
                {backgroundColor: "dodgerblue"}}
              title="סיום הזמנה ותשלום"
              onPress={() =>{
                  setVisible(false);
                navigation.dispatch(StackActions.popToTop())
                navigation.navigate('Cart')}}
            />
          </View>
          <View style={styles.addToCarContainer}>
            <CustomButton
              style={
                {backgroundColor: "dodgerblue"}}
              icon={<Icon
              type='ionicon'
                name="ios-arrow-back"
                size={30}
                color="white"
                style={{ marginHorizontal: 5, transform: [{ rotateY: "180deg" }] }}
              />}
              title="המשך הזמנה"
              onPress={() =>{setVisible(false);
                navigation.dispatch(StackActions.popToTop());
            }
        }
            />
          </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  addToCarContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    alignContent:'stretch'

  },
});
export default AddProductOverlay;
