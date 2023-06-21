import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import PinnedGroups from "../../components/PinnedGroups/PinnedGroups";
import { colors } from "theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AllGroups from "../../components/AllGroups/AllGroups";
import Separator from "../../components/Separator";

const PINNED_GROUPS = [
  {
    id: 1,
    name: "Behance",
    image: require("../../../assets/icon.png"),
  },
  {
    id: 2,
    name: "Freealance & Co",
    image: require("../../../assets/icon.png"),
  },
  {
    id: 3,
    name: "Rugby",
    image: require("../../../assets/icon.png"),
  },
  {
    id: 4,
    name: "Nba",
    image: require("../../../assets/icon.png"),
  },
  {
    id: 5,
    name: "Gospel",
    image: require("../../../assets/icon.png"),
  },
  {
    id: 6,
    name: "Drums",
    image: require("../../../assets/icon.png"),
  },
  {
    id: 7,
    name: "Cool Vibes",
    image: require("../../../assets/icon.png"),
  },
  {
    id: 8,
    name: "Lifestyle",
    image: require("../../../assets/icon.png"),
  },
];

const GROUPS = [
  {
    id: 1,
    name: "Behance",
    image: require("../../../assets/icon.png"),
    updatedAt: "Updated 5 minutes ago",
  },
  {
    id: 2,
    name: "Freealance & Co",
    image: require("../../../assets/icon.png"),
    updatedAt: "Updated 5 minutes ago",
  },
  {
    id: 3,
    name: "Rugby",
    image: require("../../../assets/icon.png"),
    updatedAt: "Updated 5 minutes ago",
  },
  {
    id: 4,
    name: "Nba",
    image: require("../../../assets/icon.png"),
    updatedAt: "Updated 5 minutes ago",
  },
  {
    id: 5,
    name: "Gospel",
    image: require("../../../assets/icon.png"),
    updatedAt: "Updated 5 minutes ago",
  },
  {
    id: 6,
    name: "Drums",
    image: require("../../../assets/icon.png"),
    updatedAt: "Updated 5 minutes ago",
  },
  {
    id: 7,
    name: "Cool Vibes",
    image: require("../../../assets/icon.png"),
    updatedAt: "Updated 5 minutes ago",
  },
  {
    id: 8,
    name: "Lifestyle",
    image: require("../../../assets/icon.png"),
    updatedAt: "Updated 5 minutes ago",
  },
];

const Groups = () => {
  return (
    <Tabs.ScrollView showsVerticalScrollIndicator={false}>
      <PinnedGroups pinnedGroups={PINNED_GROUPS} />
      <Separator />
      <View style={styles.main}>
        <View style={styles.top}>
          <Text style={styles.allGroupsText}>All Groups 25</Text>
          <TouchableOpacity style={styles.filter}>
            <Text style={styles.filterText}>Recently joined</Text>
            <MaterialCommunityIcons
              name="sort"
              color={colors.primary}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <AllGroups groups={GROUPS} />
      </View>
    </Tabs.ScrollView>
  );
};

const styles = StyleSheet.create({
  allGroupsText: {
    fontWeight: "bold",
    paddingRight: 5,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filter: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    color: colors.primary,
    fontWeight: "bold",
    paddingRight: 5,
  },
  main: {
    padding: 20,
  },
});

export default Groups;
