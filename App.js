import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./screens/login"
import HomeScreen from "./screens/home"
import SignUpScreen from "./screens/signup"
import firebase from 'firebase/app';
import '@firebase/firestore';


import "firebase/auth"

const Stack = createNativeStackNavigator();

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const firebaseConfig = {
    apiKey: "AIzaSyD6ZRpTTnrncZTALCLxOM9R7LDKns7_Tb8",
    authDomain: "create-5eeef.firebaseapp.com",
    projectId: "create-5eeef",
    storageBucket: "create-5eeef.appspot.com",
    messagingSenderId: "110170592899",
    appId: "1:110170592899:web:a6bf958cc10336ea7c6db6",
    measurementId: "G-1L10SDN6SP"
  };
  
  if(!firebase.app.length){
  firebase.initializeApp(firebaseConfig);
  }else{
    firebase.app();
  }
  firebase.auth().onAuthStateChanged(auth,(users)=>{
    if(users!=null)
    {
      setIsLoggedIn(true);
    } else{
      setIsLoggedIn(false);
    }
  })

  //Checking if firebase has been initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false);
    }
  });



  return (
    <NavigationContainer>
      {isLoggedIn ? <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator> :
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false }} />
        </Stack.Navigator>}
    </NavigationContainer>
  );
}

export default App;