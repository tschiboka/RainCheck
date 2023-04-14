import React from 'react';
import { View, StyleSheet, Text, Image } from "react-native";
import { Feather } from '@expo/vector-icons';



function getHour(d) {
    const date = new Date(d * 1000);  // Uniqe Style Time Handling (in secs)
    let hour = date.getHours();
    let amPm = "AM";
    if (hour > 12) {
      hour = hour - 12;
      amPm = "PM";
    }
  
    return hour + " " + amPm;
}


const icon_00 = require("../assets/weather_icons/00.png");
const icon_01d = require("../assets/weather_icons/01d.png");
const icon_01n = require("../assets/weather_icons/01n.png");
const icon_02d = require("../assets/weather_icons/02d.png");
const icon_02n = require("../assets/weather_icons/02n.png");
const icon_03d = require("../assets/weather_icons/03d.png");
const icon_03n = require("../assets/weather_icons/03n.png");
const icon_09d = require("../assets/weather_icons/09d.png");
const icon_09n = require("../assets/weather_icons/09n.png");
const icon_10 = require("../assets/weather_icons/10.png");
const icon_11 = require("../assets/weather_icons/11.png");


function getWeatherIcon(icon) {
    switch(icon) {
      case "01d": return icon_01d;
      case "01n": return icon_01n;
      case "02d": return icon_02d;
      case "02n": return icon_02n;
      case "03d": return icon_03d;
      case "03n": return icon_03n;
      case "04d": return icon_03d;
      case "04n": return icon_03n;
      case "09d": return icon_09d;
      case "09n": return icon_09n;
      case "10d": return icon_10;
      case "10n": return icon_10;
      case "11d": return icon_11;
      case "11n": return icon_11;
      default: return icon_00;
    }
  }
  
  


export default function HourlyThumbnail(props) {
    return (
      <View style = { props.current ? styles.weather_now : styles.weather_next_hours }>
        <View style = { styles.weatherTop }>
            {
                props.current 
                    ? <Text style = {{ fontWeight: (props.current ? "bold" : "normal"), color: "#aaa" }}>NOW</Text>
                    : <Text style = {{ color: "#999" }}>{ getHour(props.data.dt) }</Text>
            }
        </View>
        <View style = { styles.weatherMiddle }>
            <View style = { styles.weatherIconBox }>
                <Image 
                    style = { styles.weatherIcon }
                    source= { getWeatherIcon(props.data.weather[0].icon) }></Image>
            </View>
            { 
                props.data.rain && props.data.rain["3h"] 
                ? <View style = { styles.rain }>
                    <Feather name="cloud-rain" size={12} color="#999" />
                    <Text style={{ color: "#ccc" }}>{ props.data.rain["3h"] }</Text>
                </View> 
                : "" }
        </View>
        <View style = { styles.weatherBottom }>
            <Text style={{ 
                fontSize: 18,
                fontWeight: props.current ? "bold" : "normal", color: props.current ? "#ddd" : "#aaa"}}>
                { (Math.round(Number(props.data.main.temp * 10)) / 10).toFixed(1) }
            </Text>
        </View>
      </View>
    )
}


const styles = StyleSheet.create({
    weather_now: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#191919",
        borderWidth: 2,
        borderColor: "#333",
        width: "19%",
        height: "100%",
        borderRadius: 20,
      },
      weather_next_hours: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "#111",
        width: "19%",
        height: "100%",
        borderWidth: 1,
        borderColor: "#222",
        borderRadius: 20,
      },
      weatherIconBox: {
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        height: "70%",
      },
      weatherIcon: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
      },
      weatherTop: {
        width: "100%",
        height: "20%",
        fontSize: 16, 
        color: "#aaa",
        borderColor: "#000",
        borderBottomWidth: 2,
        backgroundColor: "#0a0a0a",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      weatherMiddle: {
        width: "100%",
        height: "60%",
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 16, 
        color: "#aaa",
        textAlign: "center",
      },
      weatherBottom: {
        width: "100%",
        height: "20%",
        fontSize: 16, 
        color: "#aaa",
        borderColor: "#252525",
        borderTopWidth: 2,
        backgroundColor: "#1d1d1d",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
      rain: {
        width: "100%",
        height: "50%",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        borderTopWidth: 1,
        borderColor: "#0a0a0a"
      }
});