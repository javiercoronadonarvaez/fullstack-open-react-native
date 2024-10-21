import { View, Text } from "react-native";

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text>Full Name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Number of Forks: {item.forksCount}</Text>
      <Text>Number of Stars: {item.stargazersCount}</Text>
      <Text>Rating Average: {item.ratingAverage}</Text>
      <Text>Number of Reviews: {item.reviewCount}</Text>
    </View>
  );
};

export default RepositoryItem;
