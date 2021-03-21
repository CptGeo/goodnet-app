import React, {Component, useContext, useState} from "react";
import {WebView} from "react-native-webview";
import {Text, StyleSheet, View, ActivityIndicator} from "react-native";
import { SettingsContext } from "../App";
import {goodnetSettings as gn} from "../settings/goodnetSettings";



export default function GoodnetViewF(props){
    const settings = useContext(SettingsContext);
    return(
        <WebView 
            source={
                {
                    uri : gn.url,
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
            renderLoading={() => (
                <ActivityIndicator 
                    color='#4374ca' 
                    size='large' 
                    style={styles.container}
                />)}
            // onNavigationStateChange={this.webviewNavigationChange}
            // onShouldStartLoadWithRequest={this.shouldStartLoadWithRequest}
        />
    );

}


const styles = StyleSheet.create({
    container : {
        flex: 1
    },
});