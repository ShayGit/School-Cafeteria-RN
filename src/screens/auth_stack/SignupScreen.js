import { Button, Icon, Text } from "react-native-elements";
import { KeyboardAvoidingView, StyleSheet, View, } from "react-native";
import React, { useContext, useState } from "react";

import { Context as AuthContext } from "../../context/AuthContext";
import CustomButton from "components/CustomButton";
import CustomHeader from "../../components/CustomHeader";
import NavLink from "../../components/NavLink";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import Section from "components/Section";
import { TextInput } from "react-native-gesture-handler";
import { TextMedium } from "components/CustomText";
import { useFocusEffect } from "@react-navigation/native";

const SignupScreen = ({ navigation }) => {
  const { state : {errorMessage}, signup, clearErrorMessage } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [stuffCode, setStuffCode] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      if(errorMessage)
      clearErrorMessage();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader text="רישום למערכת" isBack={navigation.canGoBack()} /> 
      <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
          enabled
        >
          <ScrollView>
            <View style={{ flex: 1, margin: 10 }}>
              <Section>
              <View style={styles.col}>
                  <TextMedium style={{ fontSize: 20 }} numberOfLines={1}>
                    {" "}
                    שם פרטי:
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
                      onChangeText={setFirstName}
                      value={firstName}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={styles.col}>
                  <TextMedium style={{ fontSize: 20 }} numberOfLines={1}>
                    {" "}
                    שם משפחה:
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
                      onChangeText={setLastName}
                      value={lastName}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>
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
                      onChangeText={setPassword}
                      value={password}
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry
                    />
                  </View>
                </View>
                <View style={styles.col}>
                  <TextMedium style={{ fontSize: 20,  }} numberOfLines={1}>
                    {" "}
                    אימות סיסמה:   
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
                      onChangeText={setCheckPassword}
                      value={checkPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry
                    />
                  </View>
                </View>
                <View style={styles.col}>
                  <TextMedium style={{ fontSize: 20 }} numberOfLines={1}>
                    {" "}
                    קוד עובד צוות (אם קיים):   
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
                      onChangeText={setStuffCode}
                      value={stuffCode}
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry
                    />
                  </View>
                </View>
                {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

<View
                  style={{
                    flexDirection: "row",
                    marginTop: 30,
                    justifyContent: "center",
                    marginHorizontal: 10,
                    marginBottom: 20,
                    flex: 1,
                  }}
                >
                  <CustomButton
                    style={{
                      backgroundColor: "dodgerblue",
                    }}
                    containerStyle={{ flex: 0.6 }}
                    title="הרשמה"
                    onPress={() => {
                      signup({email, password, checkPassword,firstName,lastName,stuffCode})
                    }}
                  />
                </View>
                <NavLink routeName="Signin" text="נרשמת כבר? " textLink="התחבר" />
                </Section>
                </View>
                </ScrollView>
                </KeyboardAvoidingView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
  textInput: {
    fontFamily: "Heebo_500Medium",
    fontSize: 18,
    color: "black",
    textAlign: "center",
    flex: 1,
  },
  col: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
});

export default SignupScreen;
