import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Audio } from "expo-av";
import playlists from "../settings/streams";
import RadioStationPicker from "./RadioStationPicker";

export default function RadioStationPlayerGrid(props) {
  const [sound, setSound] = useState();
  const [time, setTime] = useState(0);


  const [activeImg, setActiveImg] = useState("");
  const [activeUrl, setActiveUrl] = useState("");
  const [activeID, setActiveID] = useState("");
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);


  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    playThroughEarpieceAndroid: false
  });

  

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
      setTime(0);
    }
  }



  async function stationPress(item){

    if(!playing){
      setActiveImg(item.icon);
      setActiveUrl(item.url);
      setActiveID(item.key);
      playSound(item.url);
      setActive(true);
      // startCountingSeconds();
    }
    else if(activeID != item.key){
      setActiveImg(item.icon);
      setActiveUrl(item.url);
      setActiveID(item.key);
      stopSound();
      playSound(item.url);
    }
  }


  React.useEffect(() => {
      const timer = time >= 0 && setInterval(() => setTime(time + 1), 1000);
      return () => clearInterval(timer);
  }, [time]);


  function formatSecondsToTime(sec){
    var sec_num = parseInt(sec, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}
    return hours + ':' + minutes + ':' + seconds;
  }


  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);


  return (

    <View style={styles.outer}>
      <RadioStationPicker playlists={playlists} pressHandler={stationPress}/>

      {active ? (
      <View style={styles.container}>
        <View style={styles.thumbWrapper}>
          <Image style={styles.thumb} source={{ uri: activeImg }} />
        </View>
          {!playing ? (
            <View style={styles.containerInner}>
              <Text></Text>
              <TouchableOpacity onPress={() => playSound(activeUrl)} style={styles.playerPlay}>
                <View style={styles.iconWrapper}>
                    <Icon name="play-circle" size={60} color="#fff"/>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.containerInner}>
            <Text style={styles.timer}>{formatSecondsToTime(time)}</Text>
            <TouchableOpacity onPress={() => stopSound()} style={styles.playerPlay}>
              <View style={styles.iconWrapper}>
                  <Icon name="pause-circle" size={60} color="#fff"/>
              </View>
            </TouchableOpacity>
            </View>
          )}
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
    paddingHorizontal: 15,
    backgroundColor: "#4374ca",
    borderTopEndRadius : 15,
    borderTopStartRadius : 15,
  },
  containerInner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    height : 100,
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
    height : 65,
  },
  playerPrevious : {
    flex : 1,
    marginRight : 10,
    opacity : 0.8
  },
  timer: {
    color: "#333",
    fontSize: 22,
    backgroundColor: "rgba(255,255,255,1)",
    height: 45,
    borderRadius: 50,
    textAlignVertical: "center",
    paddingHorizontal: 15,

    elevation:15,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 5, 
  },
});
