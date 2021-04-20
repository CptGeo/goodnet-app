import React from "react";
import { Text, View, StyleSheet, Image} from "react-native";
import AudioPlayer from "../components/AudioPlayer";


export default function Radio() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerImageWrapper}>
          <Image style={styles.headerImage} source={require('../assets/goodnet_logo.png')} />
        </View>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>Άκου Ραδιόφωνο</Text>
        </View>
        {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon size={34} color="#fff" name={"menu"} />
        </TouchableOpacity> */}
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
  },
  header : {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#222",
    paddingRight : 10,
    maxHeight : 70,
  },
  headerText: {
    color: "#fff",
    fontSize : 20
  },
  headerImageWrapper: {
    padding : 10,
    backgroundColor: "#fff"
  },
  headerTextWrapper : {
    flex: 4,
    marginLeft : 20
  },
  headerImage: {
    width: 70,
    height: "100%"
  },
});
