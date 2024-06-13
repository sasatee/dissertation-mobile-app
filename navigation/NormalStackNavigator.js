import { createStackNavigator } from "@react-navigation/stack";
import RequestEmailScreen from "../screens/Authentication/RequestEmailScreen";

const Stack = createStackNavigator();
export default function NormalStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="RequestEmail" component={RequestEmailScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
