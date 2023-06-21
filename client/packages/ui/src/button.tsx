import * as React from "react";
import { colors } from "theme";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  Text,
  TouchableOpacityProps,
  TextStyle,
  ActivityIndicator
} from "react-native";

export interface ButtonProps {
  text: string;
  onClick?: (event: GestureResponderEvent) => void;
  customStyles?: TouchableOpacityProps["style"];
  textStyles?: TextStyle;
  loading?: boolean;
}

export function Button({
  text,
  onClick,
  customStyles,
  textStyles, loading
}: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, customStyles]} onPress={onClick}>
      {loading ? <ActivityIndicator size={"small"} color={colors.white} /> :  <Text style={[styles.text, textStyles]}>{text}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: "15px",
    backgroundColor: colors.primary,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
