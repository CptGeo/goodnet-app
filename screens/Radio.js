import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
// import { Audio } from "expo-av";
import playlists from "../settings/streams";

import AudioPlayer from "../components/AudioPlayer";



export default function Radio() {
  return (
    <View style={styles.container}>
        <AudioPlayer 
            streamTitle={"Team FM"}
            streamUri={"http://185.78.220.57:9200/stream.mp3"} 
            streamImg={"https://cdn.e-radio.gr/logos/gr/big/teamfm.png"}
        />
        <AudioPlayer 
            streamTitle={"Mousiko Kanali"}
            streamUri={"http://185.78.220.57:9210/stream.mp3"} 
            streamImg={"https://cdn.e-radio.gr/logos/gr/big/musikokanali.png"}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222"
  },
  button : {
      width: 50,
      height: 50
  }
});
