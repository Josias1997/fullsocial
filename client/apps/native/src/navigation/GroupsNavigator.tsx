import { createStackNavigator } from "@react-navigation/stack";

import Groups from "../screens/Groups/GroupsScreen";
import GroupDetails from "../screens/Groups/GroupDetails";

const Stack = createStackNavigator();

const GroupsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Groups" component={Groups} />
      <Stack.Screen name="GroupDetails" component={GroupDetails} />
    </Stack.Navigator>
  );
};

export default GroupsNavigator;
