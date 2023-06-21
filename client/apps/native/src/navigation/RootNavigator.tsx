import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "theme";
import GroupsNavigator from "./GroupsNavigator";
import ChatsNavigator from "./ChatNavigator";
import NotificationsNavigator from "./NotificationsNavigator";
import ProfileNavigator from "./ProfileNavigator";
import { Image } from "expo-image";

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          alignItems: "center",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mediumLight,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={30} color={color} />
          ),
        }}
        name="HomeSatck"
        component={HomeNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-grid-outline"
              size={30}
              color={color}
            />
          ),
        }}
        name="GroupsStack"
        component={GroupsNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="facebook-messenger"
              size={30}
              color={color}
            />
          ),
        }}
        name="ChatsStack"
        component={ChatsNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="bell-outline"
              size={30}
              color={color}
            />
          ),
        }}
        name="NotificationsStack"
        component={NotificationsNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/icon.png")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
                borderWidth: focused ? 1 : 0,
                borderColor: focused ? colors.primary : colors.transparent,
              }}
              contentFit="cover"
            />
          ),
        }}
        name="ProfileStack"
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;
