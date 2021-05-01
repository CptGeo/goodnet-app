import * as SQLite from 'expo-sqlite';
import React from "react";

export default class FavouritesDB extends React.Component{

    constructor(props, name){
        super(props);
        this.db = SQLite.openDatabase(name);
        this.state = {
            sqlResult : false
        }
        console.log(props);
    }

    addToFavourites(title, url, image){
        const query = "INSERT INTO favourite_news (title, favourite_url, img_src) VALUES (?, ?, ?)";
        this.db.transaction(tx => {
            tx.executeSql(query, [title, url, image], (tx, rs) => {
                this.setState({
                    sqlResult : true
                });
            }, this.errorHandler);
        });
    }

    removeFromFavouritesById(id) {
        //remove by id query
    }
    
    removeFromFavouritesByTitle(title) {
        //remove by title query
    }
    
    removeFromFavouritesByUrl(url) {
        //remove by url query
    }

    isFavourite(url){
        //check if is favourite by url
        const query = "SELECT * FROM favourite_news WHERE favourite_url = ? ";
        let result = this.db.transaction(tx => {
            tx.executeSql(
                query, 
                url, 
                (tx, rs) => {
                    if(rs.rows.length > 0){
                        this.setState({
                            sqlResult : true
                        });
                    }else{
                        this.setState({
                            sqlResult : false
                        }); 
                    }
                },
                this.errorHandler
            );
        });
        return this.state.sqlResult;
    }


    errorHandler(tx, err) {
        console.log("Error");
        console.log(err);
        this.setState({
            sqlResult : false
        }); 
    }

}