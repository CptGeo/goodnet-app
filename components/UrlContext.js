import React, {createContext, useContext, useState} from "react";
import {View, Text, StyleSheet} from "react-native";




export default UrlContext = createContext();


const Provider = props =>{

    const [url, setUrl] = useState("https://goodnet.gr");

    const value = {state : {url}, actions : {setUrl}};

    return (
        <UrlContext.Provider value={value}>
            {props.children}
        </UrlContext.Provider>
    );
    
}