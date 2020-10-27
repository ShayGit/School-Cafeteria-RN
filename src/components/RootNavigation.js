import * as React from 'react';

import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();
export const isReadyRef = React.createRef();

export function navigate(name, params, key) {
   if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params, key);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export function push(name, params, key) {
  if (isReadyRef.current && navigationRef.current) {
   // Perform navigation if the app has mounted
   const pushAction = StackActions.push(name, params, key);
   navigationRef.current.dispatch(pushAction);
 } else {
   // You can decide what to do if the app hasn't mounted
   // You can ignore this, or add these actions to a queue you can call later
 }}


 export function setParams(params) {
  if (isReadyRef.current && navigationRef.current) {
   // Perform navigation if the app has mounted
   navigationRef.current.setParams(params);
 } else {
   // You can decide what to do if the app hasn't mounted
   // You can ignore this, or add these actions to a queue you can call later
 }
}
export function popToTop(params) {
  if (isReadyRef.current && navigationRef.current) {
   // Perform navigation if the app has mounted
   const popToTop = StackActions.popToTop();
   navigationRef.current.dispatch(popToTop); }
    else {
   // You can decide what to do if the app hasn't mounted
   // You can ignore this, or add these actions to a queue you can call later
 }
}



