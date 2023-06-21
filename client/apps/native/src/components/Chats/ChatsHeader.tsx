import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { Feather } from "@expo/vector-icons";
import AppHeader from "../AppHeader";
import { Input } from "ui";
import { colors } from "theme";

const ChatsHeader = () => {
  return (
    <View style={styles.header}>
      <AppHeader
        title="Chats"
        rightIcon={
          <TouchableOpacity style={styles.rightIcon}>
            <Feather name="edit" color={colors.primary} size={30} />
          </TouchableOpacity>
        }
      />
      <View style={styles.inputContainer}>
        <Input
          customStyles={styles.input}
          placeholder="What's on your mind?"
          onChange={() => {}}
        />
      </View>
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
    height: 150,
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

export default ChatsHeader;
