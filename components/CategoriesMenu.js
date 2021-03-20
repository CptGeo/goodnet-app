import React, {Component, useContext} from "react";
import { Text, View, StyleSheet, Button} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Menu, {MenuItem, MenuDivider} from "react-native-material-menu";
import {SettingsContext} from "../App";

export default function CategoriesMenu(props){

    // const changeUrl = useContext(SettingsContext);

    let _menu;

    const showMenu = () => {
        _menu.show();
    }

    const hideMenu = () => {
        _menu.hide();
    }

    const setMenuRef = (ref) => {
        _menu = ref;
    }

    const menuItemPressHandler = (url) => {
        console.log(url);
    }


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Menu
            ref={setMenuRef}
            button={<Text onPress={showMenu}>Μενού</Text>}>

            <Text style={{padding:10, alignItems: "center", color: "#aaa", fontSize: 20, backgroundColor:"#333"}}>
                Κατηγορίες</Text>
                
            <MenuDivider />
            {props.categories.map( cat => {
                return <MenuItem onPress={() => menuItemPressHandler(cat.url)} key={cat.key}>{cat.title}</MenuItem>})
                }
            </Menu>
        </View>
    );
}



const styles = StyleSheet.create({
    container : {
        flex :1,
        position : "relative",
        zIndex : 1
    },
    buttonContainer : {
        alignItems : "center",
        padding : 10
    },
    button : {
        backgroundColor: getRandomColor(),
        paddingHorizontal : 15,
        paddingVertical : 10,
        flex:1,
        alignItems : "center",
        width:"100%"
    }
    

})


function getRandomColor(){

    const hex = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

    let code = '#';
    let randomIndex;
    for(let i = 0; i < 6; i++){ 
        randomIndex = Math.floor(Math.random() * Math.floor(hex.length - 1));
        code += hex[randomIndex];
    }
    return code;
}




// export default class CategoriesMenu extends Component{
//     _menu = null;

//     setMenuRef = ref => {
//       this._menu = ref;
//     };
  
//     hideMenu = () => {
//       this._menu.hide();
//     };
  
//     showMenu = () => {
//       this._menu.show();
//     };




//     menuItemPressHandler = (item) => {

//     }

//     render(){
//         return (
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Menu
//               ref={this.setMenuRef}
//               button={<Text onPress={this.showMenu}>Μενού</Text>}>

//               <Text style={{padding:10, alignItems: "center", color: "#aaa", fontSize: 20, backgroundColor:"#333"}}>
//                   Κατηγορίες</Text>
                  
//               <MenuDivider />
//               {this.props.categories.map( cat => {
//                 return <MenuItem onPress={this.menuItemPressHandler} url={cat.url} key={cat.key}>{cat.title}</MenuItem>})
//                 }
//             </Menu>
//           </View>
//         );

//     }
// }



