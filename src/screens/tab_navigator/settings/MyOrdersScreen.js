import { BackHandler, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { format, parse } from "date-fns";

import {Context as AuthContext} from 'context/AuthContext';
import CustomHeader from "components/CustomHeader";
import { Divider } from "react-native-elements";
import EmptyCart from "components/EmptyCart";
import Loader from "components/Loader";
import OrderSummaryOverlay from "components/OrderSummaryOverlay";
import { Context as OrdersContext } from "context/OrdersContext";
import OrdersListItem from "components/OrdersListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import Section from "components/Section";
import { TextMedium } from "components/CustomText";
import firebase from "config/firebase";
import { firestore } from "config/firebase";
import { useFocusEffect } from "@react-navigation/native";

const MyOrdersScreen = ({navigation}) => {
  const {
    state: {
      orders,
      isLoading,
      isOrderOverlay,
      orderToShow,
    },
    reset,
    getLastOrders,
    setOrderToShow,
    setOrderOverlayVisible,
    updateOrders
  } = useContext(OrdersContext);

  const { state:{user:{isStuff}}} = useContext(AuthContext);

  
  useEffect(() => {
    //console.log('mount myorders useeffect');
   
    let date =  format(new Date(),"dd/MM/yyyy");
    date = parse(date, "dd/MM/yyyy", new Date())



    const query = firestore
      .collection("orders")
      .where("user.id", "==", firebase.auth().currentUser.uid).where("createdAt", ">", date).orderBy("createdAt", "desc");
      //
      
      
    const observer = query.onSnapshot(
      (querySnapshot) => {
        //console.log('onsnapshot')
        updateOrders(querySnapshot);
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
      if(orders.length===0)
    getLastOrders();

    return () => {
      //console.log('unmount myorders useeffect');
      observer();
      reset();
    }
  }, []);

  if (orders.length === 0 && !isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader text="ההזמנות שלי" isBack={navigation.canGoBack()} />
        <EmptyCart text='לא נמצאו הזמנות' />
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader text="ההזמנות שלי" isBack={false} />
        <Loader />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader text="ההזמנות שלי" isBack={navigation.canGoBack()} />
        <View style={{ margin: 10, flex: 1 }}>
          <View style={styles.topButtonContainer}>
            <Section>
            <TextMedium
              style={{
                textAlign: "center",fontSize: 20, backgroundColor: "gold",flex:1, alignSelf:'stretch', alignItems:'center'}}
              numberOfLines={1}
            >
              20 הזמנות אחרונות
            </TextMedium>
            </Section>
          </View>
          <Divider style={styles.separator} />
          <View style={{ flex: 0.93 }}>
            <Section>
              <FlatList
                data={orders}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ flex: 1, borderWidth: 0.5 }}
                    onPress={() => setOrderToShow(item.id)}
                  >
                    <OrdersListItem
                      id={item.id}
                      orderStatus={item.orderStatus}
                      paymentMethod={item.paymentMethod}
                      confirmationNumber={item.confirmationNumber}
                      createdAt={item.createdAt}
                      paymentStatus={item.paymentStatus}
                      numProducts={item.products.length}
                      price={item.price}
                    />
                  </TouchableOpacity>
                )}
              />
            </Section>
          </View>
          <OrderSummaryOverlay
            isVisible={isOrderOverlay}
            setIsVisible={setOrderOverlayVisible}
            totalPrice={orderToShow.price}
            note={orderToShow.note}
            timeToMake={orderToShow.timeToMake}
            products={orderToShow.products}
            paymentMethod={orderToShow.paymentMethod}
            isStuff={orderToShow.user ? orderToShow.user.isStuff: null }
          />
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
  topButtonContainer: {
    flexDirection: "row",
    marginTop: 5,
    flex: 0.07,
  },
  separator: {
    borderBottomColor: "midnightblue",
    borderBottomWidth: 2,
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 5,
  },
});

export default MyOrdersScreen;
