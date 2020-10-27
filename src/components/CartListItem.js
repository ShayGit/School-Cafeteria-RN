import { FlatList, ScrollView, View } from "react-native";
import { Icon, Image, } from "react-native-elements";

import React from "react";
import Section from "components/Section";
import {TextMedium} from 'components/CustomText'

const CartListItem = ({ name, image, price, customIngredients }) => {
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
          height: 90,
          flexDirection: "row",
        }}
      >
       
        
        <Image
          style={{
            height: 90,
            width: 100,
            justifyContent: 'flex-start',
          }}
          source={image ? { uri: image } : null}
        />
        
        <View
          style={{
            padding: 10,
            justifyContent: customIngredients ? null : "center",
            flex: 3,
            alignItems: "flex-start",
          }}
        >
          <TextMedium
            style={{
              fontSize: 20,
              color: "#333",
            }}
          >
            {name}
          </TextMedium>

          {customIngredients ? (
            <ScrollView     
           nestedScrollEnabled = {true} style={{alignSelf:'stretch'}}>
            <FlatList
            style={{margin: 2}}
            numColumns={2}
            nestedScrollEnabled = {true}
              data={customIngredients}
              keyExtractor={(item, index) =>
                customIngredients.indexOf(item).toString()
              }
              renderItem={({ item, index }) => {
                return (
                  item.isChecked && (
                    <View style={{ flexDirection: "row" }}>
                      <Icon
                        type="AntDesign"
                        name="check"
                        size={18}
                        color="green"
                      />
                      <TextMedium
                        style={{
                          fontSize: 14,
                          color: "#999",
                        }}
                      >
                        {item.name}
                      </TextMedium>
                    </View>
                  )
                );
              }}
            />
            </ScrollView>
          ) : null}
        </View>

        <View
          style={{
            flex: 1.2,
            marginEnd: 5,
            alignItems:'center',
          justifyContent: 'center',
          alignContent:'stretch',
            //width: "100%"
          }}
        >
          {price &&
            <TextMedium
              style={{
                fontSize: 21,
                color: "#ef6136",
              }}
            >
              {"₪ " + price}
            </TextMedium>
          }
        </View>
       
      </View>
      </Section>
    </View>
  );
};

export default CartListItem;
