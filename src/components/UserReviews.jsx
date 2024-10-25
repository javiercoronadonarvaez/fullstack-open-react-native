import { useState, useEffect } from "react";
import RepositoryReviews from "./RepositoryReviews";

const UserReviews = ({ user }) => {
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    if (user && user.reviews) {
      const edges = user.reviews.edges;
      const repositoryId = user.repositoryId;
      console.log("REPOSITORY ID", repositoryId);
      setUserReviews(edges.map((repository) => repository.node));
    }
  }, [user]);

  return <RepositoryReviews reviews={userReviews} reviewActions={true} />;
};

export default UserReviews;
