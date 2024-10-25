import { FlatList, View, StyleSheet, Pressable, Alert } from "react-native";
import { Link } from "react-router-native";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import format from "date-fns/format";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    backgroundColor: "white",
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#0366d6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  ratingText: {
    color: "#0366d6",
    fontWeight: "bold",
    fontSize: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  dateText: {
    color: "gray",
    fontSize: 14,
  },
  reviewText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  viewButton: {
    flex: 1,
    backgroundColor: "#0366d6",
    padding: 10,
    borderRadius: 4,
    marginRight: 5,
    marginLeft: 10,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 4,
    marginRight: 10,
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View>
          <Text style={styles.usernameText}>{review.user.username}</Text>
          <Text style={styles.dateText}>
            {format(new Date(review.createdAt), "P")}
          </Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  );
};

const RepositoryReviews = ({
  repositoryHeader,
  reviews,
  reviewActions,
  refetch,
  handleFetchMoreReviews,
}) => {
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDeleteReviewSubmit = (item) => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await deleteReview({ variables: { deleteReviewId: item.id } });
              await refetch({ includeReviews: true });
            } catch (error) {
              console.error("Error during delete or refetch:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={repositoryHeader}
      renderItem={({ item }) => (
        <View>
          <ReviewItem review={item} />
          {reviewActions ? (
            <View style={styles.buttonContainer}>
              <Link to={`/${item.repositoryId}`} style={styles.viewButton}>
                <Text style={styles.buttonText}>View Repository</Text>
              </Link>
              <Pressable
                onPress={() => handleDeleteReviewSubmit(item)}
                style={styles.deleteButton}
              >
                <Text style={styles.buttonText}>Delete Review</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      )}
      keyExtractor={({ id }) => id}
      onEndReached={handleFetchMoreReviews}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default RepositoryReviews;
