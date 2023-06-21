import { StyleSheet, Text } from "react-native";
import * as React from "react";
import Screen from "../components/Screen";
import { colors } from "theme";
import { Tabs } from "react-native-collapsible-tab-view";
import NotificationsHeader from "../components/Notifications/NotificationsHeader";
import { FlashList } from "@shopify/flash-list";
import Notification from "../components/Notifications/Notification";

const Notifications = () => {
  return (
    <Screen>
      <Tabs.Container renderHeader={NotificationsHeader}>
        <Tabs.Tab name="All" label={"All"}>
          <Tabs.ScrollView>
            <FlashList
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={new Array(20).fill(0)}
              renderItem={({ item }) => (
                <Notification
                  notification="Jane cooper"
                  rightIcon="heart-circle"
                  rightIconColor={colors.danger}
                  notificationDetails="liked your photo Today at 12:56"
                  image={require("../../assets/icon.png")}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              estimatedItemSize={140}
            />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Likes" label={"Likes"}>
          <Tabs.ScrollView>
            <FlashList
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={new Array(20).fill(0)}
              renderItem={({ item }) => (
                <Notification
                  notification="Jane cooper"
                  rightIcon="heart-circle"
                  rightIconColor={colors.danger}
                  notificationDetails="liked your photo Today at 12:56"
                  image={require("../../assets/icon.png")}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              estimatedItemSize={140}
            />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Comments" label={"Comments"}>
          <Tabs.ScrollView>
            <FlashList
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={new Array(20).fill(0)}
              renderItem={({ item }) => (
                <Notification
                  notification="Jane cooper"
                  rightIcon="comment"
                  rightIconColor={colors.success}
                  notificationDetails="commented your post Today at 12:56"
                  image={require("../../assets/icon.png")}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              estimatedItemSize={140}
            />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </Screen>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  input: {
    width: "65%",
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
  },
});

export default Notifications;
