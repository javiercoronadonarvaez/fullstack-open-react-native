import { FlatList, View, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = ({ repositoryNodes }) => {
  // const { repositories } = useRepositories();
  // const navigate = useNavigate();

  // const repositoryNodes = repositories
  //   ? repositories.edges.map((edge) => edge.node)
  //   : [];

  // return (
  //   <FlatList
  //     data={repositoryNodes}
  //     ItemSeparatorComponent={ItemSeparator}
  //     renderItem={({ item, separators }) => (
  //       <Pressable
  //         key={item.key}
  //         //onPress={() => navigate(`/${item.id}`)}
  //         onShowUnderlay={separators.highlight}
  //         onHideUnderlay={separators.unhighlight}
  //       >
  //         <RepositoryItem gitHubUser={item} />
  //       </Pressable>
  //     )}
  //   />
  // );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
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
