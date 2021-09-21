/**
 * Home is the default screen
 */
import GoodnetView from "../components/GoodnetView";
import React from "react";
import {TouchableOpacity} from 'react-native-gesture-handler'
import {StyleSheet, View, Text, Image} from "react-native";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import FavouritesToggle from "../components/FavouritesToggle";
import PageHeader from "../components/PageHeader";


export default function Home ({navigation}){

  return (
    <View style={styles.container}>
      <PageHeader title={"GOODnet.gr"} >
        <FavouritesToggle 
            icon={"heart-outline"}
            activeIcon={"heart"}
            color={"#db2625"}
          />
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon size={34} color="#fff" name={"menu"} />
        </TouchableOpacity>
      </PageHeader>
      <View style={styles.container}>
        <GoodnetView style={styles.webViewContainer}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: "relative"
    },
    webViewContainer: {
      flex: 1,
      justifyContent : "center",
      alignItems : "center"
    }
  });