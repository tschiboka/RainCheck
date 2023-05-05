// Dependencies
import { TextInput, StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';


export default function AutoCompleteInputCountry(props) {
    const [countryOptionList, setCountryOptionList] = useState([]);
    const [text, setText] = useState("");
    return (
        <View style={ styles.autoCompleteInputCountry }>
            <View style={ styles.countryInputField }>
                <TextInput 
                style={ [
                    styles.inputField, {
                        width: props.width,
                        borderTopLeftRadius: props.borderRadius[0],
                        borderBottomLeftRadius: props.borderRadius[1],
                        borderTopRightRadius: props.borderRadius[2],
                        borderBottomRightRadius: props.borderRadius[3],
                    }]} 
                cursorColor="white"
                autoCapitalize="words"
                defaultValue={ props.currentItem?.country }
                onChangeText={ text => handleOnChange(text, props.list, setCountryOptionList, setText) }
                >
                </TextInput>
                <View style={ styles.countryInfo }>
                        <Text style={ styles.countryCode }>{ props.currentItem?.countryCode || "-" }</Text>
                        <Text style={ styles.flag }>{ getUnicodeFlagIcon(props.currentItem?.countryCode) }</Text>
                </View>
            </View>
            {
               countryOptionList.length >= 1 &&
                <ScrollView style={ styles.autoCorrectOptionList }>
                    {
                        countryOptionList.map((listItem, index) => {
                            return (
                                <TouchableWithoutFeedback key={`item_${ index }`} onPress={ () => handleListItemPress(props, setCountryOptionList, listItem) }>
                                    <View style={ [ styles.autoCorrectOptionListItem, { borderTopWidth: index === 0 ? 0 : 1 }] }>
                                        <View style={ styles.autoCorrectOptionListItemText }>
                                            <Text style={ [ styles.autoCorrectOptionListItemCountryBold, ] }>
                                                    { listItem.name.substring(0, text.length) }
                                            </Text>
                                            <Text style={ [ styles.autoCorrectOptionListItemCountryNormal, ] }>
                                                    { listItem.name.substring(text.length) }
                                            </Text>
                                        </View>
                                        
                                        <View style={ styles.autoCorrectOptionListItemInfo }>
                                             <Text style={ styles.countryCode }>{ listItem.code || "-" }</Text>
                                            <Text style={ styles.flag }>{ getUnicodeFlagIcon(listItem.code) }</Text>
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
    autoCompleteInputCountry: {
        width: "100%",
        marginHorizontal: 20,
    },
    countryInputField: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#111",
        fontSize: 16,
        zIndex: 1000
    },
    countryInfo: {
        flexDirection: "row",
        alignItems: "center",
        width: "30%",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: "#222",
        backgroundColor: "#050505",
        borderWidth: 1,
        height: 40,
        borderLeftWidth: 0,
    },
    countryCode: {
        width: "50%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
    flag: {
        width: "50%",
        height: "50%",
        textAlign: "center",
        borderLeftWidth: 2,
        borderColor: "#222",
        fontSize: 16,
    },
    inputField: {
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
    }
});




function handleOnChange(text, list, setCountryOptionList, setText) {
    const filteredCountries = list.filter(c => String(c.name.toUpperCase()).startsWith(text.toUpperCase()));
    setCountryOptionList(filteredCountries);
    setText(text);
}


function handleListItemPress(props, setCountryOptionList, listItem) {
    setCountryOptionList([]);
    props.setCountry(listItem.name); 
    props.setCountryCode(listItem.code); 
    props.setCity("");
}