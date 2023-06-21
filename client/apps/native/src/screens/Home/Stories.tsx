import * as React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Screen from "../../components/Screen";
import { colors } from "theme";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import Avatar from "../../components/Avatar";

import { Input } from "ui";

const Stories = () => {
  const [message, setMessage] = React.useState("");

  return (
    <Screen customStyles={styles.container}>
      <ImageBackground
        source={require("../../../assets/splash.png")}
        style={styles.image}
      />
      <View style={[styles.header, styles.flexRow, styles.justifyBetween]}>
        <View style={styles.flexRow}>
          <Avatar
            source={require("../../../assets/icon.png")}
            customStyles={{}}
            size={50}
            rightIcon="circle"
            iconColor={colors.success}
            iconSize={15}
          />
          <View style={styles.recipientCurrentInfo}>
            <Text style={styles.username}>John Doe</Text>
            <Text style={styles.time}>3 mn</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialCommunityIcons
            name="dots-vertical"
            color={colors.primary}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.flexRow, styles.justifyBetween, styles.footer]}>
        <TouchableOpacity onPress={() => {}}>
          <Entypo name={"link"} color={colors.medium} size={30} />
        </TouchableOpacity>
        <Input
          placeholder="Type a message"
          customStyles={styles.input}
          onChange={(text) => setMessage(text)}
        />
        <View style={styles.flexRow}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name={message !== "" ? "send" : "emoticon-happy-outline"}
              color={colors.medium}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="microphone-outline"
              color={colors.medium}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: colors.transparent,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    zIndex: 2,
  },
  groupImages: {
    width: "95%",
    height: 100,
    alignSelf: "center",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
  },
  imageContainer: {
    width: "100%",
    marginVertical: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  imagesView: {
    flex: 1,
    backgroundColor: colors.light,
  },
  iconBtn: {
    paddingHorizontal: 5,
  },
  input: {
    width: "70%",
    height: 50,
    backgroundColor: colors.light,
    borderRadius: 10,
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  header: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
    shadowColor: colors.medium,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  menuTab: {
    justifyContent: "center",
    marginVertical: 10,
  },

  time: {
    color: colors.medium,
  },
  pullDown: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButton: {
    position: "absolute",
    top: 8,
    left: 8,
  },
  recipientCurrentInfo: {
    paddingLeft: 10,
  },
  sheetContainer: {},
  tabContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    backgroundColor: colors.white,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  tabLabel: {},
  username: {
    fontWeight: "bold",
  },
});

export default Stories;
