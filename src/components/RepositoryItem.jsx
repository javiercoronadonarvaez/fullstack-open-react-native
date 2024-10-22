import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logoAndRepoContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    color: "gray",
  },
});

const countThousands = (number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  }
  return number.toString();
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={styles.logoAndRepoContainer}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />
        <View style={styles.textContainer}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
      <Text style={styles.language}>{item.language}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text>{countThousands(item.stargazersCount)}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text>{countThousands(item.forksCount)}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text>{item.reviewCount}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text>{item.ratingAverage}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
