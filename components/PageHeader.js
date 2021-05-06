import React from "react";
import {StyleSheet, View, Text, Image} from "react-native";
export default function PageHeader(props){

    return (
        <View style={styles.header}>
            <View style={styles.headerImageWrapper}>
                <Image style={styles.headerImage} source={require('../assets/goodnet_logo.png')} />
            </View>
            <View style={styles.headerTextWrapper}>
                <Text style={styles.headerText}>{props.title}</Text>
            </View>
            {props.children}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: "relative"
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