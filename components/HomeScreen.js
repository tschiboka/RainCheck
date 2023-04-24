// Dependencies
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Screen, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useEffect, useContext, useState } from 'react';
import { AppStateContext } from '../AppState';


// Components
import DailyWeatherDetail from '../components/DailyWeatherDetail';
import HourlyThumbnail from '../components/HourlyThumbnail';



// Icons
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


// Backgrounds
// Spring Day
const spring_day_clear = require("../assets/backgrounds/spring_day_clear.png");
const spring_day_few_clouds = require("../assets/backgrounds/spring_day_few_clouds.png");
const spring_day_cloudy = require("../assets/backgrounds/spring_day_cloudy.png");
const spring_day_rain = require("../assets/backgrounds/spring_day_rain.png");
const spring_day_storm = require("../assets/backgrounds/spring_day_storm.png");
const spring_day_mist = require("../assets/backgrounds/spring_day_mist.png");

// Spring Night
const spring_night_clear = require("../assets/backgrounds/spring_night_clear.png");
const spring_night_few_clouds = require("../assets/backgrounds/spring_night_few_clouds.png");
const spring_night_cloudy = require("../assets/backgrounds/spring_night_cloudy.png");
const spring_night_rain = require("../assets/backgrounds/spring_night_rain.png");
const spring_night_storm = require("../assets/backgrounds/spring_night_storm.png");
const spring_night_mist = require("../assets/backgrounds/spring_night_mist.png");

// Summer Day
const summer_day_clear = require("../assets/backgrounds/summer_day_clear.png");
const summer_day_few_clouds = require("../assets/backgrounds/summer_day_few_clouds.png");
const summer_day_cloudy = require("../assets/backgrounds/summer_day_cloudy.png");
const summer_day_rain = require("../assets/backgrounds/summer_day_rain.png");
const summer_day_storm = require("../assets/backgrounds/summer_day_storm.png");
const summer_day_mist = require("../assets/backgrounds/summer_day_mist.png");

// Summer Night
const summer_night_clear = require("../assets/backgrounds/summer_night_clear.png");
const summer_night_few_clouds = require("../assets/backgrounds/summer_night_few_clouds.png");
const summer_night_cloudy = require("../assets/backgrounds/summer_night_cloudy.png");
const summer_night_rain = require("../assets/backgrounds/summer_night_rain.png");
const summer_night_storm = require("../assets/backgrounds/summer_night_storm.png");
const summer_night_mist = require("../assets/backgrounds/summer_night_mist.png");

// Autumn Day
const autumn_day_clear = require("../assets/backgrounds/autumn_day_clear.png");
const autumn_day_few_clouds = require("../assets/backgrounds/autumn_day_few_clouds.png");
const autumn_day_cloudy = require("../assets/backgrounds/autumn_day_cloudy.png");
const autumn_day_rain = require("../assets/backgrounds/autumn_day_rain.png");
const autumn_day_storm = require("../assets/backgrounds/autumn_day_storm.png");
const autumn_day_mist = require("../assets/backgrounds/autumn_day_mist.png");

// Autumn Night
const autumn_night_clear = require("../assets/backgrounds/autumn_night_clear.png");
const autumn_night_few_clouds = require("../assets/backgrounds/autumn_night_few_clouds.png");
const autumn_night_cloudy = require("../assets/backgrounds/autumn_night_cloudy.png");
const autumn_night_rain = require("../assets/backgrounds/autumn_night_rain.png");
const autumn_night_storm = require("../assets/backgrounds/autumn_night_storm.png");
const autumn_night_mist = require("../assets/backgrounds/autumn_night_mist.png");

// Winter Day
const winter_day_clear = require("../assets/backgrounds/winter_day_clear.png");
const winter_day_few_clouds = require("../assets/backgrounds/winter_day_few_clouds.png");
const winter_day_cloudy = require("../assets/backgrounds/winter_day_cloudy.png");
const winter_day_rain = require("../assets/backgrounds/winter_day_rain.png");
const winter_day_storm = require("../assets/backgrounds/winter_day_storm.png");
const winter_day_mist = require("../assets/backgrounds/winter_day_mist.png");

