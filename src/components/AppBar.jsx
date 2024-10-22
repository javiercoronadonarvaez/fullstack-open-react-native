import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";
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
  const authStorage = useAuthStorage();
  const accessToken = authStorage.getAccessToken();
  console.log("ACCESS TOKEN FOR APP BAR", accessToken);

  return (
    <View style={styles.scrollableContainer}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.linkContainer}>Repositories</Text>
        </Link>
        <Link to="/sign-in">
          <Text style={styles.linkContainer}>Sign-In</Text>
        </Link>
        <Link to="/sign-out">
          <Text style={styles.linkContainer}>Sign Out</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
