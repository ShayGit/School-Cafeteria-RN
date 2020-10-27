import {Alert} from 'react-native';
import React from "react";

const CustomAlert = ({title,message,numOfButtons,onOk, canCancel}) => {

    return (
    numOfButtons===1 ? 
    Alert.alert(
        title,
        message,
        [
          {
            text: "אישור",
            style: "cancel",
          },    
        ],
        { cancelable: canCancel }
      )
    :
    Alert.alert(
        title,
        message,
        [
          {
            text: "ביטול",
            style: "cancel",
          },
          { text: "אישור", onPress: ()=> onOk() },
        ],
        { cancelable: canCancel }
      ))
    }

    export default CustomAlert;