import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Audio } from "expo-av";
import playlists from "../settings/streams";
import {FlatGrid, SectionGrid} from "react-native-super-grid";
import RadioStationPicker from "../components/RadioStationPicker";

export default function AudioPlayer(props) {
  const [sound, setSound] = useState();
  const [time, setTime] = useState(0);


  //new
  const [activeImg, setActiveImg] = useState("");
  const [activeTitle, setActiveTitle] = useState("");
  const [activeUrl, setActiveUrl] = useState("");
  const [activeID, setActiveID] = useState("");
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);




  // Audio.setAudioModeAsync({
  //   // allowsRecordingIOS: false,
  //   // staysActiveInBackground: true,
  //   // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
  //   // playsInSilentModeIOS: true,
  //   // shouldDuckAndroid: true,
  //   // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
  //   // playThroughEarpieceAndroid: false
  // });
  

  async function playSound(soundUri) {
    try{
      const { sound } = await Audio.Sound.createAsync({ uri: soundUri});
      setSound(sound);
      setPlaying(true);
      await sound.playAsync();
    }
    catch{
      console.log("Radio station not working");
    }
  }

  async function stopSound(){
    if(active){
      sound.stopAsync();
      setPlaying(false);
    }
  }




  function stationPress(item){

    if(!playing){
      setActiveImg(item.icon);
      setActiveTitle(item.title);
      setActiveUrl(item.url);
      setActiveID(item.key);
      playSound(item.url);
      setActive(true);
      
    }
    else if(activeID != item.key){
      setActiveImg(item.icon);
      setActiveTitle(item.title);
      setActiveUrl(item.url);
      setActiveID(item.key);
      stopSound();
      playSound(item.url);

    }
  }



  // Delete the below if not needed
  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);


  return (

    <View style={styles.outer}>
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
              stationID={item.key}
              stationImage={item.icon}
              stationTitle={item.title}
              stationUrl={item.url}
              pressHandler={() => stationPress(item)}
            />
          )}
        />
      {active ? (
      <View style={styles.container}>
        <View style={styles.thumbWrapper}>
          <Image style={styles.thumb} source={{ uri: activeImg }} />
        </View>
          <TouchableOpacity style={styles.playerPrevious}>
            <View style={styles.iconWrapper}>
              <Icon name="skip-previous-circle" size={30} color="#fff" />
            </View>
          </TouchableOpacity>

          {!playing ? (
            <TouchableOpacity onPress={() => playSound(activeUrl)} style={styles.playerPlay}>
            <View style={styles.iconWrapper}>
                <Icon name="play-circle" size={60} color="#fff"/>
            </View>
            </TouchableOpacity>
          ) : (
          <TouchableOpacity onPress={() => stopSound()} style={styles.playerPlay}>
            <View style={styles.iconWrapper}>
                <Icon name="pause-circle" size={60} color="#fff"/>
            </View>
          </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.playerNext}>
            <View style={styles.iconWrapper}>
              <Icon name="skip-next-circle" size={30} color="#fff" />
            </View>
          </TouchableOpacity>
      </View> ) : (<></>)}
    </View>

  );
}

const styles = StyleSheet.create({
  outer : {
    flex : 1
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxHeight: 65,
    width: "100%",
    paddingHorizontal : 15,
    backgroundColor: "#4374ca",

    borderTopEndRadius : 15,
    borderTopStartRadius : 15,

  },
  thumbWrapper : {
    width : "40%"
  }, 
  thumb: {
    width: 65,
    height: 65,
  },
  iconWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height : 100
  },
  text: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  playerControlsWrapper : {
    flex : 1,
    flexDirection : "row",
    alignContent : "center",
    justifyContent : "space-between",
    width : "40%",
    minWidth : 230
  },
  playerNext : {
    flex : 1,
    marginLeft : 10,
    opacity : 0.8
  },
  playerPlay : {
    flex : 1,
    height : 65
  },
  playerPrevious : {
    flex : 1,
    marginRight : 10,
    opacity : 0.8
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
});
