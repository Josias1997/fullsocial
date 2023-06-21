import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { colors } from "theme";

export interface IconButtonProps {
  iconComponent: React.ReactNode;
  customStyles: TouchableOpacityProps["style"];
  onClick: TouchableOpacityProps["onPress"];
}

export const IconButton = ({
  iconComponent,
  customStyles,
  onClick,
}: IconButtonProps) => {
  <TouchableOpacity onPress={onClick} style={[styles.button, customStyles]}>
    {iconComponent}
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.transparent,
  },
});
