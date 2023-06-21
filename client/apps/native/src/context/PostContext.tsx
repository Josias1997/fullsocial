import { createContext } from "react";
import { CustomAssetType } from "../components/Gallery";

const PostContext = createContext({
  selectedAssets: new Array<CustomAssetType>(),
  setSelectedAssets: (assets: CustomAssetType[]) => {},
  handleClickedAsset: (asset: CustomAssetType, remove: boolean) => {},
});

export default PostContext;
