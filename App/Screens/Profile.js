import {React,useState,useEffect} from 'react';
import {View, StyleSheet, Text, Pressable, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation,StackActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

 function Profile() {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  const getUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("name");
      console.log(userData);
      return userData;
    } catch (error) {
     console.log(error); 
    }
    
  };
  useEffect(() => {
    getUser().then((data) => setUserData(data));
  }, []);
  function signOut(){
    AsyncStorage.setItem('isLoggedIn','');
    AsyncStorage.setItem('token','');
    AsyncStorage.setItem('name','');
  
      navigation.reset({
      index: 0,
      routes: [{ name: 'LoginUser' }],
     });
         
     const removeUser = async () => {
      try {
        await AsyncStorage.removeItem('isLoggedIn');
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('name');
      
      } catch (error) {
        console.log(error);
      }
    };
    removeUser();
    
   AsyncStorage.clear();
   navigation.dispatch(StackActions.popToTop()); // This removes all screens from the stack except the first one (Login)
  
    
    navigation.navigate("LoginUser")
  
  }
  return (
   <>
   <View>
        <Text style={styles.text}>Hello {userData}</Text>
    </View>
    <TouchableOpacity onPress={()=>signOut()}>
    <View style={styles.bottomDrawerSection}>
      
    <Text>Logout</Text>

      </View>
      </TouchableOpacity>

   </>
  )
}
export default Profile
const styles = StyleSheet.create({
  
  text:{
    margin:20,
    fontSize:20,
    color:'black',
    
    
},
  bottomDrawerSection: {
    height:40,
    width:100,
    margin:10,
    backgroundColor:"grey",
    fontSize:50,
  },
  
});