import { Alert, AsyncStorage } from "react-native";

import createDataContext from "./createDataContext";
import firebase from "../config/firebase";
import { firestore } from "../config/firebase";
import { navigate } from "../components/RootNavigation";

const authReducer = (state, action) => {
  switch (action.type) {
    case "set_authenticated":{
      return { ...state, isAuth: action.payload };
    }
    case "set_loading":
      {
        return { ...state, isLoading: action.payload };}
    case "signin":
      { 
        return { ...state, errorMessage: "", user: action.payload };}
    case "signout":
      {
        return { ...state, errorMessage: "", user: null };
      }
    case "set_verificationId":
      {
        return { ...state, phoneVerificationId: action.payload };
      }
    case "set_user":
      {
        return { ...state, user: action.payload };
      }
    case "add_error":
      {
        return { ...state, errorMessage: action.payload };
      }
    case "clear_error_message":
      {
      return { ...state, errorMessage: "" };
    }
    case "set_update_phone_code_sent":
      {
        return { ...state, isUpdatePhoneCodeSent: action.payload };
      }
    // case "loading":
    //   return { ...state, isLoading: true };
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch("clear_error_message" );
  console.log("clearing error message");
  
};

const setUser = (dispatch) => async (currentUser) => {
  console.log("Set user");
  try {
    let user = null;
    const userFromStorage = await AsyncStorage.getItem("user");
    if (userFromStorage === null) {
      const ref = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      let userStored = await ref.get();
      userStored = userStored.data();
      await AsyncStorage.setItem("user", JSON.stringify(userStored));

      user = {
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber,
        firstName: userStored.firstName,
        lastName: userStored.lastName,
        isStuff: userStored.isStuff,
      };
    } else {
      const parseUser = JSON.parse(userFromStorage);
      user = {
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber,
        firstName: parseUser.firstName,
        lastName: parseUser.lastName,
        isStuff: parseUser.isStuff,
      };
    }
    dispatch({ type: "set_user", payload: user });
  } catch (error) {
    console.log(error);
    Alert.alert('',error.message);
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  console.log("Signin");
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: 'דוא"ל או סיסמה לא תקינים',
    });
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === "auth/wrong-password") {
      Alert.alert('',"סיסמה שגויה");
    } else {
      Alert.alert('',errorMessage);
    }
    console.log(error);
  }
};

const signup = (dispatch) => async ({
  firstName,
  lastName,
  email,
  password,
  checkPassword,
  stuffCode,
}) => {
  console.log("Signup");
  try {
    if (password.length >= 6 && password == checkPassword) {
      if (stuffCode === "19384" || stuffCode === "") {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        //Once the user creation has happened successfully, we can add the currentUser into firestore
        //with the appropriate details.
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            firstName: firstName,
            lastName: lastName,
            isStuff: stuffCode === "19384",
          })
          .catch((error) => {
            dispatch({
              type: "add_error",
              payload: "נסה שנית ,שגיאה ברישום המשתמש לבסיס הנתונים",
            });
            Alert.alert('',error.errorMessage);
            console.log(error);

            try {
              async () => {
                if (
                  firebase
                    .firestore()
                    .collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .get().exists
                ) {
                  await firebase
                    .firestore()
                    .collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .delete();
                }
                await firebase.auth().currentUser.delete();
              };
            } catch (error) {
              Alert.alert('',error.message);
              console.log(error);
            }
          });
      } else {
        dispatch({
          type: "add_error",
          payload: "קוד עובד שגוי, אם אין ברשותך קוד השאר חלון זה ריק",
        });
      }
    } else {
      dispatch({
        type: "add_error",
        payload: "סיסמה צריכה להיות 6 תווים לפחות, או שהסיסמאות לא תואמות",
      });
    }
  } catch (error) {
    //we need to catch the whole sign up process if it fails too.
    dispatch({
      type: "add_error",
      payload: 'דוא"ל או סיסמה לא תקינים',
    });
    Alert.alert('',error.message);
    console.log(error);
  }
};

