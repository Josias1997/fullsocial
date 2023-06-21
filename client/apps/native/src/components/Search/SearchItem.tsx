import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
} from "react-native";
import Avatar from "../Avatar";
import { colors } from "theme";
import { Text } from "react-native";
import { ContextUser } from "../../context/AuthContext";
import { BASE_URL } from "api";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";

export interface SearchItemProps {
  customStyles?: TouchableOpacityProps["style"];
  user: ContextUser;
}

const SearchItem = ({ customStyles, user }: SearchItemProps) => {
  const navigation: StackNavigationProp<ParamListBase> = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.container, customStyles]}
      onPress={() =>
        navigation.navigate("ProfileStack", {
          screen: "Profile",
          params: { userId: user.id },
        })
      }
    >
      <View style={styles.userInfo}>
        <Avatar
          source={
            user.profile_image
              ? { uri: `${BASE_URL}${user.profile_image}` }
              : require("../../../assets/icon.png")
          }
          customStyles={styles.avatar}
          size={60}
        />
        <View style={styles.messageInfo}>
          <Text style={styles.username}>
            {user.first_name} {user.last_name}
          </Text>
          <Text style={styles.lastMessage}>{user.city}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {},
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  lastMessage: {
    color: colors.medium,
  },
  messageInfo: {
    paddingLeft: 10,
  },
  unreadMessages: {
    color: colors.white,
  },
  unreadMessagesContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    fontWeight: "bold",
    fontSize: 18,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default SearchItem;
