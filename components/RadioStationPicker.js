import React from "react";
import {View, Text, TouchableOpacity, Image, StyleSheet} from "react-native";


export default class RadioStationPicker extends React.Component{
    constructor(){
        super();
        this.state = {
            stationUrl : ''
        };
    }

    componentDidMount(){
        this.setState({
            stationUrl : this.props.stationUrl
        });
    }


    sendToPlayer = (e) => {
        //Send state to audio player
    }

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.touchable}>
                    <View style={styles.imageWrapper}>
                        <Image style={styles.image} source={{uri : this.props.stationImage}}/>
                    </View>
                </TouchableOpacity>
                {/* <View style={styles.text}>
                    <Text>
                        {this.props.stationTitle}
                        {this.state.stationUrl}
                    </Text>
                </View> */}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    
    container : {
        width : 150,
        height : 150
    },
    image : {
        width : "100%",
        height : "100%"
    },
})