// Winter Night
const winter_night_clear = require("../assets/backgrounds/winter_night_clear.png");
const winter_night_few_clouds = require("../assets/backgrounds/winter_night_few_clouds.png");
const winter_night_cloudy = require("../assets/backgrounds/winter_night_cloudy.png");
const winter_night_rain = require("../assets/backgrounds/winter_night_rain.png");
const winter_night_storm = require("../assets/backgrounds/winter_night_storm.png");
const winter_night_mist = require("../assets/backgrounds/winter_night_mist.png");


export default function HomeScreen({ route, navigation }) {
    const [ alertMessageOpen, setAlertMessageOpen ] = useState(false);
    const { isLoading, setIsLoading, data, setData, location, setLocation, locationName, setLocationName, isAlertRead, setIsAlertRead } = useContext(AppStateContext);
    
    return  isLoading ? (
        <View style={ styles.app_loading }>
          <ActivityIndicator size="large" color="white" />
        </View>
    ) : data.list ? (
      (alertMessageOpen && !isAlertRead)
      ? <View style = { styles.alertMessageContainer }>
          <Text style={ styles.alertTitle}>Alert</Text>

          <View style={ styles.alertHeader }>
            <View style={ styles.alertHeaderRow }>
              <Text style={ styles.alertHeaderKey }>Event</Text>
              <Text style={ styles.alertHeaderValue }>{ data.version_3.alerts[0].event }</Text>
            </View>
            <View style={ styles.alertHeaderRow }>
              <Text style={ styles.alertHeaderKey }>Start</Text>
              <Text style={ styles.alertHeaderValue }>{ new Date(data.version_3.alerts[0].start * 1000).toString() }</Text>
            </View>
            <View style={ styles.alertHeaderRow }>
              <Text style={ styles.alertHeaderKey }>End</Text>
              <Text style={ styles.alertHeaderValue }>{ new Date(data.version_3.alerts[0].end * 1000).toString() }</Text>
            </View>
            <View style={ styles.alertHeaderRow }>
              <Text style={ styles.alertHeaderKey }>Sender</Text>
              <Text style={ styles.alertHeaderValue }>{ data.version_3.alerts[0].sender_name }</Text>
            </View>
            <View style={ styles.alertHeaderRow }>
              <Text style={ styles.alertHeaderKey }>Message</Text>
              <Text style={ styles.alertHeaderValue }>{ data.version_3.alerts[0].description }</Text>
            </View>
          </View>

          <View style = { styles.closeAlertButton } >
            <Text 
              onPress={ () => setIsAlertRead(true) } 
              style = {{ fontSize: 16, color: "#999" }}>Got It!
            </Text>
          </View>
        </View>
      : <SafeAreaView style={ styles.container }>
            <View style = { styles.main }>
                <ImageBackground
                   source={ getBackgroundImage(data.list[0].weather[0].icon) }
                   style={ styles.background }
                   imageStyle={{ borderRadius: 40 }}
                >
                <Text style = { styles.date }>{ getFormattedDate() }</Text>

                { 
                  data.version_3.alerts?.length && !isAlertRead &&
                  <View style = { styles.alertContainer } >
                    <Feather style = { styles.alertIcon } name="alert-octagon" />
                    <Text 
                      onPress={ () => showAlert(setIsAlertRead, setAlertMessageOpen, alertMessageOpen) } 
                      style = {{ fontSize: 16, color: "#999" }}>New Weather Alert!</Text>
                    <AntDesign onPress={ () => setIsAlertRead(true) } style = { styles.closeButton }name="closecircleo" />
                  </View>
                }
                <Text style = { styles.location }><EvilIcons name="location" size={ 26 } color="#ccc" />
                     { locationName.location }, { locationName.city }, { locationName.country }
                </Text>
                <View style={ styles.mainTempBox }>
                    <Text style={ styles.mainTempText }>{ (Math.round(Number(data.list[0].main.temp * 10)) / 10).toFixed(1) }</Text>
                    <Text style={ styles.mainTempMeasurement }>C</Text>
                </View>
                </ImageBackground>
           </View>
    
           <View style = { styles.today__details }>
                <DailyWeatherDetail icon="wind" property="Wind" measurement="km/h" value={ Math.round(data.list[0].wind.speed * 3.6) } />
                <DailyWeatherDetail icon="air" property="Pressure" measurement="hPA" value={ data.list[0].main.pressure } />
                <DailyWeatherDetail icon="cloud-rain" property="Precipitation" measurement="mm" value={ data.list[0].rain ? data.list[0].rain["3h"] : 0 } />
                <DailyWeatherDetail icon="water" property="Humidity" measurement="%" value={ data.list[0].main.humidity } />
           </View>

            <View style = { styles.today__hourly }>
                <HourlyThumbnail data={ data.list[0] } current={ true } />
                <HourlyThumbnail data={ data.list[1] } current={ false } />
                <HourlyThumbnail data={ data.list[2] } current={ false } />
                <HourlyThumbnail data={ data.list[3] } current={ false } />
                <HourlyThumbnail data={ data.list[4] } current={ false } />
            </View>
        </SafeAreaView>
    ) : (
        <View style={ styles.app_loading }>
        <Text>No data found</Text>
        </View>
    );
}
  


