import { View, StyleSheet } from "react-native";
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
  container: {
    color: "white",
    paddingRight: 5,
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
  },
});

const AppBar = () => {
  return (
    <View style={styles.scrollableContainer}>
      <Link to="/">
        <Text style={styles.container}>Repositories</Text>
      </Link>
      <Link to="/sign-in">
        <Text style={styles.container}>Sign-In</Text>
      </Link>
    </View>
  );
};

export default AppBar;
