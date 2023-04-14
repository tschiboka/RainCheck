import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';


function getIcon(icon) {
  switch(icon) {
    case "wind": return <Feather name="wind" size={30} color="#aaa" />
    case "air": return <Entypo name="air" size={30} color="#aaa" />
    case "cloud-rain": return <Feather name="cloud-rain" size={30} color="#aaa" />
    case "water": return <Entypo name="water" size={30} color="#aaa" />
  }
}

export default function DailyWeatherDetail(props) {
  return (
    <View style = { styles.dailyDetail }>
          <View style={ styles.iconBox }>{ getIcon(props.icon) }</View>
          <View style={ styles.middleText }><Text style = {{ color: "#999" }}>{ props.property }</Text></View>
          <View style={ styles.middleText }><Text style = {{ color: "#777" }}>{ props.measurement }</Text></View>
          <View style = { styles.bottomText }><Text style = {{ fontSize: 20 }}>{ props.value }</Text></View>
    </View>
  )
}


const styles = StyleSheet.create({
    dailyDetail: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "23%",
        height: "100%",
        backgroundColor: "#151515",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#222",
    },
    iconBox: {
        width: "100%",
        height: "40%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        borderWidth: 1, 
        borderColor: "#222",
        backgroundColor: "#111", 
    },
    middleText: {
        width: "85%",
        height: "15%",
        marginHorizontal: 20,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        color: "#999",
        borderBottomWidth: 1, 
        borderColor: "#0a0a0a",
    },
    bottomText: { 
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        height: "20%",
        fontSize: 24, 
        color: "#111", 
        fontWeight: "bold",
        width: "90%", 
        textAlign: "center", 
    }
});