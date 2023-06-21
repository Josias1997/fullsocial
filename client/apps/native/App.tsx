import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation/MainStack";
import AuthContext from "./src/context/AuthContext";
import { useState } from "react";

export default function Native() {
  const [user, setUser] = useState<any>();
  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ user, setUser }}>
        <MainStack />
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
