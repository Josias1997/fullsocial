import * as React from "react";
import Screen from "../../components/Screen";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "ui";
import { colors } from "theme";
import Avatar from "../../components/Avatar";

const EditProfile = () => {
  return (
    <Screen customStyles={{}}>
      <Text style={styles.title}>Edit Profile</Text>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 10,
        }}
      >
        <Avatar
          source={require("../../../assets/icon.png")}
          size={150}
          customStyles={{ alignSelf: "center" }}
        />
      </View>

      <Input
        placeholder="First Name"
        customStyles={styles.input}
        onChange={() => {}}
      />
      <Input
        placeholder="Last Name"
        customStyles={styles.input}
        onChange={() => {}}
      />
      <Input
        placeholder="Country"
        customStyles={styles.input}
        onChange={() => {}}
      />
      <Input
        placeholder="City"
        customStyles={styles.input}
        onChange={() => {}}
      />
      <Input
        placeholder="Address"
        customStyles={styles.input}
        onChange={() => {}}
      />
      <Input
        placeholder="Password"
        customStyles={styles.input}
        onChange={() => {}}
      />
      <Button
        text="Submit"
        onClick={() => {}}
        customStyles={styles.button}
        textStyles={styles.buttonText}
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
    marginVertical: 20,
  },
  transparentButton: {
    backgroundColor: colors.transparent,
  },
  transparentButtonText: {
    color: colors.primary,
  },
});

export default EditProfile;
