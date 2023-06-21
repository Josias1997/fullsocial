import * as React from "react";

import AppHeader from "../../components/AppHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "theme";
import { StyleSheet, TextInput, View } from "react-native";
import Avatar from "../../components/Avatar";
import { Text, TouchableOpacity, BackHandler } from "react-native";
import { Button } from "ui";
import Screen from "../../components/Screen";
import { StackScreenProps } from "../../types/navigation";
import Gallery, { CustomAssetType } from "../../components/Gallery";
import PostAssets from "../../components/Posts/PostAssets";
import PostContext from "../../context/PostContext";
import * as mime from "react-native-mime-types";
import { addNewPost } from "api";
import AuthContext from "../../context/AuthContext";

const NewPost = ({ navigation }: StackScreenProps) => {
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = React.useState("photo");
  const [selectedAssets, setSelectedAssets] = React.useState<CustomAssetType[]>(
    []
  );
  const { user } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", returnToHomeNavigator);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", () => {
        return true;
      });
    };
  }, []);

  React.useEffect(() => {}, [selectedAssets]);

  const [content, setContent] = React.useState("");

  const addPost = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (content) {
        formData.append("content", content);
      }
      formData.append("user_id", user.id);

      selectedAssets.forEach((asset) => {
        if (asset.mediaType == "photo") {
          formData.append("images[]", {
            uri: asset.uri,
            name: asset.filename,
            type: mime.lookup(asset.filename),
          });
        } else {
          formData.append("videos[]", {
            uri: asset.uri,
            name: asset.filename,
            type: mime.lookup(asset.filename),
          });
          formData.append("thumbnails[]", {
            uri: asset.thumbnail,
            name: `thumbnail_${asset.filename}`,
            type: mime.lookup(asset.filename),
          });
        }
      });
      try {
        const response = await addNewPost(formData, user.token);
        console.log(response.data);
        setSelectedAssets([]);
        setContent("");
        alert("Post sent successfully");
      } catch (error: any) {
        console.log(error.response);
        alert(error.response ? error.response.data.message : error.message);
      }
    } catch (error: any) {
      alert(error.response ? error.response.data.message : error.message);
    }
    setLoading(false);
  };
  const returnToHomeNavigator = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
    return true;
  };

  const handleClickedAsset = (asset: CustomAssetType, remove: boolean) => {
    const currentAssets = [...selectedAssets];
    if (remove == true) {
      let index = currentAssets.findIndex(
        (assetData) => assetData.id == asset.id
      );
      currentAssets.splice(index, 1);
    } else {
      currentAssets.unshift(asset);
    }
    setSelectedAssets(currentAssets);
  };

  const deleteAsset = (asset: CustomAssetType) => {
    const currentSelectedAssets = [...selectedAssets];
    let index = currentSelectedAssets.findIndex((item) => item === asset);
    currentSelectedAssets.splice(index, 1);
    setSelectedAssets(currentSelectedAssets);
  };

  return (
    <PostContext.Provider
      value={{ selectedAssets, setSelectedAssets, handleClickedAsset }}
    >
      <Screen>
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <AppHeader
              title="New Post"
              leftIcon={
                <TouchableOpacity
                  style={styles.leftHeaderIcon}
                  onPress={returnToHomeNavigator}
                >
                  <MaterialCommunityIcons
                    name="chevron-left"
                    size={30}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              }
              customStyles={styles.header}
            />
            <View style={[styles.main, styles.textAreaContainer]}>
              <View style={[styles.flexRow, styles.justifyBetween]}>
                <View style={styles.flexRow}>
                  <Avatar
                    source={require("../../../assets/icon.png")}
                    size={60}
                    customStyles={{}}
                  />
                  <Text style={styles.username}>John Doe</Text>
                </View>
                <View style={styles.icons}>
                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => {
                      setVisible(true);
                      setType("photo");
                    }}
                  >
                    <MaterialCommunityIcons
                      name="camera"
                      color={colors.mediumLight}
                      size={30}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => {
                      setType("video");
                      setVisible(true);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="video"
                      color={colors.mediumLight}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TextInput
                style={styles.textarea}
                placeholder="Write post here"
                onChangeText={(text: string) => setContent(text)}
              />
            </View>
            {selectedAssets.length > 0 && (
              <View style={styles.selectedAssets}>
                <PostAssets onDeleteAsset={deleteAsset} />
              </View>
            )}
            <Button
              text="Submit Post"
              customStyles={styles.button}
              onClick={addPost}
              loading={loading}
            />
          </View>
        </View>
        <Gallery
          type={type}
          visible={visible}
          onRequestClose={() => setVisible(false)}
          closeModal={() => setVisible(false)}
        />
      </Screen>
    </PostContext.Provider>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "80%",
    alignSelf: "center",
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
  main: {
    margin: 20,
    padding: 10,
  },
  modalContent: {
    backgroundColor: colors.white,
    width: "90%",
    height: "90%",
    alignSelf: "center",
    borderRadius: 20,
    verticalAlign: "center",
    paddingBottom: 20,
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
  },
  selectedAssets: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  textAreaContainer: {
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

export default NewPost;
