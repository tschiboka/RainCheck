// Dependencies
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Screen, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useEffect, useContext } from 'react';
import { AppStateContext } from '../AppState';

// Icons
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
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



export default function HourlyScreen({ navigation }) {
    const { isLoading, setIsLoading, data, setData, location, setLocation, locationName, setLocationName } = useContext(AppStateContext);
    console.log("HOURLY SCREEN RENDER");
    return  isLoading ? (
      <View style={ styles.app_loading }>
      <ActivityIndicator size="large" color="white" />
      </View>
  ) : data.list ? (
      <SafeAreaView style={ styles.container }>
        <View style={ styles.headerContainer }>
          <FontAwesome name="umbrella" style={ styles.headerImage } />
          <Text style={ styles.header }>Hourly Forecast</Text>
        </View>
        <View style={ styles.currentContainer }>
          <View style={ [styles.currentContainerRow, { backgroundColor: "#0a0a0a", borderTopLeftRadius: 20, borderTopRightRadius: 20 }] }>
            <View style={ [styles.currentContainerCell, {  width: "18%" }] }>
              <Text style={{ fontSize: 18, fontWeight: "bold", width: "100%", textAlign: "left", color: "#ddd" }}>{ getDay(data.list[0].dt) }</Text>
            </View>
            <View style={ [styles.currentContainerCell, {  width: "18%" }] }>
              <Image source={ getWeatherIcon(data.list[0].weather[0].icon) } style={ styles.currentIcon }></Image>
            </View>
            <View style={ [styles.currentContainerCell, {  width: "18%" }] }>
              <Text style={{ color: "white", fontWeight: "bold" }}>{ Math.round(Number(data.list[0].main.temp_min * 10)) / 10 } C</Text>
              <Text style={{ color: "#ddd" }}>Min</Text>
            </View>
            <View style={ [styles.currentContainerCell, {  width: "18%" }] }>
            <Text style={{ color: "white", fontWeight: "bold" }}>{ Math.round(Number(data.list[0].main.temp_max * 10)) / 10 } C</Text>
              <Text style={{ color: "#ddd" }}>Max</Text>
            </View>
            <View style={ [styles.currentContainerCell, {  width: "18%" }] }>
            <Text style={{ color: "white", fontWeight: "bold" }}>{ Math.round(Number(data.list[0].main.feels_like * 10)) / 10 } C</Text>
              <Text  style={{ color: "#ddd" }}>Feel</Text>
            </View>
          </View>
          <View style={ styles.currentContainerRow }>
            <View style={ styles.currentContainerCell }>
              <Text style={{ textAlign: "left", width: "100%", fontWeight: "bold", color: "#ddd" }}>Wind</Text>
            </View>
            <View style={ [styles.currentContainerCell, { borderRightWidth: 1, borderColor: "#050505" }] }>
              <Text style={{ color: "#999" }}>{ Math.round(data.list[0].wind.speed * 3.6) } km/h</Text>
            </View>
            <View style={ styles.currentContainerCell }>
              <Text style={{ textAlign: "left", width: "100%", fontWeight: "bold", color: "#ddd" }}>Rain</Text>
            </View>
            <View style={ styles.currentContainerCell }>
              <Text style={{ color: "#999" }}>{ data.list[0].rain ? data.list[0].rain["3h"]: "" } mm</Text>
            </View>
          </View>
          <View style={ [styles.currentContainerRow, { borderBottomWidth: 0 }] }>
            <View style={ styles.currentContainerCell }>
              <Text style={{ textAlign: "left", width: "100%", fontWeight: "bold", color: "#ddd" }}>Pressure</Text>
            </View>
            <View style={ [styles.currentContainerCell, { borderRightWidth: 1, borderColor: "#050505" }] }>
              <Text style={{ color: "#999" }}>{ data.list[0].main.pressure } hPA</Text>
            </View>
            <View style={ styles.currentContainerCell }>
              <Text style={{ textAlign: "left", width: "100%", fontWeight: "bold", color: "#ddd" }}>Humidity</Text>
            </View>
            <View style={ styles.currentContainerCell }>
              <Text style={{ color: "#999" }}>{ data.list[0].main.humidity } %</Text>
            </View>
          </View>      
        </View>
        <View style={ styles.hourlyListContainerOuter  }>
          <ScrollView style={ styles.scroll }>
            <View style={ styles.hourlyListContainer }>
              { getListItems(data) }
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
  ) : (
      <View style={ styles.app_loading }>
      <Text>No data found</Text>
      </View>
  );
}




function getListItems(data) {
  const { lowestWeeklyTemp, highestWeeklyTemp } = { ...getTemperatureExtremes(data) };
  return data.list.map((item, index) => 
  <View style={ styles.hourlyItem } key={`hourlyListItem_${ index }`}>
      <View style={ styles.listDateTime }>
          <View style={ styles.listDay }><Text style={{ fontWeight: "bold", color: "#ddd" }}>{ getShortDay(item.dt) }</Text></View>
          <View style={ styles.listTime }><Text style={{ color: "#999" }}>{ getTime(item.dt) }</Text></View>
      </View>
      <View style={ styles.listIconContainer }>
        <Image style={ styles.listIcon } source={ getWeatherIcon(item.weather[0].icon) }></Image>
      </View>
      <View style={ styles.listRainContainer }>
        <Entypo name="water" style={ styles.listRainIcon } />
        <Text style={ styles.listRainText }>{ item.rain ? item.rain["3h"]: "-" }</Text>
      </View>
      <View style={ styles.listDiagramContainer }>
        <View style={ styles.diagram }>
          { getDiagram(item, lowestWeeklyTemp, highestWeeklyTemp) }
        </View>
      </View>
      <View style={ styles.listTempContainer }>
      <Text style={{ fontWeight: "bold", color: "#ddd" }}>{ Math.round(Number(item.main.temp * 10)) / 10 } C</Text>
      </View>
    </View>
  )
}



