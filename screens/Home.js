/**
 * Home is the default screen
 */
import GoodnetViewF from "../components/GoodnetViewF";
import React from "react";
import {StyleSheet, View, Text} from "react-native";

export default Home = (props) => {

    return (
      <View style={styles.container}>
        <View>
          <Text>Πρωτοσέλιδο - GoodNet.gr</Text>
        </View>
        <GoodnetViewF style={styles.webViewContainer}/>
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    webViewContainer: {
      flex: 1,
      justifyContent : "center",
      alignItems : "center"
    }
  });