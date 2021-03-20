import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./screens/Home";
import {goodnetSettings as gn} from "./settings/goodnetSettings";


export const SettingsContext = React.createContext();


export default function App() {
  const [settings, settingsChange] = useState(gn);

  const urlChangeHandler = (value) => {
    settingsChange = useState({
      ...settings,
      url : value
    });
  }

  return (
    <View style={styles.container}>
      <SettingsContext.Provider value={urlChangeHandler}>
        <StatusBar />
        <Home />
      </SettingsContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  },
});
