import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import RootNavigator from "./RootNavigator";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoaderModal from "../components/LoaderModal";

const Stack = createStackNavigator();

const MainStack = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const userData = await AsyncStorage.getItem("@user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    })();
  }, []);
  return loading ? (
    <LoaderModal visible={loading} />
  ) : (
    <Stack.Navigator
      initialRouteName={user ? "Root" : "Auth"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Root" component={RootNavigator} />
    </Stack.Navigator>
  );
};

export default MainStack;
