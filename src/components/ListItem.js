import { Image } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextMedium } from 'components/CustomText'
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";

const ListItem = ({ onItemSelect, name, image, price, description }) => {
  return (
    <TouchableOpacity  onPress={onItemSelect}>
      <View
        //elevation={2}
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "#ffffff",
          marginHorizontal: 20,
          marginVertical: 8,
          borderRadius: 4,
          shadowOpacity: 0.1,
          shadowRadius: 2,
          shadowOffset: {
            height: 1,
            width: 1,
          },
        }}
      >
        <Image
          style={{
            width: 100,
            height: 108,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 4,
          }}
          source={ image ? {uri: image} : null}
        />
        <View
          style={{
            padding: 16,
            justifyContent: description? null:  'center',
            flex:2,
            alignItems: 'flex-start'

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

          {description ? (
            <TextMedium 
              style={{
                fontSize: 16,
                color: "#999"
              }}
            >
              {description}
            </TextMedium>
          ) : null}
          </View>  
       
         
            <View
              style={{
                flex: 1,
                justifyContent:'center',
                alignContent:'flex-end',
                marginEnd: 15
                //width: "100%"
              }}
            >
                 {price ? (
              <TextMedium
                style={{
                  fontSize: 21,
                  textAlign: "right",
                  color: "#ef6136",
                }}
              >
                {'₪ ' +price  }
              </TextMedium>
               ) : 
               <Ionicons
               name="ios-arrow-back"
               size={30}
               color="black"
               style={{ alignContent: 'flex-end'}}/>
               }
            </View>
        </View>

    </TouchableOpacity>
  );
};

export default ListItem;
