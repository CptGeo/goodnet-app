import React from "react";
import {DrawerContentScrollView,DrawerItemList,DrawerItem} from "@react-navigation/drawer";
import { ActivityIndicator, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import UrlContext from "./UrlContext";

export default class CategoriesNavigationContents extends React.Component{

    constructor(){
        super();
        this.state = {
            cats : '', 
            catsOk : false
        }
    }

    static contextType = UrlContext;

    componentDidMount(){
        fetch("https://goodnet.gr/share/categories.json")
        .then(response => response.json())
        .then(data => {
            this.setState(
                {
                    cats : data,
                    catsOk : true
                }
            )
        })
        .catch(error => console.log(error));
    }

    pressHandler(url){
        this.context.handler(url);
        this.props.navigation.toggleDrawer();

    }


    render(){
        if(!this.state.catsOk){
            return (
                <ActivityIndicator color={"blue"}/>
            )
        }
        else{

            let categoryItems = this.state.cats.sitemap.categories.map( item => {
                let active = false;
                if( this.context.value == item.url){
                    active = true;
                }
                return (
                    <DrawerItem 
                        key={item.id} 
                        label={item.title} 
                        labelStyle={active ? styles.active : styles.button}
                        style={active ? styles.active : styles.button}
                        activeTintColor={active ? "black" : "red"}
                        activeBackgroundColor={active ? "white" : "yellow"}
                        onPress={ () => {this.pressHandler(item.url)} }
                    />
                )
            });

            return (
                <DrawerContentScrollView {...this.props}>
                    <DrawerItemList {...this.props} />
                    {categoryItems}
                    <DrawerItem
                        key={"google"} 
                        label={
                            () => (
                                <TouchableOpacity
                                    style={styles.googleBtn}>
                                    <Text style={styles.btnText}>Sign in with Google</Text>
                                </TouchableOpacity>
                            )
                        }
                        style={styles.socialWrapper}
                        >
                    </DrawerItem>
                    <DrawerItem
                        key={"facebook"} 
                        label={
                            () => (
                                <TouchableOpacity
                                    style={styles.facebookBtn}>
                                    <Text style={styles.btnText}>Sign in with Facebook</Text>
                                </TouchableOpacity>
                            )
                        }
                        style={styles.socialWrapper}
                        >
                    </DrawerItem>
                </DrawerContentScrollView>
            )
        }
    }
}


const styles = StyleSheet.create({
    active : {
        color: "black",
        backgroundColor: "white"
    },
    button : {
        color: "#4374ca",
        backgroundColor : "#111"
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
})




//custom navigation elements

// export default CategoriesNavigationContents = props => {
//     return (
//         <DrawerContentScrollView {...props}>
//             <DrawerItemList {...props} />
//             <DrawerItem 
//                 label={"Close drawer"}
//                 onPress={() => props.navigation.closeDrawer()}
//                 />
//             <DrawerItem 
//                 label={"Toggle drawer"}
//                 onPress={() => props.navigation.toggleDrawer()}
//                 />
//         </DrawerContentScrollView>
//     )
// }
