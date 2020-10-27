import { Alert } from "react-native";
import createDataContext from "./createDataContext";
import firebase from "../config/firebase";
import { firestore } from "../config/firebase";
import { navigate } from "../components/RootNavigation";
import { parse } from "date-fns";
import serverApi from '../api/server'

const cartReducer = (state, action) => {
  switch (action.type) {
    case "add_to_cart":
  {
      return {
        ...state,
        products: [...state.products, action.payload],
        numOfProducts: state.numOfProducts + 1,
        totalPrice: state.totalPrice + action.payload.price,
      };
    }
    case "delete_product": {
      const id = action.payload;
      const productsTemp = state.products;
      const productPrice = productsTemp[id].price;
      if (id > -1) {
        productsTemp.splice(id, 1);
        return {
          ...state,
          products: productsTemp,
          numOfProducts: state.numOfProducts - 1,
          totalPrice: state.totalPrice - productPrice,
        };
      }
      return state;
    }
    case "empty_cart":
      {
      return {
        ...state,
        products: [],
        numOfProducts: 0,
        totalPrice: 0,
        isLoading: false,
        timeToMake: "",
    note: "",
      };
    }
    case "save_product_edit": {
      const productsTemp = state.products;
      if (action.payload.customIngredients) {
        productsTemp[action.payload.id].customIngredients =
          action.payload.customIngredients;
      }
      return {
        ...state,
        products: productsTemp,
      };
    }
    case "set_loading": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case 'order_details': {
      return {
        ...state,
        timeToMake: action.payload.timeToMake, 
        note: action.payload.note
      }
    }
    default:
      return state;
  }
};

const addToCart = (dispatch) => (product, customIngredients) => {
  const tempProduct = { ...product };
  if (customIngredients) {
    tempProduct.customIngredients = customIngredients.slice();
  }
  dispatch({ type: "add_to_cart", payload: tempProduct });
};

const saveProductEdit = (dispatch) => (id, customIngredients) => {
  //console.log(' save product id', id)
  dispatch({ type: "save_product_edit", payload: { id, customIngredients } });
  Alert.alert(
    "",
    "השינויים נשמרו בהצלחה",
    [{ text: "אישור", onPress: () => {} }],
    { cancelable: true }
  );
};

const addOneMoreProduct = (dispatch) => (product) => {
  const tempProduct = { ...product };
    dispatch({ type: "add_to_cart", payload: tempProduct });
};

const deleteProduct = (dispatch) => (id) => {
  //console.log(' delete product id', id)
  dispatch({ type: "delete_product", payload: id });
};

const emptyCart = (dispatch) => () => {
  dispatch({ type: "empty_cart" });
};

const handleCheckout = (dispatch) => async ({products, timeToMake, note, totalPrice, paymentMethod, confirmationNumber}) => {
  try{
    dispatch({ type: "set_loading", payload: true });

    const timeToMakeDB =
    timeToMake === "עכשיו"
      ? timeToMake
      : parse(timeToMake, "HH:mm", new Date());

  const orderDetailsId =  await firestore
  .collection("order_details").add({
    products: products,
    timeToMake: timeToMakeDB,
    createdAt: new Date(),
    note: note,
    totalPrice: totalPrice,
    confirmationNumber: confirmationNumber? confirmationNumber: null,
    paymentMethod: paymentMethod
  })
  //console.log('userId', firebase.auth().currentUser.uid, 'orderDetails', orderDetailsId.id);
  
  const res = await serverApi.post('/checkout', {
    orderDetailsId: orderDetailsId.id
  });

  dispatch({ type: "empty_cart" });
  dispatch({ type: "set_loading", payload: false });
  //popToTop();
  navigate('OrderPlaced',{orderId: res.data.orderId});
 
 
}
catch (error) {
  console.log(error);
  Alert.alert(error.message);
}}

const handleCreditCheckout  = (dispatch) => async ({products, timeToMake, note, totalPrice, paymentMethod, confirmationNumber}) => {
  try{
    dispatch({ type: "set_loading", payload: true });

    const timeToMakeDB =
    timeToMake === "עכשיו"
      ? timeToMake
      : parse(timeToMake, "HH:mm", new Date());

  const orderDetailsId =  await firestore
  .collection("order_details").add({
    products: products,
    timeToMake: timeToMakeDB,
    createdAt: new Date(),
    note: note,
    totalPrice: totalPrice,
    confirmationNumber: confirmationNumber? confirmationNumber: null,
    paymentMethod: paymentMethod
  })
  //console.log( 'orderDetails', orderDetailsId.id);
  
 
  const res = await serverApi.post('/creditCheckout', {
    orderDetailsId: orderDetailsId.id
  });
  //console.log( res.data);
  dispatch({ type: "set_loading", payload: false });


  navigate('CheckoutWebView', {bluesnapToken: res.data.bluesnapToken, orderId: res.data.orderId});
}
catch(err) {
console.log(err);
Alert.alert(err.message);
}
}

const setOrderDetails = (dispatch) => ({timeToMake, note}) => {
  dispatch({type:'order_details', payload:{timeToMake,note}})
}
const setLoading = (dispatch) => (isLoading) => {
  dispatch({type:'set_loading', payload: isLoading});
}

export const { Provider, Context } = createDataContext(
  cartReducer,
  {
    addToCart,
    emptyCart,
    saveProductEdit,
    addOneMoreProduct,
    deleteProduct,
    setLoading,
    handleCheckout,
    handleCreditCheckout,
    setOrderDetails
  },
  {
    products: [],
    isLoading: false,
    timeToMake: "",
    note: "",
    totalPrice: 0,
    numOfProducts: 0,
    //status, date, user, order number
  }
);
