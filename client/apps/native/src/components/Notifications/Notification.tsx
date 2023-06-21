import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
} from "react-native";
import Avatar from "../Avatar";
import { colors } from "theme";
import { Text } from "react-native";
import { Image, ImageSource } from "expo-image";

export interface NotificationProps {
  customStyles?: TouchableOpacityProps["style"];
  notification?: string;
  notificationDetails?: string;
  number?: number;
  image?: ImageSource;
  rightIcon?: string;
  rightIconColor?: string;
}

const Notification = ({
  customStyles,
  notification,
  notificationDetails,
  number,
  image,
  rightIconColor,
  rightIcon,
}: NotificationProps) => {
  return (
    <TouchableOpacity style={[styles.container, customStyles]}>
      <View style={styles.userInfo}>
        {rightIcon ? (
          <Avatar
            source={require("../../../assets/icon.png")}
            customStyles={styles.avatar}
            size={60}
            rightIcon={rightIcon}
            iconSize={15}
            iconColor={rightIconColor}
          />
        ) : (
          <Avatar
            source={require("../../../assets/icon.png")}
            customStyles={styles.avatar}
            size={60}
          />
        )}

        <View style={styles.notification}>
          <Text style={styles.notificationText}>{notification}</Text>

          {notificationDetails && (
            <Text style={styles.notitifcationDetails}>
              {notificationDetails}
            </Text>
          )}
        </View>
      </View>
      {number && (
        <View style={styles.notificationNumberContainer}>
          <Text style={styles.notificationNumber}>{number}</Text>
        </View>
      )}
      {image && (
        <Image source={image} style={styles.image} contentFit="cover" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {},
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  notitifcationDetails: {
    color: colors.medium,
  },
  notification: {
    paddingLeft: 10,
  },
  notificationNumber: {
    color: colors.white,
  },
  notificationNumberContainer: {
    height: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Notification;
