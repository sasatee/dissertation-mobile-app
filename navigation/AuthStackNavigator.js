import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/Authentication/LoginScreen";
import RegisterScreen from "../screens/Authentication/RegisterScreen";
import ResetPassword from "../screens/Authentication/ResetPasswordScreen";
import RequestEmailScreen from "../screens/Authentication/RequestEmailScreen";
import VerifyEmailPassword from "../screens/Authentication/VerifyPasswordScreen";

const Stack = createStackNavigator();
const AuthStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RequestEmail" component={RequestEmailScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmailPassword} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;
