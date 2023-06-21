import { StyleSheet } from "react-native";
import * as React from "react";
import Screen from "../../components/Screen";
import { colors } from "theme";
import { Tabs } from "react-native-collapsible-tab-view";
import Groups from "../Home/Groups";
import GroupsHeader from "../../components/Groups/GroupsHeader";
import ManagedGroups from "./ManagedGroups";

const GroupsScreen = () => {
  return (
    <Screen>
      <Tabs.Container renderHeader={GroupsHeader}>
        <Tabs.Tab name="Groups" label={"Groups"}>
          <Groups />
        </Tabs.Tab>
        <Tabs.Tab name="Groups-Managed" label={"Groups I Manage"}>
          <ManagedGroups />
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

export default GroupsScreen;
