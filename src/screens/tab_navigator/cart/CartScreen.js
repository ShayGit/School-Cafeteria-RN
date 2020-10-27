import { CheckBox, Divider, Icon, Input } from "react-native-elements";
import { KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { TextBold, TextMedium } from "components/CustomText";

import { Context as AuthContext } from "context/AuthContext";
import { Context as CartContext } from "context/CartContext";
import CartListItem from "components/CartListItem";
import CustomAlert from "components/CustomAlert";
import CustomButton from "components/CustomButton";
import CustomHeader from "components/CustomHeader";
import DateTimePicker from "@react-native-community/datetimepicker";
import EmptyCart from "components/EmptyCart";
import PaymentMethodsOverlay from "components/PaymentMethodsOverlay";
import { SafeAreaView } from "react-native-safe-area-context";
import Section from 'components/Section'
import { SwipeListView } from "react-native-swipe-list-view";
import { format } from 'date-fns'
import { useFocusEffect } from "@react-navigation/native";

const CartScreen = ({ navigation }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isTouchable, setIsTouchable] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [editItems, setEditItems] = useState();
  const [makeNow, setMakeNow] = useState(true);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [minuteInterval, setMinuteInterval] = useState(5);
  const [isPaymentOverlayVisible, setIsPaymentOverlayVisible] = useState(false);

  const {
    state: { totalPrice, products, isLoading },
    emptyCart,
    addOneMoreProduct,
    deleteProduct,
    handleCreditCheckout,
    setLoading,
    setOrderDetails,
  } = useContext(CartContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  useFocusEffect(

    React.useCallback(() => {

      return () => {
        setIsEditMode(false);
      };
    }, [])
  );

  useEffect(() => {
    try {
      if (editItems) {
        if (isEditMode) {
          editItems.manuallyOpenAllRows(-180)
        }
        else {

          editItems.closeAllOpenRows();
        }

      }
    }
    catch (error) {
      console.log(error);
    }
    setIsTouchable(true);
  }, [isEditMode]);

  const emptyCartAlert = () => {
    CustomAlert({
      title: "רוקן הזמנה",
      message: "האם אתה בטוח?",
      canCancel: true,
      numOfButtons: 2,
      onOk: () => emptyCart(),
    });
  };

  const notLoggedInAlert = () => {
    CustomAlert({
      title: "אינך מחובר/ת",
      message: "על מנת להזמין יש להתחבר/להרשם קודם למערכת",
      canCancel: false,
      numOfButtons: 2,
      onOk: () => navigation.navigate("Auth", { screen: "PreAuth" }),
    });
  };

  const wrongWorkingHoursAlert = () => {
    CustomAlert({
      title: "שעה לא תקינה",
      message: "ניתן לבחור שעה בטווח שעות העבודה, בין 7:00 ל- 16:00",
      numOfButtons: 1,
      canCancel: true,
    });
  };

  const chooseHourAlert = () => {
    CustomAlert({
      title: "לא נבחרה שעה",
      message: "נא לבחור שעת הכנה רצויה או הכנה 'עכשיו'",
      numOfButtons: 1,
      canCancel: true,
    });
  };

  if (!totalPrice)
    return (
      <>
        <SafeAreaView style={styles.container}>
          <CustomHeader text="ההזמנה שלך" isBack={false} />
          <EmptyCart text='העגלה ריקה, הוסף מוצרים להזמנה' />
        </SafeAreaView>
      </>
    );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader text="ההזמנה שלך" isBack={false} />

      <View style={styles.container}>
        <View style={{ marginHorizontal: 10, flex: 1 }}>
          {isTouchable && (
            <View style={styles.topButtonContainer}>
              <CustomButton
                style={styles.topButton}
                numberOfLines={1}
                disabled={!isTouchable}
                title={isEditMode ? "סיום" : " עריכה"}
                onPress={() => {
                  setIsEditMode(!isEditMode);
                  setIsTouchable(false);
                }}
              />
              {isEditMode ? (
                <CustomButton
                  style={{
                    backgroundColor: "red",
                    flex: 1,
                  }}
                  title="רוקן הזמנה"
                  onPress={emptyCartAlert}
                />
              ) : null}
            </View>
          )}
          <Divider style={styles.separator} />

          <View style={styles.listContainer}>
            <Section>
              <SwipeListView
                closeOnRowOpen={false}
                closeOnScroll={false}
                closeOnRowPress={false}
                closeOnRowBeginSwipe={false}
                rightOpenValue={-180}
                ref={(ref) => setEditItems(ref)}
                previewRowKey={"0"}
                previewOpenValue={-120}
                previewOpenDelay={3000}
                disableRightSwipe
                keyExtractor={(item, index) => index.toString()}
                data={products}
                renderItem={(data, rowMap) => (
                  <View style={{ flex: 1, borderWidth: 0.5 }}>
                    <CartListItem
                      name={data.item.name ? data.item.name : null}
                      image={data.item.image ? data.item.image : null}
                      price={data.item.price ? data.item.price : null}
                      customIngredients={
                        data.item.customIngredients
                          ? data.item.customIngredients
                          : null
                      }
                    />
                  </View>
                )}
                renderHiddenItem={(rowData, rowMap) => {
                  return (
                    <Section>
                      <View style={styles.rowBack}>

                        <TouchableOpacity
                          style={styles.backRightBtn}
                          onPress={() => {
                            // console.log(
                            //   "add product id",
                            //   products.indexOf(rowData.item)
                            // );
                            addOneMoreProduct(rowData.item);
                          }}
                        >
                          <View>
                            <Icon
                              type="Ionicons"
                              name="add"
                              size={16}
                              raised
                              color="blue"
                            />
                            <TextMedium style={styles.backText}>הוסף</TextMedium>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.backRightBtn, { left: 60 }]}
                          onPress={() => {
                            navigation.navigate("EditProduct", {
                              id: products.indexOf(rowData.item),
                            });
                          }}
                        >
                          <View>
                            <Icon
                              type="AntDesign"
                              name="edit"
                              size={16}
                              raised
                              color="green"
                            />
                            <TextMedium style={styles.backText}>ערוך</TextMedium>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.backRightBtn, { left: 120 }]}
                          onPress={() => {
                            rowMap[products.indexOf(rowData.item)].closeRow()
                            deleteProduct(products.indexOf(rowData.item));
                          }}
                        >
                          <View>
                            <Icon
                              type="feather"
                              name="trash"
                              size={16}
                              raised
                              color="red"
                            />
                            <TextMedium style={styles.backText}>הסר</TextMedium>
                          </View>
                        </TouchableOpacity>

                      </View>
                    </Section>
                  );
                }}
              />
            </Section>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ flex: 0.45, flexDirection: "column", justifyContent: "center" }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          >

            <Section style={{ flex: 1 }}>
              <ScrollView  >
                <View
                  style={{
                    flex: 0.6,
                    flexDirection: "row",
                    marginBottom: 5
                  }}
                >
                  <View
                    style={{
                      flex: 0.5,
                      marginEnd: 5
                    }}
                  >
                    <Section>
                      <TextBold style={styles.noteTextLable}>הערה:</TextBold>

                      <TextInput
                        style={styles.noteText}
                        multiline={true}
                        placeholderTextColor="gray"
                        elevation={2}
                        placeholder={
                          "הערות נוספות להזמנה\n עובד צוות? ציין את מיקום המשלוח"
                        }
                        onChangeText={(text) => setOrderNote(text)}
                        value={orderNote}
                        maxLength={100}
                      />
                    </Section>
                  </View>
                  <View
                    style={{
                      flex: 0.5,
                    }}
                  >
                    <Section>
                      <TextBold style={styles.noteTextLable}>מתי להכין?</TextBold>
                      <View style={{ flexDirection: "row", flex: 1 }}>
                        <CheckBox
                          title={"עכשיו"}
                          checked={makeNow}
                          checkedColor="green"
                          textStyle={styles.noteTextLable}
                          containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
                          onPress={() => {
                            setMakeNow(true);

                            setIsTimePickerVisible(false); 
                          }}
                        />
                      </View>
                      <View style={{ flexDirection: "row", flex: 1 }}>
                        <CheckBox
                          checked={!makeNow}
                          containerStyle={{ backgroundColor: "white" }}
                          checkedColor="green"
                          onPress={() => {
                            setMakeNow(false);
                            setIsTimePickerVisible(true);
                                                   }}
                        />
                        <TouchableOpacity
                          disabled={makeNow}
                          style={{ flex: 1 }}
                          onPress={() => setIsTimePickerVisible(true)}
                        >
                          <View style={{flex:1, alignItems:'center'}}>
                          <Input
                            placeholder="בחר שעה..."
                            inputStyle={{ textAlign: "center" }}
                            value={timeString}
                            editable={false}
                            disabled={makeNow}
                          />
                          </View>
                        </TouchableOpacity>
                      </View>

                    </Section>
                  </View>
                </View>

                <View style={{ flex: 0.4, justifyContent: "flex-end", }}>
                  <Section>
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
                        }}
                        title="סיום הזמנה ותשלום"
                        onPress={() => {
                          if (!isLoading) {
                            setLoading(true);
                            if (user) {
                              if (makeNow || (!makeNow && timeString)) {
                                setIsPaymentOverlayVisible(true);
                                setOrderDetails({
                                  timeToMake: makeNow ? "עכשיו" : timeString,
                                  note: orderNote,
                                });
                              } else {
                                chooseHourAlert()
                              }
                            } else {
                              notLoggedInAlert();
                            }
                            setLoading(false);
                          }
                          //handleCheckout({products: products, timeToMake: makeNow? 'עכשיו': timeString, note: orderNote, totalPrice})
                          //setIsOverlay(true);
                          //handleCreditCheckout({products: products, timeToMake: makeNow? 'עכשיו': timeString, note: orderNote, totalPrice});
                        }}
                      />
                    </View>
                  </Section>
                </View>

                <PaymentMethodsOverlay
                  isVisible={isPaymentOverlayVisible}
                  setIsVisible={setIsPaymentOverlayVisible}
                />


              </ScrollView>
            </Section>
          </KeyboardAvoidingView>

        </View>
      </View>
      {isTimePickerVisible && (
              <DateTimePicker
                mode="time"
                is24Hour
                value={new Date()}
                minuteInterval={minuteInterval}
                onChange={(event, date) => {
                  setIsTimePickerVisible(false);
                  if (date != undefined) {
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    //const seconds = time.getSeconds();
                    if (
                      hours < 7 ||
                      hours > 16 ||
                      (hours === 16 && minutes !== 0)
                    ) {
                      wrongWorkingHoursAlert();
                    } else {
                      setTimeString(format(date, 'HH:mm'));
                    }
                  }
                  else{
                    if(!timeString)
                    {
                    setMakeNow(true);
                    }
                  }
                }}
              />
            )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  listContainer: {
    flex: 0.45,
    marginBottom: 5
  },
  buttonContainer: {
    marginHorizontal: 30,
    flex: 1,
  },
  topButton: {
    backgroundColor: "gold",
    flex: 1,
  },
  topButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginTop: 10,
    flex: 0.08,
  },
  price: {
    fontSize: 22,
    color: "tomato",
  },
  separator: {
    borderBottomColor: "midnightblue",
    borderBottomWidth: 2,
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    borderWidth: 0.5
  },
  backRightBtn: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
  },

  backText: {
    fontSize: 14,
    alignSelf: "center",
  },
  noteText: {
    fontFamily: "Heebo_500Medium",
    fontSize: 14,
    color: "black",
    alignSelf: "center",
    textAlign: "right",
    flex: 1,
    margin: 5,
    padding: 5,
    borderWidth: 1,
    textAlignVertical: "top",
    borderRadius: 3,
  },
  noteTextLable: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginHorizontal: 10,
  },
});

export default CartScreen;
