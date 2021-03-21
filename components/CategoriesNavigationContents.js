import React from "react";
import {DrawerContentScrollView,DrawerItemList,DrawerItem} from "@react-navigation/drawer";
import { ActivityIndicator } from "react-native";


export default class CategoriesNavigationContents extends React.Component{
    constructor(){
        super();
        this.state = {
            cats : '', 
            catsOk : false
        }
    }

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
        console.log(url);
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
                return (
                    <DrawerItem key={item.id} label={item.title} onPress={ () => {this.pressHandler(item.url)} }/>
                )
            });

            return (
                <DrawerContentScrollView {...this.props}>
                    <DrawerItemList {...this.props} />
                    {categoryItems}
                </DrawerContentScrollView>
            )
        }
    }
}




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
