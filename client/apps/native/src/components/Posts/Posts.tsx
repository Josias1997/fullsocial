import { FlashList } from "@shopify/flash-list";
import React from "react";
import PostComponent from "./Post";
import { View } from "react-native";
import Separator from "../Separator";
import { Post } from "types";

export interface PostsProps {
  posts?: Array<Post>;
  type?: string;
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={posts}
        renderItem={({ item }) => <PostComponent {...item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <Separator />}
        estimatedItemSize={370}
      />
    </View>
  );
};

export default Posts;
