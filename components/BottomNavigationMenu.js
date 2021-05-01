import React, {useState, useContext} from "react";
import {View, Text} from "react-native";
import BottomNavigation, {ShiftingTab} from "react-native-material-bottom-navigation";
import UrlContext from "./UrlContext";
import TabContext from "./TabContext";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import CategoriesNavigation from "./CategoriesNavigation";
import Radio from "../screens/Radio";
import tabs from "../settings/tabs";
import Pinned from "../screens/Pinned";


export default function BottomNavigationMenu(props){


    const urlCtx = useContext(UrlContext);

    const [activeTab, setActiveTab] = useState('frontpage');

    const tabsArgs = {
        value : activeTab,
        handler : setActiveTab
      };

    const renderIcon = icon => ({ isActive }) => (
        <Icon size={26} color="white" name={icon} />
    );

    const renderTab = ({ tab, isActive }) => (
        <ShiftingTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon={renderIcon(tab.icon)}
        />
    );

    const tabPress = (activeTab) => {
        switch (activeTab.key) {
            case "frontpage" : {
                setActiveTab("frontpage");
                urlCtx.handler("https://goodnet.gr");
                break;
            }
            case "user_message" : {
                setActiveTab("user_message");
                break;
            }
            case "listen_radio" : {
                setActiveTab("listen_radio");
                break;
            }
            case "read_later" : {
                setActiveTab("read_later");
                break;
            }
            case "more" : {
                setActiveTab("more");
                break;
            } 
            default : {
                setActiveTab("frontpage");
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <TabContext.Provider value={tabsArgs}>
                <View style={{ flex: 1 }}>
                    {activeTab === "frontpage" ? <CategoriesNavigation /> : 
                    activeTab === "listen_radio" ? <Radio /> : 
                    activeTab === "read_later" ? <Pinned /> :
                    <Text>No page</Text>}
                </View>
                <BottomNavigation
                    activeTab={activeTab}
                    onTabPress={tab => {tabPress(tab)}}
                    renderTab={renderTab}
                    tabs={tabs}
                />
            </TabContext.Provider>
        </View>
    )
}