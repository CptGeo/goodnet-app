import React, {useContext,} from "react";
import {WebView} from "react-native-webview";
import {StyleSheet, View, ActivityIndicator} from "react-native";
import UrlContext from "./UrlContext";


export default function GoodnetView(){
    const urlCtx = useContext(UrlContext);
    const jsCode = `let everything = document.querySelectorAll("*"); everything.forEach(item => {item.style.userSelect = 'none'})`;
    return(
        <View style={styles.container}>
            <WebView 
                source={
                    {
                        uri : urlCtx.value
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
                    urlCtx.handler(navState.url);
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
        zIndex: -1
    },
    favoritesBtn: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 999,
        width : 34,
        height : 34,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    }
});