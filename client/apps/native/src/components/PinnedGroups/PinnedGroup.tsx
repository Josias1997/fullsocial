import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Avatar from "../Avatar";
import { colors } from "theme";
import { ImageSource } from "expo-image";

export interface PinnedGroupProps {
  id: string | number;
  image: ImageSource;
  name: string;
}

const PinnedGroup = ({ name, image }: PinnedGroupProps) => {
  return (
    <View style={styles.container}>
      <Avatar source={image} customStyles={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  name: {
    color: colors.medium,
    fontWeight: "bold",
    marginVertical: 5,
  },
});

export default PinnedGroup;
