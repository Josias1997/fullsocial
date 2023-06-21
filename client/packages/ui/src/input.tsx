import * as React from "react";
import { StyleSheet, TextInput, TextInputProps, TextStyle } from "react-native";
import { colors } from "../../theme/colors";

export interface InputProps {
  placeholder: TextInputProps["placeholder"];
  onChange: TextInputProps["onChangeText"];
  customStyles?: TextStyle;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  maxLength?: TextInputProps["maxLength"];
}

export const Input = ({
  placeholder,
  onChange,
  customStyles,
  secureTextEntry,
  keyboardType,
  maxLength,
}: InputProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChange}
      style={[styles.input, customStyles]}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      maxLength={maxLength}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    backgroundColor: colors.light,
    borderRadius: 5,
    paddingLeft: 10,
  },
});
