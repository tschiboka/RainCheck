// Dependencies
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Screen, StyleSheet, Text, View, Image, Button } from 'react-native';
import { useEffect, useContext } from 'react';
import { AppStateContext } from '../AppState';

// Icons
import { FontAwesome } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
    const { isLoading, setIsLoading, data, setData, location, setLocation, locationName, setLocationName, refreshData, setRefreshData } = useContext(AppStateContext);
    console.log("SETTINGS RENDER")
    return  isLoading ? (
      <View style={ styles.app_loading }>
      <ActivityIndicator size="large" color="white" />
      </View>
  ) : data.list ? (
      <SafeAreaView style={ styles.container }>
        <View style={ styles.headerContainer }>
          <FontAwesome name="umbrella" style={ styles.headerImage } />
          <Text style={ styles.header }>Settings</Text>
        </View>

        <Text onPress={ () => {console.log("CLICK"); setRefreshData(true);} } style={ styles.refreshButton }>Refresh Weather Data</Text>

        <View style={ styles.unitSelection }>

        </View>
      </SafeAreaView>
  ) : (
      <View style={ styles.app_loading }>
      <Text>No data found</Text>
      </View>
  );
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
    color: "#aaa"  
  },
  refreshButton: {
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 20,
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#222",
    fontSize: 16,
  },
  unitSelection: {

  }
});