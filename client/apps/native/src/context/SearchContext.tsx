import { createContext } from "react";

const SearchContext = createContext({
  query: "",
  setQuery: (query: string) => {},
});

export default SearchContext;
