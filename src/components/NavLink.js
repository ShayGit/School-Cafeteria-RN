import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React from "react";
import Spacer from "./Spacer";
import { useNavigation } from '@react-navigation/native';

const NavLink = ({ text, textLink, routeName }) => {
  const navigation = useNavigation();

  return (
    <Spacer>
    <View style={styles.row}>
      
        <Text style={styles.label}>{text}</Text>
        <TouchableOpacity onPress={() => navigation.navigate( routeName )}>
          <Text style={styles.link}>{textLink}</Text>
        </TouchableOpacity>
      </View>
      </Spacer>
  );
};

const styles = StyleSheet.create({
  row: {
    flex:1,
    flexDirection: 'row',
    alignItems:'center'

  },
  link: {
    fontWeight: 'bold',
    color: 'tomato',
  },
  label: {
    color: 'black',

  },
});

export default NavLink;
