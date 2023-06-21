import * as React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ActivityIndicatorProps,
} from "react-native";
import { colors } from "theme";

const Loader = ({
  size = "large",
  color = colors.primary,
}: ActivityIndicatorProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    alignSelf: "center",
  },
});

export default Loader;
