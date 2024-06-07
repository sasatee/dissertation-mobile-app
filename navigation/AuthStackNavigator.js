import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ResetPassword from "../screens/ResetPasswordScreen";
import RequestEmailScreen from "../screens/RequestEmailScreen";


const Stack = createStackNavigator();
const AuthStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RequestEmail" component={RequestEmailScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;
