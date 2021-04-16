import React, {useState} from "react";
import { Text, View, StyleSheet} from "react-native";
import AudioPlayer from "../components/AudioPlayer";


export default function Radio() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Άκου Ραδιόφωνο</Text>
      </View>
        <AudioPlayer 
        />
    </View>

  );
}

const styles = StyleSheet.create({

  container : {
    flex : 1,
    backgroundColor : "#eee"
  }
});
