import { useState, useEffect } from "react";
import RepositoryReviews from "./RepositoryReviews";

const UserReviews = ({ user }) => {
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    if (user && user.reviews) {
      const edges = user.reviews.edges;
      setUserReviews(edges.map((repository) => repository.node));
    }
  }, [user]);

  return <RepositoryReviews reviews={userReviews} />;
};

export default UserReviews;
