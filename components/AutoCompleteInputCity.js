// Dependencies
import { TextInput, StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { AppStateContext } from '../AppState';
import { useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';



export default function AutoCompleteInputCity(props) {
    const { location, setLocation, locationName, setLocationName, refreshData, setRefreshData, useMyLocation, setUseMyLocation, localStorage } = useContext(AppStateContext);
    const [cityOptionList, setCityOptionList] = useState([]);
    const [text, setText] = useState("");
    return (
        <View style={ [styles.autoCompleteInputCity, { width: props.width }] }>
            <View style={ styles.cityInputField }>
                <TextInput 
                style={ [
                    styles.inputField, {
                        borderTopLeftRadius: props.borderRadius[0],
                        borderBottomLeftRadius: props.borderRadius[1],
                        borderTopRightRadius: props.borderRadius[2],
                        borderBottomRightRadius: props.borderRadius[3],
                    }]} 
                cursorColor="white"
                autoCapitalize="words"
                defaultValue={ props.currentItem?.city }
                onChangeText={ text => handleOnChange(text, props.list, setCityOptionList, setText) }
                >
                </TextInput>
                <Ionicons style={ styles.refreshCity } name="refresh" size={20} color="black" onPress={ () => props.refreshLocation(props.currentItem?.city, props.currentItem?.countryCode, useMyLocation, setUseMyLocation, setLocation, setRefreshData, localStorage) }/>
            </View>
            {
               cityOptionList.length >= 1 &&
                <ScrollView style={ styles.autoCorrectOptionList }>
                    {
                        cityOptionList.map((listItem, index) => {
                            return (
                                <TouchableWithoutFeedback key={`item_${ index }`} onPress={ () => handleListItemPress(props, setCityOptionList, listItem) }>
                                    <View style={ [ styles.autoCorrectOptionListItem, { borderTopWidth: index === 0 ? 0 : 1 }] }>
                                        <View style={ styles.autoCorrectOptionListItemText }>
                                            <Text style={ [ styles.autoCorrectOptionListItemCountryBold, ] }>
                                                    { listItem.substring(0, text.length) }
                                            </Text>
                                            <Text style={ [ styles.autoCorrectOptionListItemCountryNormal, ] }>
                                                    { listItem.substring(text.length) }
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            ) 
                        })
                    }
                </ScrollView>
                }
        </View>
    )
}

const styles = StyleSheet.create({
    autoCompleteInputCity: {
        width: "100%",
    },
    cityInputField: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#111",
        fontSize: 16,
    },
    inputField: {
        width: "85%",
        height: 40,
        paddingLeft: 10,
        borderColor: "#222",
        borderWidth: 1,
        borderRightWidth: 0,
        fontSize: 16,
        backgroundColor: "#050505",
        color: "white",
        fontWeight: "bold"
    },
    autoCorrectOptionList: {
        marginTop: 5,
        paddingLeft: 10,
        width: "100%",
        maxHeight: 200,
        backgroundColor: "black",
        borderRadius: 10,
        borderColor: "#222",
        borderWidth: 1,
    },
    autoCorrectOptionListItem: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        borderColor: "#222",
        borderTopWidth: 1,
        borderRightWidth: 0,
    },
    autoCorrectOptionListItemText: {
        width: "70%",
        flexDirection: "row"
    },
    autoCorrectOptionListItemCountryBold: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    autoCorrectOptionListItemCountryNormal: {
        color: "#aaa",
        fontSize: 16,
    },
    autoCorrectOptionListItemInfo: {
        width: "30%",
        flexDirection: "row"
    },
    refreshCity: {
        width: "15%",
        height: 40,
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: "#191919",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: "#222",
        borderWidth: 1,
        color: "#eee",
    }
});




function handleOnChange(text, list, setCityOptionList, setText) {
    const filteredCities = list.filter(city => String(city.toUpperCase()).startsWith(text.toUpperCase()));
    setCityOptionList(filteredCities);
    setText(text);
}



function handleListItemPress(props, setCityOptionList, listItem) {
    setCityOptionList([]);
    props.setCity(listItem); 
}