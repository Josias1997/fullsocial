import { createStackNavigator } from "@react-navigation/stack";

import Notifications from "../screens/Notifications";

const Stack = createStackNavigator();

const NotificationsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Notifications} />
    </Stack.Navigator>
  );
};

export default NotificationsNavigator;
