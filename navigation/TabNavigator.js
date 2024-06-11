import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import testScreen from "../screens/Doctor/ViewDoctorAndBook";
import ProductGridCard from "../components/Doctor/ViewAllDoctorDetails";
import ViewAllAppointment from "../screens/Appointment/ViewAllAppointmentScreen";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// Icons
import Entypo from "@expo/vector-icons/Entypo";
import { FontAwesome6 } from "@expo/vector-icons";
import ModalScreen from "../screens/Appointment/ScheduleAppointmentScreen";

import ChannelScreen from "../screens/ChatAndCall/ChannelAndChatScreen";
import Layouttest from "../screens/layouttest";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarBadgeStyle: { backgroundColor: "#00CCBB" },
        tabBarActiveBackgroundColor: "white",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <Feather name="home" size={size} color={color} />
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Doctors"
        component={ProductGridCard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="user-doctor" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={testScreen}
        options={{ tabBarButton: () => null, tabBarVisible: false }}
      />
      <Tab.Screen
        name="Appointment"
        component={ViewAllAppointment}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
        }}
      />

       <Tab.Screen
        name="layouttest"
        component={Layouttest}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChannelScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="chat" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen name="ModalScreen" component={ModalScreen} />
    </Tab.Navigator>
  );
}
