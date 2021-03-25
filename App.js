import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./screens/Home";
import {goodnetSettings as gn} from "./settings/goodnetSettings";
import CategoriesNavigation from "./components/CategoriesNavigation";
import UrlContext from "./components/UrlContext";

export default function App() {
  const [settings, settingsChange] = useState(gn);

  const [url, urlChange] = useState("https://goodnet.gr");

  const args = {
    value : url,
    handler : urlChange
  };

  // const urlChangeHandler = (value) => {
  //   settingsChange = useState({
  //     ...settings,
  //     url : value
  //   });
  // }

  return (
    <View style={styles.container}>
      <UrlContext.Provider value={args}>
        <CategoriesNavigation />
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
