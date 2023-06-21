import { createStackNavigator } from "@react-navigation/stack";
import Chats from "../screens/Chat/Chats";
import Messages from "../screens/Chat/Messages";

const Stack = createStackNavigator();

const ChatsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="Messages" component={Messages} />
    </Stack.Navigator>
  );
};

export default ChatsNavigator;
