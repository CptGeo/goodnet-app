import React, { useState, useEffect, useRef } from "react";
import { Button, Image, View, Platform, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from "react-native";
import PageHeader from "../components/PageHeader";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default function Message() {
  const [image, setImage] = useState(null);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");


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

  // useEffect(() => {});

  const messageInput = useRef(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  const removeImage = () => {
    setImage("");
  }

  const sendMessage = () => {
    alert("OK");
  }

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <View style={styles.container}>
        <PageHeader title={"Στείλε Μήνυμα"}/>
        <ScrollView style={styles.container}>
          <View>
            <View style={styles.itemWrapper}>
              <View style={styles.labelWrapper}>
                <Text style={styles.label}>Τίτλος</Text>
              </View>
              <View>
                <TextInput
                  style={styles.titleInput}
                  placeholder={"Παρακαλώ, εισάγετε τίτλο για την είδησή σας..."}
                  onChangeText={(text) => setTitle(text)}
                  value={title}
                  ref={messageInput}
                />
              </View>
            </View>
            
            <View style={styles.itemWrapper}>
              <View style={styles.labelWrapper}>
                <Text style={styles.label}>Μήνυμα</Text>
              </View>
              <View>
                <TextInput
                  multiline
                  style={styles.messageInput}
                  placeholder={"Παρακαλώ, εισάγετε το μήνυμά σας..."}
                  onChangeText={(text) => setMessage(text)}
                  value={message}
                  ref={messageInput}
                />
              </View>
            </View>

            <View style={styles.itemWrapper}>
              <View style={styles.labelWrapper}>
                <Text style={styles.label}>Επιλογή εικόνας</Text>
              </View>
              <View>
                <Button 
                title={image ? "Επιλεξτε αλλη εικονα" : "Επιλεξτε εικονα για αποστολη"} 
                color={"#222"} 
                onPress={pickImage} />
                <Text style={styles.smallText}>Μέγιστο όριο 2MB</Text>
                {image ? (
                  <View style={styles.imageWrapper}>
                    <TouchableOpacity style={styles.removeImage} onPress={removeImage}>
                      <Icon size={28} color="#eee" name={"delete-forever"} />
                    </TouchableOpacity>
                    <Image source={{ uri: image }} style={styles.image} />
                  </View>
                ) : <></>}
              </View>
            </View>

            <View style={styles.itemWrapper}>
              {/* <View style={styles.labelWrapper}>
                <Text style={styles.label}>Αποστολή μηνύματος</Text>
              </View> */}
              <View>
                <Button title="Αποστολη ειδησης" color={"#4374ca"} onPress={sendMessage}/>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageInput: {
    width: "100%",
  },

  label: {
    color: "#999",
    fontStyle: "italic",
    paddingBottom: 4
  },
  labelWrapper:{
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 15
  },
  itemWrapper : {
    borderColor: "#999",
    borderWidth: 2,
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: "#fff",


    elevation:10,
    shadowColor: '#888',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 5, 
  },
  smallText: {
    fontSize: 11,
    color: "#888",
    textAlign: "right"
  },
  image: {
    width: "100%", 
    height: 350
  },
  imageWrapper: {
    position: "relative",
    marginTop: 15
  },
  removeImage: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 9999,
    backgroundColor: "#777",
    borderRadius: 50,
    padding: 5,
    elevation:10,
    shadowColor: '#888',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 5, 
  }
});
