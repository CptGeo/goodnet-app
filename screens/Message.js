import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Message() {
  const [image, setImage] = useState(null);
  const [value, onChangeText] = React.useState("");
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Sorry! You need to grant camera permission in order to take a picture."
          );
        }
      }
    })();
  }, []);

  useEffect(() => {});

  const messageInput = useRef(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerImageWrapper}>
            <Image
              style={styles.headerImage}
              source={require("../assets/goodnet_logo.png")}
            />
          </View>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.headerText}>Στείλε Μήνυμα</Text>
          </View>
        </View>

        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}

        <View style={styles.itemWrapper}>
          <View>
            <Text>Μήνυμα</Text>
          </View>

          <View>
            <TextInput
              multiline
              style={styles.messageInput}
              placeholder={"Παρακαλώ, εισάγετε το μήνυμά σας..."}
              onChangeText={(text) => onChangeText(text)}
              value={value}
              ref={messageInput}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#222",
    paddingRight: 10,
    maxHeight: 70,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
  },
  headerImageWrapper: {
    padding: 10,
    backgroundColor: "#fff",
  },
  headerTextWrapper: {
    flex: 4,
    marginLeft: 20,
  },
  headerImage: {
    width: 70,
    height: "100%",
  },
  messageInput: {
    minHeight: 60,
    width: "100%",
  },
  itemWrapper : {
    borderColor: "gray",
    borderWidth: 1,
    padding: 15,
  }
});
