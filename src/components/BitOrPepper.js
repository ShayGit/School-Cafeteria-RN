import React, { useContext, useState } from "react";
import { TextBold, TextMedium, TextRegular } from "components/CustomText";

import { Context as CartContext } from "context/CartContext";
import {Input} from "react-native-elements";
import { View } from "react-native";

const BitOrPepper = ({paymentMethod, confirmationNumber, setConfirmationNumber})=> {
    const {
        state: { totalPrice },
      } = useContext(CartContext);

      const [errorMessage, setErrorMessage] = useState('');

      return(
<>
                <TextMedium style={{ fontSize: 15 }}>
                  {" "}
                  על מנת לשלם ב- {paymentMethod} פעל על פי ההנחיות הבאות:
                </TextMedium>
                <TextMedium style={{ fontSize: 15 }}>
                  {"\t"}
                  1. העתק את פרטי איש הקשר המופיעים מטה והוסף {'\n\t\t\t'}לאנשי הקשר שלך.
                </TextMedium>          
                <TextMedium style={{ fontSize: 15 }}>
                {"\t"}
                  2. העבר את סכום ההזמנה על סך - {totalPrice} ש"ח לאיש {'\n\t\t'} הקשר שיצרת דרך אפליקציית {paymentMethod}.
                </TextMedium>
                <TextMedium style={{ fontSize: 15 }}>
                {"\t"}
                  3. בסיום התשלום באפליקציית {paymentMethod} יופיע עבורך
                  </TextMedium>
                  {paymentMethod === "bit" ? (
                  <TextMedium style={{ fontSize: 15 }}>
                      {'\t\t\t'}
                  מספר אישור,
                  </TextMedium>
                  ) : (
                  <TextMedium style={{ fontSize: 15 }}>
                      {'\t\t\t'}
                  מספר פעולה, 
                  </TextMedium>
                  )}
                  <TextMedium style={{ fontSize: 15 }}>
                  {'\t\t\t'}
                  הקלד מספר זה בתיבה המופיעה מטה לצורך {'\n\t\t\t'} אימות ההזמנה.
                  </TextMedium>

                <TextMedium style={{ fontSize: 15 }}>
                {"\t"}
                  4. הגיעו בשעה שקבעתם ואספו את ההזמנה :)
                </TextMedium>

                <View style={{ marginTop: 10 }}>
                    <View style={{ borderWidth: 1, padding: 5 }}>
                  <TextMedium> איש קשר לשליחה:</TextMedium>
                  <View style={{ flexDirection: "row" }}>
                    <TextMedium style={{ fontSize: 16 }}>
                      {" "}
                      שם:{"  "}{" "}
                    </TextMedium>
                    <TextRegular
                      style={{ fontSize: 15, backgroundColor: "lightgray" }}
                      selectable
                    >
                      קפיטריית בית ספר{" "}
                    </TextRegular>
                    <TextMedium style={{ fontSize: 16 }}>
                      {"  "} מס' נייד:{"  "}{" "}
                    </TextMedium>
                    <TextRegular
                      style={{ fontSize: 15, backgroundColor: "lightgray" }}
                      selectable
                    >
                      0529999999{" "}
                    </TextRegular>
                  </View>
                  </View>
                  {paymentMethod==='bit' ? (
                  <View style={{marginTop: 5}}>
                  <TextBold> מספר אישור העברה:</TextBold>
                  <View style={{ flexDirection: "row" }}>
                    <Input
                    
                      placeholder="מספר אישור"
                      inputStyle={{ textAlign: "center" }}
                      value={confirmationNumber}
                      onChangeText={(value) => {
                        setConfirmationNumber(value);
                        if(!value) {
                            setErrorMessage('שדה זה לא יכול להשאר ריק')
                        }
                        else{
                          setErrorMessage('');
                        }
                      } 
                    }
                    errorMessage={errorMessage}
                      editable={true}
                    />
                    </View>
                  </View>
                  ):(
                    <View style={{marginTop: 5}}>
                    <TextBold> מספר פעולה:</TextBold>
                    <View style={{ flexDirection: "row" }}>
                      <Input
                        placeholder="מספר פעולה"
                        inputStyle={{ textAlign: "center" }}
                        value={confirmationNumber}
                        onChangeText={(value) => {
                          setConfirmationNumber(value);
                          if(!value) {
                              setErrorMessage('שדה זה לא יכול להשאר ריק')
                          }
                          else{
                            setErrorMessage('');
                          }
                        } 
                      }
                      errorMessage={errorMessage}
                        editable={true}
                      />
                      </View>
                    </View> 
                  )}       
                </View>
              </>
      )
}

export default BitOrPepper;