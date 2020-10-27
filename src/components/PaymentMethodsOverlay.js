const { Overlay } = require("react-native-elements");

import { StyleSheet, View } from "react-native";

import CustomButton from "components/CustomButton";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const PaymentMethodsOverlay = ({ isVisible, setIsVisible }) => {
  const navigation = useNavigation();

  return (
    <Overlay
      isVisible={isVisible}
      animationType="fade"
      width="auto"
      height="auto"
      onBackdropPress={() => {
        setIsVisible(false);
      }}
    >
      <View style={styles.overlayContainer}>
        <View style={styles.buttonContainer}>
          <CustomButton
            style={{ backgroundColor: "dodgerblue" }}
            title="תשלום במזומן"
            onPress={() => {
              if(isVisible)
              {
                  setIsVisible(false) ;
                   navigation.navigate('Checkout', {paymentMethod: 'מזומן'})
              }
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            style={{ backgroundColor: "red" }}
            title="תשלום באשראי"
            onPress={() => {
              if(isVisible)
              {
                  setIsVisible(false) ;
                   navigation.navigate('Checkout', {paymentMethod: 'אשראי'})
              }
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            style={{ backgroundColor: "tomato" }}
            title="תשלום ב- Bit"
            onPress={() => {
              if(isVisible)
              {
                  setIsVisible(false) ;
                   navigation.navigate('Checkout', {paymentMethod: 'bit'})
              }
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            style={{ backgroundColor: "green" }}
            title="תשלום ב- Pepper"
            onPress={() => {
              if(isVisible)
              {
                  setIsVisible(false) ;
                   navigation.navigate('Checkout', {paymentMethod: 'pepper'})
              }
            }}
          />
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    alignContent: "stretch",
  },
});
export default PaymentMethodsOverlay;
