import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate, useMatch } from "react-router-native";

import useRepositories from "../hooks/useRepositories";

import AppBar from "./AppBar";
import RepositoryItem from "./RepositoryItem";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const { repositories } = useRepositories();
  const match = useMatch("/:userId");

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const gitHubUser = match
    ? repositoryNodes.find((user) => user.id === match.params.userId)
    : null;

  console.log("Repository Nodes", repositoryNodes);

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route
          path="/"
          element={<RepositoryList repositoryNodes={repositoryNodes} />}
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/:userId"
          element={<RepositoryItem gitHubUser={gitHubUser} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
