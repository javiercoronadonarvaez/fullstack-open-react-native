import { StyleSheet, TextInput, View, Pressable } from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { useFormik } from "formik";
import { CREATE_REVIEW } from "../graphql/mutations";
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
  ownerName: "",
  repositoryName: "",
  rating: null,
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Owner Name is required"),
  repositoryName: yup.string().required("Repository Name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .integer("Rating must be an integer")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100"),
  review: yup.string().optional(),
});

export const CreateReview = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={
          !formik.errors.ownerName
            ? styles.input
            : { ...styles.input, borderColor: styles.error.color }
        }
        value={formik.values.ownerName}
        placeholder="Owner Name"
        onChangeText={formik.handleChange("ownerName")}
        autoCapitalize="none"
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.error}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={
          !formik.errors.repositoryName
            ? styles.input
            : { ...styles.input, borderColor: styles.error.color }
        }
        value={formik.values.repositoryName}
        placeholder="Repository Name"
        onChangeText={formik.handleChange("repositoryName")}
        autoCapitalize="none"
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.error}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={
          !formik.errors.rating
            ? styles.input
            : { ...styles.input, borderColor: styles.error.color }
        }
        value={formik.values.rating}
        placeholder="Rating"
        onChangeText={formik.handleChange("rating")}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.error}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={
          !formik.errors.text
            ? styles.input
            : { ...styles.input, borderColor: styles.error.color }
        }
        value={formik.values.text}
        placeholder="Review"
        onChangeText={formik.handleChange("text")}
        autoCapitalize="none"
        multiline
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={styles.text}>{formik.errors.text}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Create Review</Text>
      </Pressable>
    </View>
  );
};

const CreateReviewHandler = ({ refetch }) => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    const ratingToNumber = parseInt(rating, 10);

    try {
      const createdReview = await createReview({
        variables: {
          ownerName,
          repositoryName,
          rating: ratingToNumber,
          text,
        },
      });
      console.log(
        "FETCHED REVIEW REPO ID",
        createdReview.data.createReview.repositoryId
      );
      await refetch();
      navigate(`/${createdReview.data.createReview.repositoryId}`);
    } catch (e) {
      console.error("ERROR", e);
    }
  };

  return <CreateReview onSubmit={onSubmit} />;
};

export default CreateReviewHandler;
