import { StyleSheet, TextInput, View, Pressable } from "react-native";
import { useFormik } from "formik";
import Text from "./Text";
import * as yup from "yup";

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
  error: {
    margin: 12,
    width: "80%",
    color: "#d73a4a",
  },
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={
          !formik.errors.username
            ? styles.input
            : { ...styles.input, borderColor: styles.error.color }
        }
        value={formik.values.username}
        placeholder="Username"
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={
          !formik.errors.password
            ? styles.input
            : { ...styles.input, borderColor: styles.error.color }
        }
        value={formik.values.password}
        placeholder="Password"
        secureTextEntry
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
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
