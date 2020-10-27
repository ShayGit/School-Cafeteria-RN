import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";

import { Context as AuthContext } from "context/AuthContext";
import CustomButton from "components/CustomButton";
import CustomHeader from "components/CustomHeader";
import { Divider } from "react-native-elements";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { SafeAreaView } from "react-native-safe-area-context";
import Section from "components/Section";
import { TextInput } from "react-native-gesture-handler";
import { TextMedium } from "components/CustomText";
import firebase from "config/firebase";

const EditUserInfoScreen = ({ navigation }) => {
  const {
    state: {
      user: { firstName, lastName, isStuff, email, phoneNumber },
      isUpdatePhoneCodeSent,
      phoneVerificationId,
    },
    signout,
    updateUserInformation,
    confirmUpdatePhoneCode,
    setIsUpdatePhoneCodeSent,
  } = useContext(AuthContext);


  const recaptchaVerifier = useRef(null);
  const [firstNameTemp, setFirstName] = useState(firstName);
  const [lastNameTemp, setLastName] = useState(lastName);
  const [phoneNumberTemp, setPhoneNumber] = useState(
    "0" + phoneNumber.slice(-9)
  );
  const [emailTemp, setEmail] = useState(email);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [stuffCode, setStuffCode] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    setIsUpdatePhoneCodeSent(false);
    return () => {
      setIsUpdatePhoneCodeSent(false);
    };
  }, []);

  if (isUpdatePhoneCodeSent) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader text="אימות קוד" isBack={navigation.canGoBack()} />
        <View style={{ margin: 10, flex: 1, borderWidth: 1 }}>
          <Section>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                marginHorizontal: 20,
                alignSelf: "center",
              }}
            >
              <TextMedium style={{ fontSize: 20 }} numberOfLines={1}>
                {" "}
                קוד אימות שהתקבל:
              </TextMedium>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                marginHorizontal: 20,
                borderWidth: 1,
              }}
            >
              <TextInput
                containerStyle={{ flex: 0.6 }}
                style={styles.textInput}
                placeholder="123456"
                onChangeText={setCode}
                value={code}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                marginHorizontal: 10,
                alignSelf: "center",
              }}
            >
              <CustomButton
                style={{
                  backgroundColor: "dodgerblue",
                }}
                disabled={!code}
                containerStyle={{ flex: 0.6 }}
                title="אימות קוד"
                onPress={() =>
                  confirmUpdatePhoneCode({ phoneVerificationId, code })
                }
              />
            </View>
          </Section>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader text="עריכת פרטים" isBack={navigation.canGoBack()} />
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebase.app().options}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
          enabled
        >
          <ScrollView>
            <View style={{ flex: 1, margin: 10 }}>
              <Section>
                <View backgroundColor="gold" style={styles.topTextContainer}>
                  <TextMedium style={{ fontSize: 20 }} multiline>
                    {" "}
                    שנה רק את השדות הרלוונטים ואמת סיסמה
                  </TextMedium>
                </View>
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
                      onChangeText={(text) => setFirstName(text)}
                      value={firstNameTemp}
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
                      onChangeText={(text) => setLastName(text)}
                      value={lastNameTemp}
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
                      onChangeText={(text) => setEmail(text)}
                      value={emailTemp}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={styles.col}>
                  <TextMedium style={{ fontSize: 20 }} numberOfLines={1}>
                    {" "}
                    סיסמה חדשה:
                  </TextMedium>
                  <View
                    style={{
                      borderWidth: 1,
                      flex: 1,
                      marginHorizontal: 20,
                    }}
                  >
                    <TextInput
                      style={{
                        fontFamily: "Heebo_500Medium",
                        fontSize: 14,
                        color: "black",
                        textAlign: "center",
                        flex: 1,
                      }}
                      placeholder="הכנס אם ברצונך לשנות סיסמה"
                      onChangeText={(text) => setNewPassword(text)}
                      value={newPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry
                    />
                  </View>
                </View>
                <View style={styles.col}>
                  <TextMedium style={{ fontSize: 20 }} numberOfLines={1}>
                    {" "}
                    מספר נייד:
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
                      onChangeText={(text) => setPhoneNumber(text)}
                      value={phoneNumberTemp}
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoCompleteType="tel"
                      keyboardType="phone-pad"
                      textContentType="telephoneNumber"
                    />
                  </View>
                </View>

                {!isStuff && (
                  <View style={styles.col}>
                    <TextMedium style={{ fontSize: 20 }} numberOfLines={1}>
                      {" "}
                      קוד עובד צוות:
                    </TextMedium>
                    <View
                      style={{
                        borderWidth: 1,
                        flex: 1,
                        marginHorizontal: 20,
                      }}
                    >
                      <TextInput
                        placeholder="עובד צוות? הכנס קוד"
                        style={{
                          fontFamily: "Heebo_500Medium",
                          fontSize: 16,
                          color: "black",
                          textAlign: "center",
                          flex: 1,
                        }}
                        onChangeText={(text) => setStuffCode(text)}
                        value={stuffCode}
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        secureTextEntry
                      />
                    </View>
                  </View>
                )}
                <Divider style={styles.separator} />

                <View style={styles.col}>
                  <TextMedium style={{ fontSize: 20 }} numberOfLines={1}>
                    {" "}
                    אימות סיסמה נוכחית:
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
                      onChangeText={(text) => setPassword(text)}
                      value={password}
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry
                    />
                  </View>
                </View>

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
                    title="שמירת שינויים"
                    onPress={() => {
                      updateUserInformation({
                        firstName: firstNameTemp,
                        lastName: lastNameTemp,
                        email: emailTemp,
                        newPassword,
                        currentPassword: password,
                        isPasswordUpdate: newPassword ? true : false,
                        stuffCode,
                        isEmailUpdate: email !== emailTemp,
                        newPhoneNumber: phoneNumberTemp,
                        isPhoneUpdate:
                          phoneNumberTemp !== "0" + phoneNumber.slice(-9),
                        isUpdatePhoneCodeSent,
                        recaptchaVerifier,
                      });
                    }}
                  />
                </View>
              </Section>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topButtonContainer: {
    flexDirection: "row",
    marginTop: 5,
    flex: 0.1,
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  topTextContainer: {
    flexDirection: "row",
    marginTop: 14,
    alignItems: "flex-start",
    marginHorizontal: 5,
  },
  separator: {
    borderBottomColor: "midnightblue",
    borderBottomWidth: 2,
    marginHorizontal: 5,
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

export default EditUserInfoScreen;
