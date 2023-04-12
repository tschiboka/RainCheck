import React from 'react';
import { View, StyleSheet } from "react-native";

export default function DailyWeatherDetail(props) {
  return (
    <View style = { styles.dailyDetail }>{ props.children }</View>
  )
}


const styles = StyleSheet.create({
    dailyDetail: {
        paddingBottom: 20,
        paddingTop: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "23%",
        height: "100%",
        backgroundColor: "#151515",
        borderRadius: 20,
    },
});