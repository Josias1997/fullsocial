import {
  Alert,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "theme";
import Avatar from "./Avatar";
import AuthContext from "../context/AuthContext";
import { BASE_URL } from "api";
import { Button } from "ui";
import * as ImagePicker from "expo-image-picker";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { updateUserCoverImage, updateUserProfileImage } from "api";
import Loader from "./Loader";
import * as mime from "react-native-mime-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileContext from "../context/ProfileContext";

const ProfileHeader = () => {
  const { user, setUser } = React.useContext(AuthContext);
  const { currentUser } = React.useContext(ProfileContext);
  const { showActionSheetWithOptions } = useActionSheet();
  const [loading, setLoading] = React.useState(false);

  const changeImage = () => {
    const options = ["Profile Image", "Cover Image", "Cancel"];
    showActionSheetWithOptions(
      {
        options,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            pickImage("profile_image");
            break;
          case 1:
            pickImage("cover_image");
            break;
          default:
            break;
        }
      }
    );
  };

  const pickImage = async (name: string) => {
    const cameraPermissions = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermissions.granted) {
      const mediaLibraryPermissions =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaLibraryPermissions.granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
        });
        if (result.assets) {
          sendImage(result.assets[0], name);
        }
      }
    }
  };
  const sendImage = async (
    asset: ImagePicker.ImagePickerAsset,
    name: string
  ) => {
    setLoading(true);
    try {
      const formData = new FormData();
      const filename = asset.uri.split("/").pop();
      formData.append(`${name}`, {
        uri: asset.uri,
        name: filename,
        type: mime.lookup(filename),
      });
      let response;
      if (name == "profile_image") {
        response = await updateUserProfileImage(user.id, user.token, formData);
      } else {
        response = await updateUserCoverImage(user.id, user.token, formData);
      }
      setUser({
        ...user,
        ...response.data.user,
      });
      await AsyncStorage.setItem(
        "@user",
        JSON.stringify({
          ...user,
          ...response.data.user,
        })
      );
    } catch (error: any) {
      alert(error.response ? error.response.data.message : error.message);
    }
    setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.header}>
      <ImageBackground
        source={
          currentUser?.cover_image
            ? { uri: `${BASE_URL}${currentUser.cover_image}` }
            : require("../../assets/icon.png")
        }
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.headerContent}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="menu" color={colors.white} size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.avatarContainer}>
        <Avatar
          source={
            currentUser?.profile_image
              ? { uri: `${BASE_URL}${currentUser.profile_image}` }
              : require("../../assets/icon.png")
          }
          customStyles={{}}
          size={100}
        />
      </View>
      {user.id === currentUser?.id && (
        <Button
          text="Edit"
          customStyles={styles.editBtn}
          onClick={changeImage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.medium,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
  },
  editBtn: {
    position: "absolute",
    zIndex: 3,
    bottom: 20,
    right: 20,
  },
  header: {
    width: "100%",
    height: 300,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContent: {
    width: 100,
    top: 10,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    padding: 20,
  },
});

export default ProfileHeader;
