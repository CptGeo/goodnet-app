import * as React from "react";
import { Text, View, StyleSheet, Button, FlatList, ScrollView} from "react-native";
// import { Audio } from "expo-av";
import playlists from "../settings/streams";
import RadioStationPicker from "../components/RadioStationPicker";
import AudioPlayer from "../components/AudioPlayer";


export default function Radio() {


  const radioItems = playlists.map( item => {
    return (
      <RadioStationPicker
        key={item.key}
        stationImage={item.icon}
        stationTitle={item.title}
        stationUrl={item.url}
      />
    )
  });

  return (
    <View style={styles.container}>
        <FlatList
          data={playlists}
          renderItem={({ item }) => (
            <View styles={styles.gridItem}>
              <RadioStationPicker
                key={item.key}
                stationImage={item.icon}
                stationTitle={item.title}
                stationUrl={item.url}
              />
            </View>
            )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      {/* <AudioPlayer 
            streamTitle={"Team FM"}
            streamUri={"http://185.78.220.57:9200/stream.mp3"} 
            streamImg={"https://cdn.e-radio.gr/logos/gr/big/teamfm.png"}
        />
        <AudioPlayer 
            streamTitle={"Mousiko Kanali"}
            streamUri={"http://185.78.220.57:9210/stream.mp3"} 
            streamImg={"https://cdn.e-radio.gr/logos/gr/big/musikokanali.png"}
        /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  button: {
    width: 50,
    height: 50,
  },
  gridItem : {
    width : 150,
    height : 150,
    backgroundColor: "#ff0000"
  }
  // stationsGrid: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems : "center",
  //   alignContent: 'center',
  // }
});
