// Dependencies
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Screen, StyleSheet, Text, View, Image, Button } from 'react-native';
import { useEffect, useContext, useState } from 'react';
import { AppStateContext } from '../AppState';
import AutoCompleteInputCountry from "./AutoCompleteInputCountry";
import AutoCompleteInputCity from './AutoCompleteInputCity';
import cityJson from "../cities.json";

// Icons
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';




export default function SettingsScreen({ navigation }) {
    const { isLoading, data, locationName, location, setRefreshData, isMetric, setMetric, useMyLocation, setUseMyLocation } = useContext(AppStateContext);
    console.log("SETTINGS RENDER");
    console.log("location", location)
    const [country, setCountry] = useState(locationName.country);
    const [countryCode, setCountryCode] = useState(locationName.countryCode);
    const [city, setCity] = useState(locationName.city);

    return  isLoading ? (
      <View style={ styles.app_loading }>
      <ActivityIndicator size="large" color="white" />
      </View>
  ) : data.list ? (
      <SafeAreaView style={ styles.container }>
        {/* Header */}
        <View style={ styles.headerContainer }>
          <FontAwesome name="umbrella" style={ styles.headerImage } />
          <Text style={ styles.header }>Settings</Text>
        </View>

        {/* Unit Selection */}
        <View style={ styles.unitSelection }>
          <Text style={{ color: "#ccc", fontWeight:"bold" }}>Set Units</Text>
          <View style={ styles.metricOption }>
            <View style={ styles.checkBox }>
              { isMetric && <Feather name="check" style={ styles.checkSign } /> }
            </View>
            <Text style={{ color: "#aaa" }} onPress={ () => { setMetric(true); } }>
              Metric Units (Celsius)
            </Text>
          </View>
          <View style={ styles.metricOption }>
          <View style={ styles.checkBox }>
              { !isMetric && <Feather name="check" style={ styles.checkSign } /> }
            </View>
            <Text style={{ color: "#aaa" }} onPress={ () => { setMetric(false); } }>
              Imperial Units (Fahrenheit)
            </Text>
          </View>
        </View>

        {/* Manually Set Location */}
        <View style={ styles.inputField }>
          <Text style={{ color: "#ccc", fontWeight:"bold", paddingBottom: 10 }}>Custom Location</Text>
          <View style={ styles.metricOption }>
            <View style={ styles.checkBox }>
              { useMyLocation && <Feather name="check" style={ styles.checkSign } /> }
            </View>
            <Text style={{ color: "#aaa" }} onPress={ () => { setUseMyLocation(true); setRefreshData(true)} }>
              Use my location
            </Text>
          </View>
          <Text style={{ color: "#aaa", fontWeight:"bold" }}>Select Country Code</Text>
          <View style={ styles.cityInput }>
              <AutoCompleteInputCountry 
                borderRadius={ [10, 10, 0, 0] } 
                width="70%"
                list={ countryList }
                currentItem={ { country, countryCode }}
                setCountry={ setCountry }
                setCountryCode={ setCountryCode }
                setCity={ setCity }
              />
          </View>

          <Text style={{ color: "#aaa", fontWeight:"bold", paddingTop: 10, zIndex: 0}}>Select City</Text>
          <View style={ styles.cityInput }>
              <AutoCompleteInputCity 
                borderRadius={ [10, 10, 0, 0] }
                width="100%"
                list={ getCityList(country.length ? countryCode : locationName.countryCode) }
                currentItem={ { city, country, countryCode }}
                setCity={ setCity }
                refreshLocation={ refreshLocation }
              />
          </View>
        </View>

        {/* Refresh App */}
        <Text onPress={ () => { setRefreshData(true);} } style={ styles.refreshButton }>Refresh Weather Data</Text>
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
    justifyContent: "flex-start",
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
    marginVertical: 20,
    borderRadius: 20,
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#222",
    fontSize: 16,
    color: "#999"
  },
  unitSelection: {
    width: "95%",
    padding: 10,
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#111",
    fontSize: 16,
    borderColor: "#222",
    borderWidth: 1,
    borderRadius: 10
  },
  metricOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  checkBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    marginRight: 20,
    borderColor: "#222",
    borderWidth: 2,
    backgroundColor: "black",
    borderRadius: 5,
  },
  checkSign: {
    color: "aqua",
    fontSize: 14
  },
  inputField: {
    width: "95%",
    padding: 10,
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#111",
    fontSize: 16,
    borderColor: "#222",
    borderWidth: 1,
    borderRadius: 10
  },
  cityInput: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});



