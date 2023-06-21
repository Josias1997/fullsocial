import * as React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors } from "theme";

export interface AppHeaderProps {
  title: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  customStyles?: ViewStyle;
}

const AppHeader = ({
  title,
  rightIcon,
  leftIcon,
  customStyles,
}: AppHeaderProps) => {
  return (
    <View style={[styles.headerContainer, customStyles]}>
      {leftIcon}
      <Text style={styles.title}>{title}</Text>
      {rightIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    paddingTop: 20,
  },
  title: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
});

export default AppHeader;
