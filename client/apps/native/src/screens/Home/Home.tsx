import { StyleSheet, View, Modal, Text } from "react-native";
import * as React from "react";
import Screen from "../../components/Screen";
import { colors } from "theme";
import { Tabs } from "react-native-collapsible-tab-view";
import { FAB } from "react-native-paper";
import HomeHeader from "../../components/Home/HomeHeader";

import News from "./News";
import Groups from "./Groups";
import Watch from "./Watch";
import { StackScreenProps } from "../../types/navigation";

const Home = ({ navigation }: StackScreenProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Screen>
      <Tabs.Container renderHeader={HomeHeader}>
        <Tabs.Tab name="News" label={"News"}>
          <News />
        </Tabs.Tab>
        <Tabs.Tab name="Groups" label={"Groups"}>
          <Groups />
        </Tabs.Tab>
        <Tabs.Tab name="Watch" label={"Watch"}>
          <Watch />
        </Tabs.Tab>
      </Tabs.Container>
      <FAB.Group
        open={open}
        visible
        icon={open ? "calendar-today" : "plus"}
        actions={[
          {
            icon: "plus",
            label: "New Post",
            onPress: () => navigation.navigate("NewPost"),
            style: styles.fabItem,
            color: colors.white,
          },
          {
            icon: "account-group",
            label: "New Group",
            onPress: () => navigation.navigate("NewPost"),
            style: styles.fabItem,
            color: colors.white,
          },
          {
            icon: "magnify",
            label: "Search",
            onPress: () => navigation.navigate("Search"),
            style: [styles.fabItem, styles.fabItemSearch],
            labelStyle: styles.fabItemSearch,
            color: colors.white,
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
        fabStyle={styles.fab}
        color={colors.white}
        backdropColor="rgba(0, 0, 0, 0.3)"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  modalContent: {
    backgroundColor: colors.white,
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    verticalAlign: "center",
    paddingBottom: 20,
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    position: "absolute",
    right: 10,
    bottom: 0,
  },
  fabItem: {
    backgroundColor: colors.medium,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  fabItemSearch: {
    marginBottom: 50,
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
  button: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  main: {
    margin: 20,
    padding: 10,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 2,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  leftHeaderIcon: {
    padding: 10,
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
  },
  textAreaContainer: {
    borderWidth: 0.5,
    borderColor: colors.light,
    borderRadius: 30,
  },
  textarea: {
    minHeight: 200,
    marginTop: 20,
    textAlignVertical: "top",
    backgroundColor: colors.light,
    padding: 10,
    borderRadius: 20,
  },
  username: {
    fontWeight: "bold",
    paddingLeft: 10,
  },
});

export default Home;