function getCityList(country) {
  console.log("Get Cities for Country", country)
  return cityJson.filter(c => c.country === country).map(location => location.name).sort();
}



function refreshLocation(city, countryCode, useMyLocation, setUseMyLocation, setLocation, setRefreshData) {
  const newLocation = cityJson.filter(location => location.name === city && location.country === countryCode);
  if (newLocation) {
    if (useMyLocation) setUseMyLocation(false);
    console.log("New Location", newLocation);
    const location = {
      latitude: newLocation[0].lat,
      longitude: newLocation[0].lng
    }
    setLocation(location);
    setRefreshData(true);
  }
}



countryList = [
{code:'AF',name: 'Afghanistan'},
{code:'AX',name: 'Aland Islands'},
{code:'AL',name: 'Albania'},
{code:'DZ',name: 'Algeria'},
{code:'AS',name: 'American Samoa'},
{code:'AD',name: 'Andorra'},
{code:'AO',name: 'Angola'},
{code:'AI',name: 'Anguilla'},
{code:'AQ',name: 'Antarctica'},
{code:'AG',name: 'Antigua And Barbuda'},
{code:'AR',name: 'Argentina'},
{code:'AM',name: 'Armenia'},
{code:'AW',name: 'Aruba'},
{code:'AU',name: 'Australia'},
{code:'AT',name: 'Austria'},
{code:'AZ',name: 'Azerbaijan'},
{code:'BS',name: 'Bahamas'},
{code:'BH',name: 'Bahrain'},
{code:'BD',name: 'Bangladesh'},
{code:'BB',name: 'Barbados'},
{code:'BY',name: 'Belarus'},
{code:'BE',name: 'Belgium'},
{code:'BZ',name: 'Belize'},
{code:'BJ',name: 'Benin'},
{code:'BM',name: 'Bermuda'},
{code:'BT',name: 'Bhutan'},
{code:'BO',name: 'Bolivia'},
{code:'BA',name: 'Bosnia And Herzegovina'},
{code:'BW',name: 'Botswana'},
{code:'BV',name: 'Bouvet Island'},
{code:'BR',name: 'Brazil'},
{code:'IO',name: 'British Indian Ocean Territory'},
{code:'BN',name: 'Brunei Darussalam'},
{code:'BG',name: 'Bulgaria'},
{code:'BF',name: 'Burkina Faso'},
{code:'BI',name: 'Burundi'},
{code:'KH',name: 'Cambodia'},
{code:'CM',name: 'Cameroon'},
{code:'CA',name: 'Canada'},
{code:'CV',name: 'Cape Verde'},
{code:'KY',name: 'Cayman Islands'},
{code:'CF',name: 'Central African Republic'},
{code:'TD',name: 'Chad'},
{code:'CL',name: 'Chile'},
{code:'CN',name: 'China'},
{code:'CX',name: 'Christmas Island'},
{code:'CC',name: 'Cocos (Keeling) Islands'},
{code:'CO',name: 'Colombia'},
{code:'KM',name: 'Comoros'},
{code:'CG',name: 'Congo'},
{code:'CD',name: 'Congo}, Democratic Republic'},
{code:'CK',name: 'Cook Islands'},
{code:'CR',name: 'Costa Rica'},
{code:'CI',name: 'Cote D\'Ivoire'},
{code:'HR',name: 'Croatia'},
{code:'CU',name: 'Cuba'},
{code:'CY',name: 'Cyprus'},
{code:'CZ',name: 'Czech Republic'},
{code:'DK',name: 'Denmark'},
{code:'DJ',name: 'Djibouti'},
{code:'DM',name: 'Dominica'},
{code:'DO',name: 'Dominican Republic'},
{code:'EC',name: 'Ecuador'},
{code:'EG',name: 'Egypt'},
{code:'SV',name: 'El Salvador'},
{code:'GQ',name: 'Equatorial Guinea'},
{code:'ER',name: 'Eritrea'},
{code:'EE',name: 'Estonia'},
{code:'ET',name: 'Ethiopia'},
{code:'FK',name: 'Falkland Islands (Malvinas)'},
{code:'FO',name: 'Faroe Islands'},
{code:'FJ',name: 'Fiji'},
{code:'FI',name: 'Finland'},
{code:'FR',name: 'France'},
{code:'GF',name: 'French Guiana'},
{code:'PF',name: 'French Polynesia'},
{code:'TF',name: 'French Southern Territories'},
{code:'GA',name: 'Gabon'},
{code:'GM',name: 'Gambia'},
{code:'GE',name: 'Georgia'},
{code:'DE',name: 'Germany'},
{code:'GH',name: 'Ghana'},
{code:'GI',name: 'Gibraltar'},
{code:'GR',name: 'Greece'},
{code:'GL',name: 'Greenland'},
{code:'GD',name: 'Grenada'},
{code:'GP',name: 'Guadeloupe'},
{code:'GU',name: 'Guam'},
{code:'GT',name: 'Guatemala'},
{code:'GG',name: 'Guernsey'},
{code:'GN',name: 'Guinea'},
{code:'GW',name: 'Guinea-Bissau'},
{code:'GY',name: 'Guyana'},
{code:'HT',name: 'Haiti'},
{code:'HM',name: 'Heard Island & Mcdonald Islands'},
{code:'VA',name: 'Holy See (Vatican City State)'},
{code:'HN',name: 'Honduras'},
{code:'HK',name: 'Hong Kong'},
{code:'HU',name: 'Hungary'},
{code:'IS',name: 'Iceland'},
{code:'IN',name: 'India'},
{code:'ID',name: 'Indonesia'},
{code:'IR',name: 'Iran}, Islamic Republic Of'},
{code:'IQ',name: 'Iraq'},
{code:'IE',name: 'Ireland'},
{code:'IM',name: 'Isle Of Man'},
{code:'IL',name: 'Israel'},
{code:'IT',name: 'Italy'},
{code:'JM',name: 'Jamaica'},
{code:'JP',name: 'Japan'},
{code:'JE',name: 'Jersey'},
{code:'JO',name: 'Jordan'},
{code:'KZ',name: 'Kazakhstan'},
{code:'KE',name: 'Kenya'},
{code:'KI',name: 'Kiribati'},
{code:'KR',name: 'Korea'},
{code:'KW',name: 'Kuwait'},
{code:'KG',name: 'Kyrgyzstan'},
{code:'LA',name: 'Lao People\'s Democratic Republic'},
{code:'LV',name: 'Latvia'},
{code:'LB',name: 'Lebanon'},
{code:'LS',name: 'Lesotho'},
{code:'LR',name: 'Liberia'},
{code:'LY',name: 'Libyan Arab Jamahiriya'},
{code:'LI',name: 'Liechtenstein'},
{code:'LT',name: 'Lithuania'},
{code:'LU',name: 'Luxembourg'},
{code:'MO',name: 'Macao'},
{code:'MK',name: 'Macedonia'},
{code:'MG',name: 'Madagascar'},
{code:'MW',name: 'Malawi'},
{code:'MY',name: 'Malaysia'},
{code:'MV',name: 'Maldives'},
{code:'ML',name: 'Mali'},
{code:'MT',name: 'Malta'},
{code:'MH',name: 'Marshall Islands'},
{code:'MQ',name: 'Martinique'},
{code:'MR',name: 'Mauritania'},
{code:'MU',name: 'Mauritius'},
{code:'YT',name: 'Mayotte'},
{code:'MX',name: 'Mexico'},
{code:'FM',name: 'Micronesia}, Federated States Of'},
{code:'MD',name: 'Moldova'},
{code:'MC',name: 'Monaco'},
{code:'MN',name: 'Mongolia'},
{code:'ME',name: 'Montenegro'},
{code:'MS',name: 'Montserrat'},
{code:'MA',name: 'Morocco'},
{code:'MZ',name: 'Mozambique'},
{code:'MM',name: 'Myanmar'},
{code:'NA',name: 'Namibia'},
{code:'NR',name: 'Nauru'},
{code:'NP',name: 'Nepal'},
{code:'NL',name: 'Netherlands'},
{code:'AN',name: 'Netherlands Antilles'},
{code:'NC',name: 'New Caledonia'},
{code:'NZ',name: 'New Zealand'},
{code:'NI',name: 'Nicaragua'},
{code:'NE',name: 'Niger'},
{code:'NG',name: 'Nigeria'},
{code:'NU',name: 'Niue'},
{code:'NF',name: 'Norfolk Island'},
{code:'MP',name: 'Northern Mariana Islands'},
{code:'NO',name: 'Norway'},
{code:'OM',name: 'Oman'},
{code:'PK',name: 'Pakistan'},
{code:'PW',name: 'Palau'},
{code:'PS',name: 'Palestinian Territory}, Occupied'},
{code:'PA',name: 'Panama'},
{code:'PG',name: 'Papua New Guinea'},
{code:'PY',name: 'Paraguay'},
{code:'PE',name: 'Peru'},
{code:'PH',name: 'Philippines'},
{code:'PN',name: 'Pitcairn'},
{code:'PL',name: 'Poland'},
{code:'PT',name: 'Portugal'},
{code:'PR',name: 'Puerto Rico'},
{code:'QA',name: 'Qatar'},
{code:'RE',name: 'Reunion'},
{code:'RO',name: 'Romania'},
{code:'RU',name: 'Russian Federation'},
{code:'RW',name: 'Rwanda'},
{code:'BL',name: 'Saint Barthelemy'},
{code:'SH',name: 'Saint Helena'},
{code:'KN',name: 'Saint Kitts And Nevis'},
{code:'LC',name: 'Saint Lucia'},
{code:'MF',name: 'Saint Martin'},
{code:'PM',name: 'Saint Pierre And Miquelon'},
{code:'VC',name: 'Saint Vincent And Grenadines'},
{code:'WS',name: 'Samoa'},
{code:'SM',name: 'San Marino'},
{code:'ST',name: 'Sao Tome And Principe'},
{code:'SA',name: 'Saudi Arabia'},
{code:'SN',name: 'Senegal'},
{code:'RS',name: 'Serbia'},
{code:'SC',name: 'Seychelles'},
{code:'SL',name: 'Sierra Leone'},
{code:'SG',name: 'Singapore'},
{code:'SK',name: 'Slovakia'},
{code:'SI',name: 'Slovenia'},
{code:'SB',name: 'Solomon Islands'},
{code:'SO',name: 'Somalia'},
{code:'ZA',name: 'South Africa'},
{code:'GS',name: 'South Georgia And Sandwich Isl.'},
{code:'ES',name: 'Spain'},
{code:'LK',name: 'Sri Lanka'},
{code:'SD',name: 'Sudan'},
{code:'SR',name: 'Suriname'},
{code:'SJ',name: 'Svalbard And Jan Mayen'},
{code:'SZ',name: 'Swaziland'},
{code:'SE',name: 'Sweden'},
{code:'CH',name: 'Switzerland'},
{code:'SY',name: 'Syrian Arab Republic'},
{code:'TW',name: 'Taiwan'},
{code:'TJ',name: 'Tajikistan'},
{code:'TZ',name: 'Tanzania'},
{code:'TH',name: 'Thailand'},
{code:'TL',name: 'Timor-Leste'},
{code:'TG',name: 'Togo'},
{code:'TK',name: 'Tokelau'},
{code:'TO',name: 'Tonga'},
{code:'TT',name: 'Trinidad And Tobago'},
{code:'TN',name: 'Tunisia'},
{code:'TR',name: 'Turkey'},
{code:'TM',name: 'Turkmenistan'},
{code:'TC',name: 'Turks And Caicos Islands'},
{code:'TV',name: 'Tuvalu'},
{code:'UG',name: 'Uganda'},
{code:'UA',name: 'Ukraine'},
{code:'AE',name: 'United Arab Emirates'},
{code:'GB',name: 'United Kingdom'},
{code:'US',name: 'United States'},
{code:'UM',name: 'United States Outlying Islands'},
{code:'UY',name: 'Uruguay'},
{code:'UZ',name: 'Uzbekistan'},
{code:'VU',name: 'Vanuatu'},
{code:'VE',name: 'Venezuela'},
{code:'VN',name: 'Vietnam'},
{code:'VG',name: 'Virgin Islands}, British'},
{code:'VI',name: 'Virgin Islands}, U.S.'},
{code:'WF',name: 'Wallis And Futuna'},
{code:'EH',name: 'Western Sahara'},
{code:'YE',name: 'Yemen'},
{code:'ZM',name: 'Zambia'},
{code:'ZW',name: 'Zimbabwe'}
];
