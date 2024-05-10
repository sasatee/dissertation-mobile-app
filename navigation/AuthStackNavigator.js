import { createStackNavigator } from "@react-navigation/stack";

 import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import OnBoardingScreen from "../screens/MaskingOnboardingScreen";
import Welcome from "../screens/Welcome";
// import LoginScreen from "../screens/LoginTestScreen";

const Stack = createStackNavigator();
const AuthStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="OnBoarding" component={OnBoardingScreen} /> */}
         {/* <Stack.Screen name="LOGIN" component={LoginScreen} /> */}
        {/* <Stack.Screen name="Welcome" component={Welcome}/> */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;
