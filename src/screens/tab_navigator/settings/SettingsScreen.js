import * as WebBrowser from 'expo-web-browser';

import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import {Context as AuthContext} from "context/AuthContext"
import CustomHeader from "components/CustomHeader";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Section from "components/Section";
import { TextMedium } from "components/CustomText";
import { View } from "react-native";

const SettingsScreen = ({navigation, route}) => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const handlePress = (href) => {
    WebBrowser.openBrowserAsync(href);
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader text="אזור אישי" isBack={false} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {user && (
          <View
            style={{
              flex: 0.2,
              alignSelf: "stretch",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity style={{ flex: 0.4 }} onPress={() => navigation.navigate('UserInformation')}>
              <Section>
                <Icon
                  containerStyle={{ alignSelf: "center" }}
                  size={30}
                  name="person"
                  type="fontisto"
                  reverse
                  color="gold"
                />
                <TextMedium style={{ textAlign: "center" }}>
                  פרטים אישיים
                </TextMedium>
              </Section>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.4 }} onPress={() => navigation.navigate('MyOrders')}>
              <Section>
                <Icon
                  containerStyle={{ alignSelf: "center" }}
                  size={30}
                  name="shopping-bag"
                  type="feather"
                  reverse
                  color="tomato"
                />
                <TextMedium style={{ textAlign: "center" }}>
                  ההזמנות שלי
                </TextMedium>
              </Section>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            flex: 0.2,
            alignSelf: "stretch",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {user ? (
            <TouchableOpacity style={{ flex: 0.4 }}>
              <Section>
                <Icon
                  containerStyle={{ alignSelf: "center" }}
                  size={30}
                  name="creditcard"
                  type="antdesign"
                  reverse
                  color="red"
                />
                <TextMedium style={{ textAlign: "center" }}>
                  אמצעי תשלום
                </TextMedium>
              </Section>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{ flex: 0.4 }} onPress={()=>{navigation.navigate('Auth', {screen: 'PreAuth'})}}>
              <Section>
                <Icon
                  containerStyle={{ alignSelf: "center" }}
                  size={30}
                  name="adduser"
                  type="antdesign"
                  reverse
                  color="red"
                />
                <TextMedium style={{ textAlign: "center" }}>
                  הרשמה/התחברות
                </TextMedium>
              </Section>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={{ flex: 0.4 }}>
            <Section>
              <Icon
                containerStyle={{ alignSelf: "center" }}
                size={30}
                name="phone-call"
                type="feather"
                reverse
                color="green"
              />
              <TextMedium style={{ textAlign: "center" }}>צור קשר</TextMedium>
            </Section>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.2,
            alignSelf: "stretch",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity style={{ flex: 0.4 }} onPress={() => handlePress('https://qpytryyt-byt-spr.flycricket.io/terms.html' )}>
            <Section>
              <Icon
                containerStyle={{ alignSelf: "center" }}
                size={30}
                name="file-text"
                type="TermsOfUse"
                reverse
                color="gray"
              />
              <TextMedium style={{ textAlign: "center" }}>
                תנאי השימוש
              </TextMedium>
            </Section>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 0.4 }} onPress={() => handlePress('https://qpytryyt-byt-spr.flycricket.io/privacy.html')}>
            <Section>
              <Icon
                containerStyle={{ alignSelf: "center" }}
                size={30}
                name="file-text"
                type="TermsOfUse"
                reverse
                color="gray"
              />
              <TextMedium style={{ textAlign: "center" }}>מדיניות פרטיות</TextMedium>
            </Section>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default SettingsScreen;