// Styles
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
    maxHeight: "91%",
  },
  main: {
    position: "relative",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "98%",
    height: "55%",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 30,
  },
  background: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  date: {
    width: "100%",
    paddingHorizontal: 30,
    paddingVertical: 4,
    marginTop: -1,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#050505",
    borderWidth: 2,
    borderColor: "black",
    color: "#aaa",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 2,
    fontWeight: 300,
  },
  mainTempBox: {
    height: 100,
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    alignContent: "flex-end",
    right: "5%",
    bottom: "15%",
  },
  mainTempText: {
    height: 100,
    fontSize: 100,
    fontWeight: "bold",
    color: "white",
    opacity: 0.6,
  },
  mainTempMeasurement: {
    marginLeft: 10,
    height: 75,
    fontSize: 70,
    color: "white",
    fontWeight: "bold",
    opacity: 0.6,
  },
  location: {
    width: "100%",
    paddingVertical: 6,
    marginBottom: -1,
    alignSelf: "center", // Center with Width Auto Fit Text
    fontSize: 20,
    color: "#ccc",
    backgroundColor: "#111",
    borderTopWidth: 1,
    borderColor: "#333",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    fontWeight: 300,
    elevation: 55,
    textAlign: "center"
  },
  today__details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "98%",
    height: "20%",
    borderRadius: 20,
    marginBottom: 10,
  },
  today__hourly: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "98%",
    height: "20%",
    borderRadius: 20,
    marginBottom: 10,
  },
  weather_now: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#222",
    width: "19%",
    height: "100%",
    borderRadius: 20,
  },
  weather_next_hours: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#111",
    width: "19%",
    height: "100%",
    borderRadius: 20,
  },
  navigation: {
    alignItems: "center",
    justifyContent: "center",
    width: "98%",
    height: "5%",
    backgroundColor: "#111",
    borderRadius: 20,
  },
  iconStyle: {
    backgroundColor: "red",
    width: 20,
    height: 20,
  },
  alertContainer: {
    position: "absolute",
    top: "10%",
    minWwidth: "50%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 15,
    borderColor: "#222",
    borderWidth: 1,
  },
  alertIcon: {
    fontSize: 18,
    color: "deeppink",
    fontWeight: "bold",
    marginRight: 10
  },
  closeButton: {
    fontSize: 18,
    marginLeft: 10,
    color: "#aaa"
  },
  alertMessageContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#111",
    zIndex: 100
  },
  alertTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20
  },
  alertHeader: {
    backgroundColor: "#222",
    width: "90%",
    borderRadius: 20,
    padding: 10
  },
  alertHeaderRow: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 5,
  },
  alertHeaderKey: {
    width: "20%",
    borderRightColor: "#000",
    borderRightWidth: 1,
    fontWeight: "bold"
  },
  alertHeaderValue: {
    width: "80%",
    paddingLeft: 10,
    color: "#999"
  },
  closeAlertButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "#222",
    borderColor: "#555",
    borderWidth: 1,
  }
});




