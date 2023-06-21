import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "theme";

export interface InterractionProps {
  text: string;
  icon: ReactNode;
}

const Interraction = ({ text, icon }: InterractionProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      {icon}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 20,
    padding: 7,
    marginHorizontal: 2,
  },
  text: {
    color: colors.medium,
    fontWeight: "bold",
  },
});

export default Interraction;
