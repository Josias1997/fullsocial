import * as React from "react";
import Story from "./Story";
import { FlashList } from "@shopify/flash-list";
import { StoryType } from "types";

export interface StoriesProps {
  stories: Array<StoryType>;
}

const Stories = ({ stories }: StoriesProps) => {
  return (
    <FlashList
      data={stories}
      renderItem={({ item }) => <Story {...item} />}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      estimatedItemSize={78}
    />
  );
};

export default Stories;