function getBackgroundImage(icon) {
  const date = new Date();
  const month = date.getMonth();
  const seasons = ["winter", "winter", "spring", "spring", "spring", "summer", "summer", "summer", "autumn", "autumn", "autumn", "winter"];
  const season = seasons[month];
  const dayTime = icon.match(/n|d/g)[0] === "d" ? "day" : "night";
  const weatherCode = Number(icon.match(/\d+/g)[0]);
  const weathers = ["", "clear", "few_clouds", "cloudy", "cloudy", "", "", "", "", "rain", "rain", "storm", "", "mist"];
  const weather = weathers[weatherCode];
  
  if (season === "spring") {
    if (dayTime === "day") {
      switch(weather) {
        case "clear": return spring_day_clear;
        case "few_clouds": return spring_day_few_clouds;
        case "cloudy": return spring_day_cloudy;
        case "rain": return spring_day_rain;
        case "storm": return spring_day_storm;
        case "mist": return spring_day_mist;
      }
    }
    if (dayTime === "night") {
      switch(weather) {
        case "clear": return spring_night_clear;
        case "few_clouds": return spring_night_few_clouds;
        case "cloudy": return spring_night_cloudy;
        case "rain": return spring_night_rain;
        case "storm": return spring_night_storm;
        case "mist": return spring_night_mist;
      }
    }
  }

  if (season === "summer") {
    if (dayTime === "day") {
      switch(weather) {
        case "clear": return summer_day_clear;
        case "few_clouds": return summer_day_few_clouds;
        case "cloudy": return summer_day_cloudy;
        case "rain": return summer_day_rain;
        case "storm": return summer_day_storm;
        case "mist": return summer_day_mist;
      }
    }
    if (dayTime === "night") {
      switch(weather) {
        case "clear": return summer_night_clear;
        case "few_clouds": return summer_night_few_clouds;
        case "cloudy": return summer_night_cloudy;
        case "rain": return summer_night_rain;
        case "storm": return summer_night_storm;
        case "mist": return summer_night_mist;
      }
    }
  }

  if (season === "autumn") {
    if (dayTime === "day") {
      switch(weather) {
        case "clear": return autumn_day_clear;
        case "few_clouds": return autumn_day_few_clouds;
        case "cloudy": return autumn_day_cloudy;
        case "rain": return autumn_day_rain;
        case "storm": return autumn_day_storm;
        case "mist": return autumn_day_mist;
      }
    }
    if (dayTime === "night") {
      switch(weather) {
        case "clear": return autumn_night_clear;
        case "few_clouds": return autumn_night_few_clouds;
        case "cloudy": return autumn_night_cloudy;
        case "rain": return autumn_night_rain;
        case "storm": return autumn_night_storm;
        case "mist": return autumn_night_mist;
      }
    }
  }

  if (season === "winter") {
    if (dayTime === "day") {
      switch(weather) {
        case "clear": return winter_day_clear;
        case "few_clouds": return winter_day_few_clouds;
        case "cloudy": return winter_day_cloudy;
        case "rain": return winter_day_rain;
        case "storm": return winter_day_storm;
        case "mist": return winter_day_mist;
      }
    }
    if (dayTime === "night") {
      switch(weather) {
        case "clear": return winter_night_clear;
        case "few_clouds": return winter_night_few_clouds;
        case "cloudy": return winter_night_cloudy;
        case "rain": return winter_night_rain;
        case "storm": return winter_night_storm;
        case "mist": return winter_night_mist;
      }
    }
  }
  return spring_day_clear
}



const pad = n => n < 10 ? "0" + n : n;
function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
  const day = pad(date.getDate());
  const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
  const hour = pad(date.getHours());
  const min = pad(date.getMinutes());
  const formattedDate = `${ day }. ${ month }. ${ year }, ${ dayName }, ${ hour }:${ min }`;
  
  return formattedDate;
}



function showAlert(setIsAlertRead, setAlertMessageOpen, alertMessageOpen) {
  console.log("READ ALERT", alertMessageOpen);
  setAlertMessageOpen(true);
 // setIsAlertRead(true);
}