const signout = (dispatch) => async (callback) => {
  try {
    dispatch({ type: "set_loading", payload: true });
    console.log("signout");
    await firebase.auth().signOut();
    dispatch({ type: "signout" });
  } catch (error) {
    console.log(error);
    Alert.alert('',error.message);
  }
};

const resetPassword = (dispatch) => async ({ email }) => {
  try {
    console.log("reset password");
    await firebase.auth().sendPasswordResetEmail(email);
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == "auth/invalid-email") {
      Alert.alert('','דוא"ל לא תקין');
    } else if (errorCode == "auth/user-not-found") {
      Alert.alert('',"המשתמש לא נמצא");
    }
    console.log(error);
  }
};

const updateUserInformation = (dispatch) => async ({
  firstName,
  lastName,
  email,
  newPassword,
  stuffCode,
  isEmailUpdate,
  isPasswordUpdate,
  newPhoneNumber,
  currentPassword,
  isPhoneUpdate,
  recaptchaVerifier
}) => {
  
    try {
      console.log("update user info");
      let userUpdate = null;
      const userFromStorage = await AsyncStorage.getItem("user");
      const parsedUser = JSON.parse(userFromStorage);
      
      console.log('ddd',stuffCode)
      if(stuffCode !=='')
      {
        userUpdate= {
        firstName: firstName,
        lastName: lastName,
        isStuff: stuffCode === "19384",
      };
    }
    else{
      userUpdate= {
        firstName: firstName,
        lastName: lastName,
        isStuff: parsedUser.isStuff
      };
    }
      const credential = await firebase
        .auth()
        .signInWithEmailAndPassword(
          firebase.auth().currentUser.email,
          currentPassword
        );
      if (isEmailUpdate) {
        await credential.user.updateEmail(email);
      }
      if (isPasswordUpdate) {
        await credential.user.updatePassword(newPassword);
      }

      await firestore
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update(userUpdate);

      await AsyncStorage.setItem("user", JSON.stringify(userUpdate));

      const user = {
        email: firebase.auth().currentUser.email,
        phoneNumber: firebase.auth().currentUser.phoneNumber,
        ...userUpdate,
      };
      dispatch({ type: "set_user", payload: user });

      if (isPhoneUpdate) {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
          const phoneNumberISR = "+972" + newPhoneNumber;
          const verificationId = await phoneProvider.verifyPhoneNumber(
            phoneNumberISR,
            recaptchaVerifier.current
          );
          dispatch({ type: "set_verificationId", payload: verificationId });
         dispatch({ type: "set_update_phone_code_sent", payload: true });
         Alert.alert(
          '',
          'על מנת לעדכן מספר נייד, קוד אימות נשלח למכשירך, הזן אותו בשדה קוד האימות'
        )
      }

      Alert.alert('',"השינויים נשמרו בהצלחה");
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/invalid-email") {
        Alert.alert('','דוא"ל לא תקין');
      }
      if (errorCode === "auth/email-already-in-use") {
        Alert.alert('','דוא"ל זה כבר רשום במערכת');
      }
      if (errorCode === "auth/requires-recent-login") {
        Alert.alert('',"התחבר מחדש ונסה שוב");
      }
      if (errorCode === "auth/user-disabled") {
        Alert.alert('',"המשתמש לא פעיל");
      }
      if (errorCode === "auth/user-not-found") {
        Alert.alert('',"לא נמצא משתמש");
      }
      if (errorCode === "auth/wrong-password") {
        Alert.alert('',"סיסמה נוכחית שהוקלדה שגויה");
      }
      if (errorCode === "auth/weak-password") {
        Alert.alert('',"הסיסמה שהוקלדה אינה חזקה מספיק");
      }
      if (errorCode === "auth/argument-error") {
        Alert.alert('',"הסיסמה שהולדה שגויה או שלא הוקלדה סיסמה");
      }
      //Alert.alert(errorCode)

      console.log(error);
    }
  }

  const confirmUpdatePhoneCode = (dispatch) => async ({ phoneVerificationId, code }) => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        phoneVerificationId,
        code
      );
      await firebase.auth().currentUser.updatePhoneNumber(credential);
        let user = null;
        const currentUser = firebase.auth().currentUser;
        const userFromStorage = await AsyncStorage.getItem("user");
        if (userFromStorage === null) {
          const ref = firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid);
          let userStored = await ref.get();
          userStored = userStored.data();
          await AsyncStorage.setItem("user", JSON.stringify(userStored));
    
          user = {
            email: currentUser.email,
            phoneNumber: currentUser.phoneNumber,
            firstName: userStored.firstName,
            lastName: userStored.lastName,
            isStuff: userStored.isStuff,
          };
        } else {
          console.log('async exists')
          const parseUser = JSON.parse(userFromStorage);
          user = {
            email: currentUser.email,
            phoneNumber: currentUser.phoneNumber,
            firstName: parseUser.firstName,
            lastName: parseUser.lastName,
            isStuff: parseUser.isStuff,
          };
        }
        
        dispatch({ type: "set_user", payload: user });
      Alert.alert('',"המספר החדש נשמר בהצלחה");
      dispatch({ type: "set_update_phone_code_sent", payload: false });

    } catch (error) {
      var errorCode = error.code;
      if (errorCode === "auth/invalid-verification-code") {
        Alert.alert('',"קוד האימות אינו תקין");
      }
      else if (errorCode === "auth/invalid-verification-id") {
        Alert.alert('',"אימות נכשל, נסה שנית");
      }
      else{
      Alert.alert('',"אימות נכשל, נסה שנית");
      }

      console.log(error);
    }
  };

