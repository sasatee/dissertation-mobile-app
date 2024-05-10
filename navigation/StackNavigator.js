import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const NormalStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoardingScreen" component={onBoardingScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default NormalStackNavigation;
