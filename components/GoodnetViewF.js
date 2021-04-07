import React, {Component, useContext, useState} from "react";
import {WebView} from "react-native-webview";
import {Text, StyleSheet, View, ActivityIndicator} from "react-native";
import UrlContext from "./UrlContext";


export default function GoodnetViewF(props){
    const urlContext = useContext(UrlContext);
    const jsCode = `let everything = document.querySelectorAll("*"); everything.forEach(item => {item.style.userSelect = 'none'})`;
    return(
        <WebView 
            source={
                {
                    uri : urlContext.value,
                    headers : {
                        Cookie: 'goodnet_mobile=1'
                    }
                }
            }
            sharedCookiesEnabled={true}
            styles={styles.container}
            startInLoadingState={true}
            pullToRefreshEnabled={true}
            scalesPageToFit={true}
            javaScriptEnabled={true}
            injectedJavaScript={jsCode}
            applicationNameForUserAgent={'GoodnetMobile/1.0.3'} // user agent for identification
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
    );

}



// const navigationStateChange = (navState) => {
//     const urlContext = useContext(UrlContext);
//     if(navState.loading){
//         return (
//             <ActivityIndicator 
//                     color='#4374ca' 
//                     size='large' 
//                     style={styles.container}
//             />
//         )
//     }
//     urlContext.handler(navState.url);
// }


const styles = StyleSheet.create({
    container : {
        flex: 1
    },
});