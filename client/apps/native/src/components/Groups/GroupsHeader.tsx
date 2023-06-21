import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as React from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { Input } from "ui";
import { colors } from "theme";

const GroupsHeader = () => {
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity>
        <Entypo name="chevron-left" size={30} color={colors.primary} />
      </TouchableOpacity>
      <Input
        customStyles={styles.input}
        placeholder="Search Groups"
        onChange={() => {}}
      />
      <TouchableOpacity>
        <AntDesign name="pluscircleo" color={colors.primary} size={30} />
      </TouchableOpacity>
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

export default GroupsHeader;
