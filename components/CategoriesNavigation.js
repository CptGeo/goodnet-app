import React from "react";
import {Button, View, StyleSheet, Text} from "react-native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";


//other
import HiddenScreen from "./HiddenScreen";

//navigation contents
import CategoriesNavigationContents from "./CategoriesNavigationContents";

//screens
import Home from "../screens/Home";


const Drawer = createDrawerNavigator();

export default CategoriesNavigation = () => {
    return (
        <NavigationContainer style={styles.container} independent={true}>
            <Drawer.Navigator initialRouteName="Home" drawerContent={ props => <CategoriesNavigationContents {...props} />}>
                <Drawer.Screen name="Αρχική" component={Home}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center"
    }
});