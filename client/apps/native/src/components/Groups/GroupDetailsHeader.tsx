import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as React from "react";
import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Input } from "ui";
import { colors } from "theme";

const GroupsDetailsHeader = () => {
  return (
    <View style={styles.header}>
      <ImageBackground
        source={require("../../../assets/icon.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.headerContent}>
        <TouchableOpacity>
          <Entypo name="chevron-left" size={30} color={colors.white} />
        </TouchableOpacity>
        <Input
          customStyles={styles.input}
          placeholder="Search Groups"
          onChange={() => {}}
        />
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-vertical"
            color={colors.white}
            size={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
  },
  header: {
    width: "100%",
    height: 400,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
  },
  headerContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 20,
  },
  input: {
    width: "65%",
  },
});

export default GroupsDetailsHeader;
