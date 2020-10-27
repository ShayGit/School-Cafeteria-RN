import { Button, Text } from "react-native-elements";
import { Dimensions, Image, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { Context as AuthContext } from "context/AuthContext";
import { Context as CartContext } from "context/CartContext";
import CustomAlert from "components/CustomAlert";
import CustomButton from "components/CustomButton";
import CustomHeader from "../../components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { storage } from "config/firebase";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [imageList, setImageList] = useState([]);
  const [isUnmounted, setIsUnmounted] = useState();
  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    state: { numOfProducts },
    emptyCart,
  } = useContext(CartContext);

  useEffect(() => {
    setIsUnmounted(false);
    const fetchImages = async () => {
      let list = [];
      const storageRef = storage.ref();
      var listRef = storageRef.child("מסך ראשי");
      try {
        const res = await listRef.listAll();
        for (let i = 0; i < res.items.length; i++) {
          const itemRef = res.items[i];

          let imgUrl = await itemRef.getDownloadURL();
          list.push({ key: imgUrl });
          // All the items under listRef.
        }
        if (!isUnmounted) {
          setImageList(list);
        }
      } catch (error) {
        console.log(error);
        // Uh-oh, an error occurred!
      }
    };
    fetchImages();

    return () => {
      setIsUnmounted(true);
    };
  }, []);

  const emptyCartAlert = () => {
    CustomAlert({
      title: "הזמנה חדשה",
      message: "יש בעגלה מוצרים, בטוח שברצונך להסירם?",
      canCancel: true,
      numOfButtons: 2,
      onOk: () => {
        emptyCart();
        navigation.navigate("Menu");
      },
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader text="קפיטריה" isBack={false} />
      <View style={styles.container}>
        <View style={styles.center}>
          <View style={styles.behind}>
            <Swiper style={styles.wrapper} height={"100%"} autoplay>
              {imageList.map((value) => (
                <View key={value} style={styles.slide1}>
                  <Image
                    resizeMode="stretch"
                    style={styles.image}
                    source={{
                      uri: value.key,
                    }}
                  />
                </View>
              ))}
            </Swiper>
          </View>
          <View
            style={{ position: "absolute", bottom: 60, flex: 1, width: "100%" }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: 15,
                justifyContent: "space-evenly",
              }}
            >
              {!user && (
                <CustomButton
                  styleTitle={{ color: "black" }}
                  style={{
                    backgroundColor: "gold",
                  }}
                  title="הירשם / התחבר"
                  onPress={() => {
                    navigation.navigate("Auth", { screen: "PreAuth" });
                  }}
                />
              )}
              <CustomButton
                styleTitle={{ color: "black" }}
                style={{
                  backgroundColor: "gold",
                }}
                title="המשך הזמנה"
                onPress={() => navigation.navigate("Menu")}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                margin: 5,
                justifyContent: "space-evenly",
              }}
            >
              <CustomButton
                styleTitle={{ color: "black" }}
                style={{
                  backgroundColor: "gold",
                }}
                title="הזמנה חדשה"
                onPress={() =>
                  numOfProducts > 0
                    ? emptyCartAlert()
                    : navigation.navigate("Menu")
                }
              />
              {user && (
                <CustomButton
                  styleTitle={{ color: "black" }}
                  style={{
                    backgroundColor: "gold",
                  }}
                  title="הזמנות קודמות"
                  onPress={() => {
                    navigation.navigate('Settings', {
                      screen: 'Settingss'
                    });
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //height: '100%',
    justifyContent: "center",
  },
  center: {
    flex: 1,
    //width: '100%',
    // height: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  behind: {
    //  alignItems: 'center',
    //   justifyContent: 'center',
    //   position: 'absolute',
    //   left: 0,
    //   top: 0,
    //   width: '100%',
    //   height: '100%',
  },
  wrapper: {},

  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  image: {
    width,
    flex: 1,
  },
});

export default HomeScreen;
