import {
  CheckBox,
  Divider,
  Image,
} from "react-native-elements";
import { FlatList, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import {TextBold, TextMedium} from 'components/CustomText';

import AddProductOverlay from "components/AddProductOverlay";
import {Context as CartContext} from "context/CartContext"
import CustomButton from 'components/CustomButton'
import CustomHeader from "components/CustomHeader";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

const ProductScreen = ({ route, navigation }) => {
  const product = route.params.product;

  const { addToCart }  = useContext(CartContext);

  useFocusEffect(
    React.useCallback(() => {
      const parent = navigation.dangerouslyGetParent();
      parent.setOptions({
        tabBarVisible: false,
      });

      return () =>
        parent.setOptions({
          tabBarVisible: true,
        });
    }, [])
  );
  
const [customIngredients, setCustomIngredients] = useState(product.customIngredients);
const [addProductPressed, setAddProductPressed] = useState(false);
const [isOverlay, setIsOverlay] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader text={""} isBack={navigation.canGoBack()} />
      <AddProductOverlay isVisible ={isOverlay} setVisible={setIsOverlay}/>
      <View style={styles.container}>

        <View style={{ flex: 7, justifyContent: "flex-start" }}>
          <View
            style={{ alignItems: "flex-start",  marginTop: 10 }}
          >
            <TextBold style={styles.name}>{product.name}</TextBold>
          </View>
          <Divider style={styles.separator} />
          <View style={{ alignItems: "flex-start", }}>
            <TextMedium style={styles.description}>{product.description} </TextMedium>
          </View>
          <View style={{ alignItems: "center" }}>
            <Image
              style={styles.productImg}
              source={product.image ? { uri: product.image } : null}
            />
          </View>
          {product.customIngredients ? (
            <View style={{flex: 1, marginTop: 10, marginHorizontal: 20}}>
              <FlatList
              scrollEnabled={true}
              horizontal={false}
              numColumns={3}
                data={customIngredients}
                keyExtractor={(item, index) =>
                  customIngredients.indexOf(item).toString()
                }
                renderItem={({ item, index }) => {
                  return (
                    <View >
                      <CheckBox
                        title={item.name}
                        checked={item.isChecked}
                        onPress={() =>{
                          const newArray = [...customIngredients]
                          newArray[index] = {name: item.name, isChecked: !item.isChecked}
                          setCustomIngredients(newArray)}}
                      />
                    </View>
                  );
                }}
              />
            </View>
          ) : null}
        </View>

        <View style={{ flex: 2, justifyContent: "flex-end" }}>
          <View style={{ alignItems: "center" }}>
            <TextMedium style={styles.price}>{"₪ " + product.price}</TextMedium>
          </View>
          <Divider style={styles.separator} />
          <View style={styles.addToCarContainer}>
            <CustomButton 
              style={{ backgroundColor: "dodgerblue"}}
              styleTitle={{fontSize: 20}}
              title="הוספה להזמנה"
              icon={<Ionicons style={{marginHorizontal: 5}} name="ios-add-circle-outline" size={24} color="white" />}
              onPress={() => {
                if(!addProductPressed)
                {
                  setAddProductPressed(true);
                addToCart(product, customIngredients)
              setIsOverlay(true)}}
                }
                
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productImg: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 28,
    marginHorizontal: 30,
  },
  price: {
    fontSize: 22,
    color: "tomato",
  },
  description: {
    marginBottom: 10,
    color: "#696969",
    marginHorizontal: 30,
  },
  addToCarContainer: {
    marginHorizontal: 30,
    marginBottom: 20,
    marginTop: 5,
  },
  separator: {
    borderBottomColor: "midnightblue",
    borderBottomWidth: 2,
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 5,
  },
});
export default ProductScreen;
