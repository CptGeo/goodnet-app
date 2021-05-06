import React, { useContext, useState, useEffect } from "react";
import {TouchableOpacity} from 'react-native-gesture-handler'
import {StyleSheet, View, Text, Image} from "react-native";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import UrlContext from "../components/UrlContext";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("favourites");

export default function FavouritesToggle(props){
    const urlContext = useContext(UrlContext);
    const [favourite, setFavourite] = useState(false);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');


    const isNewsUrl = (url = '') => {
        if(url === ''){
            url = urlContext.value;
        }
        const checkFor = ["news-item"];
        let isNews = checkFor.filter( item => url.includes(item) );
        return isNews.length > 0;
    }
  
    const toggleFavourite = () => {
        //Check if already added 
  
        if(favourite){
            //delete from favourites
            const query = "DELETE FROM favourite_news WHERE favourite_url = ? ";
            db.transaction(tx => {
                tx.executeSql(query, [urlContext.value], (tx, rs) => {
                    setFavourite(false);
                }, errorDB);
            })
        }
        else{
            //insert to favourites
            const query = "INSERT INTO favourite_news (title, favourite_url, img_src) VALUES (?, ?, ?)";
            if(title && urlContext.value && image){
                db.transaction(tx => {
                    tx.executeSql(query, [title, urlContext.value, image], (tx, rs) => {
                        setFavourite(true);
                    }, errorDB);
                })
            }
        }
    }
    const errorDB = (tx, err) => {
      console.log("Error");
      console.log(err);
    }
  
    //comment
    const checkIfFavourite = () => {
      const query = "SELECT * FROM favourite_news WHERE favourite_url = ? ";
      db.transaction(tx => {
          tx.executeSql(
              query, 
              [urlContext.value], 
              (tx, rs) => {
                  if(rs.rows.length > 0){
                      setFavourite(true);
                  }else{
                      setFavourite(false);
                  }
              },
              (tx, err) => {
                  console.log("Query Error");
                  console.log(err);
              }
          );
      });
    }
  
    useEffect( () => {
      if(isNewsUrl()) {
          checkIfFavourite();
      }
    });

    useEffect( () => {
        if(isNewsUrl()) {
            fetch(urlContext.value)
            .then(res => res.text())
            .then(data => {
                try{
                    let t = data.split('<meta property="og:title" content="')[1].split('" />')[0];
                    let i = data.split('<meta property="og:image" content="')[1].split('">')[0];
    
                    setImage(i);
                    setTitle(t);
                }catch(e){
                    console.log(e);
                }
    
            })
        }
      }, [urlContext.value]);

    return(
        <View style={styles.favoritesBtn}>
            {isNewsUrl(urlContext.value) ? (
            <TouchableOpacity onPress={() => toggleFavourite()}>
                {favourite ? 
                    (<Icon size={30} color={props.color} name={props.activeIcon} />) : 
                    (<Icon size={30} color={props.color} name={props.icon} />)
                }
            </TouchableOpacity>
            ) : <></>}
        </View>
    )
}

const styles = StyleSheet.create({
    favoritesBtn: {
        right: 10,
        zIndex: 999,
        width : 34,
        height : 34,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    }
})