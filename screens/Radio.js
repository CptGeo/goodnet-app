import React from "react";
import {View, StyleSheet} from "react-native";
import AudioPlayer from "../components/AudioPlayer";
import PageHeader from "../components/PageHeader";

export default function Radio() {
  return (
    <View style={styles.container}>
      <PageHeader title={"Άκου Ραδιόφωνο"}/>
      <AudioPlayer />
    </View>

  );
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : "#eee"
  },
});
