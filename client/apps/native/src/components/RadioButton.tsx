import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "theme";

export interface RadioButtonProps {
  selected?: boolean;
  onClick?: TouchableOpacityProps["onPress"];
  containerStyles?: TouchableOpacityProps["style"];
  selectedStyles?: ViewStyle;
}

const RadioButton = ({
  selected,
  onClick,
  containerStyles,
  selectedStyles,
}: RadioButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.container, containerStyles]}
    >
      {selected ? (
        <View style={[styles.innerContainer, selectedStyles]} />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.medium,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
});

export default RadioButton;
