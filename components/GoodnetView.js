import React, {Component, useContext, useState, useEffect} from "react";
import {WebView} from "react-native-webview";
import {Text, StyleSheet, View, ActivityIndicator} from "react-native";
import UrlContext from "./UrlContext";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler'

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("favourites");

export default function GoodnetView(props){
    const urlContext = useContext(UrlContext);
    const jsCode = `let everything = document.querySelectorAll("*"); everything.forEach(item => {item.style.userSelect = 'none'})`;

    const [favourite, setFavourite] = useState(false);
    const [title, setTitle] = useState('');
    


    // const getUrlPageTitle = (url) => {
    //     let title = '';
    //     fetch(url)
    //     .then(res => res.text())
    //     .then(data => {
    //         title = data.split('<title>')[1].split('</title>')[0];
    //     })
    //     .catch(() => console.log("Error"));

    //     return title;
    // }
    
    const isNewsUrl = (url = '') => {
        if(url === ''){
            url = urlContext.value;
        }
        const checkFor = ["news-item", "blog-reader"];
        let isNews = checkFor.filter( item => url.includes(item) );
        return isNews.length > 0;
    }

    const errorDB = (tx, err) => {
        console.log("Error");
        console.log(err);
    }


    const checkIfFavourite = () => {
        const query = "SELECT * FROM favourite_news WHERE favourite_url = ? ";
        db.transaction(tx => {
            tx.executeSql(
                query, 
                [urlContext.value], 
                (tx, rs) => {
                    if(rs.rows.length > 0){
                        setFavourite(true);
                    }else{
                        setFavourite(false);
                    }
                },
                (tx, err) => {
                    console.log("Query Error");
                    console.log(err);
                }
            );
        });
    }

    useEffect( () => {
        if(isNewsUrl()) {
            checkIfFavourite();
        }
    });

    useEffect( () => {
        console.log("Use effect");
        if(isNewsUrl()) {
            fetch(urlContext.value)
            .then(res => res.text())
            .then(data => {
                let t = data.split('<h1 class="article-single__title">')[1].split('</h1>')[0];
                setTitle(t);
            })
        }
    }, [urlContext.value]);


    const toggleFavourite = () => {
        //Check if already added 

        if(favourite){
            //delete from favourites
            const query = "DELETE FROM favourite_news WHERE favourite_url = ? ";
            db.transaction(tx => {
                tx.executeSql(query, [urlContext.value], (tx, rs) => {
                    setFavourite(false);
                }, errorDB);
            })
        }
        else{
            //insert to favourites
            const query = "INSERT INTO favourite_news (title, favourite_url) VALUES (?, ?)";
            db.transaction(tx => {
                console.log(title);
                tx.executeSql(query, [title, urlContext.value], (tx, rs) => {
                    setFavourite(true);
                }, errorDB);
            })
        }
    }
    

    return(
        <View style={styles.container}>
            <View style={styles.favoritesBtn}>
                {isNewsUrl(urlContext.value) ? (
                <TouchableOpacity onPress={() => toggleFavourite()}>
                    {favourite ? 
                        (<Icon size={34} color="#db2625" name={"heart"} />) : 
                        (<Icon size={34} color="#db2625" name={"heart-outline"} />)
                    }
                </TouchableOpacity>
                ) : <></>}

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
        // position : "relative",
        zIndex: -1
    },
    favoritesBtn: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 9999,
        width : 34,
        height : 34,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    }
});