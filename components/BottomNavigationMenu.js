import React from "react";
import {View, Text} from "react-native";
import BottomNavigation, {FullTab} from "react-native-material-bottom-navigation";

import UrlContext from "./UrlContext";

//more icons https://icons.expo.fyi/
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

import CategoriesNavigation from "./CategoriesNavigation";

export default class BottomNavigationMenu extends React.Component{


    static contextType = UrlContext;
    tabs = [
        {
            key: 'frontpage',
            icon: 'book-open-page-variant',
            label: 'Πρωτοσέλιδο',
            barColor: '#388E3C',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'user_message',
            icon: 'message',
            label: 'Στείλε μήνυμα',
            barColor: '#B71C1C',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'listen_radio',
            icon: 'radio',
            label: 'Άκου Ραδιόφωνο',
            barColor: '#E64A19',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'read_later',
            icon: 'pin',
            label: 'Read later',
            barColor: '#E64A19',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        // {
        //     key: 'more',
        //     icon: 'dots-horizontal',
        //     label: 'Περισσότερα',
        //     barColor: '#E64A19',
        //     pressColor: 'rgba(255, 255, 255, 0.16)'
        // }
          
      ]

    state = {
        activeTab: 'frontpage'
    }

    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />
    );


    renderTab = ({ tab, isActive }) => (
        <FullTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
    />
    )

    tabPress = (activeTab) => {

        switch (activeTab) {
            case "frontpage" : {
                this.context.handler("https://goodnet.gr");
                break;
            }
            case "user_message" : {
                break;
            }
            case "listen_radio" : {
                break;
            }
            case "read_later" : {
                break;
            } 
        }
    }


    render() {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
            {this.state.activeTab === "frontpage" ? <CategoriesNavigation /> : <Text>No page</Text>}
            </View>
            <BottomNavigation
                activeTab={this.state.activeTab}
                onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                renderTab={this.renderTab}
                tabs={this.tabs}
            />
          </View>
        )
      }
    
}