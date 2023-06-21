import React, { useContext, useEffect, useState } from "react";
import { CustomAssetType } from "../Gallery";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableOpacityProps,
} from "react-native";
import { Image, ImageStyle } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "theme";
import PostContext from "../../context/PostContext";

export interface AssetProps {
  asset: CustomAssetType;
  type: string;
  customStyles?: ImageStyle;
  containerStyles?: TouchableOpacityProps["style"];
}

const Asset = ({ asset, type, containerStyles }: AssetProps) => {
  const { selectedAssets, handleClickedAsset } = useContext(PostContext);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selectedAssets.findIndex((item) => item.id == asset.id) !== -1) {
      setSelected(true);
    }
  }, [selectedAssets]);

  const selectAsset = (asset: CustomAssetType) => {
    handleClickedAsset(asset, selected);
    setSelected((previousValue) => !previousValue);
  };

  return (
    <TouchableOpacity
      style={[
        styles.assetContainer,
        {
          opacity: selected ? 0.2 : 1,
        },
        containerStyles,
      ]}
      activeOpacity={0.9}
      onPress={() => selectAsset(asset)}
    >
      <Image
        source={{
          uri: asset.thumbnail ? asset.thumbnail : asset.uri,
        }}
        style={styles.asset}
        contentFit="cover"
      />
      {asset.mediaType == "video" && (
        <MaterialCommunityIcons
          name="play-circle"
          color={colors.mediumLight}
          size={35}
          style={styles.playIcon}
        />
      )}
    </TouchableOpacity>
  );
};
const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  asset: {
    width: width / 3,
    height: 100,
  },
  assetContainer: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    position: "absolute",
  },
});

export default Asset;
