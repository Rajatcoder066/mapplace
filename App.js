import { View, Text } from 'react-native'
import React from 'react'
import { useState,useEffect} from 'react';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'
import Home from './App/Screens/Home';
import PlaceDetail from './App/Components/PlaceDetail/PlaceDetail';
import Login from './App/auth/Login';
import Register from './App/auth/Register'
import table from './App2';
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';


const StackNav = () => {
  LogBox.ignoreLogs(['Reanimated 2']);
  LogBox.ignoreLogs(['']);
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    return (
      <Stack.Navigator
        screenOptions={{
          statusBarColor: '#0163d2',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#0163d2',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}>
        
        <Stack.Screen name='home-screen'
       options={{headerShown:false}}
        component={Home} />
      
      <Stack.Screen name="place-detail" 
          options={{title:""}}
        component={PlaceDetail} screenOptions={{
            presentation:'modal',
           
        }}/>
          <Stack.Screen
        name="Register"
        component={Register}
        />
          <Stack.Screen
        name="tab"
        component={table}
        />
        <Stack.Screen name="LoginUser" component={LoginNav}/>
      
      </Stack.Navigator>
    );
  };
  const DrawerNav = () => {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen name="Home1" component={StackNav} 
        
        
        />
       <Drawer.Screen name='home-screen'
       options={{headerShown:false}}
        component={Home} />
      
      <Drawer.Screen name="place-detail" 
          options={{title:""}}
        component={PlaceDetail} screenOptions={{
            presentation:'modal',
           
        }}/>
          <Drawer.Screen
        name="Register"
        component={Register}
        
        />
         <Drawer.Screen
        name="tab"
        component={table}
        />
        <Stack.Screen name="LoginUser" component={LoginNav}/>
      </Drawer.Navigator>
    );
  };
const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="tab" component={table} />
    </Stack.Navigator>
  );
};
const Home1 = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      
      <Stack.Screen name='tab'
       options={{headerShown:false}}
        component={table} />
    </Stack.Navigator>
  );
};
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data, 'at app.jsx');
    setIsLoggedIn(data);
  }

  useEffect(() => {
    getData();
    setTimeout(() => {
                                                        
    }, 900);
  }, [isLoggedIn]);

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNav /> : <LoginNav />}
    </NavigationContainer>
  );
}
export default App;
