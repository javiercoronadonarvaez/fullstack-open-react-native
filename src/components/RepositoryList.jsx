import { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { Link } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useDebounce } from "use-debounce";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  searchBar: {
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = ({ repositoryNodes }) => {
  const [orderingOption, setOrderingOption] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchKeywordDebounced] = useDebounce(searchKeyword, 500);
  const [filteredRepositoryNodes, setFilteredRepositoryNodes] = useState();
  const { repositories, fetchMore } = useRepositories(
    orderingOption,
    searchKeywordDebounced
  );

  useEffect(() => {
    if (repositories) {
      const filteredNodes = repositories.edges.map((edge) => edge.node);
      setFilteredRepositoryNodes(filteredNodes);
    } else {
      setFilteredRepositoryNodes(repositoryNodes);
    }
  }, [repositories]);

  return (
    <FlatList
      data={filteredRepositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Searchbar
            style={styles.searchBar}
            placeholder="Search"
            onChangeText={setSearchKeyword}
            value={searchKeyword}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={orderingOption}
              onValueChange={(itemValue) => setOrderingOption(itemValue)}
            >
              <Picker.Item label="Latest Repositories" value="" />
              <Picker.Item label="Highest Rated Repositories" value="highest" />
              <Picker.Item label="Lowest Rated Repositories" value="lowest" />
            </Picker>
          </View>
        </View>
      }
      renderItem={({ item, separators }) => (
        <Link
          key={item.id}
          to={`/${item.id}`}
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}
        >
          <RepositoryItem gitHubUser={item} />
        </Link>
      )}
      onEndReached={fetchMore}
    />
  );
};

export default RepositoryList;
