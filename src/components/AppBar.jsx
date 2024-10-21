import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  scrollableContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
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
  return (
    <View style={styles.scrollableContainer}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.linkContainer}>Repositories</Text>
        </Link>
        <Link to="/sign-in">
          <Text style={styles.linkContainer}>Sign-In</Text>
        </Link>
        <Link to="/sign-in">
          <Text style={styles.linkContainer}>Sign-In</Text>
        </Link>
        <Link to="/sign-in">
          <Text style={styles.linkContainer}>Sign-In</Text>
        </Link>
        <Link to="/sign-in">
          <Text style={styles.linkContainer}>Sign-In</Text>
        </Link>
        <Link to="/sign-in">
          <Text style={styles.linkContainer}>Sign-In</Text>
        </Link>
        <Link to="/sign-in">
          <Text style={styles.linkContainer}>Sign-In</Text>
        </Link>
        <Link to="/sign-in">
          <Text style={styles.linkContainer}>Sign-In</Text>
        </Link>
        <Link to="/sign-in">
          <Text style={styles.linkContainer}>Sign-In</Text>
        </Link>
        <Link to="/sign-in">
          <Text style={styles.linkContainer}>Sign-In</Text>
        </Link>
        <Link to="/sign-in">
          <Text style={styles.linkContainer}>Sign-In</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
