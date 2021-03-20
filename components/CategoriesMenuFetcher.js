import React, {Component} from "react";
import { Text } from "react-native";
import CategoriesMenu from "./CategoriesMenu";

export default class CategoriesMenuFetcher extends Component{

    constructor(props){
        super();
        this.state = {
            cats : '', 
            catsOk : false
        }
    }

    componentDidMount(){
        fetch("https://goodnet.gr/share/categories.json")
        .then(response => response.json())
        .then(data => {
            this.setState(
                {
                    cats : data,
                    catsOk : true
                }
            )
        })
        .catch(error => console.log(error));
    }

    render(){
        if(this.state.catsOk){
            let categories = this.state.cats.sitemap.categories.map(item => {return {title : item.title, url : item.url , key : item.id}});
            return(
                <CategoriesMenu categories={categories}/>
            );
        }
        else
            return <Text>Fetching...</Text>
    }

}