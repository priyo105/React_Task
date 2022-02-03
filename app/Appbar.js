import React from "react";
import {View,Text} from 'react-native'

export default function Appbar(props){

    return(
        <View style={{height:70,backgroundColor:"black"}}>
             <Text style={{color:"white",textAlign:"center",marginTop:20}}>{props.title}</Text>
        </View>
    )


}