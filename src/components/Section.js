import {StyleSheet, View} from 'react-native'

import React from 'react'

const Section=({ children })=> {
    return(
        <View elevation={5} style={styles.section}>
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    section:{
        flex: 1,
        backgroundColor: "#fff",
        shadowColor: "#000000",
        shadowOffset: { width: 2, height: 5 },
        shadowRadius: 5,
        shadowOpacity: 0.5,
        borderRadius: 5,
      },
})

export default Section;