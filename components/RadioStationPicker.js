import React from "react";
import {StyleSheet} from "react-native";
import {FlatGrid} from "react-native-super-grid";
import RadioStationItem from "../components/RadioStationItem";

export default function RadioStationPicker(props) {
    return (
        <FlatGrid
            itemDimension={100}
            data={props.playlists}
            style={styles.gridView}
            spacing={10}
            renderItem={({ item }) => (
            <RadioStationItem
                key={item.key}
                stationID={item.key}
                stationImage={item.icon}
                stationTitle={item.title}
                stationUrl={item.url}
                pressHandler={() => props.pressHandler(item)}
            />
        )}
      />
    )
}


const styles = StyleSheet.create({
    gridView: {
        flex: 1,
      },
})