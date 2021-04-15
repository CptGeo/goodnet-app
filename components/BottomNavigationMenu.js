import React from "react";
import {View, Text} from "react-native";
import BottomNavigation, {FullTab, ShiftingTab} from "react-native-material-bottom-navigation";

import UrlContext from "./UrlContext";

//more icons https://icons.expo.fyi/
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

import CategoriesNavigation from "./CategoriesNavigation";
import Radio from "../screens/Radio";

export default class BottomNavigationMenu extends React.Component{


    static contextType = UrlContext;
    tabs = [
        {
            key: 'frontpage',
            icon: 'book-open-page-variant',
            label: 'Πρωτοσέλιδο',
            barColor: '#222222',
            pressColor: '#4273c9'
        },
        {
            key: 'user_message',
            icon: 'message',
            label: 'Στείλε μήνυμα',
            barColor: '#222222',
            pressColor: '#4273c9'
        },
        {
            key: 'listen_radio',
            icon: 'radio',
            label: 'Άκου Ραδιόφωνο',
            barColor: '#222222',
            pressColor: '#4273c9'
        },
        {
            key: 'read_later',
            icon: 'pin',
            label: 'Read later',
            barColor: '#222222',
            pressColor: '#4273c9'
        },
        {
            key: 'more',
            icon: 'dots-horizontal',
            label: 'Περισσότερα',
            barColor: '#222222',
            pressColor: '#4273c9'
        },
      ]

    state = {
        activeTab: 'frontpage'
    }

    renderIcon = icon => ({ isActive }) => (
        <Icon size={26} color="white" name={icon} />
    );


    renderTab = ({ tab, isActive }) => (
        <ShiftingTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
    />
    )

    tabPress = (activeTab) => {
        switch (activeTab.key) {
            case "frontpage" : {
                this.setState({activeTab : "frontpage"})
                this.context.handler("https://goodnet.gr");
                break;
            }
            case "user_message" : {
                this.setState({activeTab : "user_message"})
                break;
            }
            case "listen_radio" : {
                this.setState({activeTab : "listen_radio"})
                break;
            }
            case "read_later" : {
                this.setState({activeTab : "read_later"})
                break;
            }
            case "more" : {
                this.setState({activeTab : "more"})
                break;
            } 
            default : {
                this.setState({activeTab : "frontpage"})
            }
        }
    }


    render() {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {this.state.activeTab === "frontpage" ? <CategoriesNavigation /> : 
                this.state.activeTab === "listen_radio" ? <Radio /> : 
                <Text>No page</Text>}
            </View>
            <BottomNavigation
                activeTab={this.state.activeTab}
                onTabPress={activeTab => {this.tabPress(activeTab)}}
                renderTab={this.renderTab}
                tabs={this.tabs}
            />
          </View>
        )
      }
    
}