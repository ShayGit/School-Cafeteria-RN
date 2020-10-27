import OrderSummary from "./OrderSummary";
import { Overlay } from "react-native-elements";
import React from "react";

const OrderSummaryOverlay = ({ isVisible, setIsVisible, totalPrice, note, timeToMake, products, paymentMethod, isStuff}) => {
  

  return (
    <Overlay
    overlayStyle={{alignSelf: "stretch", margin: 20, maxHeight:550, flex: 1 }}
      isVisible={isVisible}
      animationType="fade"
      onBackdropPress={() => {
        setIsVisible(false);
      }}
    >
      
        <OrderSummary totalPrice={totalPrice} note={note} timeToMake={timeToMake} products={products} paymentMethod={paymentMethod} isStuff={isStuff} />
    </Overlay>
  );
};

export default OrderSummaryOverlay;
