import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";

export function TextRegular(props) {
  return <Text {...props} style={[styles.textHeebo, props.style]} />;
}

export function TextMedium(props) {
  return <Text {...props} style={[styles.textHeeboMedium, props.style]} />;
}
export function TextBold(props) {
  return <Text {...props} style={[ styles.textHeeboBold, props.style]} />;
}

const styles = StyleSheet.create({
  textHeeboMedium: {
    fontFamily: "Heebo_500Medium",
    fontSize: 18,
    color: "black",
    textAlign: "left",
  },
  textHeebo: {
    fontFamily: "Heebo_400Regular",
    fontSize: 18,
    color: "black",
    textAlign: "left",
  },
  textHeeboBold: {
    fontFamily: "Heebo_700Bold",
    fontSize: 18,
    color: "black",
    textAlign: "left",
  },
});
