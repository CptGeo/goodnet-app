import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Audio } from "expo-av";

export default function AudioPlayer(props) {
  const [playing, setPlaying] = useState(false);

  const [sound, setSound] = useState();

  const [time, setTime] = useState(0);

  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    playThroughEarpieceAndroid: false
  });
  

  async function playSound(e) {
    if(!playing){
        const { sound } = await Audio.Sound.createAsync({ uri: props.streamUri });
        setSound(sound);
        setPlaying(true);
        await sound.playAsync();

        
    }
    else{
        sound.stopAsync();
        setPlaying(false);
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return (
    <View style={styles.container}>
      <View style={styles.thumbWrapper}>
        <Image style={styles.thumb} source={{ uri: props.streamImg }} />
      </View>
      {/* <View>
        <Text style={styles.text}>{props.streamTitle}</Text>
      </View> */}
      {/* <View style={styles.playerControlsWrapper}> */}
        <TouchableOpacity style={styles.playerPrevious}>
          <View style={styles.iconWrapper}>
             <Icon name="skip-previous-circle" size={30} color="#fff" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={(e) => playSound(e)} style={styles.playerPlay}>
          <View style={styles.iconWrapper}>
              {playing ? (<Icon name="pause-circle" size={60} color="#fff" />) : (<Icon name="play-circle" size={60} color="#fff" />)}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.playerNext}>
          <View style={styles.iconWrapper}>
            <Icon name="skip-next-circle" size={30} color="#fff" />
          </View>
        </TouchableOpacity>
      {/* </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
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
  }
});
