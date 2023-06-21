import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../AppHeader";
import { Input } from "ui";
import Avatar from "../Avatar";
import { colors } from "theme";
import AuthContext from "../../context/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";

const HomeHeader = () => {
  const { user } = React.useContext(AuthContext);
  const navigation: StackNavigationProp<ParamListBase> = useNavigation();
  return (
    <View>
      <AppHeader title="Facebook" rightIcon />
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileStack")}>
          <Avatar
            source={require("../../../assets/icon.png")}
            customStyles={{}}
            size={60}
          />
        </TouchableOpacity>
        <Input
          customStyles={styles.input}
          placeholder={`What's on your mind ${user.first_name}?`}
          onChange={() => {}}
        />
        <TouchableOpacity onPress={() => navigation.navigate("NewPost")}>
          <Ionicons name="md-image" color={colors.medium} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "65%",
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
  },
});

export default HomeHeader;
