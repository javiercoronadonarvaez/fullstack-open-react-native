import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    color: "white",
    backgroundColor: "#24292e",
    fontWeight: "bold",
  },
});

const AppBar = () => {
  return (
    <View>
      <Pressable>
        <Text style={styles.container}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
