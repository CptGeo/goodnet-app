import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import * as SQLite from "expo-sqlite";
import {FlatGrid} from "react-native-super-grid";

export default function Pinned({navigation}){

    const [pinned, setPinned] = useState([]);
    const [found, setFound] = useState(false);
    
    useEffect( () => {
        const db = SQLite.openDatabase("favourites");

        db.transaction( tx => {
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
            );
        });
    }, []);

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
                    itemDimension={100}
                    data={pinned}
                    // style={styles.gridView}
                    // staticDimension={300}
                    // fixed
                    spacing={10}
                    renderItem={({ item }) => (
                    <View>
                        <Text>{item.id}</Text>
                        <Text>{item.title}</Text>
                        <Text>{item.favourite_url}</Text>
                        <Text>{item.timestamp}</Text>
                    </View>
                    // <RadioStationPicker
                    //     key={item.key}
                    //     stationID={item.key}
                    //     stationImage={item.icon}
                    //     stationTitle={item.title}
                    //     stationUrl={item.url}
                    //     pressHandler={() => stationPress(item)}
                    // />
                )}
            />
            ) : 
            (<Text>Nothing Found</Text>)}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1
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