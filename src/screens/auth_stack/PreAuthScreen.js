import { StyleSheet, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import CustomButton from 'components/CustomButton';
import CustomHeader from "../../components/CustomHeader";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const PreAuthScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader text="קפיטריה" isBack={navigation.canGoBack()} />
      <View style={styles.container}>
        <View>
          <AntDesign name="user" style={{fontSize: 70, alignSelf: 'center'}}/>
          <CustomButton style={styles.button}
           title="לקוח קיים - התחברות"
           onPress={()=>navigation.navigate('Signin')} />
        </View>

        <View>
          <AntDesign name="adduser" style={{fontSize: 70, alignSelf: 'center'}}/>
          <CustomButton style={styles.button} title="לקוח חדש? הירשם עכשיו!"
          onPress={()=>navigation.navigate('Signup')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
  button: {
    height: 50,
    width: 200,
  },
});

export default PreAuthScreen;
