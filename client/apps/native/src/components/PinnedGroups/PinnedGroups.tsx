import * as React from "react";
import { FlashList } from "@shopify/flash-list";
import PinnedGroup, { PinnedGroupProps } from "./PinnedGroup";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "ui";
import { colors } from "theme";

export interface PinnedGroupsProps {
  pinnedGroups: Array<PinnedGroupProps>;
}

const PinnedGroups = ({ pinnedGroups }: PinnedGroupsProps) => {
  return (
    <View style={{ height: 200 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Pinned Groups</Text>
        <Button
          text="Edit"
          onClick={() => {}}
          customStyles={styles.transparentButton}
          textStyles={styles.transparentButtonText}
        />
      </View>
      <FlashList
        data={pinnedGroups}
        renderItem={({ item }) => <PinnedGroup {...item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        estimatedItemSize={370}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontWeight: "bold",
  },
  transparentButton: {
    backgroundColor: colors.transparent,
    width: "10%",
    paddingLeft: 0,
    paddingRight: 0,
  },
  transparentButtonText: {
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default PinnedGroups;
