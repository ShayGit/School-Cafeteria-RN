import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { TextBold, TextMedium } from "./CustomText";

import CartListItem from "./CartListItem";
import { CheckBox } from "react-native-elements";
import React from "react";
import Section from "./Section";

const OrderSummary = ({ totalPrice,note,timeToMake, products, paymentMethod, isStuff }) => {

  return (
    <View style={styles.container}>
      <View style={{flex:0.6, maxHeight: 270}}>
      <Section >
        <FlatList
          data={products}
          nestedScrollEnabled = {true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View  style={{  flex: 1, borderWidth: 0.5}}>
            <CartListItem
              name={item.name ? item.name : null}
              image={item.image ? item.image : null}
              price={item.price ? item.price : null}
              customIngredients={
                item.customIngredients ? item.customIngredients : null
              }
            />
            </View>
          )}
        />
     </Section>
     </View>

<View style={{flex:0.4, marginTop: 10}}>
     <Section >
     <View style={{flex:1, margin: 10}}>
      <View
       style={{
        flex: 0.5,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {note!=='' && 
        <View
          style={{
            flex: 0.5,
            borderWidth: 0.5,
            justifyContent:'center',
            alignItems:'center',
          }}
        >
          <TextBold style={styles.noteTextLable}>הערות:</TextBold>
          <TextInput
            style={styles.noteText}
            multiline={true}
            placeholderTextColor="gray"
            value={note}
            maxLength={100}

          />
        </View>
}
        <View
          style={{
            flex: 0.5,
            borderWidth: 0.5,
            justifyContent:'center',
            alignItems:'center'
          }}
        >
          <TextBold style={{fontSize: 16,alignSelf: "center"}}>מתי להכין?</TextBold>
          <TextMedium style={{textAlign: 'center'}}>{timeToMake}</TextMedium>
        </View>
      </View>
      <View
        style={{
          marginTop: 5,
          flex: 0.5,
          alignItems:'center',
          justifyContent: 'space-evenly',
          alignContent:'stretch',
        }}
      >
        {isStuff &&
         <CheckBox
                title={"עובד צוות"}
                checked={true}
                checkedColor="green"
                textStyle={styles.noteTextLable}
                containerStyle={{ backgroundColor: "white", borderWidth:0 }}

              />
        }
         <TextMedium style={{ fontSize: 20}}>
              אמצעי תשלום: {paymentMethod}
            </TextMedium>
        <TextMedium style={styles.price}>
          {'סה"כ: ' + totalPrice + " ₪"}
        </TextMedium>
      </View>
      </View>
      </Section>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    marginHorizontal: 5
  },
  noteText: {
    fontFamily: "Heebo_500Medium",
    fontSize: 14,
    color: "black",
    alignSelf: "center",
    textAlign: "right",
    textAlignVertical: "top",
    flex: 0.5
  },
  noteTextLable: {
    fontSize: 16,
    alignSelf: "center",
flex: 0.5
  },
  price: {
    fontSize: 22,
    color: "tomato",
    marginBottom: 5,
  },
  noteTextLable: {
    fontSize: 16,
    fontFamily:'Heebo_500Medium'
  },
});

export default OrderSummary;