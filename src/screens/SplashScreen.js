import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext } from "react";

import { Context as AuthContext } from "../context/AuthContext";
import firebase from "../config/firebase";

const { width } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
  const { setAuthenticated, setUser } = useContext(AuthContext);

  React.useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((user) => {
      //console.log("onauth");
      if (user) {
        if (user.email && user.phoneNumber) {
          // ALL GOOD
          setAuthenticated(true, true);
          setUser(user);
          //navigation.reset({index: 0, routes: [{name: 'MainTab'}]})
        } else if (user.email) {
          // PHONE NOT VERIFIED
          setAuthenticated(true, false);
        } else if (user.phoneNumber) {
          // EMAIL NOT VERIFIED
          setAuthenticated(false, true);
        }
      } else {
        // NOT SIGNED IN - dispatch / goto login screen?
        setAuthenticated(false, false);
        //navigation.reset({index: 0, routes: [{name: 'MainTab'}]})
      }
    });
    return () => {
      listener;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/splash.jpg")}
      ></Image>
      <View style={styles.logo}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
            textAlign: "left",
          }}
        >
          {" "}
          כבר מתחילים...
        </Text>
        <ActivityIndicator
          size="large"
          color="dodgerblue"
          style={styles.indicator}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width,
    flex: 1,
  },
  logo: {
    position: "absolute",
    bottom: 35,
    elevation: 2,
  },
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    margin: 10,
  },
});

export default SplashScreen;
