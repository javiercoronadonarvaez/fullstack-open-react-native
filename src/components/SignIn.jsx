import { StyleSheet, TextInput, View, Pressable } from "react-native";
import { useFormik } from "formik";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "left",
    flexGrow: 1,
    flexShrink: 1,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    width: "80%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#0366d6", // Button-like color
    color: "white",
    height: 40,
    margin: 12,
    padding: 10,
    width: "80%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
  },
});

const initialValues = {
  username: "",
  password: "",
};

const SignIn = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={formik.values.username}
        placeholder="Username"
        onChangeText={formik.handleChange("username")}
      />
      <TextInput
        style={styles.input}
        value={formik.values.password}
        placeholder="Password"
        secureTextEntry
        onChangeText={formik.handleChange("password")}
      />
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignInHandler = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <SignIn onSubmit={onSubmit} />;
};

export default SignInHandler;
