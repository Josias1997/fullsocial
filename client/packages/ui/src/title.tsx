import * as React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { colors } from "theme";

export interface TitleProps {
  title: string;
  subtitle: string;
  containerStyles?: ViewStyle;
  titleStyles?: TextStyle;
  subtitleStyles?: TextStyle;
}
export const Title = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
  subtitleStyles,
}: TitleProps) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={[styles.title, titleStyles]}>{title}</Text>
      <Text style={[styles.subtitle, subtitleStyles]}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
  subtitle: {
    color: colors.dark,
    fontSize: 15,
    textAlign: "center",
  },
});
