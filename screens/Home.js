/**
 * Home is the default screen
 */
import GoodnetView from "../components/GoodnetView";
import {goodnetSettings as gn} from "../settings/GoodnetSettings";
import CategoriesMenuFetcher from "../components/CategoriesMenuFetcher";
import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Navi from "../components/Navi";

const Home = (props) => {

    return (
        <View style={styles.container}>
            <GoodnetView 
                settings={gn}
                style={styles.container}/>
            {/* <CategoriesMenuFetcher/> */}
            <Navi />
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