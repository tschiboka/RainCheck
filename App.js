import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, StyleSheet, Text, View, Image, ImageBackground, TouchableWithoutFeedback, Button, Alert, Platform, Dimensions, useWindowDimensions } from 'react-native';
import DailyWeatherDetail from './components/DailyWeatherDetail';
import { useEffect, useState } from 'react';
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import { REACT_APP_OPENWEATHERMAP_API, REACT_APP_GOOGLE_GEOLOCATION_API } from '@env';



// Icons
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
const icon_00 = require("./assets/weather_icons/00.png");
const icon_01d = require("./assets/weather_icons/01d.png");
const icon_01n = require("./assets/weather_icons/01n.png");
const icon_02d = require("./assets/weather_icons/02d.png");
const icon_02n = require("./assets/weather_icons/02n.png");
const icon_03d = require("./assets/weather_icons/03d.png");
const icon_03n = require("./assets/weather_icons/03n.png");
const icon_09d = require("./assets/weather_icons/09d.png");
const icon_09n = require("./assets/weather_icons/09n.png");
const icon_10 = require("./assets/weather_icons/10.png");
const icon_11 = require("./assets/weather_icons/11.png");



const pad = n => n < 10 ? "0" + n : n;
function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
  const day = pad(date.getDate());
  const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
  const hour = pad(date.getHours());
  const min = pad(date.getMinutes());
  const formattedDate = `${ day }.${ month }.${ year } ${ dayName } ${ hour }:${ min }`;
  
  return formattedDate;
}



