import * as React from "react";
import Screen from "../../components/Screen";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "ui";
import { colors } from "theme";
import { login } from "api";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthContext from "../../context/AuthContext";
const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { setUser } = React.useContext(AuthContext);

  const logUser = async () => {
    // setError("");
    setLoading(true);
    try {
      const response = await login(email, password);
      setUser({
        ...response.data.user,
        token: response.data.token,
      });
      AsyncStorage.setItem(
        "@user",
        JSON.stringify({
          ...response.data.user,
          token: response.data.token,
        })
      );
      setLoading(false);
      navigation.reset({
        index: 1,
        routes: [{ name: "Root", params: { screen: "HomeStack" } }],
      });
    } catch (error: any) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Screen customStyles={{}}>
      <Text style={styles.title}>FullSocial</Text>
      <Input
        placeholder="Mobile number of email address"
        customStyles={styles.input}
        onChange={(text: string) => setEmail(text)}
      />
      <Input
        placeholder="Password"
        customStyles={styles.input}
        onChange={(text: string) => setPassword(text)}
        secureTextEntry
      />
      <Button
        text="Log In"
        onClick={logUser}
        customStyles={styles.button}
        textStyles={styles.buttonText}
        loading={loading}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        text="Forgotten password?"
        onClick={() => navigation.navigate("ForgotPassword")}
        customStyles={styles.transparentButton}
        textStyles={styles.transparentButtonText}
      />
      <View style={styles.separator}>
        <View style={styles.line}></View>
        <Text style={styles.separatorText}>Or</Text>
        <View style={styles.line}></View>
      </View>
      <Button
        text="Create new account"
        onClick={() => navigation.navigate("Register")}
        customStyles={styles.newAccountButton}
        textStyles={styles.newAccountButtonText}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "90%",
    alignSelf: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
  error: {
    color: colors.danger,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  input: {
    marginVertical: 5,
    width: "90%",
    alignSelf: "center",
  },
  line: {
    width: "40%",
    borderTopWidth: 1,
    borderTopColor: colors.medium,
  },
  newAccountButton: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.medium,
    width: "70%",
    alignSelf: "center",
    marginTop: 30,
  },
  newAccountButtonText: {
    color: colors.dark,
    fontWeight: "bold",
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  separatorText: {
    color: colors.dark,
  },
  title: {
    color: colors.primary,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 50,
  },
  transparentButton: {
    backgroundColor: colors.transparent,
  },
  transparentButtonText: {
    color: colors.primary,
  },
});

export default Login;
