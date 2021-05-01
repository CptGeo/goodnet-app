// import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Home from "./screens/Home";
// import {goodnetSettings as gn} from "./settings/goodnetSettings";
// import CategoriesNavigation from "./components/CategoriesNavigation";
import UrlContext from "./components/UrlContext";
import BottomNavigationMenu from "./components/BottomNavigationMenu";


//check here for more
//https://github.com/expo/examples/blob/master/with-sqlite/App.js
import * as SQLite from 'expo-sqlite';


export default function App() {
  // const [settings, settingsChange] = useState(gn);

  const [url, urlChange] = useState("https://goodnet.gr");

  const args = {
    value : url,
    handler : urlChange
  };

  //callback on successful transaction
  const successDB = (tx, rs) => {
    console.log("Table created successfully");
  }

  //callback on transaction error
  const errorDB = (tx, err) => {
    console.log("Could not create table");
    console.log(err);
  }

  const initiateDB = () => {
    const db = SQLite.openDatabase("favourites");

    db.transaction( (tx) => {
      const query = `
        CREATE TABLE IF NOT EXISTS favourite_news (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT DEFAULT '',
          img_src TEXT DEFAULT '',
          favourite_url TEXT NOT NULL,
          timestamp TEXT DEFAULT CURRENT_TIMESTAMP
        );`;
      
      // const query = `DROP TABLE favourite_news`;
      tx.executeSql(query, [], successDB, errorDB);
    })
  }


  useEffect( () => {
    initiateDB();
  }, []);

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