function getHour(d) {
  const date = new Date(d * 1000);  // Uniq Style Time Handling (in secs)
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



export default function App() {  
  const [isLoading, setLoading] = useState(true);
  const [location, setLocation] = useState();
  const [locationName, setLocationName] = useState({ country: "England", city: "London", location: "Ealing" });
  const [data, setData] = useState({});

  
  const fetchData = async () => {
    // Get Access to Location
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) return;
    
    // Get Longitude and Latitude
    const { coords: { latitude, longitude } } = await Location.getLastKnownPositionAsync();
    setLocation({ latitude, longitude });
    
    // Get Location Descriptive Text (Country, City...)
    Geocoder.init(REACT_APP_GOOGLE_GEOLOCATION_API);
    Geocoder.from({ lat: latitude, lng: longitude })
      .then(json => {
        const country = json.results[0].address_components[4].long_name;
        const city = json.results[0].address_components[2].long_name;
        const location = json.results[0].address_components[1].long_name;
        setLocationName({ country, city, location });
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  
    // Get Weather Data
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${ latitude }&lon=${ longitude }&units=metric&appid=${ REACT_APP_OPENWEATHERMAP_API }`)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }
  
  useEffect(() => { fetchData(); }, []);
  if (data.list) {
    
    data.list.forEach(d => {
      const pad = n => n < 10 ? "0" + n : n;
      const date = new Date(d.dt * 1000);
      const year = date.getFullYear();
      const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
      const day = pad(date.getDate());
      const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
      const hour = pad(date.getHours());
      const min = pad(date.getMinutes());
      const formattedDate = `${ day }.${ month }.${ year } ${ dayName } ${ hour }:${ min }`;
    });
  }

  
  return isLoading ? (
    <View style={ styles.app_loading }>
      <ActivityIndicator size="large" color="white" />
    </View>
  ) : data.list ? (
    <SafeAreaView style={ styles.container }>
      <View style = { styles.main }>
        <ImageBackground 
          source={ require("./assets/backgrounds/summer_day_clear.png") } 
          style={ styles.background }
          imageStyle={{ borderRadius: 40 }}
        >
          <Text style = { styles.date }>{ getFormattedDate() }</Text>
          <Text style = { styles.location }><EvilIcons name="location" size={ 26 } color="#333" />{ locationName.location }, { locationName.city }, { locationName.country }</Text>
        </ImageBackground>
      </View>
      
      <View style = { styles.today__details }>
        <DailyWeatherDetail>
          <Feather name="wind" size={24} color="black" />
          <Text>Wind</Text>
          <Text style = { { fontSize: 24, color: "#111" } }>{ data.list[0].wind.speed }</Text>
        </DailyWeatherDetail>
        
        <DailyWeatherDetail>
          <Entypo name="air" size={24} color="black" />
          <Text>Pressure</Text>
          <Text style = { { fontSize: 24, color: "#111" } }>{ data.list[0].main.pressure }</Text>
        </DailyWeatherDetail>
          
        <DailyWeatherDetail>
          <Feather name="cloud-rain" size={24} color="black" />
          <Text>Precipitation</Text>
          <Text style = { { fontSize: 24, color: "#111" } }>{ data.list[0].rain["3h"] }</Text>
        </DailyWeatherDetail>

        <DailyWeatherDetail>
          <Entypo name="water" size={24} color="black" />
          <Text>Humidity</Text>
          <Text style = { { fontSize: 24, color: "#111" } }>{ data.list[0].main.humidity }</Text>
        </DailyWeatherDetail>
        </View>
  
        <View style = { styles.today__hourly }>
          <View style = { styles.weather_now }>
            <Text style = { { fontSize: 16, color: "#111" } }>NOW</Text>
            <Image style = { styles.weatherIcon } source={ getWeatherIcon(data.list[0].weather[0].icon) }></Image>
            <Text style = { { fontSize: 22, color: "#111" } }>{ data.list[0].main.temp.toFixed(1) }</Text>
          </View>
          <View style = { styles.weather_next_hours }>
            <Text style = { { fontSize: 16, color: "#111" } }>{ getHour(data.list[1].dt) }</Text>
            <Image style = { styles.weatherIcon } source={ getWeatherIcon(data.list[1].weather[0].icon) }></Image>
            <Text style = { { fontSize: 18, color: "#111" } }>{ data.list[1].main.temp.toFixed(1) }</Text>
          </View>  
          <View style = { styles.weather_next_hours }>
            <Text style = { { fontSize: 16, color: "#111" } }>{ getHour(data.list[2].dt) }</Text>
            <Image style = { styles.weatherIcon } source={ getWeatherIcon(data.list[2].weather[0].icon) }></Image>
            <Text style = { { fontSize: 18, color: "#111" } }>{ data.list[2].main.temp.toFixed(1) }</Text>
          </View>  
          <View style = { styles.weather_next_hours }>
            <Text style = { { fontSize: 16, color: "#111" } }>{ getHour(data.list[3].dt) }</Text>
            <Image style = { styles.weatherIcon } source={ getWeatherIcon(data.list[3].weather[0].icon) }></Image>
            <Text style = { { fontSize: 18, color: "#111" } }>{ data.list[3].main.temp.toFixed(1) }</Text>
          </View>  
          <View style = { styles.weather_next_hours }>
            <Text style = { { fontSize: 16, color: "#111" } }>{ getHour(data.list[4].dt) }</Text>
            <Image style = { styles.weatherIcon } source={ getWeatherIcon(data.list[4].weather[0].icon) }></Image>
            <Text style = { { fontSize: 18, color: "#111" } }>{ data.list[4].main.temp.toFixed(1) }</Text>
          </View>  
        </View>
  
        <View style = { styles.navigation }>
  
        </View>
    </SafeAreaView>
  ) : (
    <View style={ styles.app_loading }>
      <Text>No data found</Text>
    </View>
  ) 
}



const styles = StyleSheet.create({
  app_loading: {
    flex: 1,
    backgroundColor: '#050505',
    alignItems: "center",
    justifyContent: "center",
    minWidth: "100%",
    minHeight: "100%"
  },
  container: {
    flex: 1,
    backgroundColor: '#050505',
    alignItems: "center",
    justifyContent: "space-between",
  },
  main: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "98%",
    height: "50%",
    marginBottom: 10,
  },
  background: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  date: {
    paddingHorizontal: 30,
    paddingVertical: 4,
    marginTop: -1,
    alignSelf: "center", // Center with Width Auto Fit Text
    fontSize: 20,
    backgroundColor: "#111",
    borderWidth: 2,
    borderColor: "black",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 2,
    fontWeight: 300,
  },
  location: {
    width: "100%",
    paddingVertical: 4,
    marginBottom: -1,
    alignSelf: "center", // Center with Width Auto Fit Text
    fontSize: 20,
    backgroundColor: "#111",
    borderWidth: 2,
    borderColor: "black",
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
    backgroundColor: "rgba(0, 0, 0, 0.2)",
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
  weatherIcon: {
    width: "80%",
    height: "50%",
    resizeMode: "contain"
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
  }
});



{/* <Text 
onPress={ handleTextOnPress }
numberOfLines= { textLines }
      >
        Hello World! This is a really really long text that expands on a press. Try pressing this text!
      </Text>
      <StatusBar style="auto" />
      <TouchableWithoutFeedback onPress={ () => Alert.prompt("ICON PRESSED") }>
        <Image 
          source={ require("./assets/favicon.png") } 
          style={ styles.image }
        />
      </TouchableWithoutFeedback>
      <Button 
        title="THEME"
        onPress={ () => Alert.alert("THEME", Appearance.getColorScheme(), [{ "text": "Sod Off!" }, {"text": "Oki Doc"}]) }
      />

      <Button 
        title="Press Me"
        onPress={ () => Alert.alert("Button Press Count", ++buttonPressed + "", [{ "text": "Sod Off!" }, {"text": "Oki Doc"}]) }
      />


      <Button 
        title="Get Dimensions"
        onPress={ () => Alert.alert("Screen Dimensions", dimensionsStrt , [{ "text": "Sod Off!" }, {"text": "Oki Doc"}]) }
      /> */}