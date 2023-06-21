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

export interface DiscussionProps {
  customStyles?: TouchableOpacityProps["style"];
}

const Discussion = ({ customStyles }: DiscussionProps) => {
  return (
    <TouchableOpacity style={[styles.container, customStyles]}>
      <View style={styles.userInfo}>
        <Avatar
          source={require("../../../assets/icon.png")}
          customStyles={styles.avatar}
          size={60}
          rightIcon="circle"
          iconColor={colors.success}
          iconSize={18}
        />
        <View style={styles.messageInfo}>
          <Text style={styles.username}>John</Text>
          <Text style={styles.lastMessage}>I'm pleased to hear that .. 5m</Text>
        </View>
      </View>
      <View style={styles.unreadMessagesContainer}>
        <Text style={styles.unreadMessages}>7</Text>
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

export default Discussion;
