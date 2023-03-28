// app.json orientation is set defult, set portrait for fixing orientation
import { useDimensions } from '@react-native-community/hooks'; // DONT USE IT, DEPRICATED
import { Appearance } from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Button, Alert, Platform, Dimensions, useWindowDimensions } from 'react-native';

export default function App() {  
  return (
    <SafeAreaView style={ styles.container }>
      <View style = { styles.main }>

        <Text style = { styles.main__date }>27.03.2023 Mon 16:35</Text>
        
        <Image 
          source={ require("./assets/weather_icons/cloudy_rainy.png") } 
          style={ styles.main__icon }
        />

        <View>
          <Text style = { styles.main__date }>London, UK</Text>
        </View>
      </View>
      
      <View style = { styles.today__view }>

      </View>

      <View style = { styles.navigation }>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
    height: "50%",
  },
  main__date: {
    fontSize: 20,
  },
  main__icon: {
    width: "60%",
    height: "60%"
  },
  today__view: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "30%",
    backgroundColor: "green",
  },
  navigation: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "10%",
    backgroundColor: "blue",
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