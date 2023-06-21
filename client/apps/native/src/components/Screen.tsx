import * as React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Constants from "expo-constants";
import { colors } from "theme";

export interface ScreenProps {
  children: React.ReactNode;
  customStyles?: ViewStyle;
}

const Screen = ({ children, customStyles }: ScreenProps) => {
  return <View style={[styles.container, customStyles]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.white,
  },
});

export default Screen;
