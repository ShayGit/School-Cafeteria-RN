import { Button, Icon, Input } from "react-native-elements";
import React, { useContext, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Context as AuthContext } from "../../context/AuthContext";
import CustomHeader from "../../components/CustomHeader";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../../components/Spacer";
import firebase from "../../config/firebase";

const PhoneVerifyScreen = ({ navigation }) => {
  const {
    state: { phoneVerificationId },
    sendPhoneVerification,
    confirmCode
  } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const recaptchaVerifier = useRef(null);
  

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader text="אימות מספר פלאפון" isBack={navigation.canGoBack()} />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />
      <Spacer>
        <View>
          <Input
            label="מספר פלאפון נייד:"
            value={phoneNumber}
            icon={<Icon name="email" size={24} color="black" />}
            onChangeText={setPhoneNumber}
            inputContainerStyle={styles.inputContainer}
            labelStyle={styles.inputLabel}
            inputStyle={{ textAlign: "right" }}
            placeholder="0599999999"
            autoFocus
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
          />

          <View style={styles.button}>
            <Button
              title="שלח קוד אימות"
              disabled={!phoneNumber}
              onPress={() =>
                sendPhoneVerification({ phoneNumber, recaptchaVerifier })
              }
            />
          </View>
        </View>
        <View>
          <Input
            label="קוד אימות שהתקבל:"
            placeholder="123456"
            value={code}
            editable={!!phoneVerificationId}
            icon={<Icon name="email" size={24} color="black" />}
            onChangeText={setCode}
            inputContainerStyle={styles.inputContainer}
            labelStyle={styles.inputLabel}
            inputStyle={{ textAlign: "right" }}
            keyboardType="number-pad"
          />

          <View style={styles.button}>
            <Button
              title="אימות קוד"
              disabled={!phoneVerificationId}
              onPress={() => confirmCode({phoneVerificationId,code})}
            />
          </View>
        </View>
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: "50%",
    alignSelf: "center",
  },
});

export default PhoneVerifyScreen;
