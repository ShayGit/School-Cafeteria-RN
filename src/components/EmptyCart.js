import { Image, StyleSheet, View, } from "react-native";

import CustomButton from "./CustomButton";
import React from "react";
import {TextRegular} from 'components/CustomText'
import { useNavigation } from "@react-navigation/native";

const EmptyCart = ({text})=> {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
          <Image
            source={require("../../assets/empty_cart.png")}
            style={{ width: 150, height: 150, marginBottom: 12 , alignSelf:'center'
            }}
          />
          <TextRegular
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "#ef6136",
              opacity: 0.7,
            }}
          >
           {text}
          </TextRegular>
          <View style={styles.addToCarContainer}>
            <CustomButton
              style={{backgroundColor: "dodgerblue"}}
              styleTitle={{fontSize: 22}}
              title="הזמנה חדשה"
              onPress={() =>navigation.navigate('Menu')}
            />
          </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignContent: 'center',
  },
  addToCarContainer: {
    marginHorizontal: 30,
    marginBottom: 20,
    marginTop: 20,
    alignContent:'stretch'

  },
});

export default EmptyCart;