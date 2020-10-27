import {Button} from 'react-native-elements';
import React from "react";
import {StyleSheet} from 'react-native'

const CustomButton = (props) => {
return(
    <Button 
    buttonStyle={[styles.button, props.style]}
    titleStyle={[styles.buttonText,props.styleTitle]}
    {...props}      
    >
    </Button>
)
}
const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",   
        borderRadius: 30,
      },
      buttonText: {
        fontFamily: "Heebo_500Medium",
        color: "#FFFFFF",
        fontSize: 18,
      }
})

export default CustomButton;