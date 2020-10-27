import { Header } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";
import {TextBold} from 'components/CustomText'
import { useNavigation } from "@react-navigation/native";

const CustomHeader = ({ text, isBack}) => {
  const navigation = useNavigation();

  return (
    <Header
      placement="center"
      ViewComponent={require('react-native-linear-gradient').default}
      statusBarProps={{ backgroundColor: "tomato" }}
      containerStyle={{ marginTop: Platform.OS === "ios" ? 0 : -20}}
      centerContainerStyle={{flex:4}}
      centerComponent={
        <TextBold
          style={{ fontSize: 24,  }}
        >
          {" "}
          {text}
        </TextBold>
      }
      leftComponent={
        isBack ? (
          <Ionicons
            name="ios-arrow-back"
            size={30}
            color="black"
            style={{ paddingRight: 10, transform: [{ rotateY: "180deg" }] }}
            onPress={()=> navigation.goBack()}
          />
        ) : undefined
      }
      linearGradientProps={{
        colors: ["tomato", "tomato"],
        start: { x: 0, y: 0.5 },
        end: { x: 1, y: 0.5 },
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default CustomHeader;
