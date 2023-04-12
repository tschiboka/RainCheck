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

function getFormattedDate() {
  const pad = n => n < 10 ? "0" + n : n;
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



export default function App() {  
  const [isLoading, setLoading] = useState(true);
  const [location, setLocation] = useState();
  const [locationName, setLocationName] = useState({ country: "England", city: "London", location: "Ealing" });
  const [data, setData] = useState({});

  console.log(REACT_APP_OPENWEATHERMAP_API)
  console.log(REACT_APP_GOOGLE_GEOLOCATION_API)

  
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
          <FontAwesome5 name="temperature-high" size={ 20 } color="#555" />
          <Text>Temperature</Text>
          <Text style = { { fontSize: 24, color: "#111" } }>{ data.list[0].main.temp }C</Text>
        </DailyWeatherDetail>

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
            <Entypo name="water" size={24} color="black" />
            <Text>Humidity</Text>
            <Text style = { { fontSize: 24, color: "#111" } }>{ data.list[0].main.humidity }</Text>
          </DailyWeatherDetail>
        </View>
  
        <View style = { styles.today__hourly }>
          
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
    alignItems: "center",
    justifyContent: "center",
    width: "98%",
    height: "20%",
    backgroundColor: "#111",
    borderRadius: 20,
    marginBottom: 10,
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