function getDay(d) {
  const date = new Date(d * 1000);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()];
}



function getShortDay(d) {
  const date = new Date(d * 1000);
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[date.getDay()];
}




function getTime(d) {
  const date = new Date(d * 1000);  // Uniqe Style Time Handling (in secs)
  let hour = date.getHours();
  let amPm = "AM";
  if (hour > 12) {
    hour = hour - 12;
    amPm = "PM";
  }

  return hour + " " + amPm;
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



function getTemperatureExtremes(data) {
  const lowestWeeklyTemp = Math.floor(Math.min(...data.list.map(d => d.main.temp_min)));
  const highestWeeklyTemp = Math.ceil(Math.max(...data.list.map(d => d.main.temp_max)));
  return { lowestWeeklyTemp, highestWeeklyTemp }
}



function getDiagram(item, lowestWeeklyTemp, highestWeeklyTemp) {
  const minTemp = item.main.temp_min;
  const maxTemp = item.main.temp_max;
  const minDiff = minTemp - lowestWeeklyTemp;
  const maxDiff = highestWeeklyTemp - maxTemp;
  const totalDiff = highestWeeklyTemp - lowestWeeklyTemp + (highestWeeklyTemp - lowestWeeklyTemp) / 10;
  const startPc = (minDiff / totalDiff) * 100;
  const endPc = (maxDiff / totalDiff) * 100;
  const temp = item.main.temp;
  const avgPc = Math.round(((temp - lowestWeeklyTemp) / totalDiff) * 100);
  const colorBand = Math.floor(avgPc / 20);
  const color = ["aqua", "springgreen", "yellow", "orange", "deeppink"][colorBand];
  return <View style={ [ 
    styles.diagramThumb, { 
      marginLeft: startPc + "%",
      marginRight: endPc + "%",
      backgroundColor: color
    }]}></View>
}




// Style
const styles = StyleSheet.create({
  app_loading: {
    flex: 1,
    backgroundColor: '#050505',
    alignItems: "center",
    justifyContent: "center",
    minWidth: "100%",
    minHeight: "90%"
  },
  container: {
    flex: 1,
    backgroundColor: '#050505',
    alignItems: "center",
    justifyContent: "space-between",
    height: "91%",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderColor: "#222",
    marginBottom: 10,
  },
  headerImage: {
    padding: 5,
    textAlign: 'center',
    color: "aqua",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 20,
    backgroundColor: "black"
  },
  header: {
    margin: 10,
    fontSize: 20,
    color: "#ddd"
  },
  currentContainer: {
    width: "98%",
    height: "20%",
    justifyContent: "space-evenly",
    margin: "2%",
    alignItems: "center",
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 20,
    backgroundColor:"#151515",
  },
  currentContainerRow: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    width: "98%",
    height: "30%",
    borderBottomWidth: 1,
    borderColor: "#000"
  },
  currentContainerCell: {
    width: "20%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  currentIcon: {
    width: "80%",
    height: "80%",
    resizeMode: "contain"
  },
  hourlyListContainerOuter: {
    flex: 1,
    width: "98%",
    height: "70%",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 20,
    backgroundColor: "black",
    marginBottom: "20%",
  },
  scroll: {
    marginLeft: "1%",
    marginBottom: 5,
    marginTop: 5,
  },
  hourlyListContainer: {
    flex: 1,
    width: "99%",
    maxHeight: "55%",
    paddingVertical: "2%",
    alignItems: "center",
  },
  hourlyItem: {
    flexDirection: "row",
    width: "98%",
    height: 50,
    marginBottom: 10,
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#222",
    color: "#999",
    borderRadius: 15,
  },
  listDateTime: {
    width: "13%",
    height: "100%",
    borderRightWidth: 2,
    borderColor: "#000",
    backgroundColor: "#0a0a0a",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  listDay: {
    width: "100%",
    height: "50%",
    paddingLeft: 10,
    justifyContent: "center",
  },
  listTime: {
    width: "100%",
    height: "50%",
    paddingLeft: 10,
  },
  listIconContainer: {
    width: "13%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  listIcon: {
    width: "70%",
    resizeMode: "contain"
  },
  listRainContainer: {
    width: "13%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#222",
  },
  listRainIcon: {
    fontSize: 10,
    color: "#999"
  },
  listRainText: {
    color: "#555"
  },
  listDiagramContainer: {
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    backgroundColor: "#111"
  },
  diagram: {
    width: "90%",
    height: 15,
    backgroundColor: "#090909",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
  },
  listTempContainer: {
    width: "13%",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: "#222"
  },
  diagramThumb: {
    height: "100%",
    minWidth: "10%",
    borderRadius: 10,
    opacity: 0.8,
  }
});