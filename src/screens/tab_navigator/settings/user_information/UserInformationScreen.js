import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { Context as AuthContext } from "context/AuthContext";
import CustomAlert from "components/CustomAlert";
import CustomButton from "components/CustomButton";
import CustomHeader from "components/CustomHeader";
import { Divider } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Section from "components/Section";
import { TextMedium } from "components/CustomText";

const UserInformationScreen = ({ navigation }) => {
  const {
    state: {
      user: { firstName, lastName, isStuff, email, phoneNumber },
    },
    signout
  } = useContext(AuthContext);

  const signOutAlert = () => {
    CustomAlert({
      title: "התנתקות",
      message: "בטוח שברצונך להתנתק?",
      canCancel: true,
      numOfButtons: 2,
      onOk: () => signout(),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader text="פרטים אישיים" isBack={navigation.canGoBack()} />
      <View style={{ margin: 10, flex: 1 }}>
        <Section>
          <View style={styles.topTextContainer}>
            <TextMedium style={{ fontSize: 24 }} numberOfLines={1}>
              {" "}
              {firstName + " " + lastName}
            </TextMedium>
            {isStuff &&
            <TextMedium style={{ fontSize: 24 }} numberOfLines={1}>
              {" "}
              עובד צוות
            </TextMedium>
}
          </View>
          <Divider style={styles.separator} />
          <View style={{ flex: 0.9 }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems:'flex-start',
                justifyContent: "space-between",
                marginHorizontal: 10,
              }}
            >
              <TextMedium style={{ fontSize: 20 }} numberOfLines={1}>
                {" "}
                דוא"ל:
              </TextMedium>
              <TextMedium style={{ fontSize: 20 }} numberOfLines={1}>
                {" "}
                {email}
              </TextMedium>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems:'flex-start',
                justifyContent: "space-between",
                marginHorizontal: 10,
              }}
            >
              <TextMedium style={{ fontSize: 20 }} numberOfLines={1}>
                {" "}
                מספר נייד:
              </TextMedium>
              <TextMedium style={{ fontSize: 20 }} numberOfLines={1}>
                {" "}
                {'0'+phoneNumber.slice(-9)}
              </TextMedium>
            </View>
            <View style={styles.topButtonContainer}>
            <CustomButton
              style={{
                backgroundColor: "gold",
              }}
              containerStyle={{ flex: 0.3 }}
              title="עריכה"
              onPress={() => {navigation.navigate('EditUserInfo')}}
            />
            <CustomButton
              style={{
                backgroundColor: "red",
              }}
              containerStyle={{ flex: 0.3 }}
              title="התנתק"
              onPress={ signOutAlert}
            />
          </View>
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
  topButtonContainer: {
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  topTextContainer: {
    flexDirection: "row",
    flex: 0.1,
    justifyContent: "space-between",
    marginHorizontal: 20,
    alignItems: "flex-end",
  },
  separator: {
    borderBottomColor: "midnightblue",
    borderBottomWidth: 2,
    marginHorizontal: 5,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default UserInformationScreen;
