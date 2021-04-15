import * as React from "react";
import { Text, View, StyleSheet, Button, FlatList, ScrollView} from "react-native";
// import { Audio } from "expo-av";
import playlists from "../settings/streams";
import RadioStationPicker from "../components/RadioStationPicker";
import AudioPlayer from "../components/AudioPlayer";
import {FlatGrid, SectionGrid} from "react-native-super-grid";

export default function Radio() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Άκου Ραδιόφωνο</Text>
      </View>
      <FlatGrid
        itemDimension={100}
        data={playlists}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <RadioStationPicker
            key={item.key}
            stationImage={item.icon}
            stationTitle={item.title}
            stationUrl={item.url}
          />
        )}
      />
      <AudioPlayer 
        streamUri={"http://185.78.220.57:9210/stream.mp3"}
        streamTitle={"Mousiko Kanali"}
        streamImg={"https://cdn.e-radio.gr/logos/gr/big/musikokanali.png"}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  container : {
    flex : 1,
    backgroundColor : "#eee"
  }
});
