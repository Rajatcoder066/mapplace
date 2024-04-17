const {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} = require('react-native');
import styles from './style';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  
  useNavigation,
  
} from '@react-navigation/native';

function LoginPage({props}) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  function handleSubmit() {
    if (!email.trim()) {
      Alert.alert('Please enter your email');
      return;
    }
  
    if (!password.trim()) {
      Alert.alert('Please enter your password');
      return;
    }
   
    console.log(email, password);
    const userData = {
      email: email,
      password,
    };

    axios.post('https://backend-production-fbfa.up.railway.app/login-user', userData).then(res => {
      console.log(res.data);
      console.log(res.data.name1);

      if (res.data.status == 'ok') {
        Alert.alert('Logged In Successfull');
        AsyncStorage.setItem('token', res.data.data);
        AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        AsyncStorage.setItem('name',res.data.name1);
        navigation.navigate('tab');
      }
      if(res.data.status=='notok'){
        Alert.alert("Please enter correct email and Password");
      }
      
    }).catch(error => {
      console.error('Login failed:', error);
      Alert.alert(res.data);
    });

    
  }
  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    console.log(data, 'at app.jsx');
  }
  useEffect(()=>{
    getData();
    console.log("Hii");
  },[])

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps={'always'}>
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
          />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Login !!!</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#420475"
              style={styles.smallIcon}
            />
            <TextInput
              placeholder="Mobile or Email"
              style={styles.textInput}
              onChange={e => setEmail(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              onChange={e => setPassword(e.nativeEvent.text)}
              secureTextEntry={showPassword}
              
            />
             <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {password.length < 1 ? null : !showPassword ? (
                <Feather
                  name="eye-off"
                  style={{marginRight: -10}}
                  size={23}
                />
              ) : (
                <Feather
                  name="eye"
                  style={{marginRight: -10}}
                  size={23}
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: 8,
              marginRight: 10,
            }}>
            <Text style={{color: '#420475', fontWeight: '700'}}>
            </Text>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
            <View>
              <Text style={styles.textSign}>Log in</Text>
            </View>
          </TouchableOpacity>

          <View style={{padding: 15}}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#919191'}}>
              ----Or Continue as----
            </Text>
          </View>
          <View style={styles.bottomButton}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.inBut2}
                onPress={() => {
                 navigation.navigate('Register');
                }}>
                <FontAwesome
                  name="user-plus"
                  color="white"
                  style={[styles.smallIcon2, {fontSize: 30}]}
                />
              </TouchableOpacity>
              <Text style={styles.bottomText}>Sign Up</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default LoginPage;
