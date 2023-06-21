import { StyleSheet, View } from "react-native";
import * as React from "react";
import AppHeader from "../AppHeader";
import { colors } from "theme";
import Notification from "./Notification";

const NotificationsHeader = () => {
  return (
    <View style={styles.header}>
      <AppHeader title="Notifications" />
      <Notification
        notification={"Friends Requests"}
        notificationDetails={"Alina and 150 others"}
        number={137}
      />
      <Notification notification={"Invitation to group"} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  header: {
    height: 220,
    borderBottomWidth: 1,
    borderColor: colors.light,
    paddingHorizontal: 20,
  },
  input: {
    width: "90%",
    height: 50,
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
  rightIcon: {
    position: "absolute",
    right: 10,
    top: 30,
  },
});

export default NotificationsHeader;
