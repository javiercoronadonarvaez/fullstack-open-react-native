import { View, Image, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPOSITORY } from "../graphql/queries";
import * as Linking from "expo-linking";
import Text from "./Text";

import RepositoryReviews from "./RepositoryReviews";

const styles = StyleSheet.create({
  wholeContainer: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logoAndRepoContainer: {
    flexDirection: "row",
    aligngitHubUsers: "center",
    padding: 10,
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 10,
    justifyContent: "space-between",
    flexShrink: 1,
  },
  description: {
    color: "gray",
  },
  language: {
    backgroundColor: "#0366d6",
    color: "white",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 4,
    marginLeft: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  statgitHubUser: {
    aligngitHubUsers: "center",
  },
  statLabel: {
    color: "gray",
  },
  button: {
    backgroundColor: "#0366d6",
    color: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 10,
    width: "95%",
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    textAlign: "center", // Ensure text is centered if applicable
  },
});

const countThousands = (number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  }
  return number.toString();
};

const RepositoryItem = ({ gitHubUser }) => {
  const [url, setUrl] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { userId } = useParams();
  const { data } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { id: userId },
  });

  useEffect(() => {
    if (data) {
      setUrl(data.repository.url);
      console.log("Repo Data", data);
      setReviews(
        data.repository.reviews.edges.map((repository) => repository.node)
      );
    }
  }, [data]);

  const displayButtonStyle = userId
    ? { ...styles.button, display: "flex" }
    : { ...styles.button, display: "none" };

  const handleOpenGitHubButton = async () => {
    Linking.openURL(url);
  };

  return (
    <View testID="repositorygitHubUser" style={{ backgroundColor: "white" }}>
      <View style={styles.logoAndRepoContainer}>
        <Image
          testID="repositoryImage"
          style={styles.tinyLogo}
          source={{
            uri: gitHubUser.ownerAvatarUrl,
          }}
        />
        <View style={styles.textContainer}>
          <Text fontWeight="bold">{gitHubUser.fullName}</Text>
          <Text style={styles.description}>{gitHubUser.description}</Text>
        </View>
      </View>
      <Text style={styles.language}>{gitHubUser.language}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statgitHubUser}>
          <Text>{countThousands(gitHubUser.stargazersCount)}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.statgitHubUser}>
          <Text>{countThousands(gitHubUser.forksCount)}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>
        <View style={styles.statgitHubUser}>
          <Text>{gitHubUser.reviewCount}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statgitHubUser}>
          <Text>{gitHubUser.ratingAverage}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
      <Pressable onPress={handleOpenGitHubButton}>
        <Text style={displayButtonStyle}>Open in GitHub</Text>
      </Pressable>
      <RepositoryReviews reviews={reviews} />
    </View>
  );
};

export default RepositoryItem;
