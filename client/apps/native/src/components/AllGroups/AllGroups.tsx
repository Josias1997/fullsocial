import * as React from "react";
import { FlashList } from "@shopify/flash-list";
import Group, { GroupProps } from "./Group";
import { View } from "react-native";

export interface GroupsProps {
  groups: Array<GroupProps>;
}

const AllGroups = ({ groups }: GroupsProps) => {
  return (
    <FlashList
      data={groups}
      renderItem={({ item }) => <Group {...item} />}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={370}
    />
  );
};

export default AllGroups;
