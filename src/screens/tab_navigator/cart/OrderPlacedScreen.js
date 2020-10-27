import React, { useContext, useEffect, useState } from "react";
import { StackActions, useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

import { Context as AuthContext } from "context/AuthContext";
import { Context as CartContext } from "context/CartContext";
import CustomButton from "components/CustomButton";
import CustomHeader from "components/CustomHeader";
import Loader from "components/Loader";
import OrderSummary from "components/OrderSummary";
import { Context as OrdersContext } from "context/OrdersContext";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderPlacedScreen = ({ route, navigation }) => {
  const [order, setOrder] = useState({ id: route.params.orderId });
  const {
    state: { isLoading },
  } = useContext(CartContext);
  const { getOrder } = useContext(OrdersContext);
  const {
    state: {
      user: { isStuff },
    },
  } = useContext(AuthContext);

  useEffect(() => {
    async function getOrderPlaced() {
      const order = await getOrder({ orderId: route.params.orderId });

      setOrder(order);
    }
    getOrderPlaced();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => navigation.dispatch(StackActions.popToTop());
    }, [])
  );

  if (Object.keys(order).length < 2 || isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader text="הזמנה הושלמה" isBack={false} />
        <Loader />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader text="הזמנה הושלמה" isBack={false} />
        <View style={{ margin: 10, flex: 1 }}>
          <View style={{ flex: 0.9 }}>
            <OrderSummary
              totalPrice={order.price}
              timeToMake={order.timeToMake}
              note={order.note}
              products={order.products}
              paymentMethod={order.paymentMethod}
              isStuff={order.user.isStuff}
            />
          </View>
          <View style={{ flex: 0.1, marginTop: 10 }}>
            <CustomButton
              style={{
                borderWidth: 1,
                backgroundColor: "dodgerblue",
                marginHorizontal: 20,
              }}
              title="להזמנות שלי"
              onPress={() =>
              {
                navigation.navigate('Settings', {
                  screen: 'Settingss'
                });
              }
              }
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default OrderPlacedScreen;
