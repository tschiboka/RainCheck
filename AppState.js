import React, { createContext, useState, useEffect } from 'react';
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import { REACT_APP_OPENWEATHERMAP_API, REACT_APP_GOOGLE_GEOLOCATION_API } from '@env';
export const AppStateContext = createContext();

// Dummy Weather Data (If Daily Free Request Quota Expired)
import weather_dummy_data from "./weather_dummy.json";


export const AppStateProvider = ({ children }) => {
    const [refreshData, setRefreshData ] = useState(true);
    const [locationAllowed, setLocationAllowed] = useState(true);  // Check If User Allowed Location on Phone (Coords not null)
    const [useMyLocation, setUseMyLocation] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState();
    const [locationName, setLocationName] = useState({ country: "England", city: "London", location: "Ealing" });
    const [data, setData] = useState({});
    const [isAlertRead, setIsAlertRead] = useState(false);
    const [isMetric, setMetric] = useState(true);
  
    const fetchData = async () => {
      console.log("FETCH DATA");
      // Get Access to Location
      if (useMyLocation) {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) return;
        
        const currentLocation = await Location.getLastKnownPositionAsync();
        // Get Longitude and Latitude
        if (!currentLocation) {
          if (locationAllowed) {
            setIsLoading(false);
            setLocationAllowed(false);
          }
        }
        else {
            if (!locationAllowed || !isLoading) {
              setLocationAllowed(true);
            }
            const { coords: { latitude, longitude } } = currentLocation;
            setLocation({ latitude, longitude });
          
            // Get Location Descriptive Text (Country, City...)
            Geocoder.init(REACT_APP_GOOGLE_GEOLOCATION_API);
            Geocoder.from({ lat: latitude, lng: longitude })
              .then(async json => {
                const country = json.results[0].address_components[5].long_name;
                const city = json.results[0].address_components[2].long_name;
                const location = json.results[0].address_components[1].long_name;
                const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
                const countryCode = geocode[0].isoCountryCode;
                console.log(geocode)
                setLocationName({ country, city, location, countryCode });
              })
              .catch(err => console.log(err))
  
              // Dummy Loading Here!!!!!!!!!!!!! Delete this line for real-time data loading
              // .finally(() => {
              //     console.log("USE DUMMY DATA");
              //     setData(weather_dummy_data);
              //     setIsLoading(false);
              // });
            
              // Real Time Data Loading HERE Delete Comments to Take Effect
              // Get Weather Data
            // Use Verison 2.5 for 40 Iem List (3 hours)
            console.log("FETCH API DATA")
            fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${ latitude }&lon=${ longitude }&units=metric&appid=${ REACT_APP_OPENWEATHERMAP_API }`)
              .then(response_25 => response_25.json())
              .then(json_25 => {
                // Use Version 3.0 for Detailed Daily Description and Alerst
                fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${ latitude }&lon=${ longitude }&units=metric&appid=${ REACT_APP_OPENWEATHERMAP_API }`)
                  .then(response_30 => response_30.json())
                  .then(json_30 => {
                    const data = json_25;
                    data.version_3 = json_30;  // Append Data with Version 3.0 Data
                    console.log(data)
                    setData(data);
                  })
                })
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false));
        }
      }
      else {
        console.log("Custom Location")
        // Get Location Descriptive Text (Country, City...)
        Geocoder.init(REACT_APP_GOOGLE_GEOLOCATION_API);
        Geocoder.from({ lat: location.latitude, lng: location.longitude })
        .then(async json => {
          console.log(JSON.stringify(json));
          const { lat, lng } = { ...json.results[0].geometry.location }
          const geocode = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
          const country = geocode[0].country;
          const city = json.results[0].address_components[2].long_name;
          const location = json.results[0].address_components[1].long_name;
          const countryCode = geocode[0].isoCountryCode;
          setLocationName({ country, city, location, countryCode });
        })
        .then(async res => {
          // Use Verison 2.5 for 40 Iem List (3 hours)
          fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${ location.latitude }&lon=${ location.longitude }&units=metric&appid=${ REACT_APP_OPENWEATHERMAP_API }`)
            .then(response_25 => response_25.json())
            .then(json_25 => {
              // Use Version 3.0 for Detailed Daily Description and Alerst
              fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${ location.latitude }&lon=${ location.longitude }&units=metric&appid=${ REACT_APP_OPENWEATHERMAP_API }`)
                .then(response_30 => response_30.json())
                .then(json_30 => {
                  const data = json_25;
                  data.version_3 = json_30;  // Append Data with Version 3.0 Data
                  //console.log(data)
                  setData(data);
                })
              })
              .catch(err => console.log(err))
              .finally(() => setIsLoading(false));
        })
        .catch(err => console.log(err))
      }
    };

    useEffect(() => { 
      if (refreshData) { 
        fetchData();
        setRefreshData(false);
      }
    }, [refreshData]);
  
  return (
    <AppStateContext.Provider value={{ 
        refreshData, setRefreshData,
        locationAllowed, setLocationAllowed,
        useMyLocation, setUseMyLocation,
        isLoading, setIsLoading, 
        location, setLocation,
        locationName, setLocationName,
        data, setData,
        isAlertRead, setIsAlertRead,
        isMetric, setMetric,
    }}>
      {children}
    </AppStateContext.Provider>
  );
};



