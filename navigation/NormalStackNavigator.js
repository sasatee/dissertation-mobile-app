import { createStackNavigator } from "@react-navigation/stack";

import ProfileView from "../screens/Profile";
import ImagePickerExample from "../screens/Profile/Profile1";

const Stack = createStackNavigator();
export default function NormalStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="Profile" component={ProfileView} />
        <Stack.Screen name="Profile1" component={ImagePickerExample} />

      </Stack.Group>
    </Stack.Navigator>
  );
}
