import React, { createContext, useState, useEffect } from 'react';
import * as Location from "expo-location";
import Geocoder from "react-native-geocoding";
import { REACT_APP_OPENWEATHERMAP_API, REACT_APP_GOOGLE_GEOLOCATION_API } from '@env';
export const AppStateContext = createContext();

// Dummy Weather Data (If Daily Free Request Quota Expired)
import weather_dummy_data from "./weather_dummy.json";


export const AppStateProvider = ({ children }) => {
    const [refreshData, setRefreshData ] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState();
    const [locationName, setLocationName] = useState({ country: "England", city: "London", location: "Ealing" });
    const [data, setData] = useState({});
  
    const fetchData = async () => {
      console.log("FETCH DATA");
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
        
        // Dummy Loading Here!!!!!!!!!!!!! Delete this line for real-time data loading
        .finally(() => {
            setData(weather_dummy_data);
            setIsLoading(false);
            setRefreshData(false);
        });

        // Real Time Data Loading HERE Delete Comments to Take Effect
        // Get Weather Data

      
      // Use Verison 2.5 for 40 Iem List (3 hours)
      // fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${ latitude }&lon=${ longitude }&units=metric&appid=${ REACT_APP_OPENWEATHERMAP_API }`)
      //   .then(response_25 => response_25.json())
      //   .then(json_25 => {
      //     // Use Version 3.0 for Detailed Daily Description and Alerst
      //     fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${ latitude }&lon=${ longitude }&units=metric&appid=${ REACT_APP_OPENWEATHERMAP_API }`)
      //       .then(response_30 => response_30.json())
      //       .then(json_30 => {
      //         const data = json_25;
      //         data.version_3 = json_30;  // Append Data with Version 3.0 Data
      //         console.log(data)
      //         setData(data);
      //       })
      //     })
      //     .catch(err => console.log(err))
      //     .finally(() => setIsLoading(false));
        };

    useEffect(() => { 
      if (refreshData) fetchData(); 
    }, [refreshData]);
  
  return (
    <AppStateContext.Provider value={{ 
        refreshData, setRefreshData,
        isLoading, setIsLoading, 
        location, setLocation,
        locationName, setLocationName,
        data, setData,
    }}>
      {children}
    </AppStateContext.Provider>
  );
};



