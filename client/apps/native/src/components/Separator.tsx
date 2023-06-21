import * as React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "theme";

const Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 3,
    backgroundColor: colors.light,
  },
});

export default Separator;
