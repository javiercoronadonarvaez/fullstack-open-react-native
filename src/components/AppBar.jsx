import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useApolloClient } from "@apollo/client";
import { Link } from "react-router-native";
import useUser from "../hooks/useUser";
import Text from "./Text";
import Constants from "expo-constants";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  scrollableContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 13,
    backgroundColor: "#24292e",
    fontWeight: "bold",
  },
  linkContainer: {
    color: "white",
    paddingRight: 5,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
  },
});

const AppBar = () => {
  const { user, loading } = useUser();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  console.log("USER", user);

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.scrollableContainer}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.linkContainer}>Repositories</Text>
        </Link>
        {user ? (
          <>
            <Link to="/sign-out">
              <Pressable onPress={signOut}>
                <Text style={styles.linkContainer}>Sign Out</Text>
              </Pressable>
            </Link>
          </>
        ) : (
          <Link to="/sign-in">
            <Text style={styles.linkContainer}>Sign-In</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
