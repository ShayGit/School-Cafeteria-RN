import {ActivityIndicator, StyleSheet} from 'react-native';

import React from 'react';

const Loader = () =>{
    return(
        <ActivityIndicator size="large" color='dodgerblue' style={styles.indicator}/>
    )
}

const styles = StyleSheet.create({
    indicator:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Loader;