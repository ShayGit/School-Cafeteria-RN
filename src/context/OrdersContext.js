import { format, parseISO } from "date-fns";

import { Alert } from "react-native";
import createDataContext from "./createDataContext";
import deepDiffer from 'react-native/Libraries/Utilities/differ/deepDiffer'
import serverApi from "../api/server";

const ordersReducer = (state, action) => {
  switch (action.type) {
    case "set_loading": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case "set_last_orders": {
      return {
        ...state,
        orders: [...action.payload],
      };
    }
    case "set_order_to_show": {
      const orders = state.orders;
      const orderToShow = orders.find((order) => order.id === action.payload);
      return {
        ...state,
        orderToShow: { ...orderToShow },
      };
    }
    case "set_order_overlay_visible": {
      return {
        ...state,
        isOrderOverlay: action.payload,
      };
    }
    case "reset": {
      return  {
        orders: [],
        isLoading: false,
        isOrderOverlay: false,
        orderToShow: {},
      };
    }
    case "update_orders": {
      const ordersTemp = [...state.orders];
      const querySnapshot = action.payload;
      querySnapshot.docChanges().forEach((change) => {
        const order = change.doc.data();
        const index = ordersTemp.findIndex(
          (order) => order.id === change.doc.id,
        );
       
        
        const orderObj = {
          ...order,
          id: change.doc.id,
          createdAt: format(order.createdAt.toDate(), "dd/MM/yyy HH:mm"),
          timeToMake:
            order.timeToMake === "עכשיו"
              ? order.timeToMake
              : format(order.timeToMake.toDate(), "HH:mm"),
        };

      
  

        //console.log(change.doc.id, order.createdAt)
        if (change.type === "added") {
          //console.log('added');
          if (index === -1 && ordersTemp.length == 20) {
            ordersTemp.unshift(orderObj);
            ordersTemp.pop();
          }else if(index === -1 && ordersTemp.length < 20){
            ordersTemp.unshift(orderObj);
          }
          else{
            if(deepDiffer( ordersTemp[index], orderObj)){
              ordersTemp[index] = orderObj;
            }

          }
        }
        if (change.type === "modified") {
          //console.log('modified');

          if (index !== -1) {
            ordersTemp[index] = orderObj;
          }
        }
      });
      return {
        ...state,
        orders: [...ordersTemp],
      };
    }
    default:
      return state;
  }
};

const getOrder = (dispatch) => async ({ orderId }) => {
  //console.log(orderId);
  const order = await serverApi.get(`/orders/${orderId}`);
  const orderData = order.data;
  const orderObj = {...orderData,
    createdAt: format(parseISO(orderData.createdAt), "dd/MM/yyy HH:mm"),
          timeToMake:
          orderData.timeToMake === "עכשיו"
              ? orderData.timeToMake
              : format(parseISO(orderData.timeToMake), "HH:mm")
    }
  return orderObj;
};

const updateOrders = (dispatch) => async (querySnapshot) => {
  dispatch({ type: "update_orders", payload: querySnapshot });
};
const reset = (dispatch) => async () => {
  dispatch({ type: "reset"});
};

const getLastOrders = (dispatch) => async () => {
  try {
    dispatch({ type: "set_loading", payload: true });
    let orders =[];
    const res = await serverApi.get("/getLastOrders");
    res.data.forEach((order) =>{
      //console.log (order.createdAt)
      orders.push({ ...order, 
        createdAt: format(parseISO(order.createdAt), "dd/MM/yyy HH:mm"),
          timeToMake:
            order.timeToMake === "עכשיו"
              ? order.timeToMake
              : format(parseISO(order.timeToMake), "HH:mm")
      })
    })

    dispatch({ type: "set_last_orders", payload: orders });
    dispatch({ type: "set_loading", payload: false });
  } catch (error) {
    console.log(error);
    Alert.alert(error.message);
    dispatch({ type: "set_loading", payload: false });
  }
};

const setLoading = (dispatch) => (isLoading) => {
  dispatch({ type: "set_loading", payload: isLoading });
};

const setOrderToShow = (dispatch) => (orderId) => {
  dispatch({ type: "set_order_to_show", payload: orderId });
  dispatch({ type: "set_order_overlay_visible", payload: true });
};

const setOrderOverlayVisible = (dispatch) => (isVisible) => {
  dispatch({ type: "set_order_overlay_visible", payload: isVisible });
};

export const { Provider, Context } = createDataContext(
  ordersReducer,
  {
    setLoading,
    getOrder,
    getLastOrders,
    setOrderToShow,
    setOrderOverlayVisible,
    updateOrders,
    reset
  },
  {
    orders: [],
    isLoading: false,
    isOrderOverlay: false,
    orderToShow: {},
  }
);
