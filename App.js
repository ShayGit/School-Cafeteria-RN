import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Heebo_300Light,
  Heebo_400Regular,
  Heebo_500Medium,
  Heebo_700Bold,
  useFonts,
} from "@expo-google-fonts/heebo";
import React, { useContext } from "react";
import { isReadyRef, navigationRef } from "./src/components/RootNavigation";

import { Context as AuthContext } from "./src/context/AuthContext";
import { Provider as AuthContextProvider } from "./src/context/AuthContext";
import { Provider as CartContextProvider } from "./src/context/CartContext";
import CartScreen from "./src/screens/tab_navigator/cart/CartScreen";
import CategoryScreen from "./src/screens/tab_navigator/menu/CategoryScreen";
import CheckoutScreen from "./src/screens/tab_navigator/cart/CheckoutScreen";
import CheckoutWebViewScreen from "./src/screens/tab_navigator/cart/CheckoutWebviewScreen";
import ContactScreen from "./src/screens/tab_navigator/settings/ContactScreen";
import CustomIcon from "components/CustomIcon";
import EditProductScreen from "./src/screens/tab_navigator/cart/EditProductScreen";
import EditUserInfoScreen from "./src/screens/tab_navigator/settings/user_information/EditUserInfoScreen";
import ForgotPasswordScreen from "./src/screens/auth_stack/ForgotPasswordScreen";
import HomeScreen from "./src/screens/tab_navigator/HomeScreen";
import { I18nManager } from "react-native";
import { Icon } from "react-native-elements";
import IconWithBadge from "./src/components/IconWithBadge";
import { Provider as MenuContextProvider } from "./src/context/MenuContext";
import MyOrdersScreen from "./src/screens/tab_navigator/settings/MyOrdersScreen";
import { NavigationContainer } from "@react-navigation/native";
import OrderPlacedScreen from "./src/screens/tab_navigator/cart/OrderPlacedScreen";
import { Provider as OrdersContextProvider } from "./src/context/OrdersContext";
import PaymentOptionsScreen from "./src/screens/tab_navigator/settings/PaymentOptionsScreen";
import PhoneVerifyScreen from "./src/screens/auth_stack/PhoneVerifyScreen";
import PreAuthScreen from "./src/screens/auth_stack/PreAuthScreen";
import ProductScreen from "./src/screens/tab_navigator/menu/ProductScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SettingsScreen from "./src/screens/tab_navigator/settings/SettingsScreen";
import ShareScreen from "./src/screens/tab_navigator/settings/ShareScreen";
import SigninScreen from "./src/screens/auth_stack/SigninScreen";
import SignupScreen from "./src/screens/auth_stack/SignupScreen";
import SplashScreen from "./src/screens/SplashScreen";
import TermsOfServiceScreen from "./src/screens/tab_navigator/settings/TermsOfServiceScreen";
import { Text } from "react-native";
import UserInformationScreen from "./src/screens/tab_navigator/settings/user_information/UserInformationScreen";
import { YellowBox } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { registerCustomIconType } from "react-native-elements";

console.ignoredYellowBox = ["Setting a timer"];
YellowBox.ignoreWarnings(["Setting a timer"]);

I18nManager.forceRTL(true);

// const AuthStackScreen = ({ route }) => {
//   console.log(route);

//   const { isPasswordAuth } = route.params;
//   const { isPhoneAuth } = route.params;

//   console.log("this", isPasswordAuth, isPhoneAuth);
//   return (
//     <AuthStack.Navigator headerMode="none">
//       {isPasswordAuth && !isPhoneAuth ? (
//         <AuthStack.Screen name="PhoneVerify" component={PhoneVerifyScreen} />
//       ) : isPhoneAuth && !isPasswordAuth ? (
//         <AuthStack.Screen name="Signin" component={SigninScreen} />
//       ) : !isPasswordAuth && !isPhoneAuth ? (
//         <>
//           <AuthStack.Screen name="PreAuth" component={PreAuthScreen} />
//           <AuthStack.Screen name="Signup" component={SignupScreen} />
//           <AuthStack.Screen name="Signin" component={SigninScreen} />
//           <AuthStack.Screen name="PhoneVerify" component={PhoneVerifyScreen} />
//           <AuthStack.Screen
//             name="ForgotPassword"
//             component={ForgotPasswordScreen}
//           />
//         </>
//       ) : null}
//     </AuthStack.Navigator>
//   );
// };

const Tab = createBottomTabNavigator();

function TabNavigatorScreen() {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="Home"
      labelStyle={{ fontFamily: "Heebo_400Regular" }}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ fontFamily: "Heebo_400Regular", color: color }}>
              ראשי
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuStackScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ fontFamily: "Heebo_400Regular", color: color }}>
              תפריט
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={OrderStackScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ fontFamily: "Heebo_400Regular", color: color }}>
              ההזמנה שלך
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <IconWithBadge name="shoppingcart" color={color} size={size} />
            //<AntDesign name="shoppingcart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <Text style={{ fontFamily: "Heebo_400Regular", color: color }}>
              אזור אישי
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          )
        }
        }
        
      />
    </Tab.Navigator>
  );
}

