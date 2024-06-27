import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductGridCard from "../components/Doctor/ViewAllDoctorDetails";
import ViewAllAppointment from "../screens/Appointment/ViewAllAppointmentScreen";
import PaymentScreen from "../screens/Doctor/ViewDoctorAndBook";
import HomeScreen from "../screens/HomeScreen";

// Icons
import { FontAwesome6 } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import Schedule from "../screens/Appointment/ScheduleAppointmentScreen";

import CallScreen from "../screens/ChatAndCall/CallScreen";
import ChannelScreen from "../screens/ChatAndCall/ChannelAndChatScreen";
import NormalStackNavigator from "./NormalStackNavigator";
import ImagePickerExample from "../screens/Profile/Profile1";

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
        component={PaymentScreen}
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
        name="Chat"
        component={ChannelScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="chat" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Call"
        component={CallScreen}
        options={{ tabBarButton: () => null, tabBarVisible: false }}
      />

      {/* <Tab.Screen name="Schedule" component={Schedule} /> */}

      <Tab.Screen
        name="profile1"
        component={ImagePickerExample}
        options={{ tabBarButton: () => null, tabBarVisible: false }}
      />

      {/* /stack screen */}
      <Tab.Screen
        name="Layout"
        component={NormalStackNavigator}
        options={{ tabBarButton: () => null, tabBarVisible: false }}
      />
    </Tab.Navigator>
  );
}
