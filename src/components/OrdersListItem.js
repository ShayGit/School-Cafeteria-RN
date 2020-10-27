import React from "react";
import Section from "components/Section";
import { TextMedium } from "components/CustomText";
import { View } from "react-native";

const OrdersListItem = ({
  id,
  orderStatus,
  paymentMethod,
  confirmationNumber,
  createdAt,
  paymentStatus,
  numProducts,
  price,
}) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Section>
        <View
          style={{
            flex: 1,
            flexDirection: "row"
          }}
        >
          <View
            style={{
              flex: 0.8,
            }}
          >
            <View
              style={{
                flex: 0.1,
                flexDirection: 'row',
                justifyContent: "flex-start",
                marginTop: 5,
                marginHorizontal: 10
              }}
            >
              <TextMedium
                style={{
                  fontSize: 16,
                  color: "#333",
                }}
              >
                מזהה הזמנה :
              </TextMedium>
              <TextMedium
                style={{
                  fontSize: 14,
                  color: "gray",
                }}
              >
                {" "+id}
              </TextMedium>
            </View>

            <View
              style={{
                flex: 0.9,
                flexWrap: "wrap",
                marginBottom: 5,
                marginHorizontal: 10,
              }}
            >
              <TextMedium style={{fontSize: 14, flex:1}} >
                סטטוס הזמנה: {orderStatus}
              </TextMedium>
              <TextMedium style={{fontSize: 14, flex:1}} >
                נוצרה בתאריך: {createdAt}
              </TextMedium>
              <TextMedium style={{fontSize: 14, flex:1}} >
                כמות מוצרים: {numProducts}
              </TextMedium>
              <TextMedium style={{fontSize: 14, flex:1}} >
                מצב תשלום: {paymentStatus}
              </TextMedium>
              <TextMedium style={{fontSize: 14, flex:1}} >
                אמצעי תשלום : {paymentMethod}
              </TextMedium>
              {confirmationNumber &&
              <TextMedium style={{fontSize: 14, flex:1}} >
              מספר אישור תשלום: {confirmationNumber}
              </TextMedium>
}
              
            </View>
          </View>
        
          <View
            style={{
              flex: 0.2,
              justifyContent: "center",
              alignContent: "flex-end",
              marginEnd: 5,
            }}
          >
           
              <TextMedium
                style={{
                  fontSize: 21,
                  color: "#ef6136",
                  textAlign: "center",
                }}
              >
                {"₪ " + price}
              </TextMedium>

          </View>
        </View>
      </Section>
    </View>
  );
};

export default OrdersListItem;
