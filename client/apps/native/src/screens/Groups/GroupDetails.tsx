import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as React from "react";
import Screen from "../../components/Screen";
import { colors } from "theme";
import { Tabs } from "react-native-collapsible-tab-view";
import { Text } from "react-native";
import { Button } from "ui";
import { MaterialCommunityIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import Separator from "../../components/Separator";
import Posts from "../../components/Posts/Posts";
import GroupsDetailsHeader from "../../components/Groups/GroupDetailsHeader";

const GroupDetails = () => {
  return (
    <Screen>
      <Tabs.Container renderHeader={GroupsDetailsHeader}>
        <Tabs.Tab name="title" label={"Best Place To Travel"}>
          <Tabs.ScrollView>
            <Text style={styles.description}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consectetur maiores minima dolore amet debitis voluptas, eaque
              suscipit corporis tempore id modi libero? Vero esse natus cum
              minus amet reiciendis dolores.
            </Text>
            <Button text="Join Group" customStyles={styles.joinBtn} />
            <View style={styles.details}>
              <View style={[styles.dFlex, styles.justifyBetween]}>
                <View style={[styles.dFlex, { paddingLeft: 0 }]}>
                  <MaterialCommunityIcons
                    name="account-group-outline"
                    color={colors.medium}
                    size={25}
                  />
                  <Text style={styles.detailText}>
                    253.3K Members, 37 Friends
                  </Text>
                </View>
                <View style={styles.dFlex}>
                  <Image
                    source={require("../../../assets/icon.png")}
                    style={styles.circleImage}
                  />
                  <Image
                    source={require("../../../assets/icon.png")}
                    style={styles.circleImage}
                  />
                  <Image
                    source={require("../../../assets/icon.png")}
                    style={styles.circleImage}
                    contentFit="cover"
                  />
                </View>
              </View>
              <View style={styles.dFlex}>
                <MaterialCommunityIcons
                  name="post-outline"
                  color={colors.medium}
                  size={25}
                />
                <Text style={styles.detailText}>17K Posts, 17 New Today</Text>
              </View>
              <View style={styles.dFlex}>
                <Ionicons
                  name="globe-outline"
                  color={colors.medium}
                  size={25}
                />
                <Text style={[styles.detailText, styles.textPrimary]}>
                  https://besttravels.com
                </Text>
              </View>
              <View style={styles.dFlex}>
                <MaterialCommunityIcons
                  name="information"
                  color={colors.primary}
                  size={25}
                />
                <Text style={[styles.detailText, styles.textPrimary]}>
                  See More
                </Text>
              </View>
            </View>
            <Separator />
            <View style={styles.photos}>
              <View style={[styles.dFlex, styles.justifyBetween]}>
                <Text>Photos 348</Text>
                <TouchableOpacity>
                  <Entypo
                    name="chevron-right"
                    color={colors.medium}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ paddingHorizontal: 15 }}>
                <FlashList
                  data={new Array(9).fill(0)}
                  renderItem={({ item }) => (
                    <View style={styles.imageContainer}>
                      <Image
                        source={require("../../../assets/icon.png")}
                        style={styles.groupImages}
                        contentFit="cover"
                      />
                    </View>
                  )}
                  numColumns={3}
                  keyExtractor={(item, index) => index.toString()}
                  estimatedItemSize={50}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
            <Separator />
            <Posts type="text" />
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
  circleImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  description: {
    textAlign: "center",
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  details: {
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 5,
  },

  dFlex: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  groupImages: {
    width: "90%",
    height: 100,
    alignSelf: "center",
    borderRadius: 10,
  },
  imageContainer: {
    width: "100%",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
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
  joinBtn: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 20,
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  photos: {
    marginTop: 5,
    marginBottom: 10,
  },
  textPrimary: {
    color: colors.primary,
  },
});

export default GroupDetails;
