import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Context as AuthContext } from "../../context/AuthContext";
import CustomButton from "components/CustomButton";
import CustomHeader from "../../components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import Section from "components/Section";
import { Text } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { TextMedium } from "components/CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";

const ForgotPasswordScreen = ({ navigation }) => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader text="שחזור סיסמה" isBack={navigation.canGoBack()} />

      <View style={{ flex: 1, margin: 10 }}>
        <Section>
          <View style={styles.col}>
            <TextMedium style={{ fontSize: 20 }} numberOfLines={1}>
              {" "}
              דוא"ל
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
                placeholder={'כתובת דוא"ל לשחזור סיסמה'}
                onChangeText={setEmail}
                value={email}
                autoCapitalize="none"
                autoCorrect={false}
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
            }}
          >
            <CustomButton
              style={{
                backgroundColor: "dodgerblue",
              }}
              containerStyle={{ flex: 0.6 }}
              title="שחזור סיסמה"
              onPress={() => {
                resetPassword({ email });
              }}
            />
          </View>
          <View style={{marginHorizontal: 15}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>חזרה להתחברות</Text>
          </TouchableOpacity>
          </View>
        </Section>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  link: {
    fontWeight: "bold",
    color: "tomato",
  },
  col: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  textInput: {
    fontFamily: "Heebo_500Medium",
    fontSize: 16,
    height: 40,
    padding: 10, 
    color: "black",
    textAlign: "center",
  },
});

export default ForgotPasswordScreen;
