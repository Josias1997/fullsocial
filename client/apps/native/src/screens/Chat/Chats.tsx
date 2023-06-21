import { StyleSheet, Text } from "react-native";
import * as React from "react";
import Screen from "../../components/Screen";
import { colors } from "theme";
import { Tabs } from "react-native-collapsible-tab-view";
import ChatsHeader from "../../components/Chats/ChatsHeader";
import { FlashList } from "@shopify/flash-list";
import Discussion from "../../components/Chats/Discussion";

const Chats = () => {
  return (
    <Screen>
      <Tabs.Container renderHeader={ChatsHeader}>
        <Tabs.Tab name="Discussions" label={"Discussions"}>
          <Tabs.ScrollView>
            <FlashList
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={new Array(20).fill(0)}
              renderItem={({ item }) => <Discussion />}
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

export default Chats;
