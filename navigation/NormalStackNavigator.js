import { createStackNavigator } from "@react-navigation/stack";

import ProfileView from "../screens/Profile";

const Stack = createStackNavigator();
export default function NormalStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="Profile" component={ProfileView} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
