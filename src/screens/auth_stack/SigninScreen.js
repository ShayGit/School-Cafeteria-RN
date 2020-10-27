import { Button, Icon, Input, Text } from "react-native-elements";
import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Context as AuthContext } from "../../context/AuthContext";
import CustomButton from "components/CustomButton";
import CustomHeader from "../../components/CustomHeader";
import NavLink from "../../components/NavLink";
import { SafeAreaView } from "react-native-safe-area-context";
import Section from "components/Section";
import { TextInput } from "react-native-gesture-handler";
import { TextMedium } from "components/CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

const SigninScreen = ({ navigation }) => {
  const {
    state: { errorMessage },
    signin,
    clearErrorMessage,
  } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      if(errorMessage)
      clearErrorMessage();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader text="כניסה למערכת" isBack={navigation.canGoBack()} />
      <View style={{ flex: 1, margin: 10 }}>
      <Section>
          <View style={styles.col}>
            <TextMedium style={{ fontSize: 20 }} numberOfLines={1}>
              {" "}
             דוא"ל:
            </TextMedium>
            <View
              style={{
                borderWidth: 1,
                flex: 1,
                marginHorizontal: 20,
              }}
            >
              <TextInput
                style={styles.textInput}
                placeholder={'כתובת דוא"ל'}
                onChangeText={setEmail}
                value={email}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
          <View style={styles.col}>
            <TextMedium style={{ fontSize: 20 }} numberOfLines={1}>
              {" "}
            סיסמה:
            </TextMedium>
            <View
              style={{
                borderWidth: 1,
                flex: 1,
                marginHorizontal: 20,
              }}
            >
              <TextInput
                style={styles.textInput}
                placeholder={'סיסמה'}
                onChangeText={setPassword}
                value={password}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
              />
            </View>
          </View>
     
          {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null} 
         {/* </View> */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              justifyContent: "center",
              marginHorizontal: 10,
              marginBottom: 20,
            }}
          >
          <CustomButton style={styles.button}
              containerStyle={{ flex: 0.6 }}
              title="התחבר"
              onPress={() => {
                signin({ email, password })
              }}
            />
            </View>
          
          <View style={{flex:1, flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 10}}>
                <View>
          <NavLink
            routeName="Signup"
            text="לא נרשמת עדיין? "
            textLink="הירשם"
          />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.label}>שכחתי סיסמה?</Text>
              </TouchableOpacity>
              </View>
          </View>

          </Section>
          </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    flex: 1,
  },
  label: {
    color: "blue",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
  button: {
    backgroundColor: "dodgerblue",
  },
  col: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  textInput: {
    fontFamily: "Heebo_500Medium",
    fontSize: 18,
    color: "black",
    textAlign: "center",
    flex: 1,
  },
});

export default SigninScreen;
