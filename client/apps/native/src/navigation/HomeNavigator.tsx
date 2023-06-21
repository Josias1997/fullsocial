import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home/Home";
import Stories from "../screens/Home/Stories";
import Profile from "../screens/Profile/Profile";
import NewPost from "../screens/Home/NewPost";
import Search from "../screens/Home/Search";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewPost" component={NewPost} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Stories" component={Stories} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
