/**
 * Home is the default screen
 */
import GoodnetViewF from "../components/GoodnetViewF";
import CategoriesMenuFetcher from "../components/CategoriesMenuFetcher";
import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Navi from "../components/Navi";

const Home = (props) => {

    return (
        <View style={styles.container}>
            <GoodnetViewF style={styles.container}/>
            <CategoriesMenuFetcher/>
            {/* <Navi /> */}
        </View>
        // <Text>Hello!</Text>
    )

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: 300,
      width: "100%",
      position : "relative",
      zIndex : 10
    }
  });

export default Home;