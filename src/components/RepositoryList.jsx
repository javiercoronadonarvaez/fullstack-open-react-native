import { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = ({ repositoryNodes }) => {
  const [orderingOption, selectOrderingOption] = useState("");
  const [filteredRepositoryNodes, setFilteredRepositoryNodes] = useState();
  const { repositories } = useRepositories(orderingOption);

  useEffect(() => {
    if (repositories) {
      console.log("FETCHED REPOS");
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
        <Picker
          selectedValue={orderingOption}
          onValueChange={(itemValue) => selectOrderingOption(itemValue)}
        >
          <Picker.Item label="Latest Repositories" value="" />
          <Picker.Item label="Highest Rated Repositories" value="highest" />
          <Picker.Item label="Lowest Rated Repositories" value="lowest" />
        </Picker>
      }
      renderItem={({ item, separators }) => (
        <Link
          key={item.key}
          to={`/${item.id}`}
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}
        >
          <RepositoryItem gitHubUser={item} />
        </Link>
      )}
    />
  );
};

export default RepositoryList;
