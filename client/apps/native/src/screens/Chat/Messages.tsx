import * as React from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import Screen from "../../components/Screen";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { colors } from "theme";
import Avatar from "../../components/Avatar";
import Message from "../../components/Chats/Message";
import { Input } from "ui";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import RadioButton from "../../components/RadioButton";

const Messages = () => {
  const height = useSharedValue("0%");
  const [showGalery, setShowGallery] = React.useState(false);
  const [pullUp, setPullUp] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, {
        duration: 500,
        easing: Easing.linear,
      }),
    };
  });
  React.useEffect(() => {
    if (pullUp && showGalery) {
      height.value = "100%";
    } else if (showGalery) {
      height.value = "40%";
    } else {
      height.value = "0%";
    }
  }, [showGalery, pullUp]);

  return (
    <Screen customStyles={styles.container}>
      <View style={[styles.header, styles.flexRow, styles.justifyBetween]}>
        <View style={styles.flexRow}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>
          <View style={[styles.flexRow]}>
            <Avatar
              source={require("../../../assets/icon.png")}
              customStyles={styles.avatar}
              size={50}
              rightIcon="circle"
              iconColor={colors.success}
              iconSize={15}
            />
            <View style={styles.recipientCurrentInfo}>
              <Text style={styles.username}>John Doe</Text>
              <Text style={styles.online}>Online</Text>
            </View>
          </View>
        </View>
        <View style={styles.flexRow}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialCommunityIcons
              name="phone-outline"
              color={colors.primary}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialCommunityIcons
              name="video-outline"
              color={colors.primary}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Message audio="audio" />
        <Message text="audio" />
        <Message audio="audio" left />
        <Message text="audio" />
        <Message text="audio" />
        <Message text="audio" left />
        <Message image="audio" left />
        <Message text="audio" />
        <Message image="audio" />
        <Message text="audio" left />
        <Message text="audio" left />
        <Message text="audio" />
        <Message video="audio" />
        <Message text="audio" />
        <Message video="audio" left />
      </ScrollView>
      <View style={[styles.flexRow, styles.justifyBetween, styles.footer]}>
        <TouchableOpacity
          onPress={() => {
            setShowGallery((current) => !current);
          }}
        >
          <Entypo
            name={showGalery ? "cross" : "link"}
            color={
              showGalery || (!showGalery && pullUp)
                ? colors.primary
                : colors.medium
            }
            size={30}
          />
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
      <Animated.View style={animatedStyles}>
        <TouchableOpacity
          style={styles.pullDown}
          onPress={() => {
            setPullUp((current) => !current);
          }}
        >
          <MaterialCommunityIcons
            name={pullUp ? "chevron-down" : "chevron-up"}
            color={colors.medium}
            size={30}
          />
        </TouchableOpacity>
        <ScrollView style={styles.imagesView}>
          <View style={[styles.flexRow, styles.menuTab]}>
            <View style={styles.tabContainer}>
              <TouchableOpacity style={styles.tabIcon}>
                <MaterialCommunityIcons
                  name="camera-outline"
                  color={colors.medium}
                  size={20}
                />
              </TouchableOpacity>
              <Text style={styles.tabLabel}>Camera</Text>
            </View>
            <View style={styles.tabContainer}>
              <TouchableOpacity style={styles.tabIcon}>
                <MaterialIcons name="photo" color={colors.medium} size={20} />
              </TouchableOpacity>
              <Text style={styles.tabLabel}>Gallery</Text>
            </View>
            <View style={styles.tabContainer}>
              <TouchableOpacity style={styles.tabIcon}>
                <MaterialCommunityIcons
                  name="file-outline"
                  color={colors.medium}
                  size={20}
                />
              </TouchableOpacity>
              <Text style={styles.tabLabel}>File</Text>
            </View>
            <View style={styles.tabContainer}>
              <TouchableOpacity style={styles.tabIcon}>
                <MaterialCommunityIcons
                  name="file-gif-box"
                  color={colors.medium}
                  size={20}
                />
              </TouchableOpacity>
              <Text style={styles.tabLabel}>Gif</Text>
            </View>
            <View style={styles.tabContainer}>
              <TouchableOpacity style={styles.tabIcon}>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  color={colors.medium}
                  size={20}
                />
              </TouchableOpacity>
              <Text style={styles.tabLabel}>Location</Text>
            </View>
          </View>
          <FlashList
            data={new Array(15).fill(0)}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image
                  source={require("../../../assets/icon.png")}
                  style={styles.groupImages}
                  contentFit="cover"
                />
                <RadioButton containerStyles={styles.radioButton} />
              </View>
            )}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            estimatedItemSize={50}
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingBottom: 170,
            }}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </Animated.View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  avatar: {},
  body: {
    paddingHorizontal: 20,
  },
  container: {},
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  groupImages: {
    width: "95%",
    height: 100,
    alignSelf: "center",
    borderRadius: 10,
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

  online: {
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
export default Messages;
