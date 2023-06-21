import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Avatar from "../Avatar";
import { colors } from "theme";
import { StoryType } from "types";

const Story = ({ username, image, hasStory, plusIcon }: StoryType) => {
  return (
    <View
      style={[
        styles.container,
        {
          paddingLeft: plusIcon ? 5 : 0,
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.avatarContainer,
          {
            borderWidth: hasStory ? 1 : 0,
            borderColor: hasStory ? colors.primary : colors.transparent,
          },
        ]}
      >
        <Avatar source={image} customStyles={{}} size={60} />
        {plusIcon && (
          <View style={styles.plusIcon}>
            <AntDesign name="pluscircle" color={colors.primary} size={20} />
          </View>
        )}
      </TouchableOpacity>
      <Text
        style={[
          styles.username,
          {
            color: hasStory ? colors.primary : colors.medium,
          },
        ]}
      >
        {username}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  avatarContainer: {
    height: 63,
    width: 63,
    borderRadius: 31.5,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  plusIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: 25,
    width: 25,
    borderRadius: 12.5,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    fontWeight: "bold",
  },
});

export default Story;
