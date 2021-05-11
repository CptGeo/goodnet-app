import React, {useState, useEffect, useContext} from "react";
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import { ActivityIndicator, StyleSheet } from "react-native";
import UrlContext from "./UrlContext";

export default function CategoriesNavigationContents(props){


    const [cats, setCats] = useState('');
    const [catsOk, setCatsOk] = useState(false);

    const urlCtx = useContext(UrlContext);

    useEffect( () => {
        fetch("https://goodnet.gr/share/categories.json")
        .then(response => response.json())
        .then(data => {
            setCats(data);
            setCatsOk(true);
        })
        .catch(error => console.log(error));
    }, []);

    const pressHandler = (url) => {
        urlCtx.handler(url);
        props.navigation.toggleDrawer();
    }



    if(!catsOk){
        return (
            <ActivityIndicator color={"#4374ca"}/>
        )
    }
    else{
        const categoryItems = cats.sitemap.categories.map( item => {
            let active = false;
            if( urlCtx.value == item.url){
                active = true;
            }
            return (
                <DrawerItem 
                    key={item.id} 
                    label={item.title} 
                    labelStyle={active ? styles.itemActive : styles.item}
                    style={active ? styles.itemActiveBg : styles.itemBg}
                    onPress={ () => {pressHandler(item.url)} }
                />
            )
        });
        
        const indexPage = (
            <DrawerItem 
                key={0} 
                label={"Αρχική"}
                onPress={ () => {pressHandler("https://goodnet.gr/")} }
                style={urlCtx.value == "https://goodnet.gr/" ? styles.itemActiveBg : styles.itemBg}
                labelStyle={urlCtx.value == "https://goodnet.gr/" ? styles.itemActive : styles.item}
            />
        );
        
        const miscItems = cats.sitemap.other.map( item => {
            let active = false;
            if(urlCtx.value == item.url){
                active = true;
            }
            return (
                <DrawerItem 
                    key={item.id} 
                    label={item.title} 
                    labelStyle={active ? styles.itemActive : styles.item}
                    style={active ? styles.itemActiveBg : styles.itemBg}
                    onPress={ () => {pressHandler(item.url)} }
                />
            )
        });


        return (
            <DrawerContentScrollView {...props}>
                {indexPage}
                {categoryItems}
                {miscItems}
            </DrawerContentScrollView>
        )
    }

}



const styles = StyleSheet.create({
    itemActiveBg : {
        backgroundColor: "#4374ca"
    },
    itemBg : {
        backgroundColor : "#fff"
    },
    itemActive : {
        color: "#fff",
    },
    item : {
        color: "#202020",
    },
    socialWrapper : {
        flex :1,
        width: "100%",
        margin: 0
    },
    googleBtn : {
        marginVertical : 0,
        marginHorizontal : 0,
        paddingVertical : 15,
        paddingHorizontal : 5,
        backgroundColor: "#f04939",
        borderRadius : 3
    },
    facebookBtn : {
        marginVertical : 0,
        marginHorizontal : 0,
        paddingVertical : 15,
        paddingHorizontal : 5,
        backgroundColor: "#3a5897",
        borderRadius : 3
    },
    btnText : {
        fontSize : 18,
        textTransform : "uppercase",
        textAlign : "center"
    }
});