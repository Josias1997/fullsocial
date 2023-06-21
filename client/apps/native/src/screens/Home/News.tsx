import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import Stories from "../../components/Stories/Stories";
import { Tabs } from "react-native-collapsible-tab-view";

import Posts from "../../components/Posts/Posts";
import { colors } from "theme";
import Story from "../../components/Stories/Story";
import Separator from "../../components/Separator";
import { getUserFeed, getUserFriendsStories } from "api";
import AuthContext from "../../context/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../../components/Loader";

const STORIES = [
  {
    id: 1,
    username: "John",
    hasStory: false,
    image: require("../../../assets/icon.png"),
  },
  {
    id: 2,
    username: "Kilyan",
    hasStory: true,
    image: require("../../../assets/icon.png"),
  },
  {
    id: 3,
    username: "Ruby",
    hasStory: true,
    image: require("../../../assets/icon.png"),
  },
  {
    id: 4,
    username: "Yann",
    hasStory: false,
    image: require("../../../assets/icon.png"),
  },
  {
    id: 5,
    username: "Melissa",
    hasStory: false,
    image: require("../../../assets/icon.png"),
  },
  {
    id: 6,
    username: "Jane",
    hasStory: true,
    image: require("../../../assets/icon.png"),
  },
  {
    id: 7,
    username: "Melissa",
    hasStory: false,
    image: require("../../../assets/icon.png"),
  },
  {
    id: 8,
    username: "Jane",
    hasStory: true,
    image: require("../../../assets/icon.png"),
  },
];

const News = () => {
  const [posts, setPosts] = React.useState([]);
  const [stories, setStories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { user } = React.useContext(AuthContext);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      getUserFriendsPosts();
    }
  }, [isFocused]);

  const getUserFriendsPosts = async () => {
    setLoading(true);
    try {
      const response = await getUserFeed(user.id, user.token);
      setPosts(response.data.posts);
      const storiesResponse = await getUserFriendsStories(user.id, user.token);
      setStories(storiesResponse.data.stories);
    } catch (error: any) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
    setLoading(false);
  };
  return (
    <Tabs.ScrollView showsVerticalScrollIndicator={false}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View style={styles.storiesContainer}>
            <Story
              {...{
                id: 10,
                username: "New Story",
                hasStory: false,
                plusIcon: true,
                image: require("../../../assets/icon.png"),
              }}
            />
            <Stories stories={stories} />
          </View>
          <Separator />
          {posts.length > 0 && <Posts posts={posts} />}
        </>
      )}
    </Tabs.ScrollView>
  );
};
const styles = StyleSheet.create({
  storiesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default News;
