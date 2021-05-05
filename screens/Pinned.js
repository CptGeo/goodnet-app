import React, {useState, useEffect, useContext} from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import * as SQLite from "expo-sqlite";
import {FlatGrid} from "react-native-super-grid";
// import { Icon } from "react-native-vector-icons/Icon";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import TabContext from "../components/TabContext";
import UrlContext from "../components/UrlContext";
export default function Pinned({navigation}){

    const [pinned, setPinned] = useState([]);
    const [found, setFound] = useState(false);
    
    const [favouritesDB, setFavouritesDB] = useState(SQLite.openDatabase("favourites")); 

    const tabsCtx = useContext(TabContext);
    const urlCtx = useContext(UrlContext);

    useEffect( () => {
        // favouritesDB = SQLite.openDatabase("favourites");
        favouritesDB.transaction( tx => {
            const query = "SELECT * FROM favourite_news WHERE 1 ORDER BY timestamp DESC";
            tx.executeSql(
                query, 
                [],
                (tx, rs) => {
                    if(rs.rows.length > 0){
                        setFound(true);
                        
                        //parse result
                        let len = rs.rows.length;
                        let items = [];
                        for(let i = 0; i < len; i++ ){
                            items.push(rs.rows.item(i));
                        }
                        setPinned(items);
                    }
                    else{
                        setFound(false);
                    }
                },
                (tx, err) => {
                    console.log("Query Error");
                    console.log(err);
                }
            )
        });
    }, []);


    
    const readFavourite = item => {
        //set favourite url state
        urlCtx.handler(item.favourite_url);

        //change tab to the reader
        tabsCtx.handler("frontpage");
    }

    const removeFromFavourites = item => {
        const query = "DELETE FROM favourite_news WHERE id = ?";
        favouritesDB.transaction(tx => {
            tx.executeSql(
                query, 
                [item.id], 
                (tx, rs) => {
                    //update state of shown favourites
                    setPinned(pinned.filter(i => i.id !== item.id ));
                }, 
                errorDB
            );
        })
    }

    const errorDB = (tx, err) => {
        console.log("Error");
        console.log(err);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerImageWrapper}>
                    <Image style={styles.headerImage} source={require('../assets/goodnet_logo.png')} />
                </View>
                <View style={styles.headerTextWrapper}>
                    <Text style={styles.headerText}>Αγαπημένα άρθρα</Text>
                </View>
            </View>



            {found ? (
                // <Text>Found</Text>
                <FlatGrid
                    itemDimension={180}
                    data={pinned}
                    style={styles.gridView}
                    // staticDimension={300}
                    // fixed
                    spacing={10}
                    renderItem={({ item }) => (
                    
                    <TouchableOpacity style={styles.item} onPress={() => readFavourite(item)}>
                        {item.img_src ? 
                            (<Image style={styles.itemThumb} source={{uri : item.img_src}}/>) :
                            (<Image style={styles.itemThumb} source={require('../assets/goodnet_logo.png')}/>)
                        }
                        
                        {item.title ? (
                            <View style={styles.itemTextWrapper}>
                                <Text style={styles.itemText}>{item.title.slice(0,68).concat("...")}</Text>
                            </View>
                        ) : 
                            (<View style={styles.itemTextWrapper}>
                                <Text style={styles.itemText}>No title available</Text>
                            </View>
                        )}
                        {item.favourite_url ? (
                            <TouchableOpacity style={styles.favoritesBtn} onPress={() => removeFromFavourites(item)}>
                                <Icon size={34} color="#db2625" name={"heart"} />
                            </TouchableOpacity>)
                        : (<></>)
                        }

                    </TouchableOpacity>
                )}
            />
            ) : 
            (
                <View style={styles.nothingFoundWrapper}>
                    <Text style={styles.nothingFound}>Δεν έχετε κανένα αγαπημένο άρθρο ...</Text>
                </View>
            )}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
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
      item : {
        flexDirection : "row",
        flex : 1,
        justifyContent : "space-between",

        borderRadius: 9,
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5, 
        overflow : "hidden"
      },
      itemThumb: {
        width: 180,
        height: 180,
        marginRight : 15,
      },
      itemTextWrapper: {
          flexDirection : "row",
          position: "absolute",
          zIndex : 99,
          width : "100%",
          bottom : 0,
      },
      itemText : {
        color: "#fff",
        padding : 10,
        fontSize : 15,
        textShadowColor: '#00000099',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2, 
      },
      favoritesBtn: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 99,
        width : 34,
        height : 34,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    nothingFoundWrapper: {
        flex: 1,
        textAlign: "center",
        alignItems: "center",
        padding: 30,
        backgroundColor: "#eee",
        justifyContent: "center"
    },
    nothingFound: {
        color: "#999"
    }
});