const sendPhoneVerification = (dispatch) => async ({
  phoneNumber,
  recaptchaVerifier,
}) => {
  const phoneProvider = new firebase.auth.PhoneAuthProvider();
  try {
    const phoneNumberISR = "+972" + phoneNumber;
    const verificationId = await phoneProvider.verifyPhoneNumber(
      phoneNumberISR,
      recaptchaVerifier.current
    );
    dispatch({ type: "set_verificationId", payload: verificationId });
    Alert.alert('',"קוד אימות נשלח למכשירך, הזן אותו בשדה קוד האימות");
  } catch (error) {
    Alert.alert('',error.message);
    console.log(error);
  }
};

const confirmCode = (dispatch) => async ({ phoneVerificationId, code }) => {
  try {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      phoneVerificationId,
      code
    );
    await firebase.auth().currentUser.linkWithCredential(credential);
    dispatch({ type: "set_loading", payload: true });
  } catch (error) {
    Alert.alert('',"קוד האימות אינו תקין");
    console.log(error);
  }
};

const setAuthenticated = (dispatch) => (isPasswordAuth, isPhoneAuth) => {
  console.log(isPasswordAuth, isPhoneAuth);
  dispatch({
    type: "set_authenticated",
    payload: {
      isAuthenticated: isPasswordAuth && isPhoneAuth,
      isPasswordAuth: isPasswordAuth,
      isPhoneAuth: isPhoneAuth,
    },
  });
  dispatch({ type: "set_loading", payload: false });
};

const setLoading = (dispatch) => () => {
  dispatch("set_loading");
};

const setIsUpdatePhoneCodeSent = (dispatch) => (isCodeSent) => {
  dispatch({ type: "set_update_phone_code_sent", payload: isCodeSent });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signup,
    resetPassword,
    signout,
    clearErrorMessage,
    setAuthenticated,
    setUser,
    sendPhoneVerification,
    confirmCode,
    updateUserInformation,
    confirmUpdatePhoneCode,
    setIsUpdatePhoneCodeSent
  },
  {
    user: null,
    isAuth: {
      isAuthenticated: false,
      isPasswordAuth: false,
      isPhoneAuth: false,
    },
    phoneVerificationId: null,
    isLoading: true,
    errorMessage: "",
    isLinkedProviders: false,
    isUpdatePhoneCodeSent: false,
  }
);
