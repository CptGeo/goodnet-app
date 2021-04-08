/**
 * Home is the default screen
 */
import GoodnetViewF from "../components/GoodnetViewF";
import React from "react";
import {StyleSheet} from "react-native";

export default Home = (props) => {

    return (
      <GoodnetViewF style={styles.container}/>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent : "center",
      alignItems : "center"
    }
  });