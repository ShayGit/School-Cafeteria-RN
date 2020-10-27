import { Alert, BackHandler, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";

import { Context as CartContext } from "context/CartContext";
import { CommonActions } from "@react-navigation/native";
import CustomHeader from "components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import firebase from "config/firebase";

const CheckoutWebViewScreen = ({ navigation, route }) => {
  const { emptyCart } = useContext(CartContext);
  const [htmlPage, setHtmlPage] = useState();
  const [canGoBack, setCanGoBack] = useState(false);
  const [bluesnapData, setBluesnapData] = useState({});
  const [idToken, setIdToken] = useState();
  const BASE_URL = process.env.BASE_URL;

  const webviewRef = useRef(null);

  const handleBackButton = () => {
    if (canGoBack) {
      webviewRef.current.goBack();
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    console.log(BASE_URL)
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    async function getHtml() {
      try {
        const token = await firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true);
        setIdToken(`Bearer ${token}`);
      } catch (err) {
        Alert.alert("", err);
        console.log(err);
      }
    }
    getHtml();

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  const handleChange = (e) => {
    //console.log(e);
    setCanGoBack(e.canGoBack);
    if (!e.loading && e.url === `${BASE_URL}/payment/success`) {
      emptyCart();
      //navigation.dispatch(StackActions.popToTop());
      navigation.dispatch(
        CommonActions.navigate("OrderPlaced", { orderId: route.params.orderId })
      );
    } else if (!e.loading && e.url === `${BASE_URL}/payment/cancel`) {
      navigation.goBack();
      Alert.alert("", "שגיאה, לא התבצע תשלום");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader text="תשלום" isBack={navigation.canGoBack()} />
      <View style={{ flex: 1 }}>
        {idToken && (
          <WebView
            javaScriptEnabled
            onMessage={(event) => {
              console.log(event.nativeEvent.data);
            }}
            source={{
              uri: `${BASE_URL}/web/checkout/redirect?bluesnapToken=${route.params.bluesnapToken}&orderId=${route.params.orderId}`,
              headers: {
                Authorization: idToken,
              },
            }}
            onNavigationStateChange={handleChange}
            scalesPageToFit={true}
            ref={webviewRef}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CheckoutWebViewScreen;
