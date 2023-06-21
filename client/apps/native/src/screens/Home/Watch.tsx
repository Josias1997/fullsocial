import * as React from "react";
import { Text, View } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import Posts from "../../components/Posts/Posts";

const Watch = () => {
  return (
    <Tabs.ScrollView showsVerticalScrollIndicator={false}>
      <Posts type="video" />
    </Tabs.ScrollView>
  );
};

export default Watch;
