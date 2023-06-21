import * as React from "react";
import { Image, ImageProps, ImageStyle } from "expo-image";
import { colors } from "theme";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconProps } from "react-native-paper/lib/typescript/src/components/MaterialCommunityIcon";

export interface AvatarProps {
  source: ImageProps["source"];
  customStyles: ImageStyle;
  hasStory?: boolean;
  size?: number;
  rightIcon?: IconProps["name"];
  iconColor?: string;
  iconSize?: number;
}

const Avatar = ({
  source,
  customStyles,
  hasStory,
  size = 80,
  rightIcon,
  iconColor,
  iconSize,
}: AvatarProps) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={source}
        contentFit="cover"
        transition={1000}
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          customStyles,
          {
            borderWidth: hasStory ? 1 : 0,
            borderColor: hasStory ? colors.primary : colors.transparent,
          },
        ]}
      />
      {rightIcon && (
        <MaterialCommunityIcons
          name={rightIcon}
          color={iconColor}
          style={styles.rightIcon}
          size={iconSize}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rightIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default Avatar;
