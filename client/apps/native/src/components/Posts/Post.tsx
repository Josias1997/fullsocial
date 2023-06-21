import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import Avatar from "../Avatar";
import { colors } from "theme";
import { Image } from "expo-image";
import { Button } from "ui";
import Interraction from "./Interraction";
import { Post } from "types";
import { BASE_URL } from "api";
import Carousel from "react-native-reanimated-carousel";
import dayjs from "dayjs";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
let relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const PostComponent = ({
  content,
  videos,
  images,
  comments,
  interactions,
  created_at,
  user,
}: Post) => {
  const video = React.useRef<Video>(null);
  const [status, setStatus] = React.useState({});
  const width = Dimensions.get("window").width;
  const [textContent, setTextContent] = React.useState(
    content ? content.slice(0, 200) + (content.length > 200 ? "..." : "") : ""
  );
  const [carouselItemIndex, setCarouselItemIndex] = React.useState(0);
  const navigation: StackNavigationProp<ParamListBase> = useNavigation();

  const handleSeeMore = () => {
    if (content) {
      setTextContent(content);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() =>
            navigation.navigate("ProfileStack", {
              screen: "Profile",
              params: { userId: user.id },
            })
          }
        >
          <Avatar
            source={require("../../../assets/icon.png")}
            customStyles={styles.avatar}
            hasStory
          />
          <View style={styles.usernameAndDate}>
            <Text style={styles.username}>
              {user.first_name} {user.last_name}
            </Text>
            <Text style={styles.date}>{dayjs(created_at).fromNow()}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={25}
            color={colors.medium}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {textContent && <Text style={styles.textContent}>{textContent}</Text>}
        {content && content.length > 200 && (
          <Button
            text="See More"
            onClick={handleSeeMore}
            customStyles={styles.transparentButton}
            textStyles={styles.transparentButtonText}
          />
        )}
        <View>
          <Carousel
            loop
            width={width}
            height={width / 2}
            data={[...images, ...videos]}
            scrollAnimationDuration={1000}
            style={styles.carousel}
            onSnapToItem={(index) => setCarouselItemIndex(index)}
            renderItem={({ item }) =>
              item.thumbnail ? (
                <Video
                  ref={video}
                  style={styles.video}
                  source={{
                    uri: `${BASE_URL}${item.path}`,
                  }}
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping
                  onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
              ) : (
                <Image
                  style={styles.postImage}
                  source={{ uri: `${BASE_URL}${item.path}` }}
                />
              )
            }
          />
          {[...images, ...videos].length > 1 && (
            <Text style={styles.carouselItemIndex}>
              {carouselItemIndex + 1}/{[...images, ...videos].length}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerTop}>
          {interactions.slice(0, 3).map((interaction) => (
            <Interraction
              icon={<AntDesign name="like1" color={colors.primary} size={20} />}
              text={interaction.content}
            />
          ))}
        </View>
        <View style={styles.footerBottom}>
          <View style={styles.imagesAndComments}>
            <TouchableOpacity style={styles.images}>
              {comments.slice(0, 3).map((comment) => (
                <Image
                  key={comment.id}
                  source={{ uri: `${BASE_URL}${comment.user.profile_image}` }}
                  style={styles.commentsImage}
                />
              ))}
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.commentsText}>
                {comments.length} comments
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.share}>
            <MaterialCommunityIcons
              name="share-outline"
              color={"#ccc"}
              size={30}
            />
            <Text style={styles.shareText}>75</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  body: {
    padding: 10,
  },
  carousel: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  carouselItemIndex: {
    position: "absolute",
    backgroundColor: colors.black,
    color: colors.white,
    paddingVertical: 5,
    paddingHorizontal: 5,
    right: 0,
    borderTopRightRadius: 10,
  },
  commentsImage: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  commentsText: {
    color: colors.medium,
    fontWeight: "bold",
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5,
  },
  date: {
    color: colors.medium,
    fontSize: 12,
    fontWeight: "bold",
  },
  footer: {
    padding: 10,
  },
  footerTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerBottom: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  icon: {
    flex: 0,
  },
  imageContainer: {},
  images: {
    flexDirection: "row",
    alignItems: "center",
  },
  imagesAndComments: {
    flexDirection: "row",
    alignItems: "center",
  },
  postImage: {
    width: "100%",
    height: 300,
    borderRadius: 5,
  },
  share: {
    flexDirection: "row",
    alignItems: "center",
  },
  shareText: {
    color: colors.medium,
  },
  textContent: {
    paddingBottom: 20,
  },
  transparentButton: {
    backgroundColor: colors.transparent,
    alignSelf: "flex-start",
    width: "20%",
    paddingLeft: 0,
    paddingRight: 0,
  },
  transparentButtonText: {
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "left",
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontWeight: "bold",
  },
  usernameAndDate: {},
  video: {
    width: "100%",
    height: 300,
    borderRadius: 5,
  },
});
export default PostComponent;
