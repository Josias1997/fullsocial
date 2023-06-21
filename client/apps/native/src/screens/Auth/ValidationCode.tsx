import * as React from "react";
import Screen from "../../components/Screen";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Input, Button } from "ui";
import { colors } from "theme";
import { sendVerificationCode, verifyCode } from "api";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackScreenProps } from "../../types/navigation";

const ValidationCode = ({ route }: StackScreenProps) => {
  const [code, setCode] = React.useState<number>(0);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const submitCode = async () => {
    setLoading(true);
    try {
      const response = await verifyCode(code, route.params?.email);
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error: any) {
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  const sendNewVerificationEmail = async () => {
    setLoading(true);
    try {
      const response = await sendVerificationCode(route.params?.email);
      Alert.alert("Email sent in your inbox");
    } catch (error: any) {
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <Screen customStyles={{}}>
      <Text style={styles.title}>FullSocial</Text>
      <Input
        placeholder="Enter the code we sent to your Mail"
        customStyles={styles.input}
        onChange={(code: number) => setCode(code)}
        keyboardType="number-pad"
        maxLength={6}
      />
      <Button
        text="Validate"
        onClick={submitCode}
        customStyles={styles.button}
        textStyles={styles.buttonText}
        loading={loading}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.separator}>
        <View style={styles.line}></View>
        <Text style={styles.separatorText}>Or</Text>
        <View style={styles.line}></View>
      </View>
      <Button
        text="Resend Email"
        onClick={sendNewVerificationEmail}
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

export default ValidationCode;
