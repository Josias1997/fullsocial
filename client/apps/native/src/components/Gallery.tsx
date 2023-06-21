import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  ModalProps,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import ErrorText from "./ErrorText";
import { FlashList } from "@shopify/flash-list";
import * as VideoThumbnails from "expo-video-thumbnails";
import Loader from "./Loader";
import { colors } from "theme";
import Asset from "./Gallery/Asset";
import { Badge } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PostContext from "../context/PostContext";

export interface GalleryProps {
  type: string;
  visible: ModalProps["visible"];
  onRequestClose: ModalProps["onRequestClose"];
  closeModal: Function;
}

interface ThumbnailProps {
  thumbnail?: string | false;
  selected?: boolean;
}

export type CustomAssetType = MediaLibrary.Asset & ThumbnailProps;

const Gallery = ({
  type = "photo",
  visible,
  onRequestClose,
  closeModal,
}: GalleryProps) => {
  const { selectedAssets } = useContext(PostContext);
  const [assets, setAssets] = useState<Array<CustomAssetType>>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    MediaLibrary.requestPermissionsAsync()
      .then((permissions) => {
        if (permissions.granted) {
          getAssets();
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [type]);

  useEffect(() => {}, [assets]);

  const getAssets = () => {
    MediaLibrary.getAssetsAsync({
      mediaType:
        type == "video"
          ? MediaLibrary.MediaType.video
          : MediaLibrary.MediaType.photo,
      first: 30,
      sortBy: MediaLibrary.SortBy.modificationTime,
    })
      .then(({ assets }) => {
        if (type == "video") {
          Promise.all(
            assets.map(async (asset) => {
              const { uri } = await VideoThumbnails.getThumbnailAsync(
                asset.uri,
                {
                  time: 15000,
                }
              );
              return {
                ...asset,
                thumbnail: uri,
              };
            })
          ).then((values) => {
            setAssets(values);
            setLoading(false);
          });
        } else {
          setAssets(assets);
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const validateSelection = () => {
    closeModal();
  };

  const fetchMoreAssets = () => {
    setLoadingMore(true);
    MediaLibrary.getAssetsAsync({
      mediaType:
        type == "video"
          ? MediaLibrary.MediaType.video
          : MediaLibrary.MediaType.photo,
      first: 30,
      sortBy: MediaLibrary.SortBy.modificationTime,
      after: assets[assets.length - 1],
    })
      .then(({ assets }) => {
        if (type == "video") {
          Promise.all(
            assets.map(async (asset) => {
              const { uri } = await VideoThumbnails.getThumbnailAsync(
                asset.uri,
                {
                  time: 15000,
                }
              );
              return {
                ...asset,
                thumbnail: uri,
              };
            })
          ).then((values) => {
            setAssets((prevAssets) => [...prevAssets, ...values]);
            setLoadingMore(false);
          });
        } else {
          setAssets((prevAssets) => [...prevAssets, ...assets]);
          setLoadingMore(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoadingMore(false);
      });
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="fade"
    >
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          {((type == "photo" &&
            selectedAssets.filter((item) => item.mediaType == "photo").length >
              0) ||
            (type == "video" &&
              selectedAssets.filter((item) => item.mediaType == "video")
                .length > 0)) && (
            <View style={styles.header}>
              <Badge style={styles.badge} size={30}>
                {type == "video"
                  ? selectedAssets.filter((item) => item.mediaType == "video")
                      .length
                  : selectedAssets.filter((item) => item.mediaType == "photo")
                      .length}
              </Badge>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={validateSelection}
              >
                <MaterialCommunityIcons
                  name="check-circle"
                  color={colors.white}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          )}
          {error ? (
            <ErrorText text={error} />
          ) : (
            assets.length > 0 && (
              <FlashList
                data={assets}
                renderItem={({ item }) => <Asset asset={item} type={type} />}
                keyExtractor={(item) => item.id}
                estimatedItemSize={200}
                numColumns={3}
                onEndReachedThreshold={0.5}
                onEndReached={fetchMoreAssets}
                ListFooterComponent={() => (loadingMore ? <Loader /> : null)}
              />
            )
          )}
        </View>
      )}
    </Modal>
  );
};

const width = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  asset: {
    width: width / 3,
    height: 100,
  },
  assetContainer: {
    width: "100%",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    backgroundColor: colors.white,
    color: colors.black,
  },
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    backfaceColor: colors.transparent,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    width: "100%",
    bottom: 10,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    position: "absolute",
  },
});

export default Gallery;
