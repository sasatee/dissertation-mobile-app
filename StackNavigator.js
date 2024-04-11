import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ChatScreen from "./screens/ChatScreen";
import useAuth from "./hooks/useGoogleSigninHook";
import { useDispatch, useSelector } from "react-redux";



const Stack = createStackNavigator();


const StackNavigator = () => {
 const { user } = useAuth();

  const isLoggedIn = useSelector((state) => state.auth.token);
  // console.log(user,isLoggedIn)
  const userIsLoggedWithGoogleOrJwT = isLoggedIn || user
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userIsLoggedWithGoogleOrJwT ? (
        <>
      
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
             {/* <Stack.Screen name="Login" component={LoginScreen} options={{presentation: 'modal'}} /> */}
         

      
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );

};

export default StackNavigator;
