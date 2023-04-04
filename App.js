// app.json orientation is set defult, set portrait for fixing orientation
import { useDimensions } from '@react-native-community/hooks'; // DONT USE IT, DEPRICATED
import { Appearance } from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableWithoutFeedback, Button, Alert, Platform, Dimensions, useWindowDimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer';

export default function App() {  
  return (
    <SafeAreaView style={ styles.container }>
      <View style = { styles.main }>  
        <ImageBackground 
          source={ require("./assets/backgrounds/summer_day_clear.png") } 
          style={ styles.background }
          imageStyle={{ borderRadius: 40 }}
        >
          <Text style = { styles.date }>27.03.2023 Mon 16:35</Text>
          <Text style = { styles.location }>London, UK</Text>
        </ImageBackground>
      </View>
      
      <View style = { styles.today__details }>
        <View style = { styles.temp }>
          <FontAwesomeIcon icon={ faMugSaucer } style={ styles.tempText }/>
          <Text>23C</Text>
        </View>
        <View style = { styles.wind }>
          <Text>Wind</Text>
          <Text>8km/h</Text>
        </View>
        <View style = { styles.press }>
          <Text>Pressure</Text>
          <Text>1000MB</Text>
        </View>
        <View style = { styles.humid }>
          <Text>Humidity</Text>
          <Text>51%</Text>
        </View>
      </View>

      <View style = { styles.today__hourly }>
        
      </View>

      <View style = { styles.navigation }>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    alignItems: "center",
    justifyContent: "space-between",
  },
  main: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
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
    paddingVertical: 2,
    alignSelf: "flex-start", // Center with Width Auto Fit Text
    fontSize: 18,
    borderColor: "transparent",
    borderWidth: 2,
    fontWeight: 400,
  },
  location: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: "center", // Center with Width Auto Fit Text
    fontSize: 22,
    backgroundColor: "#111",
    borderWidth: 2,
    borderColor: "black",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontWeight: 300,
    elevation: 55,
  },
  today__details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
    height: "20%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 20,
    marginBottom: 10,
  },
  temp: {
    width: "22%",
    height: "100%",
    backgroundColor: "#111",
    borderRadius: 20,
  },
  tempText: { color: "#050505", fontSize: 30 },
  wind: {
    width: "22%",
    height: "100%",
    backgroundColor: "#111",
    borderRadius: 20,
  },
  press: {
    width: "22%",
    height: "100%",
    backgroundColor: "#111",
    borderRadius: 20,
  },
  humid: {
    width: "22%",
    height: "95%",
    backgroundColor: "#111",
    borderRadius: 20,

  },
  today__hourly: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "20%",
    backgroundColor: "#111",
    borderRadius: 20,
    marginBottom: 10,
  },
  navigation: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
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


/*
 CLEAR
 CLOUDY
 BROKEN CLOUDS
 RAIN
 STORM
 MIST
*/



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