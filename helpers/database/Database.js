import * as SQLite from 'expo-sqlite';


function transactionError(tx, err){
    console.log("Query has error");
    console.log(err);
}

function transactionSuccess(tx, rs){
    console.log("Query Success");
    console.log(err);
}
