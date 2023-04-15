// Dependencies
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Screen, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useEffect, useContext } from 'react';
import { AppStateContext } from '../AppState';

// Icons
import { FontAwesome } from '@expo/vector-icons';

// Componenets
import  DailyReport  from "./DailyReport";

export default function DailyScreen({ navigation }) {
    const { isLoading, setIsLoading, data, setData, location, setLocation, locationName, setLocationName } = useContext(AppStateContext);
    const { lowestWeeklyTemp, highestWeeklyTemp } = { ...getTemperatureExtremes(data) };
    console.log("DAILY SCREEN RENDER")
    const sortedByDay = sortByDay(data);
    //console.log(Object.keys(sortedByDay));
    return  isLoading ? (
      <View style={ styles.app_loading }>
      <ActivityIndicator size="large" color="white" />
      </View>
  ) : data.list ? (
      <SafeAreaView style={ styles.container }>
        <View style={ styles.headerContainer }>
          <FontAwesome name="umbrella" style={ styles.headerImage } />
          <Text style={ styles.header }>Daily Forecast</Text>
        </View>

        <View style = {{ width: "100%", height: "85%"}}>
          <ScrollView style={ styles.scroll }>
            { 
              Object.keys(sortedByDay).map(day => sortedByDay[day].length 
              ? <DailyReport 
                key={ day } 
                name={ day } 
                dayData={ sortedByDay[day] } 
                lowestWeeklyTemp={ lowestWeeklyTemp }
                highestWeeklyTemp={ highestWeeklyTemp }
                />
              : "")
            }
          </ScrollView>
        </View>
      </SafeAreaView>
  ) : (
      <View style={ styles.app_loading }>
      <Text>No data found</Text>
      </View>
  );
}




function sortByDay(data) {
  if (!data || !data.list) return null;
  
  const sorted = { };
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dayIndex = date.getDay();
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayIndex];

    if (sorted[day]) sorted[day].push(item) 
    else sorted[day] = [ item ] 
  });
  return sorted;
}



function getTemperatureExtremes(data) {
  const lowestWeeklyTemp = Math.floor(Math.min(...data.list.map(d => d.main.temp_min)));
  const highestWeeklyTemp = Math.ceil(Math.max(...data.list.map(d => d.main.temp_max)));
  return { lowestWeeklyTemp, highestWeeklyTemp }
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
    height: "91%",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#111',
    borderBottomWidth: 1,
    borderColor: "#222"
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
  scroll: {
    marginTop: 20,
    width: "100%",
    height: "50%",
  }
});