import { StyleSheet, Text } from "react-native";
import * as React from "react";
import Screen from "../../components/Screen";
import { colors } from "theme";
import { Tabs } from "react-native-collapsible-tab-view";
import { FlashList } from "@shopify/flash-list";
import SearchHeader from "../../components/Search/SearchHeader";
import SearchItem from "../../components/Search/SearchItem";
import SearchContext from "../../context/SearchContext";
import Loader from "../../components/Loader";
import AuthContext, { ContextUser } from "../../context/AuthContext";
import { findUsersBy } from "api";

const Search = () => {
  const { user } = React.useContext(AuthContext);
  const [query, setQuery] = React.useState("");
  const [users, setUsers] = React.useState<ContextUser[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (query) {
      searchUsers(query);
    }
  }, [query]);

  const searchUsers = async (query: string, page = 1) => {
    setLoading(true);
    try {
      const response = await findUsersBy(user.id, query, page, user.token);
      setUsers(response.data.users);
    } catch (error: any) {
      alert(error.response ? error.response.data.message : error.message);
    }
    setLoading(false);
  };

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      <Screen>
        <Tabs.Container renderHeader={SearchHeader}>
          <Tabs.Tab name="Search" label={"Search"}>
            <Tabs.ScrollView>
              {loading ? (
                <Loader />
              ) : (
                <FlashList
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={users}
                  extraData={users}
                  renderItem={({ item }) => <SearchItem user={item} />}
                  keyExtractor={(item) => item.id.toString()}
                  estimatedItemSize={140}
                />
              )}
            </Tabs.ScrollView>
          </Tabs.Tab>
        </Tabs.Container>
      </Screen>
    </SearchContext.Provider>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  input: {
    width: "65%",
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 20,
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
  },
});

export default Search;
