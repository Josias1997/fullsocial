import { FlashList } from "@shopify/flash-list";
import { BASE_URL } from "api";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ImageType } from "types";

export interface ImagesGridProps {
  images: Array<ImageType>;
}

const ImagesGrid = ({ images }: ImagesGridProps) => {
  return (
    <FlashList
      contentContainerStyle={{ paddingTop: 10, paddingHorizontal: 7 }}
      data={images}
      renderItem={({ item }) => (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${BASE_URL}${item.path}` }}
            style={styles.image}
            contentFit="cover"
          />
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      estimatedItemSize={370}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "98%",
    height: 120,
    alignSelf: "center",
  },
  imageContainer: {
    marginTop: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ImagesGrid;
