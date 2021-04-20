import React from "react";
import {TouchableOpacity, Image, StyleSheet} from "react-native";

export default function RadioStationPicker(props){

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => props.pressHandler(props)}>
            <Image style={styles.image} source={{uri : props.stationImage}}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'flex-end',
        flex : 1,
        alignItems : "center",
        borderRadius: 5,
        padding: 10,
        height: 100,
        backgroundColor : "#fff",

        elevation:15,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 5, 
    },
    image : {
        width : "100%",
        height : "100%"
    },
})