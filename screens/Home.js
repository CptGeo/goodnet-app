/**
 * Home is the default screen
 */
import GoodnetView from "../components/GoodnetView";
import React from "react";
import {TouchableOpacity} from 'react-native-gesture-handler'
import {StyleSheet, View, Text, Image} from "react-native";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default Home = ({navigation}) => {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerImageWrapper}>
            <Image style={styles.headerImage} source={require('../assets/goodnet_logo.png')} />
          </View>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerText}>GOODnet.gr</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon size={34} color="#fff" name={"menu"} />
          </TouchableOpacity>
        </View>
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
    },
    header : {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#222",
      paddingRight : 10,
      maxHeight : 70,
    },
    headerText: {
      color: "#fff",
      fontSize : 20
    },
    headerImageWrapper: {
      padding : 10,
      backgroundColor: "#fff"
    },
    headerImage: {
      width: 70,
      height: "100%"
    },
    headerTextWrapper : {
      flex: 4,
      marginLeft : 20
    }
  });