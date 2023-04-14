import { Text, View } from 'react-native';

export default function SettingsScreen({ navigation }) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}>
        <Text>Settings!</Text>
      </View>
    );
  }