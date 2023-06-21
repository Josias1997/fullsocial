import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Avatar from "../Avatar";
import { colors } from "theme";
import { ImageSource } from "expo-image";

export interface GroupProps {
  id: string | number;
  image: ImageSource;
  name: string;
  updatedAt: string;
}

const Group = ({ id, name, image, updatedAt }: GroupProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Avatar source={image} customStyles={styles.image} />
      <View style={styles.textsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.updatedAt}>{updatedAt}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  name: {
    fontWeight: "bold",
  },
  textsContainer: {
    marginLeft: 10,
  },
  updatedAt: {
    color: colors.medium,
    fontWeight: "bold",
  },
});

export default Group;
