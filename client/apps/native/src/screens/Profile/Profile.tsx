import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as React from "react";
import Screen from "../../components/Screen";
import { colors } from "theme";
import { Tabs } from "react-native-collapsible-tab-view";
import { Text } from "react-native";
import { Button } from "ui";
import {
  MaterialCommunityIcons,
  Entypo,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import Separator from "../../components/Separator";
import Posts from "../../components/Posts/Posts";
import ProfileHeader from "../../components/ProfileHeader";
import ImagesGrid from "../../components/ImagesGrid";
import Loader from "../../components/Loader";
import AuthContext, {
  ContextUser,
  initialUser,
} from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "../../types/navigation";
import {
  getUserImages,
  getUserFollowers,
  getUserFollowings,
  getUserPosts,
  BASE_URL,
  findUserById,
  followOrUnfollowUser,
  verifyFriendship,
} from "api";
import { ImageType, User, Post } from "types";
import { useIsFocused } from "@react-navigation/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import ProfileContext from "../../context/ProfileContext";

const Profile = ({ navigation, route }: StackScreenProps) => {
  const { user, setUser } = React.useContext(AuthContext);
  const [currentUser, setCurrentUser] = React.useState<ContextUser>();
  const [images, setImages] = React.useState<ImageType[]>([]);
  const [followers, setFollowers] = React.useState<User[]>([]);
  const [followings, setFollowings] = React.useState<User[]>([]);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [followingLoading, setFollowingLoading] = React.useState(false);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (route.params?.userId) {
      getUserData(route.params?.userId);
    } else {
      setCurrentUser(user);
    }
  }, []);

  React.useEffect(() => {
    if (isFocused && currentUser) {
      fetchData(currentUser);
    }
  }, [isFocused, currentUser]);

  const getUserData = async (userId: string | number) => {
    try {
      const response = await findUserById(userId, user.token);
      setCurrentUser(response.data.user);
    } catch (error: any) {
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  const fetchData = async (currentUser: ContextUser) => {
    setLoading(true);
    try {
      const imagesResponse = await getUserImages(currentUser.id, user.token);
      setImages(imagesResponse.data.images);
      const followersResponse = await getUserFollowers(
        currentUser.id,
        user.token
      );
      setFollowers(followersResponse.data.followers);
      const followingsResponse = await getUserFollowings(
        currentUser.id,
        user.token
      );
      setFollowings(followingsResponse.data.followings);
      const postsResponse = await getUserPosts(currentUser.id, user.token);
      setPosts(postsResponse.data.posts);
      const isFollowingResponse = await verifyFriendship(
        user.id,
        currentUser.id,
        user.token
      );
      setIsFollowing(isFollowingResponse.data.isFriend);
    } catch (error: any) {
      alert(error.response ? error.response.data.message : error.message);
    }
    setLoading(false);
  };

  const followUser = async () => {
    if (currentUser) {
      setFollowingLoading(true);
      try {
        const response = await followOrUnfollowUser(
          user.id,
          currentUser?.id,
          isFollowing ? "unfollow" : "follow",
          user.token
        );
        setIsFollowing(response.data.operation == "follow" ? true : false);
      } catch (error: any) {
        alert(error.response ? error.response.data.message : error.message);
      }
      setFollowingLoading(false);
    }
  };

  const logout = async () => {
    setUser(initialUser);
    await AsyncStorage.removeItem("@user");
    navigation.reset({
      index: 0,
      routes: [{ name: "Auth" }],
    });
  };

  return loading ? (
    <Loader />
  ) : (
    <ActionSheetProvider>
      <ProfileContext.Provider value={{ currentUser, setCurrentUser }}>
        <Screen>
          <Tabs.Container renderHeader={ProfileHeader}>
            <Tabs.Tab name="Profile" label={"Profile"}>
              <Tabs.ScrollView>
                <Text style={styles.description}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Consectetur maiores minima dolore amet debitis voluptas, eaque
                  suscipit corporis tempore id modi libero? Vero esse natus cum
                  minus amet reiciendis dolores.
                </Text>
                <View style={[styles.dFlex, styles.justifyCenter]}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.title}>{followers.length}</Text>
                    <Text style={styles.subTitle}>Followers</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.title}>{followings.length}</Text>
                    <Text style={styles.subTitle}>Following</Text>
                  </View>
                </View>
                <View style={styles.details}>
                  <View style={[styles.dFlex, styles.justifyBetween]}>
                    <View style={[styles.dFlex, { paddingLeft: 0 }]}>
                      <MaterialCommunityIcons
                        name="account-group-outline"
                        color={colors.medium}
                        size={25}
                      />
                      <Text style={styles.detailText}>
                        {followers.length} Friends
                      </Text>
                    </View>
                    <View style={styles.dFlex}>
                      {followers.slice(0, 3).map((follower) => (
                        <Image
                          source={{
                            uri: `${BASE_URL}${follower.profile_image}`,
                          }}
                          style={styles.circleImage}
                        />
                      ))}
                    </View>
                  </View>
                  <View style={styles.dFlex}>
                    <MaterialCommunityIcons
                      name="post-outline"
                      color={colors.medium}
                      size={25}
                    />
                    <Text style={styles.detailText}>
                      {posts.length} Post{posts.length > 1 ? "s" : ""}
                    </Text>
                  </View>
                  <View style={styles.dFlex}>
                    <Feather name="home" color={colors.medium} size={25} />
                    <Text style={styles.detailText}>
                      Lives In {currentUser?.address}
                    </Text>
                  </View>
                  <View style={styles.dFlex}>
                    <MaterialCommunityIcons
                      name="map-marker-outline"
                      color={colors.medium}
                      size={25}
                    />
                    <Text style={styles.detailText}>
                      From {currentUser?.city}
                    </Text>
                  </View>
                  <View style={styles.dFlex}>
                    <FontAwesome
                      name="birthday-cake"
                      color={colors.medium}
                      size={25}
                    />
                    <Text style={styles.detailText}>
                      {currentUser?.birth_date}
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
                {user.id === currentUser?.id ? (
                  <>
                    <Button
                      text="Edit Profile"
                      customStyles={styles.editBtn}
                      textStyles={styles.editBtnText}
                    />
                    <Button
                      text="Logout"
                      customStyles={styles.logoutBtn}
                      onClick={logout}
                    />
                  </>
                ) : (
                  <Button
                    text={isFollowing ? "Unfollow" : "Follow"}
                    customStyles={styles.editBtn}
                    textStyles={styles.editBtnText}
                    onClick={followUser}
                    loading={followingLoading}
                  />
                )}
                <Separator />
                <View style={styles.photos}>
                  <View style={[styles.dFlex, styles.justifyBetween]}>
                    <Text>Photos {images.length}</Text>
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
                      data={images}
                      extraData={images}
                      renderItem={({ item }) => (
                        <View style={styles.imageContainer}>
                          <Image
                            source={{ uri: `${BASE_URL}${item.path}` }}
                            style={styles.groupImages}
                            contentFit="cover"
                          />
                        </View>
                      )}
                      numColumns={3}
                      keyExtractor={(item) => item.id.toString()}
                      estimatedItemSize={50}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                </View>
                <Separator />
                <Posts type="text" />
              </Tabs.ScrollView>
            </Tabs.Tab>
            <Tabs.Tab name="Posts" label={"Posts"}>
              <Tabs.ScrollView>
                <Posts posts={posts} />
              </Tabs.ScrollView>
            </Tabs.Tab>
            <Tabs.Tab name="Photos" label={"Photos"}>
              <Tabs.ScrollView>
                <ImagesGrid images={images} />
              </Tabs.ScrollView>
            </Tabs.Tab>
          </Tabs.Container>
        </Screen>
      </ProfileContext.Provider>
    </ActionSheetProvider>
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
  editBtn: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 20,
    backgroundColor: colors.light,
  },
  editBtnText: {
    color: colors.primary,
    fontWeight: "bold",
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
  infoContainer: {
    alignItems: "center",
    marginHorizontal: 10,
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
  justifyBetween: {
    justifyContent: "space-between",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  logoutBtn: {
    backgroundColor: colors.danger,
    width: "90%",
    alignSelf: "center",
  },
  photos: {
    marginTop: 5,
    marginBottom: 10,
  },
  subTitle: {
    color: colors.medium,
    fontWeight: "bold",
  },
  textPrimary: {
    color: colors.primary,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
  },
});

export default Profile;
