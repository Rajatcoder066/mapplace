import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigation from './App/Navigations/TabNavigation';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location'; 
import { useFonts } from 'expo-font';
import { UserLocationContext } from './App/Context/UserLocationContext';
import Colors from './App/Shared/Colors';

import { ActivityIndicator } from 'react-native';
export default function App2() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [fontsLoaded] = useFonts({
   

  });
   
   
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
     
    })();

    
  }, []);
  return (
    <View style={styles.container}>
    <UserLocationContext.Provider 
    value={{location,setLocation}}>
          <TabNavigation/>
      </UserLocationContext.Provider>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop:20
  },
});
