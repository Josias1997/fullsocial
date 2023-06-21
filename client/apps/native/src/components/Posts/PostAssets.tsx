import React, { useContext } from "react";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "theme";
import PostContext from "../../context/PostContext";

export interface PostAssetProps {
  onDeleteAsset: Function;
}

const PostAssets = ({ onDeleteAsset }: PostAssetProps) => {
  const { selectedAssets } = useContext(PostContext);

  return (
    <FlashList
      data={selectedAssets}
      renderItem={({ item }) => (
        <View style={styles.assetContainer}>
          <Image
            source={{
              uri: item.thumbnail ? item.thumbnail : item.uri,
            }}
            style={styles.asset}
            contentFit="cover"
          />
          {item.thumbnail && (
            <MaterialCommunityIcons
              name="play-circle"
              color={colors.mediumLight}
              size={35}
              style={styles.playIcon}
            />
          )}
          <TouchableOpacity
            style={styles.deleteIconContainer}
            onPress={() => onDeleteAsset(item)}
          >
            <MaterialCommunityIcons
              name="delete"
              color={colors.danger}
              size={20}
            />
          </TouchableOpacity>
        </View>
      )}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      estimatedItemSize={100}
      numColumns={3}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  asset: {
    width: "95%",
    height: 100,
    alignSelf: "center",
  },
  assetContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: colors.medium,
  },
  deleteIconContainer: {
    backgroundColor: colors.white,
    position: "absolute",
    top: 5,
    left: 5,
    borderRadius: 10,
  },
  playIcon: {
    position: "absolute",
  },
});

export default PostAssets;
