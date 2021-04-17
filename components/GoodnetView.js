import React, {Component, useContext, useState} from "react";
import {WebView} from "react-native-webview";
import {Text, StyleSheet, View, ActivityIndicator} from "react-native";
import UrlContext from "./UrlContext";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler'

// import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase("favourites");

export default function GoodnetView(props){
    const urlContext = useContext(UrlContext);
    const jsCode = `let everything = document.querySelectorAll("*"); everything.forEach(item => {item.style.userSelect = 'none'})`;


    
    const isFavourite = () => {
        //check if url exists in favourites
        return false;
    }


    const [favourite, setFavourite] = useState( () => {
        isFavourite(urlContext.value);
    });


    const toggleFavorite = () => {
        //Check if already added 
        const query = "UPDATE"
        console.log("Added to favourites: " + urlContext.value);
    }

    return(
        <View style={styles.container}>
            <View style={styles.favoritesBtn}>
                <TouchableOpacity onPress={() => toggleFavorite()}>
                    {favourite ? 
                        (<Icon size={34} color="#db2625" name={"heart"} />) : 
                        (<Icon size={34} color="#db2625" name={"heart-outline"} />)
                    }
                </TouchableOpacity>
            </View>
            <WebView 
                source={
                    {
                        uri : urlContext.value
                    }
                }
                sharedCookiesEnabled={true}
                styles={styles.webview}
                startInLoadingState={true}
                pullToRefreshEnabled={true}
                scalesPageToFit={true}
                javaScriptEnabled={true}
                injectedJavaScript={jsCode}
                userAgent={'GoodnetMobile/1.0.3'} // user agent for identification
                //applicationNameForUserAgent={'GoodnetMobile/1.0.3'} // user agent for identification
                renderLoading={() => (
                    <ActivityIndicator 
                        color='#4374ca' 
                        size='large' 
                        style={styles.container}
                    />)}
                onNavigationStateChange={(navState) => {
                    if(navState.loading){
                        return (
                            <ActivityIndicator 
                                    color='#4374ca' 
                                    size='large' 
                                    style={styles.container}
                            />
                        )
                    }
                    urlContext.handler(navState.url);
                }}
                // onNavigationStateChange={this.webviewNavigationChange}
                // onShouldStartLoadWithRequest={this.shouldStartLoadWithRequest}
            />
        </View>
    );

}


const styles = StyleSheet.create({
    container : {
        flex: 1
    },
    webview : {
        flex: 1,
        position : "relative",
        zIndex: 1
    },
    favoritesBtn: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 100,
        width : 34,
        height : 34,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    }
});