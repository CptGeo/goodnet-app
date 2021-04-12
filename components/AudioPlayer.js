import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Audio } from "expo-av";

export default function AudioPlayer(props) {
  const [playing, setPlaying] = useState(false);

  const [sound, setSound] = useState();

  
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
      <View>
        <Image style={styles.thumb} source={{ uri: props.streamImg }} />
      </View>
      <View>
        <Text style={styles.text}>{props.streamTitle}</Text>
      </View>
      {true ? (
        <TouchableOpacity onPress={(e) => playSound(e)}>
          <View style={styles.iconWrapper}>
              {playing ? (<Icon name="pause-circle" size={50} color="#fff" />) : (<Icon name="play-circle" size={50} color="#fff" />)}
          </View>
        </TouchableOpacity>
      ) : (
        <Text>Playing</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxHeight: 100,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: "#555",
  },
  thumb: {
    width: 100,
    height: 100,
  },
  iconWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
  },
  text: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
  },
});
