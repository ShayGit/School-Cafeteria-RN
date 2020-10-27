import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextBold, TextMedium } from "components/CustomText";

import {Context as AuthContext} from 'context/AuthContext';
import BitOrPepper from "components/BitOrPepper";
import { Context as CartContext } from "context/CartContext";
import CustomAlert from "components/CustomAlert";
import CustomButton from "components/CustomButton";
import CustomHeader from "components/CustomHeader";
import { Divider } from "react-native-elements";
import Loader from "components/Loader";
import OrderSummaryOverlay from "components/OrderSummaryOverlay";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const CheckoutScreen = ({ route, navigation }) => {
  const { paymentMethod } = route.params;
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState("");

  const { state:{user:{isStuff}}} = useContext(AuthContext);
  const {
    state: {products, timeToMake, note, totalPrice, isLoading },
    setLoading,
    handleCheckout,
    handleCreditCheckout,
    emptyCart
  } = useContext(CartContext);

  const confirmationNumberAlert = () => {
    CustomAlert({
      title: "מספר אישור/ פעולה אינו חוקי",
      message: "יש להזין מספר אישור/פעולה תקני",
      numOfButtons: 1,
      canCancel: true,
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader text="סיכום הזמנה ותשלום" isBack={navigation.canGoBack()}  />
        <Loader />
      </SafeAreaView>
    );
  } else {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader text="סיכום הזמנה ותשלום" isBack={navigation.canGoBack()} />
      <ScrollView style={styles.container}>
        <View
          style={{
            flex: 5,
            marginTop: 10,
            marginHorizontal: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.6 }}>
              <TextBold style={styles.name}>תשלום ב- {paymentMethod}</TextBold>
            </View>
            <View style={{ marginEnd: 5, flex: 0.4 }}>
              <CustomButton
                style={{
                  backgroundColor: "gold",
                }}
                title="הצג סיכום הזמנה"
                onPress={() => {setIsOrderSummaryVisible(true);
                }}
              />
            </View>
          </View>

          <Divider style={styles.separator} />

          <View style={{ marginHorizontal: 20 }}>
            {paymentMethod === "bit" || paymentMethod === "pepper" ? (
              <BitOrPepper
                paymentMethod={paymentMethod}
                confirmationNumber={confirmationNumber}
                setConfirmationNumber={setConfirmationNumber}
              />
            ) : paymentMethod === "מזומן" ? (
              <>
                <TextMedium> על מנת לשלם במזומן:</TextMedium>
                <TextMedium> 1. לחץ על כפתור ביצוע ההזמנה למטה.</TextMedium>
                <TextMedium> 2. הגיע בשעה שקבעת לאיסוף ההזמנה.</TextMedium>
                <TextMedium>
                  {" "}
                  3. ציין את שמך ומספר הנייד בקופה ושלם את הסכום הנדרש -{" "}
                  {totalPrice} ש"ח.
                </TextMedium>
              </>
            ) : null}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 20
          }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <TextMedium style={styles.price}>
              {'סה"כ: ' + totalPrice + " ₪"}
            </TextMedium>
          </View>
          <Divider style={styles.separator} />
          <View style={styles.buttonContainer}>
            <CustomButton
              style={{
                backgroundColor: "dodgerblue",
                marginHorizontal: 30,
              }}
              title="ביצוע הזמנה"
              onPress={() => {
                if (!isLoading) {
                  setLoading(true);
                  if((paymentMethod==='bit'|| paymentMethod==='pepper') && confirmationNumber)
                  {
                  handleCheckout({products, timeToMake, note, totalPrice, paymentMethod, confirmationNumber})
                }
                else if(paymentMethod==='מזומן')
                {
                  handleCheckout({products, timeToMake, note, totalPrice, paymentMethod})
                  
                }
                else if(paymentMethod==='אשראי')
              {
                handleCreditCheckout({products, timeToMake, note, totalPrice, paymentMethod})
              }
                else{
                  confirmationNumberAlert();
                }
                setLoading(false);
                }
              }}
            />
          </View>
        </View>
        <View style={{alignSelf:'stretch'}}>
        <OrderSummaryOverlay
          isVisible={isOrderSummaryVisible}
          setIsVisible={setIsOrderSummaryVisible}
          totalPrice={totalPrice} note={note} timeToMake={timeToMake} products={products} paymentMethod={paymentMethod}
          isStuff={isStuff}
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  separator: {
    borderBottomColor: "midnightblue",
    borderBottomWidth: 2,
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  name: {
    fontSize: 28,
    marginHorizontal: 15,
  },
  buttonContainer: {
    marginHorizontal: 30,
    flex: 1,
  },
  price: {
    fontSize: 22,
    color: "tomato",
  },
});

export default CheckoutScreen;
