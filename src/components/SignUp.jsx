import { StyleSheet, TextInput, View, Pressable } from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import { SIGN_UP } from "../graphql/queries";
import useSignIn from "../hooks/useSignIn";
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
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username has to be at least 5 characters long")
    .max(30, "Username has to be at most 30 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password has to be at least 5 characters long")
    .max(50, "Password has to be at most 50 characters long"),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Password confirmation needs to match the one provided"
    )
    .required("Password confirmation is required"),
});

export const SignUp = ({ onSubmit }) => {
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
        autoCapitalize="none"
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
        autoCapitalize="none"
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <TextInput
        style={
          !formik.errors.passwordConfirmation
            ? styles.input
            : { ...styles.input, borderColor: styles.error.color }
        }
        value={formik.values.passwordConfirmation}
        placeholder="Password Confirmation"
        secureTextEntry
        onChangeText={formik.handleChange("passwordConfirmation")}
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={styles.error}>{formik.errors.passwordConfirmation}</Text>
        )}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const SignUpHandler = () => {
  const [signUp] = useMutation(SIGN_UP);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log("Username", username);
    console.log("Password", password);

    try {
      await signUp({ variables: { username, password } });
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  return <SignUp onSubmit={onSubmit} />;
};

export default SignUpHandler;
