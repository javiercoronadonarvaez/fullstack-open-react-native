//import { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { useApolloClient } from "@apollo/client";
import { Link, useNavigate } from "react-router-native";
//import useUser from "../hooks/useUser";
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
    paddingRight: 20,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
  },
});

const AppBar = ({ user, setIncludeReviews }) => {
  //const [includeReviews, setIncludeReviews] = useState(false);
  //const { user, loading } = useUser(includeReviews);
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  //console.log("FETCH REVIEWS", includeReviews);

  // if (loading) {
  //   return <Text>Loading...</Text>;
  // }

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };

  const activatePersonalReviews = () => {
    setIncludeReviews(true);
    navigate("/my-reviews");
  };

  return (
    <View style={styles.scrollableContainer}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.linkContainer}>Repositories</Text>
        </Link>
        {user ? (
          <>
            <Link to="/create-review">
              <Text style={styles.linkContainer}>Create a Review</Text>
            </Link>
            <Pressable onPress={activatePersonalReviews}>
              <Text style={styles.linkContainer}>My Reviews</Text>
            </Pressable>
            <Link to="/sign-out">
              <Pressable onPress={signOut}>
                <Text style={styles.linkContainer}>Sign Out</Text>
              </Pressable>
            </Link>
          </>
        ) : (
          <>
            <Link to="/sign-in">
              <Text style={styles.linkContainer}>Sign-In</Text>
            </Link>
            <Link to="/sign-up">
              <Text style={styles.linkContainer}>Sign-Up</Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
