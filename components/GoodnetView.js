import React, {Component, useState} from "react";
import {WebView} from "react-native-webview";
import {Text, StyleSheet, View, ActivityIndicator} from "react-native";

class GoodnetView extends Component{


    constructor(props){
        super();

        //string
        this.homepageUrl = props.settings.url;

        //string
        this.urlParam = props.settings.urlMobParam.name + "=" + props.settings.urlMobParam.value;

        //string
        this.uri = props.settings.url;

        //WebView Object
        this.webview = null;

        this.count = 0;

        this.state = {
            changingPage : false,
            previousPageUrl : '',
            nextPageUrl : ''
        }
    }

    urlHasParams = (url) => {
        const urlregex = /(\?|\&)([^=]+)\=([^&]+)/;
        return url.match(urlregex) ? true : false;
    }


    render(){

        return(
            <WebView 
                source={
                    {
                        uri : this.uri,
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
                ref={(ref) => this.webview = ref}
                // onNavigationStateChange={this.webviewNavigationChange}
                // onShouldStartLoadWithRequest={this.shouldStartLoadWithRequest}
            />
        );
    }
}





const styles = StyleSheet.create({
    container : {
        flex: 1,
        flexGrow: 1,
        alignItems : 'center',
        justifyContent : "center",
        position : "absolute",
        width : "100%",
        height : "100%",
        left: 0,
        top : 0
    },
});


export default GoodnetView;




