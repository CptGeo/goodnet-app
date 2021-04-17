// import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Home from "./screens/Home";
// import {goodnetSettings as gn} from "./settings/goodnetSettings";
// import CategoriesNavigation from "./components/CategoriesNavigation";
import UrlContext from "./components/UrlContext";
import BottomNavigationMenu from "./components/BottomNavigationMenu";


//check here for more
//https://github.com/expo/examples/blob/master/with-sqlite/App.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("favourites");


export default function App() {
  // const [settings, settingsChange] = useState(gn);

  const [url, urlChange] = useState("https://goodnet.gr");

  const args = {
    value : url,
    handler : urlChange
  };

  return (
    <View style={styles.container}>
      <UrlContext.Provider value={args}>
        {/* <CategoriesNavigation /> */}
        <BottomNavigationMenu />
      </UrlContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25
  },
});