const MenuStack = createStackNavigator();
function MenuStackScreen() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        name="Category"
        component={CategoryScreen}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        name="Product"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
    </MenuStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator
      backBehavior="initialRoute"
      initialRouteName="Settingss"
    >
      <SettingsStack.Screen
        name="Settingss"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name="UserInformation"
        component={UserInformationStackScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name="MyOrders"
        component={MyOrdersScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name="PaymentOptions"
        component={PaymentOptionsScreen}
      />
      <SettingsStack.Screen name="Contact" component={ContactScreen} />
      <SettingsStack.Screen name="Share" component={ShareScreen} />
      <SettingsStack.Screen
        name="TermsOfService"
        component={TermsOfServiceScreen}
      />
    </SettingsStack.Navigator>
  );
}

const UserInfoStack = createStackNavigator();
function UserInformationStackScreen() {
  return (
    <UserInfoStack.Navigator>
      <UserInfoStack.Screen
        name="UserInformation"
        component={UserInformationScreen}
        options={{ headerShown: false }}
      />
      <UserInfoStack.Screen
        name="EditUserInfo"
        component={EditUserInfoScreen}
        options={{ headerShown: false }}
      />
    </UserInfoStack.Navigator>
  );
}

const OrderStack = createStackNavigator();
function OrderStackScreen() {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <OrderStack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={{ headerShown: false }}
      />
      <OrderStack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ headerShown: false }}
      />
      <OrderStack.Screen
        name="CheckoutWebView"
        component={CheckoutWebViewScreen}
        options={{ headerShown: false }}
      />
      <OrderStack.Screen
        name="OrderPlaced"
        component={OrderPlacedScreen}
        options={{ headerShown: false }}
      />
    </OrderStack.Navigator>
  );
}
const ContainerStack = createStackNavigator();
const AuthStack = createStackNavigator();

const App = () => {
  const [loaded, error] = useFonts({
    Heebo_300Light,
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_700Bold,
  });
  const {
    state: {
      isAuth: { isPasswordAuth, isPhoneAuth },
      isLoading,
    },
  } = useContext(AuthContext);

  React.useEffect(() => {
    registerCustomIconType("TermsOfUse", CustomIcon);

    return () => {
      isReadyRef.current = false;
    };
  }, []);


  return (
    <SafeAreaProvider>
      <NavigationContainer
        initialRouteName="MainTab"
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}
      >
        <ContainerStack.Navigator headerMode="none" animation="fade">
          {isLoading || !loaded || isReadyRef.current == false ? (
            <ContainerStack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              {isPasswordAuth && isPhoneAuth ? (
                <ContainerStack.Screen
                  name="MainTab"
                  component={TabNavigatorScreen}
                  options={{ headerShown: false }}
                />
              ) : isPasswordAuth || isPhoneAuth ? (
                <ContainerStack.Screen
                  name="Auth"
                  options={{ headerShown: false }}
                >
                  {() => (
                    <AuthStack.Navigator headerMode="none">
                      {!isPasswordAuth && isPhoneAuth ? (
                        <AuthStack.Screen
                          name="Signin"
                          component={SigninScreen}
                        />
                      ) : isPasswordAuth && !isPhoneAuth ? (
                        <AuthStack.Screen
                          name="PhoneVerify"
                          component={PhoneVerifyScreen}
                        />
                      ) : null}
                    </AuthStack.Navigator>
                  )}
                </ContainerStack.Screen>
              ) : !isPasswordAuth && !isPhoneAuth ? (
                <>
                <ContainerStack.Screen
                  name="MainTab"
                  component={TabNavigatorScreen}
                  options={{ headerShown: false }}
                />
                <ContainerStack.Screen
                  name="Auth"
                  options={{ headerShown: false }}
                >
                  {() => (
                    <AuthStack.Navigator headerMode="none">
                      <>
                        <AuthStack.Screen
                          name="PhoneVerify"
                          component={PhoneVerifyScreen}
                        />
                        <AuthStack.Screen
                          name="Signin"
                          component={SigninScreen}
                        />
                        <AuthStack.Screen
                          name="PreAuth"
                          component={PreAuthScreen}
                        />
                        <AuthStack.Screen
                          name="Signup"
                          component={SignupScreen}
                        />
                        <AuthStack.Screen
                          name="ForgotPassword"
                          component={ForgotPasswordScreen}
                        />
                      </>
                    </AuthStack.Navigator>
                  )}
                </ContainerStack.Screen>
             </>
              ) : null}
            </>
          )}
        </ContainerStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const AppWrapper = () => {
  return (
    <OrdersContextProvider>
      <CartContextProvider>
        <MenuContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </MenuContextProvider>
      </CartContextProvider>
    </OrdersContextProvider>
  );
};

export default AppWrapper;
