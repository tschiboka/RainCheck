// Dependencies
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Screen, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useEffect, useContext } from 'react';
import { AppStateContext } from '../AppState';

// Icons
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
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

  

export default function DailyScreen(props) {
    const dayData = props.dayData;
    const isMetric = props.isMetric;
    const dataPoints = getHourlyDataList(dayData);
    const { highestDailyTemp, lowestDailyTemp, avgDailyTemp } = getDailyTempSummary(dayData);
    return (
        <View style={ styles.dailyReport }>
            <View style={ styles.header }>
                <View style={ styles.title }>
                  <Text style={ styles.name }>{ props.name.toUpperCase() }</Text>
                  <Text style={ styles.date }>{ getFormattedDate(dayData[0].dt) }</Text>
                </View>
                <View style={ styles.weatherInfo }>
                    { getIcon("cloud-rain") }
                    <Text style={ styles.weatherValue }>{ getTotalRain(dayData) }</Text>
                </View>
                <View style={ styles.weatherInfo }>
                    { getIcon("wind") }
                    <Text style={ styles.weatherValue }>{ getAverageWind(dayData) }</Text>
                </View>
                <View style={ styles.weatherInfo }>
                    { getIcon("water") }
                    <Text style={ styles.weatherValue }>{ getAverageHumidity(dayData) }</Text>
                </View>
                <View style={ styles.weatherInfo }>
                    { getIcon("air") }
                    <Text style={ styles.weatherValue }>{ getAveragePressure(dayData) }</Text>
                </View>
            </View>
            <View style={ styles.body }>
                <View style={ styles.chartContainer }>
                    {
                        Object.keys(dataPoints).map((key, index) => createDataPoint(dataPoints[key], index, props.lowestWeeklyTemp, props.highestWeeklyTemp), props.name, isMetric)
                    }
                </View>
                <View style={ styles.chartExplanation }>
                    <View style={ styles.explanation }>
                        <FontAwesome5 name="temperature-low" size={16} color="#aaa" />
                        <Text style={{ color: "#777" }}>{ isMetric ? highestDailyTemp : getFahrenheit(highestDailyTemp) }</Text>
                    </View>
                    <View style={ styles.explanation }>
                        <Feather name="sun" size={16} color="#aaa" />
                        <Text style={{ color: "#777" }}>{ isMetric ? avgDailyTemp : getFahrenheit(avgDailyTemp) }</Text>
                    </View>
                    <View style={ styles.explanation }>
                        <FontAwesome5 name="moon" size={16} color="#aaa" />
                        <Text style={{ color: "#777" }}>{ isMetric ? lowestDailyTemp : getFahrenheit(lowestDailyTemp) }</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}



const pad = n => n < 10 ? "0" + n : n;
function getFormattedDate(dateUnix) {
  const date = new Date(dateUnix * 1000);
  const year = date.getFullYear();
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
  const day = pad(date.getDate());
  const formattedDate = `${ day }. ${ month }. ${ year }`;
  
  return formattedDate;
}



function getTotalRain(data) {
    const rain = data.map(r => r.rain ? r.rain["3h"] : 0).reduce((a, b) => a + b);
    return Math.round(rain * 10) / 10;
}



function getIcon(icon) {
    switch(icon) {
      case "wind": return <Feather name="wind" style={ styles.upperIcon} />
      case "air": return <Entypo name="air" style={ styles.upperIcon} />
      case "cloud-rain": return <Feather name="cloud-rain" style={ styles.upperIcon} />
      case "water": return <Entypo name="water" style={ styles.upperIcon} />
    }
}



function getAverageWind(data) {
    const mpsToKmph = 3.6;
    const winds = data.map(r => r.wind.speed * mpsToKmph);
    const totalWinds = winds.reduce((a, b) => a + b);
    const avgWinds = Math.round(totalWinds / winds.length * 10) / 10;

    return avgWinds;
}



function getAverageHumidity(data) {
    const humidities = data.map(r => r.main.humidity);
    const totalHumidity = humidities.reduce((a, b) => a + b);
    const avgHumidity = Math.round(totalHumidity / humidities.length * 10) / 10;

    return avgHumidity;
}



function getAveragePressure(data) {
    const pressures = data.map(r => r.main.pressure);
    const totalPressures = pressures.reduce((a, b) => a + b);
    const avgPressure = Math.round(totalPressures / pressures.length);

    return avgPressure;
}



function getHourlyDataList(data) {
    const hours = { "1": null, "4": null, "7": null, "10": null, "13": null, "16": null, "19": null, "22": null }
    data.forEach(dataPoint => {
        const date = new Date(dataPoint.dt * 1000);
        const hour = date.getHours();
        hours[hour] = dataPoint;
    });
    return hours;
}



function createDataPoint(data, index, lowestWeeklyTemp, highestWeeklyTemp, name, isMetric) {
    if (!data) return (
        <View style={ styles.dataPoint } key={ "datapoint" + name + index }>
            <View style={ styles.weatherIcon }></View>
            <View style={ styles.bar }></View>
            <View style={ styles.temperature }><Text style={{ color: "#999" }}>-</Text></View>
        </View>
    );
    
    const icon = getWeatherIcon(data.weather[0].icon)
    const totalDiff = highestWeeklyTemp - lowestWeeklyTemp;
    const temp = data.main.temp;
    const avgPc = Math.round(((temp - lowestWeeklyTemp) / totalDiff) * 100);
    const colorBand = Math.floor(avgPc / 20);
    const backgroundColor = ["aqua", "springgreen", "yellow", "orange", "deeppink"][colorBand];

    return (
        <View style={ styles.dataPoint } key={ "datapoint" + name + index }>
            <View style={ styles.weatherIcon }>
                <Image source={ icon } style={ styles.hourlyWeatherIcon } />
            </View>
            <View style={ styles.bar }>
                <View style={ [ styles.thumb, { backgroundColor, height: avgPc + "%" } ] }></View>
            </View>
            <View style={ styles.temperature }><Text style={{ color: "#999" }}>{ isMetric ? Math.round(data.main.temp * 10) / 10 : getFahrenheit(data.main.temp) }</Text></View>
        </View>
    );
}


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



function getDailyTempSummary(data) {
    const temps = data.map(d => d.main.temp);
    const totalTemps = temps.reduce((a, b) => a + b);
    const avgDailyTemp = Math.round((totalTemps / temps.length) * 10) / 10;
    const minTemps = data.map(d => d.main.temp_min);
    const lowestDailyTemp = Math.round(Math.min(...minTemps) * 10) / 10;
    const maxTemps = data.map(d => d.main.temp_max);
    const highestDailyTemp = Math.round(Math.min(...maxTemps) * 10) / 10;
    
    return { highestDailyTemp, lowestDailyTemp, avgDailyTemp }
}


const getFahrenheit = celsius => Math.round(Number(celsius) * 1.8 + 32);



// Style
const styles = StyleSheet.create({
  dailyReport: {
    width: "96%",
    marginLeft: "2%",
    minHeight: 200,
    marginBottom: 20,
    alignItems: "center",
    padding: 1,
    backgroundColor: "#111",
    borderColor: "#222",
    borderWidth: 1,
    borderRadius: 20,
  },
  header: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    backgroundColor: "#0a0a0a",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 2,
    borderColor: "090909",
  },
  title: {
    width: "30%",
    height: "100%",
    justifyContent: "space-evenly",
    alignContent: "center",
  },
  name: {
    paddingLeft: 10,
    color: "white",
  },
  date: {
    paddingLeft: 10,
    color: "#999",
  },
  weatherInfo: {
    width: "17.5%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  upperIcon: {
    fontSize: 16,
    color: "#aaa",
  },
  weatherValue: {
    fontSize: 14,
    color: "#777",
  },
  body: {
    height: 150,
    width: "96%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  chartContainer: {
    width: "82.5%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  dataPoint: {
    alignItems: "center",
    width: "11%",
    height: 140,
  },
  weatherIcon: {
    width: "100%",
    height: "20%",
    opacity: 0.6,
  },
  hourlyWeatherIcon: {
    width: "80%",
    height: "100%",
    resizeMode: "contain",
  },
  bar: {
    width: "35%",
    height: "60%",
    justifyContent: "flex-end",
    backgroundColor: "#0a0a0a",
    borderColor: "#050505",
    borderWidth: 1,
    borderRadius: 10,
  },
  thumb: {
    borderRadius: 10,
    height: "100%",
    width: "100%",
    borderColor: "#000",
    borderWidth: 1,
    opacity: 0.5,
  },
  temperature: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  chartExplanation: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "15%",
    height: "100%",
  },
  explanation: {
    height: "25%",
    justifyContent: "space-evenly",
    alignItems: "center",
  }
});