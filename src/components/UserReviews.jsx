import { useState, useEffect } from "react";
import RepositoryReviews from "./RepositoryReviews";

const UserReviews = ({ user, refetch }) => {
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    if (user && user.reviews) {
      const nodes = user.reviews.edges.map((repository) => repository.node);
      console.log("NODES", nodes);
      setUserReviews(nodes);
    }
  }, [user]);

  return (
    <RepositoryReviews
      reviews={userReviews}
      reviewActions={true}
      refetch={refetch}
    />
  );
};

export default UserReviews;
