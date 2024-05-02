import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import testScreen from "../screens/ViewDoctorAndBook";
import ProductGridCard from "../components/Doctor/ViewAllDoctorDetails";
import ViewAllAppointment from "../screens/ViewAllAppointment";

// Icons
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";


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
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: "green" },
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      
     <Tab.Screen
        name="Doctors"
        component={ProductGridCard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="map-marker-alt" size={size} color={color} />
          ),
        }}
      />
          <Tab.Screen
        name="Booking"
        component={testScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="map-marker-alt" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={ViewAllAppointment}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
  

    </Tab.Navigator>
  );
}
